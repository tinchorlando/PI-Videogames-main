import { NavLink } from "react-router-dom";

export default function Nav (){
    return(
        <div>
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/form'>Create</NavLink>
        </div>
    )
}