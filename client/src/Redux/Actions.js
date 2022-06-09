const { GET_ALL , GET_GENRES , GET_ONE , PAGINATE , POST_NEW} = require('./types/ActionTypes.js');
import axios from 'axios';

export const getAll = (name)=>{
    return async dispatch =>{
        let query = `?name=${name}`
        let res = await axios.get(`http://localhost:3001/videogames/${ name ? query : null }`)
        dispatch({
            type:GET_ALL,
            payload:res.data,
        })
    }
};
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
            const post = await axios.post('http://localhost:3001/videogames',{
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
export const paginate = (pageNumber)=>{
    return{
        type:PAGINATE,
        payload:pageNumber,
    }
}
