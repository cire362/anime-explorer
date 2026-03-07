import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AnimeCard } from "../components/AnimeCard";
import { getAnimeSearch } from "../api/getAnimeSearch";

export const Route = createFileRoute("/search")({
  validateSearch: (search) => ({
    query: typeof search.query === "string" ? search.query : "",
    page: Number(search.page) > 0 ? Number(search.page) : 1,
  }),
  component: Search,
});

function Search() {
  const navigate = useNavigate({ from: "/search" });
  const { query, page } = Route.useSearch();
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const normalizedQuery = query.trim();

  const { data, isPending, error, isFetching } = useQuery({
    queryKey: ["animeSearch", normalizedQuery, page],
    queryFn: () => getAnimeSearch(normalizedQuery, page),
    enabled: normalizedQuery.length > 0,
    staleTime: 1000 * 60,
  });

  const results = data?.data ?? [];
  const pagination = data?.pagination;

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextQuery = inputValue.trim();

    navigate({
      search: {
        query: nextQuery,
        page: 1,
      },
    });
  };

  const handlePageChange = (nextPage) => {
    navigate({
      search: {
        query,
        page: nextPage,
      },
    });
  };

  return (
    <section className="search-page">
      <h1 className="page-title">Поиск</h1>
      <p className="page-subtitle search-page__subtitle">
        Ищите аниме по названию через Jikan API и переходите к подробной
        карточке тайтла.
      </p>

      <form className="search-form" onSubmit={handleSubmit}>
        <label className="search-form__label" htmlFor="anime-search">
          Название аниме
        </label>
        <div className="search-form__controls">
          <input
            id="anime-search"
            className="search-form__input"
            type="search"
            placeholder="Например: Fullmetal Alchemist"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button type="submit" className="search-form__button">
            Найти
          </button>
        </div>
      </form>

      {!normalizedQuery ? (
        <div className="search-empty-state">
          <h2 className="search-empty-state__title">Начните поиск</h2>
          <p className="search-empty-state__text">
            Введите название тайтла, и страница покажет релевантные результаты
            из каталога Jikan.
          </p>
        </div>
      ) : isPending ? (
        <div className="state-message search-state">
          Загрузка результатов...
        </div>
      ) : error ? (
        <div className="state-message error search-state">
          Ошибка: {error.message}
        </div>
      ) : (
        <>
          <div className="search-toolbar">
            <p className="search-toolbar__result-count">
              Найдено: {pagination?.items?.total ?? results.length}
            </p>
            {isFetching ? (
              <span className="search-toolbar__fetching">Обновление...</span>
            ) : null}
          </div>

          {results.length ? (
            <div className="anime-grid">
              {results.map((anime) => (
                <Link
                  key={anime.mal_id}
                  to="/anime/$animeid"
                  params={{ animeid: String(anime.mal_id) }}
                >
                  <AnimeCard anime={anime} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="search-empty-state">
              <h2 className="search-empty-state__title">Ничего не найдено</h2>
              <p className="search-empty-state__text">
                Попробуйте изменить запрос или введите оригинальное название.
              </p>
            </div>
          )}

          {pagination?.last_visible_page > 1 ? (
            <div className="pagination search-pagination">
              <button
                className="btn"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              >
                Назад
              </button>
              <span className="search-pagination__current">
                Страница {page} из {pagination.last_visible_page}
              </span>
              <button
                className="btn"
                disabled={!pagination.has_next_page}
                onClick={() => handlePageChange(page + 1)}
              >
                Вперёд
              </button>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
