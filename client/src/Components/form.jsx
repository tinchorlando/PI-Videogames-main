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
    const [showGenres,setShowGenres] = useState(false);
    const [platforms,setplatforms] = useState([])

    useEffect(()=>{
        if (storeGenres.length && !created) setLoaded(true);
        else {
            if (!storeGenres.length) dispatch(getGenres());
            if (created) dispatch(resetPost());
        }
    },[storeGenres]);    

    const validation = (data) =>{
        let errors ={};
        
        if(!data.name) errors.name='Submit a name';

        if(!data.platforms) errors.platforms='Submit at least one platform';

        if(!data.description) errors.description='Submit a description';

        if(data.rating) {
            if (!/^\d*(\.\d+)?$/.test(data.rating)) errors.rating='Submit a valid rating';
            if (data.rating<1 || data.rating>5) errors.rating='Must be between 0 and 5'
        }

        if(data.released){
            //validacion formato fecha YYYYMMDD y fecha valida
            errors.released='error'
        }
        if(!data.image) {
            //validacion para que sea imagen
            errors.image='error'
        }
        
        return errors
    }
    const handleChange = (event)=>{        
        setGame({
            ...game,
            [event.target.name]:event.target.value,
        })

    }
    const handleGenreChange = (event)=>{        
        if (event.target.checked) setGenres([...genres,event.target.value])
        else setGenres(genres.filter(p=>p!==event.target.value))
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
    const platSetting = ()=>{
        if (game.platforms){
            let inputPlat = platformPrep();
            setplatforms(inputPlat);
        }
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        setErrors(validation({
            ...game,
            [event.target.name]:event.target.value,
        }))
        // dispatch(postNew(game.name,game.description,game.released,game.rating,genres,platforms,game.image))
        // console.log(game.released)
    }

    const showGenre = ()=>{
        showGenres ? setShowGenres (false) :setShowGenres(true)
    }
return(
    <div>
        {
            loaded ? (
            <div>
                <h1>Formulario piola</h1>
                <form onSubmit={handleSubmit}>
                    <label>Name*</label>
                        <input type="text" name="name" onChange={handleChange} autoFocus></input>
                        { errors.name ? (<span id='errorName'>{errors.name}</span>) :null}

                    <br></br>

                    <label>Platforms*</label>
                        <input type='text' name='platforms' onChange={handleChange} onBlur={platSetting}></input> 
                        {errors.platforms ? (<span id='errorPlatforms'>{errors.platforms}</span>) :(<span>Insert names sepparated by commas</span>)}

                    <br></br>

                    <label>Description*</label>
                        <input type="text" name="description" onChange={handleChange}></input> 
                        {errors.description ? (<span id='errorDescription'>{errors.description}</span>) :null}
                    <br></br>

                    <label>Rating</label>
                        <input type='text' name='rating' onChange={handleChange} min='0' max='5'></input>
                        {errors.rating ? (<span id='errorRating'>{errors.rating}</span>) :null}

                    <br></br>                
                    
                    <label>Released</label>                    
                      <input type='date' name='released' min='1958-01-01' max='2022-06-29' onChange={handleChange}/>
                      {errors.released ? (<span id='errorReleased'>{errors.released}</span>) :null}

                    <br></br>
                    
                    <label>Image</label>
                     <input type="text" name="image" onChange={handleChange}></input>
                     {errors.image ? (<span id='errorImage'>{errors.image}</span>) :null}
                    
                    <br></br>

                    <label>Genres</label>
                        <div id='genresContainer'>
                         <input type='button' id='showGenres' value='Show genres' onClick={showGenre}></input>
                        
                        {
                            showGenres ? (<ul>
                                {
                                    storeGenres.map(genre=>(
                                        <li key={genre.id}><input type='checkbox' value={`${genre.id}`} onChange={handleGenreChange}></input>{genre.name}</li>
                                    ))
                                }
                                </ul>) : null
                        }
                        
                        </div>

                    <br></br>

                    <button type="submit">Agregar!</button>
        
                </form>
            </div>
            ) : '...Loading'
        }
        
    </div>
)
}