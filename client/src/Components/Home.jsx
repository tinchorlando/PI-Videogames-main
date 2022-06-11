import { useEffect, useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { getAll } from "../Redux/Actions.js";
import Card from './Card.jsx';

export default function Home (){
    
    const [dataLoaded,setDataLoaded] = useState(false);
    const state = useSelector(store=>store);
    const dispatch = useDispatch();

    
    useEffect(()=>{
        if (!state.videogames.length) dispatch(getAll())
        if(state.videogames.length) setDataLoaded(true)

    },[state.videogames])


    let mapCard = (p)=>{
        return(
            <Card key={p.id} id={p.id} name={p.name} image={p.image}  genre={p.genre}/>
        )

    }
    return(
        <div>
            <h1>Videogames Proyect</h1>
            {
                state.searchedGames.length ? state.searchedGames.map(mapCard) :
                dataLoaded ?
                state.videogames.map(mapCard) : '...Loading'
            }            
        </div>
    )
}