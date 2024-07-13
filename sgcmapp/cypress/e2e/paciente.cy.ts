describe('Gerenciar pacientes', () => {

    it('deve ser capaz de criar um novo paciente', () => {

        cy.intercept('GET', '/paciente/', {
            statusCode: 200,
            fixture: 'pacientes.json'
        });

        cy.intercept('POST', '/paciente/', {
            statusCode: 201
        });

        cy.visit('/');
        cy.get('nav a').contains('Pacientes').click();

        cy.get('#add').click();
        cy.get('input[name="nome"]').type('Cristiana Marques Passos');
        cy.get('input[name="email"]').type('cristiana.passos@gmail.com');
        cy.get('input[name="telefone"]').type('(68) 97233-5516');
        cy.get('input[name="dataNascimento"]').type('1983-06-29');
        cy.get('select[name="grupoSanguineo"]').select('AB+');
        cy.get('select[name="sexo"]').select('Feminino');
        cy.get('input[name="cep"]').type('69920-148');
        cy.get('input[name="endereco"]').type('Rua Javarí, 325 - Conjunto Rui Lino');
        cy.get('select[name="estado"]').select('Acre');
        cy.get('input[name="cidade"]').type('Rio Branco');
        
        cy.fixture('pacientes.json').then((pacientes) => {            
            cy.fixture('paciente-insert.json').then((novoPaciente) => {
                pacientes.push(novoPaciente);
                cy.intercept('GET', '/paciente/', {
                    statusCode: 200,
                    body: pacientes
                });
            });
        });
        
        cy.get('input[type="submit"]').click();

        cy.contains('Operação realizada com sucesso!');
        cy.get('table tbody tr:last').within(() => {
            cy.get('td').eq(1).contains('Cristiana Marques Passos');
            cy.get('td').eq(2).contains('cristiana.passos@gmail.com');
            cy.get('td').eq(3).contains('(68) 97233-5516');
            cy.get('td').eq(4).contains('29/06/1983');
            cy.get('td').eq(5).contains('AB_POSITIVO');
            cy.get('td').eq(6).contains('F');
            cy.get('td').eq(7).contains('69920-148');
            cy.get('td').eq(8).contains('Rua Javarí, 325 - Conjunto Rui Lino');
            cy.get('td').eq(9).contains('AC');
            cy.get('td').eq(10).contains('Rio Branco');
        });

    });

});
