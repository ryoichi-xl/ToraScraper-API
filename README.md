# 🖼️ ToraScraper API

A lightweight REST API that scrapes and returns all image URLs from any given webpage. Built with Express, Puppeteer, and Cheerio.

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
git clone https://github.com/ryoichi_xl/<repo-name>.git
cd <repo-name>
npm install
```

### Running the Server

```bash
node app.js
```

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

```json
{
  "image": [
    "https://example.com/images/hero.png",
    "https://example.com/assets/logo.svg",
    "https://cdn.example.com/photo.jpg"
  ]
}
```

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

## Rate Limiting

This API uses a rate limiter (configured in `rateLimiter.js`) to prevent abuse. Requests exceeding the limit will receive a `429 Too Many Requests` response.

---

## Author

**Ryoichi**
- X: [@ryoichi_xl](https://x.com/ryoichi_xl)
- GitHub: [ryoichi_xl](https://github.com/ryoichi_xl)

---

## License

MIT
