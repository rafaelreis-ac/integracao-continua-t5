describe('Gerenciar usuários', () => {

    it('deve ser capaz de criar um novo usuário', () => {

        cy.intercept('GET', '/config/usuario/', {
            statusCode: 200,
            fixture: 'usuarios.json'
        });

        cy.intercept('POST', '/config/usuario/', {
            statusCode: 201
        });

        cy.visit('/');
        cy.get('nav a').contains('Usuários').click({ force: true });

        cy.get('#add').click();
        cy.get('input[name="nomeCompleto"]').type('Laura Costa Sarkis');
        cy.get('input[name="nomeUsuario"]').type('laura');
        cy.get('input[name="senha"]').type('laura');
        cy.get('input[name="ativo"]').check();
        cy.get('select[name="papel"]').select('ADMIN');
        
        cy.fixture('usuarios.json').then((usuarios) => {            
            cy.fixture('usuario-insert.json').then((novoUsuario) => {
                usuarios.push(novoUsuario);
                cy.intercept('GET', '/config/usuario/', {
                    statusCode: 200,
                    body: usuarios
                });
            });
        });
        
        cy.get('input[type="submit"]').click();

        cy.contains('Operação realizada com sucesso!');
        cy.get('table tbody tr:last').within(() => {
            cy.get('td').eq(1).contains('Laura Costa Sarkis');
            cy.get('td').eq(2).contains('laura');
            cy.get('td').eq(3).contains('Sim');
            cy.get('td').eq(4).contains('ADMIN');
        });

    });

});
