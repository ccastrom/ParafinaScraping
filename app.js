import puppeteer from 'puppeteer';

const  scrapper= async()=>{

    const openBrowser=await puppeteer.launch({
        headless:false,
        slowMo:200,
       
});
  const context = openBrowser.defaultBrowserContext();
  await context.overridePermissions('https://www.parafinaenlinea.cl', ['geolocation']);

    const page=await openBrowser.newPage();
    await page.setViewport({ width: 1250, height: 1250 })
    await page.goto('https://www.parafinaenlinea.cl');
   
    await page.select('#region','06')
    await page.select('#comuna','06101')
   
    await page.click('#sidebar  form  div.d-grid.gap-2  button.btn.btn-primary');
}

scrapper();
