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
const [games,setGames]=useState(videogames)
const dispatch = useDispatch()



const handleChange = (event)=>{
    
    if (event.target.checked){
        setGenreFilter([...genreFilter,event.target.value])
    }
    if (!event.target.checked){
        setGenreFilter(genreFilter.filter(p=>p!==event.target.value))
    }
    

}
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
                                    {p.name}<input type='checkbox' className="genreCheckbox" value={p.id} onChange={handleChange}></input>
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