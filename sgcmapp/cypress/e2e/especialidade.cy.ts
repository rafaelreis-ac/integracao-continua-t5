describe('Gerenciar especialidades', () => {

    it('deve ser capaz de criar uma nova especialidade', () => {

        cy.intercept('GET', '/config/especialidade/', {
            statusCode: 200,
            fixture: 'especialidades.json'
        });

        cy.intercept('POST', '/config/especialidade/', {
            statusCode: 201
        });

        cy.visit('/');
        cy.get('nav a').contains('Especialidades').click({ force: true });

        cy.get('#add').click();
        cy.get('input[name="nome"]').type('Ortopedia');
        
        cy.fixture('especialidades.json').then((especialidades) => {            
            cy.fixture('especialidade-insert.json').then((novoEspecialidade) => {
                especialidades.push(novoEspecialidade);
                cy.intercept('GET', '/config/especialidade/', {
                    statusCode: 200,
                    body: especialidades
                });
            });
        });
        
        cy.get('input[type="submit"]').click();

        cy.contains('Operação realizada com sucesso!');
        cy.get('table tbody tr:last').within(() => {
            cy.get('td').eq(1).contains('Ortopedia');
        });

    });

});
