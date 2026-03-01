export async function getTopAnime(page) {
    const req = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`)
    const data = await req.json()
    return data
}