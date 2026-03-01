import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getTopAnime } from '../api/getTopAnime'
import { AnimeCard } from '../components/animeCard'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
    const [page, setPage] = useState(1)

    const {isPending, error, data} = useQuery({
        queryKey: [`animeData-${page}}`],
        queryFn: () => getTopAnime(page)
    })

    if (isPending) {
        return <span>Загрузка...</span>
    };

    if (error) {
        return <span>Ошибка: {error.message}</span>
    }

    const topAnime = data.data

  return (
   <div style={{
    padding: "0 50px 30px"
   }}>
    <h1>Лучшие аниме за все время</h1>
   
    <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "50px"
    }}>
        {topAnime.map((anime) => (
            <AnimeCard style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
            }} key={anime.mal_id} anime={anime}/>
        ))}
    </div>

    <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }}>
         <button disabled={page == 1} onClick={() => setPage(page - 1)}>Назад</button>
        <button onClick={() => setPage(page + 1)}>Вперед</button>
    </div>
   </div>
  )
}