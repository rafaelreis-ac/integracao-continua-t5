describe('Gerenciar agendamentos', () => {

    beforeEach(() => {

        const currentDate = new Date(2023, 11, 1).getTime();
        cy.clock(currentDate);

        cy.intercept('GET', '/atendimento/', {
            statusCode: 200,
            fixture: 'atendimentos.json'
        });

        cy.visit('/');
        cy.get('nav a').contains('Agenda').click();

    });

    it('deve ser capaz de agendar um novo atendimento', () => {

        cy.intercept('GET', '/convenio/', {
            statusCode: 200,
            fixture: 'convenios.json'
        });

        cy.intercept('GET', '/profissional/', {
            statusCode: 200,
            fixture: 'profissionais.json'
        });

        cy.intercept('GET', '/paciente/', {
            statusCode: 200,
            fixture: 'pacientes.json'
        });

        cy.intercept('GET', '/atendimento/horarios/3/2023-12-02', {
            statusCode: 200,
            body: []
        });

        cy.intercept('POST', '/atendimento/', {
            statusCode: 201
        });

        cy.get('#add').click();
        cy.get('select[name="profissional"]').select('Davi Jesus Mendes');
        cy.get('input[name="data"]').type('2023-12-02');
        cy.get('select[name="hora"]').select('14:00:00');
        cy.get('select[name="convenio"]').select('Unimed');
        cy.get('select[name="paciente"]').select('Helen Dutra Vilar');
        
        cy.fixture('atendimentos.json').then((atendimentos) => {            
            cy.fixture('atendimento-insert.json').then((novoAtendimento) => {
                atendimentos.push(novoAtendimento);
                cy.intercept('GET', '/atendimento/', {
                    statusCode: 200,
                    body: atendimentos
                });
            });
        });
        
        cy.get('input[type="submit"]').click();

        cy.contains('Operação realizada com sucesso!');
        cy.get('table tbody tr:last').within(() => {
            cy.get('td').eq(0).contains('02/12/2023');
            cy.get('td').eq(1).contains('14:00');
            cy.get('td').eq(2).contains('Helen Dutra Vilar');
            cy.get('td').eq(3).contains('Davi Jesus Mendes');
        });

    });

    function interceptAfterUpdateStatus(status: string): void {
        cy.fixture('atendimentos.json').then((appointments) => {
            cy.intercept('GET', '/atendimento/', {
                statusCode: 200,
                body: appointments.map((item: any) => {
                    if (item.id == 3) {
                        item.status = status;
                    }
                    return item;
                })
            });
        });
    }

    it('deve seguir o fluxo correto ao alterar o status do atendimento', () => {

        cy.intercept('PUT', '/atendimento/status/3', {
            statusCode: 200
        });

        const nomePaciente = 'Helen Dutra Vilar';

        cy.get('table tbody').contains('tr', nomePaciente).within(() => {

            interceptAfterUpdateStatus('CONFIRMADO');
            cy.get('a').contains('Confirmar').click();

            interceptAfterUpdateStatus('CHEGADA');
            cy.get('a').contains('Chegada').click();

        });

        cy.get('nav a').contains('Atendimento').click();

        cy.get('table tbody').contains('tr', nomePaciente).within(() => {

            interceptAfterUpdateStatus('ATENDIMENTO');
            cy.get('a').contains('Iniciar').click();

            interceptAfterUpdateStatus('ENCERRADO');
            cy.get('a').contains('Finalizar').click();

        });

        cy.get('table tbody').should('not.contain', nomePaciente);

    });

});
