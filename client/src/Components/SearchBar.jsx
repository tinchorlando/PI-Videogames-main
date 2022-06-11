import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSome } from "../Redux/Actions";


export default function SearchBar (){
    const [input,setInput] = useState({});
    const dispatch = useDispatch();

    const handleChange = (event)=>{
        setInput({
            ...input,
            [event.target.name]:event.target.value,
        })
        
    };
    const handleSubmit = (event)=>{
        event.preventDefault()
        dispatch(getSome(input.searchBar))
        setInput({
            'searchBar':''
        })
    };
    return(
        <form onSubmit={handleSubmit}>
            <input name='searchBar' placeholder='Search videogame' value={input.searchBar} onChange={handleChange}></input><button type='submit'>Search</button>
        </form>
    )
}