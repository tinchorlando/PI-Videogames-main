import { useEffect, useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { getAll , exitSearch , getGenres } from "../Redux/Actions.js";
import  Pagination from './Pagination.jsx'
import CardHolder from "./CardHolder.jsx";

export default function Home (){
    const [videogames,setVideogames]=useState({list:[],key:''});
    const [dataLoaded,setDataLoaded] = useState(false);
    const [currentPage,setCurrentPage]=useState(1);
    
    const [storeGames, storeFiltered, storeSearched, searchedName] =
      useSelector((store) => [
        store.videogames,
        store.filteredGames,
        store.searchedGames,
        store.searchedName,
      ]);
    const dispatch = useDispatch();
    

    //initial games loading
    useEffect(() => {
      if (!storeGames.length) {
        dispatch(getAll());
        dispatch(getGenres());
      }
      if (storeGames.length) {
        setVideogames({
          list: [...storeGames],
          key: "list",
        });
        setDataLoaded(true);
      }
    }, [storeGames]);

    useEffect(() => {
      //data selector ↓
      if (storeFiltered.length) {
        setVideogames({
          list: [...storeFiltered],
          key: "filtered",
        });
      } else if (storeSearched.length) {
        setVideogames({
          list: [...storeSearched],
          key: "searched",
        });
      } else {
        setVideogames({
          list: [...storeGames],
          key: "list",
        });
      }
    }, [storeGames, storeFiltered, storeSearched]);
    
    //pagination ↓
    const lastIndex = currentPage * 15;
    const startIndex = lastIndex - 15;
    const currentGames = videogames.list.slice(startIndex,lastIndex)

    const paginate = (pageNumber)=> setCurrentPage(pageNumber);

    //close Search
    const endSearch = ()=>{
        dispatch(exitSearch())
    }
    return (
      <div>
        <CardHolder
          videogames={videogames}
          currentGames={currentGames}
          loaded={dataLoaded}
          searchedGame={searchedName}
          endSearch={endSearch}
        />
        <Pagination totalGames={videogames.list.length} paginate={paginate} />
      </div>
    );
}