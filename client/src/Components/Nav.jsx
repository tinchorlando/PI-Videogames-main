import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getSome } from "../Redux/Actions";



export default function Nav (){
    const location = useLocation();
    const dispatch = useDispatch();

    const [input,setInput] = useState({});

    
    const handleChange = (event)=>{
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        dispatch(getSome(input.searchBar))
        
    }

    return(
        <div>
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/form'>Create</NavLink>
            {
                location.pathname === '/home' ? <input name='searchBar' placeholder='Search videogame' onChange={handleChange}></input> : null
            }
        </div>
    )
}