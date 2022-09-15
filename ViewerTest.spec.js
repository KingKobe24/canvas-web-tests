const {By, Key, Builder, Capabilities, until} = require('selenium-webdriver')
require('chromedriver')
require('jest')
const fs = require('fs')
const PNG = require('pngjs').PNG
const pixelmatch = require('pixelmatch')

let domain = 'https://canvas.io/viewer/Y8CkkiXi?'
const _FLAG_MODEL = '&startmodel=cad'
const _FLAG_CAMERA = '&camera=topdown'
const _FLAG_PIXEL = '&is-dynamic-pixel-ratio=0'
const _FLAG_ROTATION = '&autospindirection=none'
const _FLAG_CLIPPING = '&clipping-plane=false'
let driver

describe('Viewer testing by screenshots', () => {
    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build()
        await driver.manage().window().setRect({x: 0, y: 0, width: 1000, height: 1000})
    })
    afterEach(async () => {
        await driver.quit()
        console.log('дошел не')
    })
    it('Checkout CAD with camera Topdown', async () => {
        domain +=_FLAG_MODEL + _FLAG_CAMERA + _FLAG_PIXEL + _FLAG_ROTATION + _FLAG_CLIPPING
        await driver.get(domain)
        await driver.sleep(10000)
        driver.takeScreenshot().then(
            function (image, err) {
                require('fs').writeFile('test_img.png', image, 'base64', function (err) {
                    if (err === null) return console.log('Success')
                    else console.log('Failed getting screenshot')
                });
            }
        );

        await driver.sleep(2000)
        const _TEST_IMG = PNG.sync.read(fs.readFileSync('./test_img.png'))
        const _EXCEPT_IMG = PNG.sync.read(fs.readFileSync('./test_except.png'))
        const {width, height} = _TEST_IMG
        const diff = new PNG({width, height})

        const numDiffPixels = pixelmatch(_TEST_IMG.data, _EXCEPT_IMG.data, diff.data, width, height, {threshold: 0.1})
        console.log(numDiffPixels)

        return expect(numDiffPixels).toBeLessThanOrEqual(10)
    })
    // it('Checkout CAD with camera Topdown', async () => {
    //     domain +=_FLAG_MODEL + _FLAG_CAMERA + _FLAG_PIXEL + _FLAG_ROTATION + _FLAG_CLIPPING
    //     await driver.get(domain)
    //     await driver.sleep(10000)
    //     driver.takeScreenshot().then(
    //         function (image, err) {
    //             require('fs').writeFile('test_img.png', image, 'base64', function (err) {
    //                 if (err === null) return console.log('Success')
    //                 else console.log('Failed getting screenshot')
    //             });
    //         }
    //     );
    //
    //     await driver.sleep(2000)
    //     const _TEST_IMG = PNG.sync.read(fs.readFileSync('./test_img.png'))
    //     const _EXCEPT_IMG = PNG.sync.read(fs.readFileSync('./test_except.png'))
    //     const {width, height} = _TEST_IMG
    //     const diff = new PNG({width, height})
    //
    //     const numDiffPixels = pixelmatch(_TEST_IMG.data, _EXCEPT_IMG.data, diff.data, width, height, {threshold: 0.1})
    //     console.log(numDiffPixels)
    //
    //     return expect(numDiffPixels).toBeLessThanOrEqual(10)
    // }, 300000)
})





