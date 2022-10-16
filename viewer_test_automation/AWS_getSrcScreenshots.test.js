const webdriver = require('selenium-webdriver');
const { until, By } = require('selenium-webdriver')
require('chromedriver')
const fs = require('fs')
const FLAG = {
    MODEL: {
        CAD: '&startmodel=cad',
        ORIGINAL: '&startmodel=original',
    },
    CAMERA: {
        TOPDOWN: '&camera=topdown',
        OVERVIEW:'&camera=overview',
    },
    CLIPPING: {
        TRUE: '&clipping-plane=true',
        FALSE:'&clipping-plane=false',
    },
    PIXEL: '&is-dynamic-pixel-ratio=0',
    ROTATION: '&autospindirection=none',
    UI_OFF: '&disable-ui'
}
const BASE_PATH = './viewer_test_automation/src'
const IT_TEST_TIMEOUT = 120_000
const HOOK_TIMEOUT = 10_000
const AWS = require("aws-sdk");
const PROJECT_ARN = "arn:aws:devicefarm:us-west-2:639852371701:testgrid-project:5de83a68-97db-42f9-a41e-26373447dbfa"
let driver
let domain

describe('Viewer testing by screenshots', () => {
    jest.setTimeout(100_000)
    beforeAll(async () => {
        const devicefarm = new AWS.DeviceFarm({ region: "us-west-2" })
        const testGridUrlResult = await devicefarm.createTestGridUrl({
                projectArn: PROJECT_ARN,
                expiresInSeconds: 600
            }).promise();
        driver = await new webdriver.Builder()
            .usingServer(testGridUrlResult.url)
            .withCapabilities({ browserName: 'chrome' })
            .build()
        await driver.manage().window().setRect({x: 0, y: 0, width: 1_000, height: 1_000})
    })

    afterAll(async () => {
        await driver.quit()
    })
    afterEach(async () => {
        driver.manage().getCookies()
            .then((cookies) => {
                driver.manage().deleteAllCookies();
            })
            .catch((cookies) => {
                driver.manage().deleteAllCookies();
            })
    })

    it('model=cad | camera=topdown | clipping=false', async () => {
        const FILE_NAME = 'c_t_f'
        domain = 'https://canvas.io/viewer/Y8CkkiXi?' + FLAG.MODEL.CAD + FLAG.CAMERA.TOPDOWN + FLAG.PIXEL + FLAG.ROTATION + FLAG.CLIPPING.FALSE + FLAG.UI_OFF

        await driver.get(domain)
        await driver.wait(until.elementLocated(By.css('div.viewer-constraint')))
        await driver.sleep(1000)

        await fs.writeFile(`${BASE_PATH}/${FILE_NAME}_expect.png`, await driver.takeScreenshot(), 'base64', (err) => {
                return console.log('Got screenshot ' + FILE_NAME)
            })
    }, IT_TEST_TIMEOUT)

    it('model=cad | camera=topdown | clipping=true', async () => {
        const FILE_NAME = 'c_t_t'
        domain = 'https://canvas.io/viewer/Y8CkkiXi?' + FLAG.MODEL.CAD + FLAG.CAMERA.TOPDOWN + FLAG.PIXEL + FLAG.ROTATION + FLAG.CLIPPING.TRUE + FLAG.UI_OFF

        await driver.get(domain)
        await driver.wait(until.elementLocated(By.css('div.viewer-constraint')))
        await driver.sleep(1000)

        await fs.writeFile(`${BASE_PATH}/${FILE_NAME}_expect.png`, await driver.takeScreenshot(), 'base64', (err) => {
            return console.log('Got screenshot ' + FILE_NAME)
        })
    }, IT_TEST_TIMEOUT)

    it('model=cad | camera=overview | clipping=true', async () => {
        const FILE_NAME = 'c_o_t'
        domain = 'https://canvas.io/viewer/Y8CkkiXi?' + FLAG.MODEL.CAD + FLAG.CAMERA.OVERVIEW + FLAG.PIXEL + FLAG.ROTATION + FLAG.CLIPPING.TRUE + FLAG.UI_OFF

        await driver.get(domain)
        await driver.wait(until.elementLocated(By.css('div.viewer-constraint')))
        await driver.sleep(1000)

        await fs.writeFile(`${BASE_PATH}/${FILE_NAME}_expect.png`, await driver.takeScreenshot(), 'base64', (err) => {
                return console.log('Got screenshot ' + FILE_NAME)
            })
    }, IT_TEST_TIMEOUT)

    it('model=cad | camera=overview | clipping=false', async () => {
        const FILE_NAME = 'c_o_f'
        domain = 'https://canvas.io/viewer/Y8CkkiXi?' + FLAG.MODEL.CAD + FLAG.CAMERA.OVERVIEW + FLAG.PIXEL + FLAG.ROTATION + FLAG.CLIPPING.FALSE + FLAG.UI_OFF

        await driver.get(domain)
        await driver.wait(until.elementLocated(By.css('div.viewer-constraint')))
        await driver.sleep(1000)

        await fs.writeFile(`${BASE_PATH}/${FILE_NAME}_expect.png`, await driver.takeScreenshot(), 'base64', (err) => {
                return console.log('Got screenshot ' + FILE_NAME)
            })
    }, IT_TEST_TIMEOUT)

    it('model=original | camera=overview | clipping=false', async () => {
        const FILE_NAME = 'o_o_f'
        domain = 'https://canvas.io/viewer/Y8CkkiXi?' + FLAG.MODEL.ORIGINAL + FLAG.CAMERA.OVERVIEW + FLAG.PIXEL + FLAG.ROTATION + FLAG.CLIPPING.FALSE + FLAG.UI_OFF

        await driver.get(domain)
        await driver.wait(until.elementLocated(By.css('div.viewer-constraint')))
        await driver.sleep(1000)

        await fs.writeFile(`${BASE_PATH}/${FILE_NAME}_expect.png`, await driver.takeScreenshot(), 'base64', (err) => {
                return console.log('Got screenshot ' + FILE_NAME)
            })
    }, IT_TEST_TIMEOUT)

    it('model=original | camera=topdown | clipping=false', async () => {
        const FILE_NAME = 'o_t_f'
        domain ='https://canvas.io/viewer/Y8CkkiXi?' + FLAG.MODEL.ORIGINAL + FLAG.CAMERA.TOPDOWN + FLAG.PIXEL + FLAG.ROTATION + FLAG.CLIPPING.FALSE + FLAG.UI_OFF

        await driver.get(domain)
        await driver.wait(until.elementLocated(By.css('div.viewer-constraint')))
        await driver.sleep(1000)

        await fs.writeFile(`${BASE_PATH}/${FILE_NAME}_expect.png`, await driver.takeScreenshot(), 'base64', (err) => {
                return console.log('Got screenshot ' + FILE_NAME)
            })
    }, IT_TEST_TIMEOUT)
})

