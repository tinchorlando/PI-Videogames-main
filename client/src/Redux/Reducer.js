const { GET_ALL , GET_GENRES , GET_ONE , SAVE_SEARCH , POST_NEW , GET_SOME , EXIT_DETAIL, EXIT_SEARCH , FILTER_GENRE , EXIT_FILTER , FILTER_ORDER , FILTER_ORIGIN , POST_RESET} = require('./types/ActionTypes.js');

const initialState = {
    videogames: [],
    searchedGames: [],
    searchedName:'',
    notFound:false,
    gameDetail: {},
    genres: [],
    filteredGames:[],
    sortedGames:[],
    created:false,
    errorPost:''
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
            
            if (action.payload.length) return{
                ...state,
                notFound:false,
                searchedGames:action.payload,
            }
            else return {
                ...state,
                notFound:true,
            }
        case GET_GENRES:
            return{
                ...state,
                genres:action.payload,
            };
        case POST_RESET:
            return{
                ...state,
                created:false,
                errorpost:''
            }
        case POST_NEW:
            if (action.payload === 'Created') return {
                ...state,
                created:true,
            }
            else return {
                ...state,
                errorPost:action.payload,
            }
            ;
        case EXIT_DETAIL:
            return{
                ...state,
                gameDetail:{}
            }
        case EXIT_SEARCH:
            return{
                ...state,
                searchedGames:[],
                searchedName:''
            }
        case SAVE_SEARCH:
            return{
                ...state,
                searchedName:action.payload,
            }        
        case EXIT_FILTER:            
            return{
                ...state,
                filteredGames:[],
                notFound:false
            }
        case FILTER_ORDER:
            return{
                ...state,
                filteredGames:action.payload,
            }
        case FILTER_ORIGIN:
            if (action.payload.length) return{
                ...state,
                notFound:false,
                filteredGames:action.payload,
            }
            else return{
                ...state,
                notFound:true
            }
        case FILTER_GENRE:
            if(action.payload.length) return{
                ...state,
                notFound:false,
                filteredGames:action.payload,
            }
            else return {
                ...state,
                notFound:true,
            }
        default:
            return state
    }
}

export default rootReducer;