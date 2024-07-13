describe('Gerenciar convênios', () => {

    it('deve ser capaz de criar um novo convênio', () => {

        cy.intercept('GET', '/convenio/', {
            statusCode: 200,
            fixture: 'convenios.json'
        });

        cy.intercept('POST', '/convenio/', {
            statusCode: 201
        });

        cy.visit('/');
        cy.get('nav a').contains('Convênios').click();

        cy.get('#add').click();
        cy.get('input[name="nome"]').type('Real');
        cy.get('input[name="razaoSocial"]').type('Real Central de Convênios Ltda');
        cy.get('input[name="cnpj"]').type('02.354.015/0001-83');
        cy.get('input[name="representante"]').type('Carla Chaves Dutra');
        cy.get('input[name="email"]').type('contato@realconvenios.com.br');
        cy.get('input[name="telefone"]').type('(68) 3425-7011');
        cy.get('input[name="ativo"]').check();
        
        cy.fixture('convenios.json').then((convenios) => {            
            cy.fixture('convenio-insert.json').then((novoConvenio) => {
                convenios.push(novoConvenio);
                cy.intercept('GET', '/convenio/', {
                    statusCode: 200,
                    body: convenios
                });
            });
        });
        
        cy.get('input[type="submit"]').click();

        cy.contains('Operação realizada com sucesso!');
        cy.get('table tbody tr:last').within(() => {
            cy.get('td').eq(1).contains('Real');
            cy.get('td').eq(2).contains('Real Central de Convênios Ltda');
            cy.get('td').eq(3).contains('02.354.015/0001-83');
            cy.get('td').eq(4).contains('Carla Chaves Dutra');
            cy.get('td').eq(5).contains('contato@realconvenios.com.br');
            cy.get('td').eq(6).contains('(68) 3425-7011');
            cy.get('td').eq(7).contains('Sim');
        });

    });

});
