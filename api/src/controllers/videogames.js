
const { apiQuery, findAllGamesDb, apiGameCollector , searchGamesDb } = require("../services");
const { API_KEY } = process.env;

const getPromisesFromApi = () => {
    const MAX_PAGES = 5;
    let pagenumer = 1;
    let promiseArray = [];
    for (let i = 0; i < MAX_PAGES; i++) {
        let URL = `https://api.rawg.io/api/games?key=${API_KEY}&page=${pagenumer}`
        promiseArray.push(
            apiQuery(URL)
            .then(res => res.results)
            .catch(err=> new Error(err))
        );
        pagenumer += 1;
    }
    // return promiseArray
    let games = Promise.all(promiseArray)
    .then(res=>res.flat(Infinity))
    .then(res=> apiGameCollector(res))
    .catch(err => new Error({message: err}));
    return games;
};

const getAllFromDb = ()=>{
    const allGames = findAllGamesDb()
    .then(res => res)
    .catch(err => new Error(err))
    return allGames
}

const searchFromApi = name =>{
    const URL = `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
    const foundGames = apiQuery(URL)
    .then( res => apiGameCollector(res.results))
    .catch( err => new Error(err))
    return foundGames
}
const searchFromDb = name=>{
    const foundGames = searchGamesDb(name)
    .then(res=>res)
    .catch(err => new Error(err))
    return foundGames
}
const getGames = async (name = null) =>{
    if (name){
        const apiGames = await searchFromApi(name)
        const dbGames = await searchFromDb(name)
        if (dbGames){
            let gameList = [...dbGames,...apiGames]
            return gameList.slice(0,15)
        }
        return apiGames
    } else{
        const apiGames = await getPromisesFromApi();
        const dbGames = await getAllFromDb();
        if (dbGames) return [...apiGames,...dbGames]
        return apiGames
    }
}
module.exports = {
    getGames
};
