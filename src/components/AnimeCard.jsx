export function AnimeCard({anime, style}) {
    return (
        <div style={style}>
            <img src={anime.images.jpg.large_image_url} alt={anime.title} />
            <h1>{anime.title}</h1>
            <p>Source: {anime.source}</p>
            <p>Episodes: {anime.episodes}</p>
        </div>
    )
}