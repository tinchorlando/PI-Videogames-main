const { GET_ALL , GET_GENRES , GET_ONE , PAGINATE , POST_NEW } = require('./types/ActionTypes.js');

const initialState = {
    videogames: [],
    gameDetail: {},
    page: [],
    genres: [],
}

const rootReducer = (state = initialState , action)=>{
    switch (action.type){
        case GET_ALL:
            return{

            };
        case GET_ONE:
            return{

            };
        case GET_GENRES:
            return{

            };
        case POST_NEW:
            return{

            };
        case PAGINATE:
            return {

            };
        default:
            return state
    }
}

export default rootReducer;