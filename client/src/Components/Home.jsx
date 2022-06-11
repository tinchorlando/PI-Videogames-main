import { useEffect, useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { getAll } from "../Redux/Actions.js";
import Card from './Card.jsx';
import SearchBar from "./SearchBar.jsx";
import CardHolder from "./CardHolder.jsx";

export default function Home (){
    const [videogames,setVideogames]=useState({list:[],key:''});
    const [dataLoaded,setDataLoaded] = useState(false);
    const [currentPage,setCurrentPage]=useState(1);
    
    const state = useSelector(store=>store);
    const dispatch = useDispatch();
    

    //para carga de videojuegos ↓
    useEffect(()=>{
        if (!videogames.length) dispatch(getAll())
            setVideogames({
                list:[...state.videogames],
                key:'list'
            });
            setDataLoaded(true);
    },[]);

    
    useEffect(()=>{
        if (state.filteredGames.length){
            setVideogames({
                list:[...state.filteredGames],
                key:'filtered'
            });
        }
        else if(state.searchedGames.length){
            setVideogames({
                list:[...state.searchedGames],
                key:'searched'
            });           
        }
        else {
            setVideogames({
                list:[...state.videogames],
                key:'list'
            });
        }
    },[state.videogames,state.filteredGames,state.searchedGames]);


    return(
        <div>
            <CardHolder videogames={videogames} loaded={dataLoaded} />
        </div>
    )
}