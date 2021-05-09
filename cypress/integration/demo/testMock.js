/**
 * 检查点
 */

describe.skip('restful api',()=>{
    it('根据id号查询存在的用户信息GET',()=>{
        // 写检查点？
        cy.request({url:'http://localhost:3000/user/1001'})
            .its('body').its('id').should('eq',1001)
    })

    it('查询所有用户的信息GET',()=>{
        // 写检查点
        cy.request({url:'http://localhost:3000/user/'})
            .its('body')
            .should('be.an','array')
            // .and('have.length',5)
            .its('0')
            .should('contain', {"id": 1001, "name": "huice"})
    })

    it('添加用户数据POST',()=>{
        // 写检查点？
        cy.request({
            method:'POST',
            url:'http://localhost:3000/user/',
            headers:{'Content-Type':'application/json'},
            body: {"name": "huicetesting"}
        }).its('body').its('name').should('eq','huicetesting')
    })

    it('修改用户数据PUT',()=>{
        // 写检查点？
        cy.request({
            method:'PUT',
            url:'http://localhost:3000/user/1010',
            headers:{'Content-Type':'application/json'},
            body: {"name": "huicetesting999"}
        }).its('body').its('name').should('eq','huicetesting999')
    })

     it('删除用户数据DELETE',()=>{
         // 添加用户功能正常
        cy.request({
            method:'POST',
            url:'http://localhost:3000/user/',
            headers:{'Content-Type':'application/json'},
            body: {"name": "huicetesting"}
        }).then(res=> {
            cy.request({
                method: 'DELETE',
                url: 'http://localhost:3000/user/' + res.body.id
            }).its('body').should('not.have.a.property', 'id')
        })
    })

})
