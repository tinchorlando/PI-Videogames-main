import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { exitSearch, getGenres , postNew, resetPost } from "../Redux/Actions";


export default function Form (){
    const [storeGenres,created,postError] = useSelector(state=>[state.genres,state.created,state.errorPost])
    const dispatch = useDispatch();

    const [loaded,setLoaded] = useState(false);
    const [game,setGame] = useState({});
    const [errors,setErrors] = useState({});
    const [genres,setGenres] = useState([]);
    const [platforms,setPlatforms] = useState([])

    useEffect(()=>{
        if (storeGenres.length && !created) setLoaded(true);
        else {
            if (!storeGenres.length) dispatch(getGenres());
            if (created) dispatch(resetPost());
        }
    },[storeGenres]);

    const handleChange = (event)=>{
        setGame({
            ...game,
            [event.target.name]:event.target.value,
        })
    }
    const platformPrep = ()=>{
        let prePlat = game.platforms;
        prePlat = prePlat.split(',');
        let platforms = []
        if (prePlat.length>0){
            prePlat.forEach(p=>{
                platforms.push(p.trim())
            })
        } else platforms.push(prePlat)
        return platforms
    }
    const deleteGenre = (id)=>{
        setGenres(genres.filter(p=>p!==id))
    }
    const handleSubmit = async(event)=>{
        event.preventDefault()
        let inputPlatforms = platformPrep()
        await setPlatforms(inputPlatforms)
        console.log('games: ',game);
        console.log('platf: ',platforms);
        console.log('genres: ',genres);
        // if (Object.keys(errors).length===0){
        //     dispatch(postNew(game.name,game.description,'1995-08-21',game.rating,genres,platforms,game.image))
        //     if (created){
        //         alert(`${game.name} was successfully created`)
        //         //resetear inputs
        //     } else alert(`Error: ${postError}`);
        // } else alert(errors)
    }


    const genreMap = (id)=>{
        let genresAux = [...storeGenres]
        let getGenreName = genresAux.filter(genre=>genre.id===id)
        console.log('obj: ',getGenreName);
        console.log('value; ',getGenreName.name);
        return(<li key={id}><span>{getGenreName.name}</span><button onClick={(id)=>{deleteGenre(id)}}>X</button></li>)
    }    
return(
    <div>
        {
            loaded ? (
            <div>
                <h1>Formulario piola</h1>
                <form onSubmit={handleSubmit}>
                    <label>Name*</label>
                    <input type="text" name="name" onChange={handleChange}></input> 
                    <label>Description*</label>
                    <input type="text" name="description" onChange={handleChange}></input> 
                    <label>Released</label>
                    <input type="text" name='released' placeholder='YYYY-MM-DD'></input>
                    <label>Rating</label>
                    <input type='number' name='rating' onChange={handleChange}></input>
                    <label>Platforms*</label>
                    <input type='text' name='platforms' onChange={handleChange}></input> <span>Insert names sepparated by commas</span>
                    <label>Image</label>
                    <input type="text" name="image" onChange={handleChange}></input>             
                    <label>Genres</label>
                    <select name="genres" onChange={ (event)=>
                        
                            setGenres([...genres,parseInt(event.target.value)])
                        
                        } multiple>
                        { 
                        //mapeo de genres 
                        storeGenres.map(genre=><option key={genre.id} value={genre.id}>{`${genre.name}`}</option>)
                        // store.map(episode=><option key={episode.id} value={episode.id} >{`${episode.id}: ${episode.name}`}</option>)
                        }
                    </select>
                    <label>Selected genres:</label>
                        <div>
                            <ul>
                                {
                                    genres.forEach(genreMap)
                                }
                            </ul>
                        </div>
                    <button type="submit">Agregar!</button>
        
                </form>
            </div>
            ) : '...Loading'
        }
        
    </div>
)
}