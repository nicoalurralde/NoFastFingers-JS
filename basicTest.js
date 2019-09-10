const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch(
    {
        headless: false,
        slowMo: 5,
        args: [
            "--window-size=1024,768"
        ]
    }
  );
  const page = await browser.newPage();
  await page.setViewport({
    width: 1024,
    height: 768,
    deviceScaleFactor: 1,
  });
  await page.goto('https://10fastfingers.com/typing-test/english');
  
  const wordCount = await page.$$eval("#row1 > span", e => e.length);
  console.log(wordCount);
  for (let index = 0; index < wordCount; index++) {
    let word = await page.$eval('.highlight', e => e.innerText);
    await page.type('#inputfield', await word + ' ');
  }
  await page.waitForSelector('#timer.off');
  
  const result = await page.$eval('#wpm > strong', e => e.innerText)
  console.log(result)

  debugger
  await page.screenshot({path: 'example.png'});


  await browser.close();
})();