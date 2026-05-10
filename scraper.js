// Created by Ryoichi
// X: https://x.com/ryoichi_xl
// Github: https://github.com/ryoichi_xl

import puppeteer from 'puppeteer'


async function scrapeImage(scrapeUrl) {
    let sub;
    let images = [];
    let finalImages = [];
    const url = decodeURIComponent(scrapeUrl);
        const ext = [".png", ".jpg", ".jpeg", ".svg", ".webp"]
    try {
        const browser = await puppeteer.launch( {headless: true,
            args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-gpu",
    "--single-process",
    "--no-first-run",
    "--disable-extensions",
    "--disable-plugins",
    "--disable-default-apps",
    "--disable-sync",
    "--disable-translate",
    "--disable-background-networking",
    "--disable-breakpad",
    "--disable-client-side-phishing-detection",
    "--disable-component-extensions-with-background-pages",
    "--disable-hang-monitor",
    "--disable-popup-blocking",
    "--disable-prompt-on-repost",
    "--disable-background-timer-throttling",
    "--disable-renderer-backgrounding",
    "--disable-device-discovery-notifications",
        ],
        });
        const page = await browser.newPage();
        await page.setCacheEnabled(false);
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            const headers = request.headers();
            delete headers['if-none-match'];
            delete headers['if-modified-since'];
            request.continue({ headers });
        });
        page.setDefaultNavigationTimeout(30000);
        page.setDefaultTimeout(30000);

        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

        images = await page.evaluate(() => {
            const ext = /\.(jpg|png|svg|webp|jpeg)/i;
            const imgElements = Array.from(document.querySelectorAll("img"));
            const srcMap = imgElements.map(img => img.src);
            const srcsetMap = imgElements.flatMap((img) => {
                if (!img.srcset) return [];

                return img.srcset
                    .split(",")
                    .map((src) => src.trim().split(" ")[0]);
            });
            const allSrc = [...srcMap, ...srcsetMap];
            return allSrc.filter(src => src.match(ext));
        })
        // check if there's a contains function
        await browser.close()
    } catch (err) {
        console.log(err.message)
        return [];    
    }

    function resolveURL(src, base) {
        if (!src) return;

        try{
            return new URL(src, base).href
        } catch(err) {
            console.log(err.code)
        }
    } 

        for (let i = 0; i < images.length; i++) {
            sub  = resolveURL(images[i], url);
            if (images[i].includes("?")) {
                sub = images[i].split("?")[0]
            }
            finalImages.push(sub)
        }
        return finalImages;
}

export default scrapeImage

// Created by Ryoichi
// X: https://x.com/ryoichi_xl
// Github: https://github.com/ryoichi_xl