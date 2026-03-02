export async function getAnimeById(id) {
  const req = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`).then(
    (response) => response.json(),
  );
  return req;
}
