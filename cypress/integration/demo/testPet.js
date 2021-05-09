import faker from 'faker'

// 测试数据
function generateData() {
  let data = {
    "id": faker.datatype.number(),
    "category": {
      "id": faker.datatype.number(),
      "name": faker.name.firstName()
    },
    "name": faker.name.title(),
    "photoUrls": [
      faker.image.animals()
    ],
    "tags": [
      {
        "id": faker.datatype.number(),
        "name": "string"
      }
    ],
    "status": "available"
  }
  return data
}

/**
 * 1. 隐式断言包括：should和and
 * 2. 显式断言包括：expect和assert
 */

/**
 * 1. 用例跳过: it.skip()
 * 2. 套件跳过: describle.skip()
 * 3. only(): 指定运行测试套件或测试用例
 *    describle.only()
 *    it.only()
 */

// 测试用例
describe('宠物管理', () => {
  before(() => {
    console.log('------ start ------');
    cy.before();
  })

  // 如果在当前套件已经制定了before钩子函数, 则不会执行每个用例的beforeEach钩子函数
  // after类似原理
  beforeEach('每个测试用例执行前都会执行', () => {
    cy.log('每个测试用例执行前都会执行');
  })

  afterEach('每个测试用例执行后都会执行', () => {
    cy.log('每个测试用例执行后都会执行');
  })

  it('测试从外部调用接口', () => {
    let data = generateData()
    cy.login(data);
  })

  it('测试fixture数据单json使用', () => {
    cy.fixture('users.json').as('petstoresData').then((json) => {
      cy.login(json);
    });
  })

  it('测试fixture数据遍历形成用例使用', () => {
    cy.fixture('petstore.json').as('petstoresData').then((petListCaseDatas) => {
      petListCaseDatas.forEach(petListCaseData => {
        cy.login(petListCaseData);
      });
    })
  })

  it('测试intercept在网络层管理HTTP请求的行为', () => {
    cy.intercept('POST', 'http://example.com/widgets', {
      statusCode: 200,
      body: 'it worked!',
    });
  })
  
  it('测试its获取之前获得的标的的值', () => {
    cy.log('test start');
    // json
    cy.wrap({ age: 52 }).its('age').should('eq', 52);
    // list
    cy.wrap(['Wai Yan', 'Yu']).its(1).should('eq', 'Yu');
    // string
    // cy.title().its('length').should('eq', 24);
    // function
    const fn = () => {
      return 42
    };
    cy.wrap({ getNum: fn }).its('getNum').should('be.a', 'function');
    // 发起请求
    let data = generateData()
    cy.request({
      method: 'POST',
      url: '/v2/pet',
      headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
      body: data
    }).its('body').should('deep.equal', data);
    cy.log('test end');
  })

  it.skip('测试screenshot截图', () => {
    // 默认会在当前文件夹下新建一个screetshot目录
    cy.screenshot();
  })

  it('测试setCookie设置cookie', () => {
    cy.getCookies().should('be.empty')
    cy.setCookie('session_id', '189jd09sufh33aaiidhf99d09')
    cy.getCookie('session_id').should(
      'have.property',
      'value',
      '189jd09sufh33aaiidhf99d09'
    );
    cy.clearCookie('session_id');
  })
  
  it('测试wait(单位: 毫秒)', () => {
    cy.wait(5000).then(() => {
      let data = generateData()
      cy.login(data);
    });
  })
  
  it('测试wrap解析参数', () => {
    // 生成传递给.wrap()的对象, 如果对象是一个promise，则给出它解析后的值
    cy.wrap({ name: 'Jane Lane' });
    cy.wrap({ name: 'Jane Lane' }).its('name').should('eq', 'Jane Lane');
    cy.wrap(['Wai Yan', 'Yu']).its(1).should('eq', 'Yu');

    // 在wrap中调用主题上的函数并返回新值
    const getName = () => {
      return 'Jane Lane'
    };
    cy.wrap({ name: getName }).invoke('name').should('eq', 'Jane Lane');

  })

  // it('测试exec执行系统命令', () => {
  //   cy.exec('ls -l').then(res => {
  //     console.log(res);
  //   });
  // })

  it('测试Cypress.platform操作系统类型', ()=> {
    const currentPlatform = Cypress.platform;
    console.log(currentPlatform); // 返回当前操作系统 ->darwin
    console.log(Cypress.spec); // 返回当前测试属性
    console.log(Cypress.version); // 返回当前测试版本 -> 7.2.0
  })

  it('输入合法的数据，可以成功添加宠物,检查部分数据', () => {
    let data = generateData()
    cy.request({
      method: 'POST',
      url: '/v2/pet',
      headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
      body: data
    }).then(res => {
      expect(res).property('body').property('id').equal(data.id)
      expect(res).property('body').property('name').equal(data.name)
    });
  })
  
  it('输入合法的数据，可以成功添加宠物,检查整个对象', () => {
    let data = generateData()
    cy.request({
      method: 'POST',
      url: '/v2/pet',
      headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
      body: data
    }).its('body').should('deep.equal', data)
  });

  after('后置脚本', () => {
    console.log('------ end ------');
    cy.after();
  })
})
