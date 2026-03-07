export async function getAnimeSearch(query, page = 1) {
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    limit: "12",
    sfw: "true",
  });

  const response = await fetch(
    `https://api.jikan.moe/v4/anime?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Не удалось загрузить результаты поиска");
  }

  return response.json();
}
