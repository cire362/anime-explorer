import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getTopAnime } from "../api/getTopAnime";
import { getAnimeById } from "../api/getAnimeById";
import { AnimeCard } from "../components/animeCard";
import Modal from "../components/Modal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [page, setPage] = useState(1);
  const [animeId, setAnimeId] = useState();
  const [showModal, setModal] = useState(false);

  const { isPending, error, data } = useQuery({
    queryKey: [`animeData`, page],
    queryFn: () => getTopAnime(page),
  });

  const {
    isPending: isLoadingAnimeById,
    data: animeByIdData,
    isFetched,
    error: fetchTrailerError,
  } = useQuery({
    queryKey: ["animeId", animeId],
    queryFn: () => getAnimeById(animeId),
    enabled: !!showModal,
  });

  if (isPending) {
    return <div className="state-message">Загрузка...</div>;
  }

  if (error) {
    return <div className="state-message error">Ошибка: {error.message}</div>;
  }

  let animeById;

  if (isFetched) {
    animeById = animeByIdData;
  }

  const topAnime = data.data;

  return (
    <div>
      <h1 className="page-title">Лучшие аниме за всё время</h1>
      <p className="page-subtitle">
        Подборка тайтлов с высоким рейтингом и лучшими отзывами зрителей.
      </p>

      <div className="anime-grid">
        {topAnime.map((anime) => (
          <AnimeCard
            func={() => {
              setModal(true);
              setAnimeId(anime.mal_id);
            }}
            key={anime.mal_id}
            anime={anime}
          />
        ))}
      </div>

      <div className="pagination">
        <button
          className="btn"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Назад
        </button>
        <button className="btn" onClick={() => setPage(page + 1)}>
          Вперёд
        </button>
      </div>

      {showModal && (
        <Modal
          func={(e) => {
            if (e.target.className == "modal-overlay") {
              setModal(false);
            }
          }}
        >
          {isLoadingAnimeById ? (
            <div>Загрузка трейлера</div>
          ) : fetchTrailerError ? (
            <div>Ошибка загрузки трейлера: {fetchTrailerError}</div>
          ) : (
            <div>
              <h1>Трейлер</h1>
              <iframe
                src={animeById.data.trailer.embed_url}
                width="100%"
                height="400px"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
