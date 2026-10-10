# Movie Catalogue REST API · Hono

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
git clone https://github.com/mgpavankumar/as5.git
cd as5
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
| `src/MovieService.ts` | Application logic and/or demonstration |
| `src/app.ts` | Application logic and/or demonstration |
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

## Contributing

Keep changes focused, use synthetic data, and include steps or tests demonstrating the fix. Do not commit local configuration or credentials.
