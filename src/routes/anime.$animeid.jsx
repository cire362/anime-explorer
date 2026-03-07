import { createFileRoute, useParams } from "@tanstack/react-router";
import { getAnimeById } from "../api/getAnimeById";
import { useQuery } from "@tanstack/react-query";
import "../styles/animePage.css";

export const Route = createFileRoute("/anime/$animeid")({
  component: RouteComponent,
});

function RouteComponent() {
  const animeId = useParams({
    from: "/anime/$animeid",
    select: (params) => params.animeid,
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["animeId", animeId],
    queryFn: () => getAnimeById(animeId),
  });

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (isPending) {
    return <div>Загрузка...</div>;
  }

  function addToFavorite(anime) {
    let favorite = localStorage.getItem("favorite");
    if (favorite) {
      favorite = JSON.parse(favorite);
      favorite = [...favorite, anime];
    } else {
      favorite = [anime];
    }
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }

  const anime = data.data;
  const trailerUrl = anime.trailer?.embed_url;

  return (
    <div className="anime-page">
      <div className="anime-page__header">
        <div className="anime-page__content">
          <h1 className="anime-page__title">{anime.title}</h1>
          <div className="anime-page__alt-titles">
            {anime.titles.map((title) => (
              <span key={title.title} className="anime-page__alt-title">
                {title.title}
              </span>
            ))}
          </div>
          <div className="anime-page__rating-row">
            <span className="anime-page__score">
              <span role="img" aria-label="score">
                🎬
              </span>{" "}
              {anime.score || "—"}
            </span>
            <a
              className="anime-page__mal"
              href={anime.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              MAL
            </a>
          </div>
          <div className="anime-page__meta-row">
            <span>
              <b>Статус:</b>{" "}
              <span
                className={
                  anime.status === "анонс"
                    ? "anime-page__status"
                    : "anime-page__meta-label"
                }
              >
                {anime.status}
              </span>
            </span>
            <span>
              <b>Тип:</b> {anime.type}
            </span>
            <span>
              <b>Год выхода:</b> {anime.year}
            </span>
            <span>
              <b>Возрастной рейтинг:</b>{" "}
              <span className="anime-page__meta-label">{anime.rating}</span>
            </span>
          </div>
          <div className="anime-page__genres">
            {anime.genres.map((genre) => (
              <span key={genre.name} className="anime-page__genre">
                {genre.name}
              </span>
            ))}
          </div>
          <div className="anime-page__details-row">
            <span>
              <b>Первоисточник:</b> {anime.source}
            </span>
            <span>
              <b>Студия:</b> {anime.studios?.[0]?.name || "Неизвестно"}
            </span>
            <span>
              <b>Режиссер:</b> {anime.producers?.[0]?.name || "Неизвестно"}
            </span>
          </div>
          <div className="anime-page__synopsis">{anime.synopsis}</div>
          <section className="anime-page__trailer">
            <div className="anime-page__section-heading">
              <p className="anime-page__section-eyebrow">Видео</p>
              <h2 className="anime-page__section-title">Трейлер</h2>
            </div>

            {trailerUrl ? (
              <div className="anime-page__video-frame">
                <iframe
                  className="anime-page__iframe"
                  src={trailerUrl}
                  title={`Трейлер ${anime.title}`}
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="anime-page__trailer-empty">
                Для этого аниме трейлер пока недоступен.
              </div>
            )}
          </section>
        </div>
        <div className="anime-page__img-block">
          <img
            className="anime-page__img"
            src={anime.images.jpg.image_url}
            alt={anime.title}
          />
          <button
            style={{
              width: "100%",
              marginTop: "10px",
            }}
            onClick={() => addToFavorite(anime)}
          >
            Добавить аниме в избранное
          </button>
        </div>
      </div>
    </div>
  );
}
