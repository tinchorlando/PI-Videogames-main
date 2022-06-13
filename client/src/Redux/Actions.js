import axios from 'axios';
import { GET_ALL , GET_GENRES , GET_ONE , SAVE_SEARCH , POST_NEW , GET_SOME , EXIT_SEARCH } from './types/ActionTypes.js'


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
        type:'EXIT_DETAIL'
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

