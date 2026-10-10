# Movie Catalogue REST API · Hono

A TypeScript HTTP API for managing an in-memory movie catalogue, ratings, and discovery queries.

**Author:** [M. G. Pavan Kumar](https://github.com/mgpavankumar)  
**Status:** Educational project

## Features

- Create, retrieve, list, and delete movies
- Submit ratings through the API from 1 to 10
- Calculate average ratings and list top-rated movies
- Filter by genre or director and search by title keyword

## Getting started

Install Node.js and npm. Clone this repository:

```bash
git clone https://github.com/mgpavankumar/as5.git
cd as5
```

```bash
npm install
npm run dev
```

## Project structure

| Path | Purpose |
| --- | --- |
| `src/index.ts` | HTTP routes and server on port 3000 |
| `src/MovieService.ts` | Movie catalogue operations |
| `package.json` | Development scripts and dependencies |

## Current behavior and limitations

Data exists only in memory. The `test` script watches the service module rather than running assertions. `/movies/top-rated` and `/movies/search` are declared after `/movies/:id`; check static route matching before relying on these endpoints. The service permits a rating of 0 while the HTTP API requires at least 1.

## Routes declared in the source

The static-route matching limitation above applies to this inventory.

| Method | Path |
| --- | --- |
| GET | `/` |
| POST | `/movies` |
| GET | `/movies/:id` |
| DELETE | `/movies/:id` |
| POST | `/movies/:id/rating` |
| GET | `/movies/:id/rating` |
| GET | `/movies/top-rated` |
| GET | `/movies/genre/:genre` |
| GET | `/movies/director/:director` |
| GET | `/movies/search` |
| GET | `/movies` |

## Example request

With the development server running, create a movie:

```bash
curl -X POST http://localhost:3000/movies -H "Content-Type: application/json" -d '{"id":"movie-1","title":"Inception","director":"Christopher Nolan","releaseYear":2010,"genre":"Sci-Fi"}'
curl http://localhost:3000/movies/movie-1
```

On Windows PowerShell, use `curl.exe` or an API client and send the same JSON body.

## Planned improvements

- Align service and API validation
- Verify route precedence for static paths
- Add persistence and automated API checks

## Contributing

Open an issue describing the problem or proposed improvement. Keep pull requests focused and include the steps used to verify changes. Use sample data and keep credentials out of commits.

## Verification

This documentation was checked against the committed source files, dependency declarations, and route definitions. Installation, compilation, database setup, and runtime behavior have not been verified by this documentation update. There is no automated test suite in the current repository.
