# ToraScraper 🐯

A headless image scraper built for backend devs. Point it at any URL and it scrapes every image off the page — handling SSR, CSR, and dynamic rendering via Puppeteer. No UI included. Built to be extended.

> Created by [Ryoichi](https://github.com/ryoichi_xl) · [X](https://x.com/ryoichi_xl)

---

## How It Works

1. You POST a URL to the `/api/scrape` endpoint
2. Puppeteer launches a headless browser and visits the page
3. It grabs every `img` src and srcset from the DOM
4. Images are downloaded and saved to a generated subfolder inside `/images`
5. The image URLs are returned as JSON

Supports `.jpg`, `.jpeg`, `.png`, `.svg`, and `.webp`.

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
git clone https://github.com/ryoichi-xl/ToraScraper.git
cd ToraScraper
npm install
```

### Run the server

```bash
node app.js
```

Server runs on `http://localhost:3000` by default. Set a `PORT` environment variable to override.

---

## Usage

Send a POST request to `/api/scrape` with a JSON body:

```bash
curl -X POST http://localhost:3000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

### Response

```json
{
  "image": [
    "https://example.com/assets/hero.webp",
    "https://example.com/assets/logo.png"
  ]
}
```

Scraped images are saved to `/images/<random-id>/` with randomized filenames.

---

## Project Structure

```
ToraScraper/
├── app.js          # Express server + API route
├── scraper.js      # Puppeteer scraping logic
├── images/         # Scraped images saved here (auto-created)
├── package.json
└── README.md
```

---

## Next.js Integration

ToraScraper runs as a standalone Express backend. From a Next.js frontend, call it like this:

```js
const res = await fetch("http://localhost:3000/api/scrape", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url: "https://example.com" }),
});

const data = await res.json();
console.log(data.image); // array of image URLs
```

Make sure the CORS origin in `app.js` matches your frontend's address.

---

## Taking It Further

ToraScraper is intentionally barebones. Here's what you can build on top:

- **Add a UI** — drop a React or Next.js frontend on top, let users paste URLs and preview results
- **Export to PDF** — pipe the `/images` folder into `pdf-lib` or Puppeteer's PDF export
- **Schedule scrapes** — wrap it in a cron job with `node-cron`
- **Store remotely** — swap local `/images` for S3, Cloudinary, or Supabase Storage
- **Filter by type** — extend the request body to accept a file type param

---

## Dependencies

| Package | Purpose |
|---------|---------|
| `express` | HTTP server |
| `puppeteer` | Headless browser for dynamic page rendering |
| `cheerio` | HTML parsing |
| `axios` | Image downloading |
| `nanoid` | Random IDs for filenames and subfolders |
| `cors` | Cross-origin request handling |

---

## License

MIT