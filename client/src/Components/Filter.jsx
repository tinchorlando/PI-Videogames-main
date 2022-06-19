import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { exitFilters, filterBy, orderSort } from "../Redux/Actions";
import s from './Styles/Filter.module.css';


export default function Filter (){
let [storeFiltered, storeGenres, storeVideogames , storeSearched] = useSelector((store) => [
  store.filteredGames,
  store.genres,
  store.videogames,
  store.searchedGames,
]);
const [toggleBar,setToggleBar] = useState(false);
const [toggleFilters,setToggleFilters] = useState(false);
const [toggleOrder,setToggleOrder] = useState(false);
const [genreFilter,setGenreFilter] = useState([]);
const [order,setOrder] = useState([]);
const [games,setGames]=useState([]);
const dispatch = useDispatch();

const toggle = ()=>{
    toggleBar ? setToggleBar(false) : setToggleBar(true)
};
const showFilters = ()=>{
    toggleFilters ? setToggleFilters(false) : setToggleFilters(true)
}
const showOrdering = ()=>{
    toggleOrder ? setToggleOrder(false) : setToggleOrder(true)
}

useEffect(()=>{
    if (storeSearched.length) setGames([...storeSearched])
    else setGames([...storeVideogames])
},[storeSearched])

const handleFilterChange = (event)=>{    
    if (event.target.checked){
        setGenreFilter([...genreFilter,event.target.value])
    }
    if (!event.target.checked){
        setGenreFilter(genreFilter.filter(p=>p!==event.target.value))
    }    
}

useEffect(()=>{
    //al filtrar copia puedo recuperar al eliminar filtros
    if (genreFilter.length){
        dispatch(filterBy(games.filter(p=>{
            let match;
            for (let i=0;i<genreFilter.length;i++){
                match=true;
                if(genreFilter[i]==='api'){
                    let regexp = /.*[a-zA-Z].*/;
                    if(!regexp.test(p.id)) return p
                }
                if(genreFilter[i]==='dataBase'){
                    let regexp = /.*[a-zA-Z].*/;
                    if(regexp.test(p.id)) return p
                }
                if(!p.genres.includes(genreFilter[i])) {
                    match=false;
                    break;
                }
            }
            if (match===true) return p
        })))
    }
    else {
        dispatch(exitFilters())
    }
},[genreFilter])

const handleOrderChange = (event) => {
    let fil =[]
    if (storeFiltered.length) fil =[...storeFiltered];
    else {fil = [...games]};
    if (event.target.value === "alphInc") {
        fil.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
            return 0;
        });
    };
    if (event.target.value==='alphDec'){
        fil.sort((a,b)=>{
            if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            return 0;
        })
        
    }
    if (event.target.value === 'ratInc'){
        fil.sort((a,b)=>{
           return a.rating-b.rating
        })        
    }
    if (event.target.value === 'ratDec'){
        fil.sort((a,b)=>{
            return b.rating-a.rating
        })
    }
    setOrder(fil);
};
useEffect(()=>{   
    if (order.length) dispatch(orderSort(order))        
},[order])


return(
    <div>
        <img className={s.filterImg} src='https://t3.ftcdn.net/jpg/03/20/78/84/360_F_320788475_nEiLVViOBewea7taZWqNUR0lJAMTAaSo.jpg' alt='filter' onClick={toggle}/>
        {
            toggleBar ? (<nav>
                <button className={s.button} onClick={showFilters}>Filters</button>
                {
                toggleFilters ? (
                    <div className={s.checkboxes}>
                        <div className="content">
                            <ul>
                                {
                                    storeGenres.map(p=>
                                    <li key={p.id}>
                                        {p.name}<input className={s.checkbox} type='checkbox' value={p.name} onChange={handleFilterChange}></input>
                                    </li>
                                    )
                                }
                            </ul>
                        </div>
                        <button className={s.button}>Data origin</button>
                            <div className={s.checkboxes}>
                                <input type='checkbox' className={s.checkbox} name='origin' value='api' onChange={handleFilterChange}></input>Api
                                <input type='checkbox' className={s.checkbox} name='origin' value='dataBase' onChange={handleFilterChange}></input>Database
                            </div>
                                                        
                    </div>
                    ) : null
                    }
                
                <button className={s.button} onClick={showOrdering}>order</button>
                {toggleOrder ? 
                (
                    <div className={s.radios}>
                        <input type='radio' className={s.radio} name='orderInput' value='alphInc' onChange={handleOrderChange}></input>alphabetical incremental
                        <input type='radio'  className= {s.radio} name='orderInput' value='alphDec' onChange={handleOrderChange}></input>alphabetical decremental
                        <input type='radio' className=  {s.radio} name='orderInput' value='ratDec' onChange={handleOrderChange}></input>Rating decremental
                        <input type='radio'  className= {s.radio} name='orderInput' value='ratInc' onChange={handleOrderChange}></input>Rating incremental

                    </div>                
                ) : null}
                    
                </nav>  
                ) : null
        }
        
    </div>
    );
}