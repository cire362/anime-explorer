import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getTopAnime } from "../api/getTopAnime";
import { getAnimeById } from "../api/getAnimeById";
import { AnimeCard } from "../components/AnimeCard";
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
          <Link
            key={anime.mal_id}
            to="anime/$animeid"
            params={{ animeid: anime.mal_id }}
          >
            <AnimeCard
              func={() => {
                setModal(true);
                setAnimeId(anime.mal_id);
              }}
              anime={anime}
            />
          </Link>
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
            if (e.target === e.currentTarget) {
              setModal(false);
            }
          }}
        >
          {isLoadingAnimeById ? (
            <div className="trailer-modal__state">Загрузка трейлера...</div>
          ) : fetchTrailerError ? (
            <div className="trailer-modal__state trailer-modal__state--error">
              Ошибка загрузки трейлера: {fetchTrailerError.message}
            </div>
          ) : !animeById?.data?.trailer?.embed_url ? (
            <div className="trailer-modal__state">
              Для этого аниме трейлер пока недоступен.
            </div>
          ) : (
            <div className="trailer-modal">
              <div className="trailer-modal__header">
                <div>
                  <p className="trailer-modal__eyebrow">Трейлер</p>
                  <h2 className="trailer-modal__title">
                    {animeById.data.title}
                  </h2>
                </div>
              </div>
              <div className="trailer-modal__video-frame">
                <iframe
                  className="trailer-modal__iframe"
                  src={animeById.data.trailer.embed_url}
                  title={`Трейлер ${animeById.data.title}`}
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
