import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAll, getGenres , postNew, resetPost, verifyName } from "../Redux/Actions";
import Button from "../Rework front/Components/Buttons";
import Loading from "../Rework front/Components/Loading";
import s from './Styles/Form.module.css';


export default function Form (){
    const [storeGenres,storeCreated,postError,storeExistingName] = useSelector(state=>[state.genres,state.created,state.errorPost,state.alreadyExists])
    const dispatch = useDispatch();

    const [loaded,setLoaded] = useState(false);
    const [game,setGame] = useState({});
    const [errors,setErrors] = useState({});
    const [genres,setGenres] = useState([]);
    // const [showGenres,setShowGenres] = useState(false);
    const [platforms,setplatforms] = useState([])

    useEffect(()=>{
        if (storeGenres.length) setLoaded(true);
        else  dispatch(getGenres());
    },[storeGenres]);

    useEffect(()=>{
        setErrors(validation({...game}))
    },[storeExistingName])
    
    useEffect(()=>{
        if(storeCreated){
            setLoaded(true)
            alert('game created!')
            dispatch(resetPost())
        }
        if( !storeCreated && Object.keys(postError).length){
            alert('Error! Check form for errors')
        }
    },[storeCreated,postError])

    const validation = (data) =>{
        let errors ={};
        
        if(!data.name) errors.name='Obligatory field';
        if (data.name){
            if(storeExistingName) errors.name='Game already exists in database'
        }

        if(!data.platforms) errors.platforms='Obligatory field';

        if(!data.description) errors.description='Obligatory field';

        if(data.rating) {
            if (!/^\d*(\.\d+)?$/.test(data.rating)) errors.rating='Submit a valid rating';
            if (data.rating<1 || data.rating>5) errors.rating='Must be between 0 and 5'
        }

        if(data.released){
            //validacion formato fecha YYYYMMDD y fecha valida
            if (!/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(data.released)) errors.released='invalid date';
            else {
                let date = data.released.split('-');
                if (date[0]<1958) errors.released = 'Date must be posterior to 1958'
            };
        }   
        if(data.image) {
            //validacion para que sea imagen
            if (!/(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(data.image)) errors.image='Submit a valid link';
        }
        
        return errors
    }
    const handleChange = (event)=>{        
        setGame({
            ...game,
            [event.target.name]:event.target.value,
        })
        setErrors(validation({
            ...game,
            [event.target.name]:event.target.value,
        }))

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
    const handlePlatforms = ()=>{
        if (game.platforms){
            let inputPlat = platformPrep();
            setplatforms(inputPlat);
        }
    }

    const checkName = async(name)=>{
        if (name) dispatch(verifyName(name.toLowerCase()))
    }
    // const showGenre = ()=>{
    //     showGenres ? setShowGenres (false) :setShowGenres(true)
    // }
    
    const handleSubmit = (event)=>{
        event.preventDefault()
        if (!Object.keys(errors).length && Object.keys(game).length) {
            dispatch(postNew(game.name,game.description,game.released,game.rating,genres,platforms,game.image))
            setLoaded(false)
            dispatch(getAll())
        } else alert("Revise errores")
    }
return(
    <div>
        {
            loaded ? (
            <div className={s.mainDiv}>
                <h1 className={s.text}>New game:</h1>
                <form className={s.form} onSubmit={handleSubmit}>
                    <label className={s.text}>Name</label>
                        <input className={s.input} type="text" name="name" onChange={handleChange} onBlur={()=> checkName(game.name)}></input>
                        { errors.name ? (<span className={s.error}>{errors.name}</span>) :null}

                    <label className={s.text}>Platforms</label>
                        <input className={s.input} type='text' name='platforms' onChange={handleChange} onBlur={handlePlatforms}></input> 
                        {errors.platforms ? (<span className={s.error} id='errorPlatforms'>{errors.platforms}</span>) :(<span className={s.text}>Insert names sepparated by commas</span>)}

                    <label className={s.text}>Description</label>
                        <input className={s.input} type="text" name="description" onChange={handleChange}></input> 
                        {errors.description ? (<span className={s.error} id='errorDescription'>{errors.description}</span>) :null}

                    <label className={s.text}>Rating</label>
                        <input className={s.input} type='text' name='rating' onChange={handleChange} min='0' max='5'></input>
                        {errors.rating ? (<span className={s.error} id='errorRating'>{errors.rating}</span>) :null}

                    
                    <label className={s.text}>Released</label>                    
                      <input className={s.input} type='date' name='released' min='1958-01-01' max='2022-06-29' onChange={handleChange}/>
                      {errors.released ? (<span className={s.error} id='errorReleased'>{errors.released}</span>) :null}

                    
                    <label className={s.text}>Image</label>
                     <input className={s.input} type="text" name="image" onChange={handleChange}></input>
                     {errors.image ? (<span className={s.error} id='errorImage'>{errors.image}</span>) :null}
                    
                    <label className={s.margin} for={s["genresContainer"]}><Button text={"Genres"}/></label>
                    <input type="checkbox" id={s["genresContainer"]}/>
                    <div id={s["genresBox"]}>
                        <ul className={`${s.genreList} ${s.text}`}>
                                {
                                    storeGenres.map(genre=>(
                                        <li key={genre.id}><input type='checkbox' value={`${genre.id}`} onChange={handleGenreChange}></input>{genre.name}</li>
                                    ))
                                }
                        </ul>
                    </div>

                    <button className={s.button} type="submit">Submit</button>
       
                </form>
            </div>
            ) : <div className={s.loader}><Loading /></div>
        }
        
    </div>
)
}