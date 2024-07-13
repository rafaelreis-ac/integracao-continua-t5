describe('Gerenciar profissionais', () => {

    it('deve ser capaz de criar um novo profissional', () => {

        cy.intercept('GET', '/profissional/', {
            statusCode: 200,
            fixture: 'profissionais.json'
        });

        cy.intercept('GET', '/config/especialidade/', {
            statusCode: 200,
            fixture: 'especialidades.json'
        });

        cy.intercept('GET', '/config/unidade/', {
            statusCode: 200,
            fixture: 'unidades.json'
        });

        cy.intercept('POST', '/profissional/', {
            statusCode: 201
        });

        cy.visit('/');
        cy.get('nav a').contains('Profissionais').click();

        cy.get('#add').click();
        cy.get('input[name="nome"]').type('Marlene Portugal Ferreira');
        cy.get('input[name="registroConselho"]').type('CRM/AC 364');
        cy.get('select[name="especialidade"]').select('Dermatologia');
        cy.get('select[name="unidade"]').select('Bela Vista');
        cy.get('input[name="telefone"]').type('(68) 96985-9135');
        cy.get('input[name="email"]').type('marlene.ferreira@gmail.com');
        
        cy.fixture('profissionais.json').then((profissionais) => {            
            cy.fixture('profissional-insert.json').then((novoProfissional) => {
                profissionais.push(novoProfissional);
                cy.intercept('GET', '/profissional/', {
                    statusCode: 200,
                    body: profissionais
                });
            });
        });
        
        cy.get('input[type="submit"]').click();

        cy.contains('Operação realizada com sucesso!');
        cy.get('table tbody tr:last').within(() => {
            cy.get('td').eq(1).contains('Marlene Portugal Ferreira');
            cy.get('td').eq(2).contains('CRM/AC 364');
            cy.get('td').eq(3).contains('Dermatologia');
            cy.get('td').eq(4).contains('Bela Vista');
            cy.get('td').eq(5).contains('(68) 96985-9135');
            cy.get('td').eq(6).contains('marlene.ferreira@gmail.com');
        });

    });

});
