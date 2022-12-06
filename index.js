const puppeteer = require('puppeteer-extra');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin());
const config = require('./config.json');

puppeteer.launch({ headless: false , executablePath: config.executepath, userDataDir: config.userdir, defaultViewport: false,}).then(async browser => {
  //args: ['--start-fullscreen'] , 
 console.log('\x1b[32m' ,"\n███╗░░░███╗  ██████╗░░█████╗░████████╗░██████╗\n████╗░████║  ██╔══██╗██╔══██╗╚══██╔══╝██╔════╝\n██╔████╔██║  ██████╦╝██║░░██║░░░██║░░░╚█████╗░\n██║╚██╔╝██║  ██╔══██╗██║░░██║░░░██║░░░░╚═══██╗\n██║░╚═╝░██║  ██████╦╝╚█████╔╝░░░██║░░░██████╔╝\n╚═╝░░░░░╚═╝  ╚═════╝░░╚════╝░░░░╚═╝░░░╚═════╝░\n")
  
  const page = await browser.newPage()
  //await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`https://www.youtube.com/watch?v=${config.livelink}`,{ waitUntil: "load",})
  await page.waitForTimeout(1000)

  //MESSAGE SECTION
  const answers = config.posts

  //PAGE 1
  await page.waitForSelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button")
  await page.click("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button")
  const elementHandle = await page.waitForSelector("#chatframe")
  const frame = await elementHandle.contentFrame();

  

  //PAGE 2
  const page2 = await browser.newPage()
  await page2.goto(`https://www.youtube.com/watch?v=${config.livelink}`,{ waitUntil: "load",})
  await page2.waitForTimeout(1000)
 
 
  //ACCOUNT CHANGER
  const img = await page2.waitForSelector("#avatar-btn")
  await img.click()
  const acc = await page2.waitForSelector("#items > ytd-compact-link-renderer:nth-child(3)")
  await acc.click()
  const bc = await page2.waitForXPath('(//*[@id="contents"]/ytd-account-item-renderer/tp-yt-paper-icon-item/tp-yt-paper-item-body)[2]')
  await bc.click()
  await sleep(4000)
  
  //YT-VIDEO PAUSER
  await page2.waitForSelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button")
  await page2.click("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button")

  
  const elementHandlee = await page2.waitForSelector("#chatframe")
  const framee = await elementHandlee.contentFrame();
  for( let i = 0 ; i<config.messages ; i++ ){
  await sendMessage2()
  }
async function sendMessage2() {
  await sleep(1000)
   const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
   await frame.waitForSelector('div#input.style-scope.yt-live-chat-text-input-field-renderer')
   const box = await frame.$("div#input.style-scope.yt-live-chat-text-input-field-renderer")
   await box.type(randomAnswer)
   await frame.waitForSelector("yt-icon-button.style-default > button:nth-child(1)")
   const sent = await frame.$("yt-icon-button.style-default > button:nth-child(1)")
   await sent.click()
  await sleep(1000)
  const randomAnswer2 = answers[Math.floor(Math.random() * answers.length)];
  await framee.waitForSelector('div#input.style-scope.yt-live-chat-text-input-field-renderer')
  const boxe = await framee.$("div#input.style-scope.yt-live-chat-text-input-field-renderer")
  await boxe.type(randomAnswer2)
  await framee.waitForSelector("yt-icon-button.style-default > button:nth-child(1)")
  const sent2 = await framee.$("yt-icon-button.style-default > button:nth-child(1)")
  await sent2.click()
  }

  await browser.close()
  console.log(`All done, Live Chat Bot Ended. ✨`)
})


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}