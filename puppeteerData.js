import puppeteer from 'puppeteer';

export const scrapper = async () => {

    const openBrowser = await puppeteer.launch({
        headless: false,
        slowMo: 200,

    });
    const context = openBrowser.defaultBrowserContext();
    await context.overridePermissions('https://www.parafinaenlinea.cl', ['geolocation']);

    const page = await openBrowser.newPage();
    await page.setViewport({ width: 1250, height: 1250 })
    await page.goto('https://www.parafinaenlinea.cl');

    await page.select('#region', '06')
    await page.select('#comuna', '06101')

    await page.click('#sidebar  form  div.d-grid.gap-2  button.btn.btn-primary');
    await page.waitForSelector('#infinite-list');
    const kerosenePriceList = await page.evaluate(() => {
        const keroseneValue = document.querySelectorAll(".card")
        return Array.from(keroseneValue).map(document=>{
            const priceWebPageClassElement=document.querySelector('.precio');
            const price = priceWebPageClassElement ? priceWebPageClassElement.innerText.trim() : 'No disponible';
            const ubicationWebPageClassElement=document.querySelectorAll('.card-subtitle');
            

            const getUbicationValues = Array.from(ubicationWebPageClassElement).map(ubicationElement => ubicationElement.innerText.trim());

         
           
            const region = getUbicationValues[0] || 'No disponible';
            const location = getUbicationValues[1] || 'No disponible';

             
           
           

            return { price, region,location };
        })
      



    });
    console.log(kerosenePriceList);
}

scrapper();
