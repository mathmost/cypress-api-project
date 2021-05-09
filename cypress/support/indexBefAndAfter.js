// 前置脚本
Cypress.Commands.add('before', () => {
    cy.request({
        method: "GET",
        url: '/v2/user/login',
        headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
        params: {
            "username": "admin",
            "password": "123456"
        }
    }).then(res => {
        console.log(res);
    });
})

// 后置脚本
Cypress.Commands.add('after', () => {
    cy.request({
        method: "GET",
        url: '/v2/user/logout',
        headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
    });
})
