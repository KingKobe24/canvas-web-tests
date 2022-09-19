require('dotenv').config()
const {By, Key, Builder, Capabilities, until} = require('selenium-webdriver')
require('chromedriver')
const fs = require('fs')
const PNG = require('pngjs').PNG
const pixelmatch = require('pixelmatch')
let numDiffPixels
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
}
const BASE_PATH = './viewer_test_automation/src'
const BROWSERSTACK_RESPONSES = {
    passed: 'passed',
    failed: 'failed'
}
const PIXEL_THRESHOLD = 80
const IT_TEST_TIMEOUT = 30_000
let driver

describe('Viewer testing by screenshots', () => {

    beforeEach(async () => {
        domain = 'https://canvas.io/viewer/Y8CkkiXi?'
        driver = await new Builder().forBrowser('chrome').build()
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
                reason: `${FILE_NAME} models matched!`
            }
        }
        try {
            driver.executeScript('browserstack_executor: {"action": "setSessionName", "arguments": {"name": "VIEWER: model=cad | camera=topdown | clipping=false"}}')
            domain += FLAG.MODEL.CAD + FLAG.CAMERA.TOPDOWN + FLAG.PIXEL + FLAG.ROTATION + FLAG.CLIPPING.FALSE

            await driver.get(domain)
            await driver.wait(until.elementLocated(By.css('span.model-mode')))
            await driver.sleep(2000)

            await fs.writeFile(`${BASE_PATH}/screenshots/${FILE_NAME}.png`, await driver.takeScreenshot(), 'base64', (err) => {
                return console.log('Got screenshot ' + FILE_NAME)
            })
            await driver.sleep(2000)
            const {data, width, height} = PNG.sync.read(fs.readFileSync(`${BASE_PATH}/screenshots/${FILE_NAME}.png`))
            const {data: expectData} = PNG.sync.read(fs.readFileSync(`${BASE_PATH}/${FILE_NAME}_expect.png`))
            const {data: diffData} = new PNG({width, height})
            await driver.sleep(2000)

            numDiffPixels = pixelmatch(data, expectData, diffData, width, height, {threshold: 0.2})
            console.log(numDiffPixels);

            if (numDiffPixels > PIXEL_THRESHOLD) {
                result.arguments.status = BROWSERSTACK_RESPONSES.failed
                result.arguments.reason = `${FILE_NAME}: ${numDiffPixels} pixels are different!`
            }
        } catch (e) {
            result.arguments.status = BROWSERSTACK_RESPONSES.failed
            result.arguments.reason = `${FILE_NAME}, ${e}`
        } finally {
            driver.executeScript('browserstack_executor:' + JSON.stringify(result))
            expect(numDiffPixels).toBeLessThanOrEqual(PIXEL_THRESHOLD)
        }
    }, IT_TEST_TIMEOUT)

    it('model=cad | camera=topdown | clipping=true', async () => {
        const FILE_NAME = 'c_t_t'
        const result = {
            action: 'setSessionStatus',
            arguments: {
                status: BROWSERSTACK_RESPONSES.passed,
                reason: `${FILE_NAME} models matched!`
            }
        }
        try {
            driver.executeScript('browserstack_executor: {"action": "setSessionName", "arguments": {"name": "VIEWER: model=cad | camera=topdown | clipping=true"}}')

            domain += FLAG.MODEL.CAD + FLAG.CAMERA.TOPDOWN + FLAG.PIXEL + FLAG.ROTATION + FLAG.CLIPPING.TRUE

            await driver.get(domain)
            await driver.wait(until.elementLocated(By.css('span.model-mode')))
            await driver.sleep(2000)

            await fs.writeFile(`${BASE_PATH}/screenshots/${FILE_NAME}.png`, await driver.takeScreenshot(), 'base64', (err) => {
                return console.log('Got screenshot ' + FILE_NAME)
            })

            await driver.sleep(2000)
            const {data, width, height} = PNG.sync.read(fs.readFileSync(`${BASE_PATH}/screenshots/${FILE_NAME}.png`))
            const {data: expectData} = PNG.sync.read(fs.readFileSync(`${BASE_PATH}/${FILE_NAME}_expect.png`))
            const {data: diffData} = new PNG({width, height})
            await driver.sleep(2000)

            const numDiffPixels = pixelmatch(data, expectData, diffData, width, height, {threshold: 0.2})
            console.log(numDiffPixels);

            if (numDiffPixels > PIXEL_THRESHOLD) {
                result.arguments.status = BROWSERSTACK_RESPONSES.failed
                result.arguments.reason = `${FILE_NAME}: ${numDiffPixels} pixels are different!`
            }
        } catch (e) {
            result.arguments.status = BROWSERSTACK_RESPONSES.failed
            result.arguments.reason = `${FILE_NAME}, ${e}`
        } finally {
            driver.executeScript('browserstack_executor:' + JSON.stringify(result))
            expect(numDiffPixels).toBeLessThanOrEqual(PIXEL_THRESHOLD)
        }
    }, IT_TEST_TIMEOUT)

    it('model=cad | camera=overview | clipping=true', async () => {
        const FILE_NAME = 'c_o_t'
        const result = {
            action: 'setSessionStatus',
            arguments: {
                status: BROWSERSTACK_RESPONSES.passed,
                reason: `${FILE_NAME} models matched!`
            }
        }

        try {
            driver.executeScript('browserstack_executor: {"action": "setSessionName", "arguments": {"name": "VIEWER: model=cad | camera=overview | clipping=true"}}')

            domain += FLAG.MODEL.CAD + FLAG.CAMERA.OVERVIEW + FLAG.PIXEL + FLAG.ROTATION + FLAG.CLIPPING.TRUE

            await driver.get(domain)
            await driver.wait(until.elementLocated(By.css('span.model-mode')))
            await driver.sleep(2000)

            await fs.writeFile(`${BASE_PATH}/screenshots/${FILE_NAME}.png`, await driver.takeScreenshot(), 'base64', (err) => {
                return console.log('Got screenshot ' + FILE_NAME)
            })

            await driver.sleep(2000)
            const {data, width, height} = PNG.sync.read(fs.readFileSync(`${BASE_PATH}/screenshots/${FILE_NAME}.png`))
            const {data: expectData} = PNG.sync.read(fs.readFileSync(`${BASE_PATH}/${FILE_NAME}_expect.png`))
            const {data: diffData} = new PNG({width, height})
            await driver.sleep(2000)

            const numDiffPixels = pixelmatch(data, expectData, diffData, width, height, {threshold: 0.2})
            console.log(numDiffPixels);

            if (numDiffPixels > PIXEL_THRESHOLD) {
                result.arguments.status = BROWSERSTACK_RESPONSES.failed
                result.arguments.reason = `${FILE_NAME}: ${numDiffPixels} pixels are different!`
            }
        } catch (e) {
            result.arguments.status = BROWSERSTACK_RESPONSES.failed
            result.arguments.reason = `${FILE_NAME}, ${e}`
        } finally {
            driver.executeScript('browserstack_executor:' + JSON.stringify(result))
            expect(numDiffPixels).toBeLessThanOrEqual(PIXEL_THRESHOLD)
        }
    }, IT_TEST_TIMEOUT)

    it('model=cad | camera=overview | clipping=false', async () => {
        const FILE_NAME = 'c_o_f'
        const result = {
            action: 'setSessionStatus',
            arguments: {
                status: BROWSERSTACK_RESPONSES.passed,
                reason: `${FILE_NAME} models matched!`
            }
        }

        try {
            driver.executeScript('browserstack_executor: {"action": "setSessionName", "arguments": {"name": "VIEWER: model=cad | camera=overview | clipping=false"}}')

            domain += FLAG.MODEL.CAD + FLAG.CAMERA.OVERVIEW + FLAG.PIXEL + FLAG.ROTATION + FLAG.CLIPPING.FALSE

            await driver.get(domain)
            await driver.wait(until.elementLocated(By.css('span.model-mode')))
            await driver.sleep(2000)

            await fs.writeFile(`${BASE_PATH}/screenshots/${FILE_NAME}.png`, await driver.takeScreenshot(), 'base64', (err) => {
                return console.log('Got screenshot ' + FILE_NAME)
            })

            await driver.sleep(2000)
            const {data, width, height} = PNG.sync.read(fs.readFileSync(`${BASE_PATH}/screenshots/${FILE_NAME}.png`))
            const {data: expectData} = PNG.sync.read(fs.readFileSync(`${BASE_PATH}/${FILE_NAME}_expect.png`))
            const {data: diffData} = new PNG({width, height})
            await driver.sleep(2000)

            const numDiffPixels = pixelmatch(data, expectData, diffData, width, height, {threshold: 0.2})
            console.log(numDiffPixels);

            if (numDiffPixels > PIXEL_THRESHOLD) {
                result.arguments.status = BROWSERSTACK_RESPONSES.failed
                result.arguments.reason = `${FILE_NAME}: ${numDiffPixels} pixels are different!`
            }
        } catch (e) {
            result.arguments.status = BROWSERSTACK_RESPONSES.failed
            result.arguments.reason = `${FILE_NAME}, ${e}`
        } finally {
            driver.executeScript('browserstack_executor:' + JSON.stringify(result))
            expect(numDiffPixels).toBeLessThanOrEqual(PIXEL_THRESHOLD)
        }
    }, IT_TEST_TIMEOUT)

    it('model=original | camera=overview | clipping=false', async () => {
        const FILE_NAME = 'o_o_f'
        const result = {
            action: 'setSessionStatus',
            arguments: {
                status: BROWSERSTACK_RESPONSES.passed,
                reason: `${FILE_NAME} models matched!`
            }
        }

        try {
            driver.executeScript('browserstack_executor: {"action": "setSessionName", "arguments": {"name": "VIEWER: model=original | camera=overview | clipping=false"}}')

            domain += FLAG.MODEL.ORIGINAL + FLAG.CAMERA.OVERVIEW + FLAG.PIXEL + FLAG.ROTATION + FLAG.CLIPPING.FALSE

            await driver.get(domain)
            await driver.wait(until.elementLocated(By.css('span.model-mode')))
            await driver.sleep(2000)

            await fs.writeFile(`${BASE_PATH}/screenshots/${FILE_NAME}.png`, await driver.takeScreenshot(), 'base64', (err) => {
                return console.log('Got screenshot ' + FILE_NAME)
            })

            await driver.sleep(2000)
            const {data, width, height} = PNG.sync.read(fs.readFileSync(`${BASE_PATH}/screenshots/${FILE_NAME}.png`))
            const {data: expectData} = PNG.sync.read(fs.readFileSync(`${BASE_PATH}/${FILE_NAME}_expect.png`))
            const {data: diffData} = new PNG({width, height})
            await driver.sleep(2000)

            const numDiffPixels = pixelmatch(data, expectData, diffData, width, height, {threshold: 0.2})
            console.log(numDiffPixels);

            if (numDiffPixels > PIXEL_THRESHOLD) {
                result.arguments.status = BROWSERSTACK_RESPONSES.failed
                result.arguments.reason = `${FILE_NAME}: ${numDiffPixels} pixels are different!`
            }
        } catch (e) {
            result.arguments.status = BROWSERSTACK_RESPONSES.failed
            result.arguments.reason = `${FILE_NAME}, ${e}`
        } finally {
            driver.executeScript('browserstack_executor:' + JSON.stringify(result))
            expect(numDiffPixels).toBeLessThanOrEqual(PIXEL_THRESHOLD)
        }
    }, IT_TEST_TIMEOUT)

    it('model=original | camera=topdown | clipping=false', async () => {
        const FILE_NAME = 'o_t_f'
        const result = {
            action: 'setSessionStatus',
            arguments: {
                status: BROWSERSTACK_RESPONSES.passed,
                reason: `${FILE_NAME} models matched!`
            }
        }

        try {
            driver.executeScript('browserstack_executor: {"action": "setSessionName", "arguments": {"name": "VIEWER: model=original | camera=topdown | clipping=false"}}')

            domain += FLAG.MODEL.ORIGINAL + FLAG.CAMERA.TOPDOWN + FLAG.PIXEL + FLAG.ROTATION + FLAG.CLIPPING.FALSE

            await driver.get(domain)
            await driver.wait(until.elementLocated(By.css('span.model-mode')))
            await driver.sleep(2000)

            await fs.writeFile(`${BASE_PATH}/screenshots/${FILE_NAME}.png`, await driver.takeScreenshot(), 'base64', (err) => {
                return console.log('Got screenshot ' + FILE_NAME)
            })

            await driver.sleep(2000)
            const {data, width, height} = PNG.sync.read(fs.readFileSync(`${BASE_PATH}/screenshots/${FILE_NAME}.png`))
            const {data: expectData} = PNG.sync.read(fs.readFileSync(`${BASE_PATH}/${FILE_NAME}_expect.png`))
            const {data: diffData} = new PNG({width, height})
            await driver.sleep(2000)

            const numDiffPixels = pixelmatch(data, expectData, diffData, width, height, {threshold: 0.2})
            console.log(numDiffPixels);

            if (numDiffPixels > PIXEL_THRESHOLD) {
                result.arguments.status = BROWSERSTACK_RESPONSES.failed
                result.arguments.reason = `${FILE_NAME}: ${numDiffPixels} pixels are different!`
            }
        } catch (e) {
            result.arguments.status = BROWSERSTACK_RESPONSES.failed
            result.arguments.reason = `${FILE_NAME}, ${e}`
        } finally {
            driver.executeScript('browserstack_executor:' + JSON.stringify(result))
            expect(numDiffPixels).toBeLessThanOrEqual(PIXEL_THRESHOLD)
        }
    }, IT_TEST_TIMEOUT)

})

