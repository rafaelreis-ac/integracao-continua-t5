describe('Gerenciar unidades', () => {

    it('deve ser capaz de criar uma nova unidade', () => {

        cy.intercept('GET', '/config/unidade/', {
            statusCode: 200,
            fixture: 'unidades.json'
        });

        cy.intercept('POST', '/config/unidade/', {
            statusCode: 201
        });

        cy.visit('/');
        cy.get('nav a').contains('Unidades').click({ force: true });

        cy.get('#add').click();
        cy.get('input[name="nome"]').type('Triângulo');
        cy.get('input[name="endereco"]').type('Via Chico Mendes, 1780 - Triângulo');
        
        cy.fixture('unidades.json').then((unidades) => {            
            cy.fixture('unidade-insert.json').then((novoUnidade) => {
                unidades.push(novoUnidade);
                cy.intercept('GET', '/config/unidade/', {
                    statusCode: 200,
                    body: unidades
                });
            });
        });
        
        cy.get('input[type="submit"]').click();

        cy.contains('Operação realizada com sucesso!');
        cy.get('table tbody tr:last').within(() => {
            cy.get('td').eq(1).contains('Triângulo');
            cy.get('td').eq(2).contains('Via Chico Mendes, 1780 - Triângulo');
        });

    });

});
