import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exitFilters, filterBy, orderSort } from "../../../Redux/Actions";
import SearchBar from "../../../Components/SearchBar";


export default function FilterBar ({setCurrentPage}){
    let [storeFiltered, storeGenres, storeVideogames, storeSearched] =
      useSelector((store) => [
        store.filteredGames,
        store.genres,
        store.videogames,
        store.searchedGames,
      ]);
    const [toggleBar, setToggleBar] = useState(false);
    const [toggleFilters, setToggleFilters] = useState(false);
    const [toggleOrder, setToggleOrder] = useState(false);
    const [toggleOrigin, setToggleOrigin] = useState(false);
    const [genreFilter, setGenreFilter] = useState([]);
    const [order, setOrder] = useState([]);
    const [games, setGames] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
      if (storeSearched.length) setGames([...storeSearched]);
      else setGames([...storeVideogames]);
    }, [storeSearched]);
    const handleFilterChange = (event) => {
      if (event.target.checked) {
        setGenreFilter([...genreFilter, event.target.value]);
      }
      if (!event.target.checked) {
        setGenreFilter(genreFilter.filter((p) => p !== event.target.value));
      }
    };

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
        dispatch(exitFilters());
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
      <div>
        <ul>
          <li>
            <h3>Filter</h3>
            <div>
              <ul>
                {storeGenres.map((p) => (
                  <li key={p.id}>
                    {p.name}
                    <input
                      type="checkbox"
                      value={p.name}
                      onChange={handleFilterChange}
                    ></input>
                  </li>                  
                ))}
                <li><input type='checkbox' name='origin' value='api' onChange={handleFilterChange}></input>Api</li>
                <li><input type='checkbox' name='origin' value='dataBase' onChange={handleFilterChange}></input>Database</li>
              </ul>
            </div>
          </li>
          <li>
            <h3>Order</h3>
            <div>
                <ul>
                    <li><input type='radio' className={s.radio} name='orderInput' value='alphInc' onChange={handleOrderChange}></input>A-Z</li>
                    <li><input type='radio'  className= {s.radio} name='orderInput' value='alphDec' onChange={handleOrderChange}></input>Z-A</li>
                    <li><input type='radio' className=  {s.radio} name='orderInput' value='ratDec' onChange={handleOrderChange}></input>Best rating</li>
                    <li><input type='radio'  className= {s.radio} name='orderInput' value='ratInc' onChange={handleOrderChange}></input>Worst rating</li>
                </ul>
            </div>
          </li>
          <li>
            <SearchBar />
          </li>
        </ul>
      </div>
    );
}