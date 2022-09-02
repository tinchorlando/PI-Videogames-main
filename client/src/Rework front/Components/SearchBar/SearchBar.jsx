import { useState } from "react";
import { useDispatch } from "react-redux";
import { exitFilters, getSome , saveSearch } from "../../../Redux/Actions";
import s from "../../../Components/Styles/SearchBar.module.css"


export default function SearchBar (){
    const [input,setInput] = useState({
        searchBar:''
    });
    const dispatch = useDispatch();

    const handleChange = (event)=>{
        setInput({
            ...input,
            searchBar:event.target.value,
        })
        
    };
    const handleSubmit = (event)=>{
        event.preventDefault()
        
        if(!input.searchBar){
            alert('Ingrese un nombre')
        }else{
            dispatch(exitFilters())
            dispatch(saveSearch(input.searchBar))
            dispatch(getSome(input.searchBar))
        }
        setInput({
            searchBar:''
        })
        
    };
    return(
        <form className={s.search} onSubmit={handleSubmit}>
            <input className={s.input} name='searchBar' placeholder='Search videogame' value={input.searchBar} onChange={handleChange}></input><button className={s.btn} type='submit'>Search</button>            
        </form>
    )
}