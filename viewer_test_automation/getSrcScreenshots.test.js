// const { VIEW_MODE } = require('/constants')
const {By, Key, Builder, Capabilities, until} = require('selenium-webdriver')
require('chromedriver')
const fs = require('fs')
let domain
const FLAG = {
    MODEL: {
        CAD: '&startmodel=cad',
        ORIGINAL: '&startmodel=original'
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
    // UI_OFF: '&disable-ui'
}
const BASE_PATH = './viewer_test_automation/src'
const BROWSERSTACK_RESPONSES = {
    passed: 'passed',
    failed: 'failed'
}
const IT_TEST_TIMEOUT = 30_000
let driver



describe('Get Source Screenshots', () => {
    beforeEach(async () => {
        domain = 'https://canvas.io/viewer/Y8CkkiXi?'
        driver = await new Builder().forBrowser('chrome').
        usingServer('http://romankorovko_zyWgKA:tLx4WFYiqvzoDzFRVqyS@hub-cloud.browserstack.com/wd/hub').
        build()
        await driver.manage().window().setRect({x: 0, y: 0, width: 1_000, height: 1_000})
    })

    afterEach(async () => {
        await driver.quit()
    })

    it('model=cad | camera=topdown | clipping=false', async () => {
        const FILE_NAME = 'c_t_f'
        const result = {
            action: 'setSessionStatus',
            arguments: {
                status: BROWSERSTACK_RESPONSES.passed,
                reason: `Got ${FILE_NAME} source screenshot`
            }
        }
        try {
            driver.executeScript('browserstack_executor: {"action": "setSessionName", "arguments": {"name": "getSrcScreenshots: model=cad | camera=topdown | clipping=false"}}')
            domain += FLAG.MODEL.CAD + FLAG.CAMERA.TOPDOWN + FLAG.PIXEL + FLAG.ROTATION + FLAG.CLIPPING.FALSE

            await driver.get(domain)
            await driver.wait(until.elementLocated(By.css('span.model-mode')))
            await driver.sleep(2000)

            await fs.writeFile(`${BASE_PATH}/${FILE_NAME}_expect.png`, await driver.takeScreenshot(), 'base64', (err) => {
                return console.log('Got screenshot ' + FILE_NAME)
            })
            await driver.sleep(2000)
            driver.executeScript('browserstack_executor:' + JSON.stringify(result))
        } catch (e) {
            result.arguments.status = BROWSERSTACK_RESPONSES.failed
            result.arguments.reason = `${FILE_NAME}, ${e}`
            driver.executeScript('browserstack_executor:' + JSON.stringify(result))
        }
    }, IT_TEST_TIMEOUT)

    it('model=cad | camera=topdown | clipping=true', async () => {
        const FILE_NAME = 'c_t_t'
        const result = {
            action: 'setSessionStatus',
            arguments: {
                status: BROWSERSTACK_RESPONSES.passed,
                reason: `Got ${FILE_NAME} source screenshot`
            }
        }
        try {
            driver.executeScript('browserstack_executor: {"action": "setSessionName", "arguments": {"name": "getSrcScreenshots: model=cad | camera=topdown | clipping=true"}}')
            domain += FLAG.MODEL.CAD + FLAG.CAMERA.TOPDOWN + FLAG.PIXEL + FLAG.ROTATION + FLAG.CLIPPING.TRUE

            await driver.get(domain)
            await driver.wait(until.elementLocated(By.css('span.model-mode')))
            await driver.sleep(2000)

            await fs.writeFile(`${BASE_PATH}/${FILE_NAME}_expect.png`, await driver.takeScreenshot(), 'base64', (err) => {
                return console.log('Got screenshot ' + FILE_NAME)
            })
            await driver.sleep(2000)
            driver.executeScript('browserstack_executor:' + JSON.stringify(result))
        } catch (e) {
            result.arguments.status = BROWSERSTACK_RESPONSES.failed
            result.arguments.reason = `${FILE_NAME}, ${e}`
            driver.executeScript('browserstack_executor:' + JSON.stringify(result))
        }
    }, IT_TEST_TIMEOUT)

    it('model=cad | camera=overview | clipping=true', async () => {
        const FILE_NAME = 'c_o_t'
        const result = {
            action: 'setSessionStatus',
            arguments: {
                status: BROWSERSTACK_RESPONSES.passed,
                reason: `Got ${FILE_NAME} source screenshot`
            }
        }
        try {
            driver.executeScript('browserstack_executor: {"action": "setSessionName", "arguments": {"name": "getSrcScreenshots: model=cad | camera=overview | clipping=true"}}')
            domain += FLAG.MODEL.CAD + FLAG.CAMERA.OVERVIEW + FLAG.PIXEL + FLAG.ROTATION + FLAG.CLIPPING.TRUE

            await driver.get(domain)
            await driver.wait(until.elementLocated(By.css('span.model-mode')))
            await driver.sleep(2000)

            await fs.writeFile(`${BASE_PATH}/${FILE_NAME}_expect.png`, await driver.takeScreenshot(), 'base64', (err) => {
                return console.log('Got screenshot ' + FILE_NAME)
            })
            await driver.sleep(2000)
            driver.executeScript('browserstack_executor:' + JSON.stringify(result))
        } catch (e) {
            result.arguments.status = BROWSERSTACK_RESPONSES.failed
            result.arguments.reason = `${FILE_NAME}, ${e}`
            driver.executeScript('browserstack_executor:' + JSON.stringify(result))
        }
    }, IT_TEST_TIMEOUT)

    it('model=cad | camera=overview | clipping=false', async () => {
        const FILE_NAME = 'c_o_f'
        const result = {
            action: 'setSessionStatus',
            arguments: {
                status: BROWSERSTACK_RESPONSES.passed,
                reason: `Got ${FILE_NAME} source screenshot`
            }
        }
        try {
            driver.executeScript('browserstack_executor: {"action": "setSessionName", "arguments": {"name": "getSrcScreenshots: model=cad | camera=overview | clipping=false"}}')
            domain += FLAG.MODEL.CAD + FLAG.CAMERA.OVERVIEW + FLAG.PIXEL + FLAG.ROTATION + FLAG.CLIPPING.FALSE

            await driver.get(domain)
            await driver.wait(until.elementLocated(By.css('span.model-mode')))
            await driver.sleep(2000)

            await fs.writeFile(`${BASE_PATH}/${FILE_NAME}_expect.png`, await driver.takeScreenshot(), 'base64', (err) => {
                return console.log('Got screenshot ' + FILE_NAME)
            })
            await driver.sleep(2000)
            driver.executeScript('browserstack_executor:' + JSON.stringify(result))
        } catch (e) {
            result.arguments.status = BROWSERSTACK_RESPONSES.failed
            result.arguments.reason = `${FILE_NAME}, ${e}`
            driver.executeScript('browserstack_executor:' + JSON.stringify(result))

        }
    }, IT_TEST_TIMEOUT)

    it('model=original | camera=overview | clipping=false', async () => {
        const FILE_NAME = 'o_o_f'
        const result = {
            action: 'setSessionStatus',
            arguments: {
                status: BROWSERSTACK_RESPONSES.passed,
                reason: `Got ${FILE_NAME} source screenshot`
            }
        }
        try {
            driver.executeScript('browserstack_executor: {"action": "setSessionName", "arguments": {"name": "getSrcScreenshots: model=original | camera=overview | clipping=false"}}')
            domain += FLAG.MODEL.ORIGINAL + FLAG.CAMERA.OVERVIEW + FLAG.PIXEL + FLAG.ROTATION + FLAG.CLIPPING.FALSE

            await driver.get(domain)
            await driver.wait(until.elementLocated(By.css('span.model-mode')))
            await driver.sleep(2000)

            await fs.writeFile(`${BASE_PATH}/${FILE_NAME}_expect.png`, await driver.takeScreenshot(), 'base64', (err) => {
                return console.log('Got screenshot ' + FILE_NAME)
            })
            await driver.sleep(2000)
            driver.executeScript('browserstack_executor:' + JSON.stringify(result))
        } catch (e) {
            result.arguments.status = BROWSERSTACK_RESPONSES.failed
            result.arguments.reason = `${FILE_NAME}, ${e}`
            driver.executeScript('browserstack_executor:' + JSON.stringify(result))
        }
    }, IT_TEST_TIMEOUT)

    it('model=original | camera=topdown | clipping=false', async () => {
        const FILE_NAME = 'o_t_f'
        const result = {
            action: 'setSessionStatus',
            arguments: {
                status: BROWSERSTACK_RESPONSES.passed,
                reason: `Got ${FILE_NAME} source screenshot`
            }
        }
        try {
            driver.executeScript('browserstack_executor: {"action": "setSessionName", "arguments": {"name": "getSrcScreenshots: model=original | camera=topdown | clipping=false"}}')
            domain += FLAG.MODEL.ORIGINAL + FLAG.CAMERA.TOPDOWN + FLAG.PIXEL + FLAG.ROTATION + FLAG.CLIPPING.FALSE

            await driver.get(domain)
            await driver.wait(until.elementLocated(By.css('span.model-mode')))
            await driver.sleep(2000)

            await fs.writeFile(`${BASE_PATH}/${FILE_NAME}_expect.png`, await driver.takeScreenshot(), 'base64', (err) => {
                return console.log('Got screenshot ' + FILE_NAME)
            })
            await driver.sleep(2000)
            driver.executeScript('browserstack_executor:' + JSON.stringify(result))
        } catch (e) {
            result.arguments.status = BROWSERSTACK_RESPONSES.failed
            result.arguments.reason = `${FILE_NAME}, ${e}`
            driver.executeScript('browserstack_executor:' + JSON.stringify(result))

        }
    }, IT_TEST_TIMEOUT)

})

