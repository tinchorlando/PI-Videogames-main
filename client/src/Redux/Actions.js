import axios from 'axios';
import { GET_ALL , GET_GENRES , GET_ONE , SAVE_SEARCH , POST_NEW , GET_SOME , EXIT_SEARCH , EXIT_DETAIL , FILTER_GENRE , EXIT_FILTER , FILTER_ORDER , POST_RESET} from './types/ActionTypes.js'


export const getAll = ()=>{
    return async dispatch =>{        
        axios.get(`http://localhost:3001/videogames/`)    
        .then(res=>res.data)
        .then(videogames=>{
            dispatch({
                type:GET_ALL,
                payload:videogames,
            })
        })
    }
};
export const getSome = (name)=>{
    return async dispatch =>{        
        axios.get(`http://localhost:3001/videogames/?name=${name}`)
        .then(res=>res.data)
        .then(videogames=>{
            dispatch({
                type:GET_SOME,
                payload:videogames,
            })
        })
    }
}
export const verifyName = (name)=>{
    return async dispatch =>{
        axios.get(`http://localhost:3001/videogames/?name=${name}`)
        .then(res=>res.data)
        .then((videogames)=>{
            if (videogames.filter(p=>{ let regexp = /.*[a-zA-Z].*/            
                if (regexp.test(p.id) && (p.name.toLowerCase())===name) return p
            }).length){
            dispatch({
                type:'VERIFY_NAME',
                payload:true
            })
            }else {
                dispatch({
                    type:'VERIFY_NAME',
                    payload:false,
                })
            }
        })
        .catch(()=>{
            dispatch({
                type:'VERIFY_NAME',
                payload:false,
            })
        })
    }
}

export const getGenres = ()=>{
    return async dispatch =>{
        const res= await axios.get('http://localhost:3001/genres');
        dispatch({
            type:GET_GENRES,
            payload:res.data,
        })
    }
}

export const getOne = (id) =>{
    return async dispatch =>{
        const res = await axios.get(`http://localhost:3001/videogame/${id}`);
        dispatch({
            type:GET_ONE,
            payload:res.data,
        })
    }
}

export const postNew = (name,description,released,rating,genre,platforms,image)=>{
    return async dispatch=>{
        try{
            await axios.post('http://localhost:3001/videogames',{
                name,
                description,
                released,
                rating,
                genre,
                platforms,
                image            
            });
            dispatch({
                type:POST_NEW,
                payload:'Created',
            })
        } catch (error){
            dispatch({
                type:POST_NEW,
                payload:error,
            })
        }

    }
}
export const exitDetail = ()=>{
    return {
        type:EXIT_DETAIL,
    }
}
export const exitSearch = ()=>{
    return{
        type:EXIT_SEARCH,
    }
}
export const saveSearch = (searchName)=>{
    return{
        type:SAVE_SEARCH,
        payload:searchName,
    }
}
export const filterBy = (array)=>{
    return{
        type:FILTER_GENRE,
        payload:array,
    }
}
export const exitFilters = ()=>{
    return{
        type:EXIT_FILTER
    }
}
export const orderSort = (filteredArray)=>{
    return{
        type:FILTER_ORDER,
        payload:filteredArray,
    }
}
export const resetPost =()=>{
    return {
        type:POST_RESET,
    }
}
