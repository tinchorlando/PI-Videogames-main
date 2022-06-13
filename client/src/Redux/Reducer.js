const { GET_ALL , GET_GENRES , GET_ONE , SAVE_SEARCH , POST_NEW , GET_SOME , EXIT_DETAIL, EXIT_SEARCH } = require('./types/ActionTypes.js');

const initialState = {
    videogames: [],
    searchedGames: [],
    searchedName:'',
    gameDetail: {},
    genres: [],
    filteredGames:[],
}

const rootReducer = (state = initialState , action)=>{
    switch (action.type){
        case GET_ALL:
            return{
                ...state,
                videogames:action.payload,
            };
        case GET_ONE:
            return{
                ...state,
                gameDetail:action.payload,
            };
        case GET_SOME:
            return{
                ...state,
                searchedGames:action.payload,
            }
        case GET_GENRES:
            return{
                ...state,
                genres:action.payload,
            };
        case POST_NEW:
            if (action.payload === 'Created') return 'Success!'
            else return 'Failed!'
            ;
        case EXIT_DETAIL:
            return{
                ...state,
                gameDetail:{}
            }
        case EXIT_SEARCH:
            return{
                ...state,
                searchedGames:[]
            }
        case SAVE_SEARCH:
            return{
                ...state,
                searchedName:action.payload,
            }
        default:
            return state
    }
}

export default rootReducer;