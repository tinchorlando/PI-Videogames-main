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
const [toggleOrigin,setToggleOrigin] = useState(false);
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
const showOrigin = ()=>{
    toggleOrigin ? setToggleOrigin(false) : setToggleOrigin(true)
    
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
        <nav className={s.nav}>            
            <img className={s.filterImg} src='https://t3.ftcdn.net/jpg/03/20/78/84/360_F_320788475_nEiLVViOBewea7taZWqNUR0lJAMTAaSo.jpg' alt='filter' onClick={toggle}/>

            {
            toggleBar ? (
            <div className={s.filterContainer}>
                <button className={`${s.button} ${s.filterButton}`} onClick={showFilters}>Filters</button>
                {
                toggleFilters ? (
                    <div>
                        <div className={s.genresContainer}>
                            <ul className={s.checkboxes}>
                                {
                                    storeGenres.map(p=>
                                    <li key={p.id}>
                                        {p.name}<input className={s.checkbox} type='checkbox' value={p.name} onChange={handleFilterChange}></input>
                                    </li>
                                    )
                                }
                            </ul>
                        </div>                    
                        <button className={`${s.button} ${s.asd}`} onClick={showOrigin}>Data origin</button>

                        {
                            toggleOrigin ? (
                            <ul className={`${s.checkboxes} ${s.originContainer}`}>
                                <li><input type='checkbox' className={s.checkbox} name='origin' value='api' onChange={handleFilterChange}></input>Api</li>
                                <li><input type='checkbox' className={s.checkbox} name='origin' value='dataBase' onChange={handleFilterChange}></input>Database</li>
                            </ul>
                            ) : null
                        }                                         
                    </div>
                    ) : null
                    }
                
                <button className={`${s.button} ${s.orderingButton}`} onClick={showOrdering}>Order</button>
                {toggleOrder ? 
                (
                    <div className={s.radios}>
                        <input type='radio' className={s.radio} name='orderInput' value='alphInc' onChange={handleOrderChange}></input>A-Z
                        <input type='radio'  className= {s.radio} name='orderInput' value='alphDec' onChange={handleOrderChange}></input>Z-A
                        <input type='radio' className=  {s.radio} name='orderInput' value='ratDec' onChange={handleOrderChange}></input>Best rating
                        <input type='radio'  className= {s.radio} name='orderInput' value='ratInc' onChange={handleOrderChange}></input>Worst rating

                    </div>                
                ) : null}
                    
            </div>  
                ) : null
        }
        </nav>        
    );
}