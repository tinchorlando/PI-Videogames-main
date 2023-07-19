export const apiFetch = async url=>{
    const gameList = await axios.get(url)
    return gameList.data
}
