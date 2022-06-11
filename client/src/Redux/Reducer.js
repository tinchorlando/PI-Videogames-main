const { GET_ALL , GET_GENRES , GET_ONE , PAGINATE , POST_NEW , GET_SOME , EXIT_DETAIL, EXIT_SEARCH } = require('./types/ActionTypes.js');

const initialState = {
    videogames: [],
    searchedGames: [],
    keyword:'',
    gameDetail: {},
    page: [],
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
        case PAGINATE:
            return {

            };
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
        default:
            return state
    }
}

export default rootReducer;