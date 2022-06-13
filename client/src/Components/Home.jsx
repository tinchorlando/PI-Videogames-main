import { useEffect, useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { getAll , exitSearch } from "../Redux/Actions.js";
import  Pagination from './Pagination.jsx'
import CardHolder from "./CardHolder.jsx";

export default function Home (){
    const [videogames,setVideogames]=useState({list:[],key:''});
    const [dataLoaded,setDataLoaded] = useState(false);
    const [currentPage,setCurrentPage]=useState(1);
    
    const state = useSelector(store=>store);
    const dispatch = useDispatch();
    

    //initial games loading
    useEffect(()=>{
        if (!state.videogames.length) dispatch(getAll())
        setVideogames({
                list:[...state.videogames],
                key:'list'
            });
        if (state.videogames.length) setDataLoaded(true);
    },[state.videogames]);

    useEffect(()=>{
        //data selector ↓
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
    
    //pagination ↓
    const lastIndex = currentPage * 15;
    const startIndex = lastIndex - 15;
    const currentGames = videogames.list.slice(startIndex,lastIndex)

    const paginate = (pageNumber)=> setCurrentPage(pageNumber);

    //close Search
    const endSearch = ()=>{
        dispatch(exitSearch())
    }
    return(
        <div>            
            <CardHolder videogames={videogames} currentGames={currentGames} loaded={dataLoaded} searchedGame={state.searchedName} endSearch={endSearch}/>
            <Pagination totalGames={videogames.list.length} paginate={paginate}/>
            
        </div>
    )
}