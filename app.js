// Created by Ryoichi
// X: https://x.com/ryoichi_xl
// Github: https://github.com/ryoichi_xl
import express from 'express'
import limiter from "./rateLimiter.js"
import scrapeImage from "./scraper.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
app.use(limiter)

app.use(
    cors({
        origin: "*",
    }),
    );
    app.use(express.json());

    app.get("/api/url", async (req, res) => {
    try {
        const url = encodeURIComponent(req.query.url);
        console.log(url)
        const image = await scrapeImage(url);
        res.json({ image });
    } catch (err) {
        console.log(err.message);
        return res.status(400).json({ message: "Invalid URL"} )
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Created by Ryoichi
// X: https://x.com/ryoichi_xl
// Github: https://github.com/ryoichi_xl
