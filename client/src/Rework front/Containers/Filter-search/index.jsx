import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exitFilters, filterBy, orderSort } from "../../../Redux/Actions";
import SearchBar from "../../../Components/SearchBar";
import s from "./filter.module.css"
import Button from "../../Components/Buttons";

export default function FilterBar({ setCurrentPage }) {
  let [storeFiltered, storeGenres, storeVideogames, storeSearched] =
    useSelector((store) => [
      store.filteredGames,
      store.genres,
      store.videogames,
      store.searchedGames,
    ]);
  // const [toggleBar, setToggleBar] = useState(false);
  // const [toggleFilters, setToggleFilters] = useState(false);
  // const [toggleOrder, setToggleOrder] = useState(false);
  // const [toggleOrigin, setToggleOrigin] = useState(false);
  const [genreFilter, setGenreFilter] = useState([]);
  const [order, setOrder] = useState([]);
  const [games, setGames] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('filter effect iniciado')
    if (storeSearched && storeSearched.length) {
      setGames([...storeSearched]);
      console.log('searched')
    }
    else {
      setGames([...storeVideogames]);
      console.log('nosearched')
    }
  }, [storeSearched,storeVideogames]);

  const handleFilterChange = (event) => {
    if (event.target.checked) {
      setGenreFilter([...genreFilter, event.target.value]);
    }
    if (!event.target.checked) {
      setGenreFilter(genreFilter.filter((p) => p !== event.target.value));
    }
  };
  const closeFilters = ()=>{
    dispatch(exitFilters())
  }

  useEffect(() => {
    //al filtrar copia puedo recuperar al eliminar filtros
    if (genreFilter.length) {
      dispatch(
        filterBy(
          games.filter((p) => {
            let match;
            for (let i = 0; i < genreFilter.length; i++) {
              match = true;
              if (genreFilter[i] === "api") {
                let regexp = /.*[a-zA-Z].*/;
                if (!regexp.test(p.id)) return p;
              }
              if (genreFilter[i] === "dataBase") {
                let regexp = /.*[a-zA-Z].*/;
                if (regexp.test(p.id)) return p;
              }
              if (!p.genres.includes(genreFilter[i])) {
                match = false;
                break;
              }
            }
            if (match === true) return p;
          })
        )
      );
      setCurrentPage(1);
    } else {
      closeFilters()
    }
  }, [genreFilter]);
  
  const handleOrderChange = (event) => {
    let fil = [];
    if (storeFiltered.length) fil = [...storeFiltered];
    else {
      fil = [...games];
    }
    if (event.target.value === "alphInc") {
      fil.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
        return 0;
      });
    }
    if (event.target.value === "alphDec") {
      fil.sort((a, b) => {
        if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        return 0;
      });
    }
    if (event.target.value === "ratInc") {
      fil.sort((a, b) => {
        return a.rating - b.rating;
      });
    }
    if (event.target.value === "ratDec") {
      fil.sort((a, b) => {
        return b.rating - a.rating;
      });
    }
    setOrder(fil);
  };
  useEffect(() => {
    if (order.length) dispatch(orderSort(order));
  }, [order]);

  return (
    <nav>
      <ul className={s.mainList}>
        <li>
        <label for={s["filterControl"]}><Button text={"Filter"}/></label>
        <input type="checkbox" id={s["filterControl"]} />
          <div className={s.boxContainer}>
          <h3 className={s.subtit}>by Genre</h3>
          <ul className={s.list}>
          {storeGenres.map((p) => (
              <li key={p.id}>
                <input
                  type="checkbox"
                  value={p.name}
                  onChange={handleFilterChange}
                  ></input>
                  {p.name}
              </li>
            ))}
          </ul>
          <h3 className={s.subtit}>by Origin</h3>
          <ul className={s.list}>
          <li>
              <input
                type="checkbox"
                name="origin"
                value="api"
                onChange={handleFilterChange}
              ></input>
              Api
            </li>
            <li>
              <input
                type="checkbox"
                name="origin"
                value="dataBase"
                onChange={handleFilterChange}
              ></input>
              Database
            </li>
          </ul>
          </div></li>
        <li className={s.searchbar}>
          <SearchBar />
        </li>
        <li>
          <label for={s["orderControl"]}><Button text="Order"/></label>
          <input type="checkbox" id={s["orderControl"]}/>
          <ul className={s.list}>
            <li className={s.orderLi}>
              <input
                type="radio"
                className={s.radio}
                name="orderInput"
                value="alphInc"
                onChange={handleOrderChange}
              ></input>
              A-Z
            </li>
            <li className={s.orderLi}>
              <input
                type="radio"
                className={s.radio}
                name="orderInput"
                value="alphDec"
                onChange={handleOrderChange}
              ></input>
              Z-A
            </li>
            <li className={s.orderLi}>
              <input
                type="radio"
                className={s.radio}
                name="orderInput"
                value="ratDec"
                onChange={handleOrderChange}
              ></input>
              Best rating
            </li>
            <li className={s.orderLi}>
              <input
                type="radio"
                className={s.radio}
                name="orderInput"
                value="ratInc"
                onChange={handleOrderChange}
              ></input>
              Worst rating
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}