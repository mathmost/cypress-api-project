/**
 * ui自动化demo
 */
describe('百度测试', function() {
    // 前置条件
    beforeEach(() => {
        cy.visit('https://www.baidu.com');
    })
    // 测试用例
    it('百度输入测试', function() {
        cy.get("#kw").type('test').should('have.value', 'test')
        .clear().should('have.value', '')
    })
})
