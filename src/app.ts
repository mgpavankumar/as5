import { bodyLimit } from 'hono/body-limit';
import { secureHeaders } from 'hono/secure-headers';

import { Hono } from "hono";
import MovieDatabase from "./MovieService.js";

export function createApp() {
const app = new Hono();
  app.use('*', secureHeaders());
  app.use('*', bodyLimit({ maxSize: 64 * 1024, onError: c => c.json({ error: 'Request body exceeds 64 KiB' }, 413) }));
const movieDatabase = new MovieDatabase();
app.onError((error, c) => {
  if (error instanceof SyntaxError || error instanceof TypeError) return c.json({ error: "Invalid JSON request body" }, 400);
  console.error(error);
  return c.json({ error: "Internal server error" }, 500);
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Add a new movie (User provides the 'id')
app.post("/movies", async (c) => {
  const { id, title, director, releaseYear, genre } = await c.req.json();

  if (![id, title, director, genre].every(value => typeof value === "string" && value.trim()) || !Number.isInteger(releaseYear) || releaseYear < 1888) {
    return c.json({ error: "Missing required fields (id, title, director, releaseYear, genre)" }, 400);
  }

  const response = movieDatabase.addMovie(id, title, director, releaseYear, genre);
  if (response === "Movie ID already exists") {
    return c.json({ error: response }, 409); // Conflict
  }
  
  return c.json({ message: "Movie added successfully", id }, 201);
});

// Remove a movie by ID
app.delete("/movies/:id", (c) => {
  const id = c.req.param("id");
  if (!movieDatabase.getMovie(id)) {
    return c.json({ error: "Movie not found" }, 404);
  }
  
  movieDatabase.removeMovie(id);
  return c.json({ message: "Movie removed successfully" });
});

// Rate a movie
app.post("/movies/:id/rating", async (c) => {
  const id = c.req.param("id");
  const { rating } = await c.req.json();

  if (typeof rating !== "number" || !Number.isFinite(rating) || rating < 1 || rating > 10) {
    return c.json({ error: "Invalid rating, must be between 1 and 10" }, 400);
  }

  if (!movieDatabase.getMovie(id)) {
    return c.json({ error: "Movie not found" }, 404);
  }

  movieDatabase.rateMovie(id, rating);
  return c.json({ message: `Rating ${rating} added to movie ${id}` });
});

// Get average rating of a movie
app.get("/movies/:id/rating", (c) => {
  const id = c.req.param("id");
  const averageRating = movieDatabase.getAverageRating(id);

  if (averageRating === null) {
    return c.json({ error: "Movie not found" }, 404);
  }
  return c.json({ averageRating });
});

// Get top-rated movies
app.get("/movies/top-rated", (c) => {
  const topRatedMovies = movieDatabase.getTopRatedMovies();
  return c.json(topRatedMovies);
});

// Get movies by genre
app.get("/movies/genre/:genre", (c) => {
  const genre = c.req.param("genre");
  const genreMovies = movieDatabase.getMoviesByGenre(genre);

  if (genreMovies.length === 0) {
    return c.json({ error: "No movies found for this genre" }, 404);
  }
  return c.json(genreMovies);
});

// Get movies by director
app.get("/movies/director/:director", (c) => {
  const director = c.req.param("director");
  const directorMovies = movieDatabase.getMoviesByDirector(director);

  if (directorMovies.length === 0) {
    return c.json({ error: "No movies found for this director" }, 404);
  }
  return c.json(directorMovies);
});

// Search movies by keyword in title
app.get("/movies/search", (c) => {
  const keyword = c.req.query("keyword") || "";
  const searchResults = movieDatabase.searchMoviesBasedOnKeyword(keyword);

  if (searchResults.length === 0) {
    return c.json({ error: "No movies found" }, 404);
  }
  return c.json(searchResults);
});

// Get all movies
app.get("/movies", (c) => {
  return c.json(movieDatabase.getAllMovies());
});

// Get a movie by ID
app.get("/movies/:id", (c) => {
  const id = c.req.param("id");
  const movie = movieDatabase.getMovie(id);
  if (!movie) {
    return c.json({ error: "Movie not found" }, 404);
  }
  return c.json(movie);
});

return app;
}
