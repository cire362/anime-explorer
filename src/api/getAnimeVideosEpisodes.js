export async function getAnimeVideosEpisodes(id) {
  const req = await fetch(`https://api.jikan.moe/v4/anime/${id}/videos/`).then(
    (res) => res.json(),
  );
  return req;
}
