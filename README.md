# Movie Catalogue REST API · Hono

[![CI](https://github.com/mgpavankumar/movie-catalogue-api/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/mgpavankumar/movie-catalogue-api/actions/workflows/ci.yml)

A movie HTTP API with validated metadata, ratings, and discovery routes.

**Author:** [M. G. Pavan Kumar](https://github.com/mgpavankumar)
**Status:** Educational project

## Features

- Manage an in-memory movie catalogue
- Submit ratings from 1 to 10
- Query averages, top-rated movies, genres, directors, and title keywords

## Getting started

Install Node.js 22 or newer and npm. Clone this repository:

```bash
git clone https://github.com/mgpavankumar/movie-catalogue-api.git
cd movie-catalogue-api
```

```bash
npm ci
```

```bash
npm run build
npm start
```

`npm start` runs the TypeScript entry point with the Node.js `tsx` loader. `npm run build` emits JavaScript into `dist/src`. `npm run dev` watches source files. The server listens on port 3000 unless `PORT` is set.

## Tests

```bash
npm run typecheck
npm test
```

See [TEST_RESULTS.md](TEST_RESULTS.md) for recorded local verification and its limits.

## Project structure

| Path | Purpose |
| --- | --- |
| `src/MovieService.ts` | Movie catalogue, ratings, and discovery logic |
| `src/app.ts` | HTTP application, routes, and request validation |
| `src/index.ts` | Server entry point |
| `tests/` | Automated regression checks |
| `tsconfig.json` | Strict ESM compilation settings |

## Current behavior and limitations

Records are held in memory and disappear when the process stops. This learning API has no authentication or access control.

## HTTP routes

| Method | Path |
| --- | --- |
| GET | `/` |
| POST | `/movies` |
| DELETE | `/movies/:id` |
| POST | `/movies/:id/rating` |
| GET | `/movies/:id/rating` |
| GET | `/movies/top-rated` |
| GET | `/movies/genre/:genre` |
| GET | `/movies/director/:director` |
| GET | `/movies/search` |
| GET | `/movies` |
| GET | `/movies/:id` |

## Try the API

```bash
curl -i http://localhost:3000/movies -H 'Content-Type: application/json' -d '{"id":"demo-inception","title":"Inception","director":"Christopher Nolan","releaseYear":2010,"genre":"Sci-Fi"}'
curl -i http://localhost:3000/movies/demo-inception/rating -H 'Content-Type: application/json' -d '{"rating":8}'
curl -i http://localhost:3000/movies/demo-inception/rating
```

Expect HTTP 201 for creation and HTTP 200 for rating submission and retrieval. The average is 8; ratings outside 1–10 return 400. On Windows PowerShell use `curl.exe`.

## Contributing

Keep changes focused, use synthetic data, and include steps or tests demonstrating the fix. Do not commit local configuration or credentials.

## HTTP safeguards

Requests are limited to 64 KiB and oversized payloads return JSON with HTTP 413. Responses include Hono security headers.
