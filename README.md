# ToraScraper API

A lightweight REST API that scrapes and returns all image URLs from any given webpage. Built with Express & Puppeteer.

---

## Features

- Scrapes `<img>` `src` and `srcset` attributes from any public URL
- Supports `.jpg`, `.jpeg`, `.png`, `.svg`, and `.webp` formats
- Resolves relative URLs to absolute paths
- Rate limiting out of the box
- CORS enabled for all origins

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
<<<<<<< HEAD
git clone https://github.com/ryoichi-xl/ToraScraper.git
cd ToraScraper
npm install
```

### Run the server
=======
git clone https://github.com/ryoichi_xl/<repo-name>.git
cd <repo-name>
npm install
```

### Running the Server
>>>>>>> 44826d0330e13bf12d44f591ee145ec7ea16d059

```bash
node app.js
```

<<<<<<< HEAD
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
=======
The server starts on port `3000` by default. Set a `PORT` environment variable to override:

```bash
PORT=8080 node app.js
```

---

## API Reference

### `GET /api/url`

Scrapes all image URLs from the target webpage.

#### Query Parameters

| Parameter | Type   | Required | Description                        |
|-----------|--------|----------|------------------------------------|
| `url`     | string | ✅ Yes   | The full URL of the page to scrape |

#### Example Request

```
GET /api/url?url=https://example.com
```

#### Success Response

**Status:** `200 OK`
>>>>>>> 44826d0330e13bf12d44f591ee145ec7ea16d059

```json
{
  "image": [
<<<<<<< HEAD
    "https://example.com/assets/hero.webp",
    "https://example.com/assets/logo.png"
=======
    "https://example.com/images/hero.png",
    "https://example.com/assets/logo.svg",
    "https://cdn.example.com/photo.jpg"
>>>>>>> 44826d0330e13bf12d44f591ee145ec7ea16d059
  ]
}
```

<<<<<<< HEAD
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
=======
#### Error Response

**Status:** `400 Bad Request`

```json
{
  "message": "Invalid URL"
}
```

---

## Tech Stack

| Package    | Purpose                            |
|------------|------------------------------------|
| Express    | HTTP server & routing              |
| Puppeteer  | Headless browser for JS rendering  |
| Cheerio    | HTML parsing                       |
| Axios      | HTTP requests                      |
| nanoid     | Unique ID generation               |
| cors       | Cross-origin resource sharing      |

---

## Author

**Ryoichi**
- X: [@ryoichi_xl](https://x.com/ryoichi_xl)
- GitHub: [ryoichi_xl](https://github.com/ryoichi_xl)
>>>>>>> 44826d0330e13bf12d44f591ee145ec7ea16d059

---

## License

<<<<<<< HEAD
MIT
=======
MIT
>>>>>>> 44826d0330e13bf12d44f591ee145ec7ea16d059
