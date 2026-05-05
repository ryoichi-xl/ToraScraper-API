// Created by Ryoichi
// X: https://x.com/ryoichi_xl
// Github: https://github.com/ryoichi_xl

import fs from 'fs/promises'
import path from 'path'
import * as cheerio from "cheerio"
import { fileURLToPath } from 'url'
import axios from 'axios'
import { nanoid } from 'nanoid'
import puppeteer from 'puppeteer'


let __filename = fileURLToPath(import.meta.url)
let __dirname = path.dirname(__filename)
let sub;
let subdir = nanoid(4);
let images = [];


async function scrapeImage(scrapeUrl) {
    const url = scrapeUrl;
        const ext = [".png", ".jpg", ".jpeg", ".svg", ".webp"]
    try {
        const browser = await puppeteer.launch( {headless: false});
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
    } catch (err) {
        console.log(err.message)
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
            if (!sub) continue;
            const id = nanoid(5)

        console.log(sub)
            const basename = path.basename(sub);
            const test = await axios.get(sub, { responseType: "arraybuffer", validateStatus: () => true });
            if (test.status !== 200) continue;
            const buffer = test.data;
            let extname = ext.filter(e => images[i].includes(e))[0];
            const name = id + extname;
            await fs.mkdir('images/' + subdir, { recursive: true });
            const filePath = path.join(__dirname, "images", name);
            console.log(filePath); 
            await fs.writeFile(filePath, buffer);
            console.log("Image saved successfully.");
        }
        console.log("all images saved")
        return images;
}

export default scrapeImage

// Created by Ryoichi
// X: https://x.com/ryoichi_xl
// Github: https://github.com/ryoichi_xl