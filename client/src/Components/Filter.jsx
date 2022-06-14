import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { filtered } from "../Redux/Actions";



export default function Filter ({videogames}){
const [storeFiltered, storeGenres] = useSelector((store) => [
  store.filteredGames,
  store.genres,
]);
const [toggleBar,setToggleBar] = useState(false)
const [genreFilter,setGenreFilter] = useState([])
const [games,setGames]=useState([])
const dispatch = useDispatch()

useEffect(()=>{
    setGames([...videogames]) //tomo copia del valor pasado por props
},[])

const handleChange = (event)=>{    
    if (event.target.checked){
        setGenreFilter([...genreFilter,event.target.value])
    }
    if (!event.target.checked){
        setGenreFilter(genreFilter.filter(p=>p!==event.target.value))
    }    

    // dispatch(filtered(games.filter(p=>{
    //     let match;
    //     for (let i=0;i<genreFilter.length;i++){
    //         match=true;
    //         if(!p.genres.includes(genreFilter[i])) {
    //             match=false;
    //         }
    //     }
    //     if (match===true) return p
    // })))
}
useEffect(()=>{
    //al filtrar copia puedo recuperar al eliminar filtros
    dispatch(filtered(games.filter(p=>{
        let match;
        for (let i=0;i<genreFilter.length;i++){
            match=true;
            if(!p.genres.includes(genreFilter[i])) {
                match=false;
                break;
            }
        }
        if (match===true) return p
    })))
},[genreFilter])

const toggle = ()=>{
    toggleBar ? setToggleBar(false) : setToggleBar(true)
};

useEffect(()=>{

},)
return(
    <div>
        <img src='https://t3.ftcdn.net/jpg/03/20/78/84/360_F_320788475_nEiLVViOBewea7taZWqNUR0lJAMTAaSo.jpg' alt='filter' onClick={toggle}/>
        {
            toggleBar ? (<nav>
                <button className="collapsible">Genre Filters</button>
                    <div className="content">
                        <ul>
                            {
                                storeGenres.map(p=>
                                <li key={p.id}>
                                    {p.name}<input type='checkbox' className="genreCheckbox" value={p.name} onChange={handleChange}></input>
                                </li>
                                )
                            }
                        </ul>
                    </div>
                <button className="collapsible">Api or DB</button>
                    <div className="content">

                    </div>
                <button className="collapsible">alfabetic</button>
                    <div className="content">

                    </div>
                <button className="collapsible">Rating</button>
                    <div className="content">

                    </div>
                </nav>  ) : null
        }
        
    </div>
    );
}