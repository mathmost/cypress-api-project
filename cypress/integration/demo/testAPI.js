/**
 * 接口自动化
 */

describe.skip('接口自动化',()=>{
    it('可以正常打开首页GET',()=>{
        cy.request('/index.php').then(res=>{
            expect(res.status).to.eq(200)
        })
        cy.request('/index.php').its('status').should('eq',200)
    })

    it('输入合法数据，可以正常登录成功POST-验证返回的全部json对象',()=>{
        cy.request({method:'POST',url:'/index.php/Home/public/login',form:true,
            body:{name:'admin',pwd:'123456',logon:'0'}}
            )
            .its('body').should('contain',{"code":1,"mes":"/index.php/Home/Index/index"})
    })

    it('输入合法数据，可以正常登录成功POST-验证部分json信息',()=>{
        cy.request({method:'POST',url:'/index.php/Home/public/login',form:true,
            body:{name:'admin',pwd:'123456',logon:'0'}}
            )
            .its('body').its('code').should('eq',1)
    })

    it('输入合法数据，可以正常登录成功POST-expect',()=>{
        cy.request({method:'POST',url:'/index.php/Home/public/login',form:true,
            body:{name:'admin',pwd:'123456',logon:'0'}}
            ).then(res=>{
                expect(res.status).to.eq(200)
                expect(res.body).to.contain({"code":1,"mes":"/index.php/Home/Index/index"})
        })
    })
})
