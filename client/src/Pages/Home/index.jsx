import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { exitSearch, getAll, getGenres } from "../../Redux/Actions";
import CardContainer from "../../Components/CardContainer";
import Pagination from "../../Components/Pagination";
import FilterBar from "../../Components/FilterSearch";
import s from "../../Styles/Home.module.css";
import Loading from "../../Components/Loading";
import Button from "../../Components/Buttons";

export default function Home (){
    const [isLoading, setIsLoading] = useState(true);
    const [videogames, setVideogames] = useState({ list: [], key: "" });
    const [currentPage, setCurrentPage] = useState(1);

    const [storeGames, storeFiltered, storeSearched, searchedName, notFound] =
      useSelector((store) => [
        store.videogames,
        store.filteredGames,
        store.searchedGames,
        store.searchedName,
        store.notFound,
      ]);

    const dispatch = useDispatch();

    //initial loading and updater
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
        setIsLoading(false);
      }
    }, [storeGames]);

    
    useEffect(() => {
      //data selector ↓
        if (storeFiltered.length) {
          setVideogames({
            list: [...storeFiltered],
            key: "filtered",
          });
        } else if (storeSearched.length || searchedName) {
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
    }, [
      storeGames,
      storeFiltered,
      storeSearched,
      searchedName,
      videogames.key,
    ]);

    //pagination
    const lastIndex = currentPage *15;
    const startIndex = lastIndex - 15;
    const currentGames = videogames.list.slice(startIndex,lastIndex);
    const paginate = (pageNumber)=>setCurrentPage(pageNumber);

    const endSearch = ()=>{
        dispatch(exitSearch())
    };
    return (
      <div>
        <header>
          <h1>HENRY GAMES</h1>
          <section>
            <FilterBar setCurrentPage={setCurrentPage}/>
          </section>
        </header>
        <section>
          {isLoading ? (
            <div className={s.loader}><Loading /></div>
          ) : (
            <main>
              <CardContainer
              videogames={videogames}
              currentGames={currentGames}              
              searchedGame={searchedName}
              endSearch={endSearch}
              notFound={notFound}
              />
              <Pagination totalGames={videogames.list.length} paginate={paginate} notFound={notFound} currentPage={currentPage}/>
            </main>
          )}
        </section>
        <footer className={s.links}>
          <ul>
            <li className={s.linkContainer}>
              <Button text={<a className={s.link} href="https://www.linkedin.com/in/martin-orlando-developer/" target="_blank">LinkedIn</a>}/>
            </li>
            <li className={s.linkContainer}>
              <Button text={<a className={s.link} href="https://github.com/tinchorlando" target="_blank">Github</a>}/></li>
          </ul>
        </footer>
      </div>
    );
}