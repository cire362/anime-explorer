import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/search')({
  component: Search,
})

function Search() {
  return (
    <section className="placeholder-page">
      <h1 className="page-title">Поиск</h1>
      <p className="page-subtitle">Страница поиска скоро будет дополнена расширенными фильтрами и рекомендациями.</p>
    </section>
  )
}