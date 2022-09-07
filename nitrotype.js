// const {chromium, devices, expect} = require('playwright');
const { expect, test, devices, chromium } = require('@playwright/test');


(async () => {
  // Setup
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  // const context = await browser.newContext({...iPhone});
  const page = await browser.newPage();

  const url = 'https://www.nitrotype.com/race'
  // The actual interesting bit
  // await context.route('**/*.{png,jpg,jpeg}', route => route.abort());
  await page.goto(url);

  // const orderSent = page.locator('.data-ttcopy="Type this text! Go go go!"');
  // await orderSent.waitFor();

  await page.waitForSelector('div.dash-copyContainer');
  await page.waitForTimeout(5000);

  const textSelector = '#raceContainer > div.racev3-ui > div.dash.dash--o > div.dash-content > div.dash-center > div.dash-copyContainer > div';

  const text = await page.$eval(textSelector, el => el.textContent)

  console.log(text);
  const whitespaceRe = /\s/;
  function isWhitespace(c) {
    return whitespaceRe.test(c);
  }

  for (let key of text) {
    if (isWhitespace(key))
      await page.keyboard.press('Space')
    else
      await page.keyboard.press(key)

  }
}
  // Teardown
  //await context.close();
  //await browser.close();
)()