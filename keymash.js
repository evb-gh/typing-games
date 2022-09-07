const { chromium } = require('playwright');

function isWhitespace(c) {
    const whitespaceRe = /\s/;
    return whitespaceRe.test(c);
}

function isNewLine(c) {
    return c === '\n';
}

// temp mail password: 'bZvC.,vk'
const login = {password: '!q8JVcg6u?', email: 'sjvpuqps@emergentvillage.org'};

(async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 125 });
    const page = await browser.newPage();

    const url = 'https://keymash.io'
    await page.goto(url);

    // #pw-oop-bottom_rail > div:nth-child(2)
    const adPopUp = page.locator('#pw-oop-bottom_rail > div:nth-child(2)')
    await adPopUp.click();

    // #rcc-confirm-button
    const rcc = page.locator('#rcc-confirm-button')
    await rcc.click();
    
    const signIn = page.locator('a:has-text("Sign In")');
    await signIn.click();
    
    await page.waitForSelector('form[method="post"]');
    await page.locator('input[type=email]').fill(login.email);
    await page.locator('input[type=password]').fill(login.password);
    await page.locator('button[type="submit"]').click();

    // main >> button:nth-child(1)
    //button:has-text("Random")
    const playRandom = page.locator('button:has-text("Random")');
    await playRandom.click();

    await page.waitForSelector('#countdownTimer', {state: 'attached'})
    await page.waitForSelector('#countdownTimer', {state: 'detached'})


    const text = await page.locator('.match--container').innerText();
    console.log(text.length);

    for (let key of text) {
        if (isWhitespace(key))
            await page.keyboard.press('Space')
        else
            await page.keyboard.press(key)

    }
    
    
    // Teardown
    // await browser.close();
})();