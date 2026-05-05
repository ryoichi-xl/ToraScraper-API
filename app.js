// Created by Ryoichi
// X: https://x.com/ryoichi_xl
// Github: https://github.com/ryoichi_xl

import express from 'express'
import scrapeImage from "./scraper.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(
    cors({
        origin: "http://127.0.0.1:5500",
    }),
    );
    app.use(express.json());

    app.post("/api/scrape", async (req, res) => {
    try {
        const url = req.body.url;
        const image = await scrapeImage(url);
        res.json({ image });
    } catch (err) {
        console.log(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Created by Ryoichi
// X: https://x.com/ryoichi_xl
// Github: https://github.com/ryoichi_xl
