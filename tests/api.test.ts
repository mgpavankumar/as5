import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';

const movie = { id: 'one', title: 'Inception', director: 'Nolan', releaseYear: 2010, genre: 'Sci-Fi' };
const json = (method: string, data: unknown) => ({ method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
test('movie lifecycle and static discovery routes', async () => {
  const app = createApp();
  assert.equal((await app.request('/movies', json('POST', movie))).status, 201);
  assert.equal((await app.request('/movies/one/rating', json('POST', { rating: 8 }))).status, 200);
  assert.equal((await (await app.request('/movies/one/rating')).json()).averageRating, 8);
  for (const path of ['/movies/top-rated', '/movies/search?keyword=incep', '/movies/genre/sci-fi', '/movies/director/nolan']) {
    const response = await app.request(path);
    assert.equal(response.status, 200, path);
    assert.equal((await response.json()).length, 1, path);
  }
  assert.equal((await app.request('/movies/one', { method: 'DELETE' })).status, 200);
  assert.equal((await app.request('/movies/one')).status, 404);
});
test('duplicate IDs, wrong types, and invalid ratings', async () => {
  const app = createApp();
  await app.request('/movies', json('POST', movie));
  assert.equal((await app.request('/movies', json('POST', movie))).status, 409);
  for (const rating of [0, 11, '8', null]) assert.equal((await app.request('/movies/one/rating', json('POST', { rating }))).status, 400);
  assert.equal((await app.request('/movies', json('POST', { ...movie, id: 'two', releaseYear: '2010' }))).status, 400);
});
test('malformed JSON returns 400', async () => {
  assert.equal((await createApp().request('/movies', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' })).status, 400);
});
