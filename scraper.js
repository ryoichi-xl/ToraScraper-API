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
        ],
        });
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

        images = await page.evaluate(() => {
            const ext = /\.(jpg|png|svg|webp|jpeg)/i;
            const imgElements = Array.from(document.querySelectorAll("img"));
            const srcMap = imgElements.map(img => img.src);
            const sercsetMap = imgElements.map(img => img.srcset);
            const allSrc = [...srcMap, ...sercsetMap];
            return allSrc.filter(src => src.match(ext));
        })
        // check if there's a contains function
        await browser.close()
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({ message: "Invalid URL" });
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
            if (images[i].contains("?")) {
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