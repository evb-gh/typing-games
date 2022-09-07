const { chromium } = require('playwright');

function isWhitespace(c) {
    const whitespaceRe = /\s/;
    return whitespaceRe.test(c);
}

function isNewLine(c) {
    return c === '\n';
}

(async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 150 });
    const page = await browser.newPage();

    const url = 'https://monkeytype.com/'
    await page.goto(url);

    const cookiePopup = page.locator('#cookiePopup > div.main > div.buttons > div.button.active.acceptAll');
    await cookiePopup.click();
    
    const badBanner = page.locator('#\\31  > div > div.closeButton');
    await badBanner.click();

    const godBanner = page.locator('#\\30  > div > div.closeButton');
    await godBanner.click();
    
    const selectWords = page.locator('#top >> text=words');
    await selectWords.click();

    const hundredWords = page.locator('#top >> text=100')
    await hundredWords.click();
    
    // await page.keyboard.press('Space');

    await page.waitForSelector('#words');
    const words = page.locator('#words');
    const text = await words.evaluate(word => word.innerText);
    console.log(text.length);

    for (let key of text) {
        if (isNewLine(key))
            await page.keyboard.press('Space')
        else
            await page.keyboard.press(key)

    }
    
    const wpm = await page.locator('#result > div.stats.morestats > div.group.raw > div.bottom').innerText();
    
    console.log(`Your wrote ${wpm} words in one minute.`);
    // Teardown
    await browser.close();
})()
