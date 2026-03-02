export function AnimeCard({ anime, func }) {
  return (
    <article onClick={() => func()} className="anime-card">
      <img src={anime.images.jpg.large_image_url} alt={anime.title} />

      <div className="anime-card__body">
        <h3 className="anime-card__title">{anime.title}</h3>

        <div className="anime-card__meta">
          <p>
            <span>Источник:</span> {anime.source || "Unknown"}
          </p>
          <p>
            <span>Эпизодов:</span> {anime.episodes || "Ongoing"}
          </p>
          <p>
            <span>Оценка:</span> {anime.score}, <span>кол-во оценок:</span>{" "}
            {anime.scored_by}
          </p>
        </div>
      </div>
    </article>
  );
}
