import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Filter from "./Filter";
import SearchBar from "./SearchBar";
import s from './Styles/Nav.module.css'
export default function Nav (){
    const {pathname} = useLocation()
    return(
        <div>
            <header className={s.navBar}>
                <div className={s.navigation}>
                    <NavLink to='/home'>Home</NavLink>
                    <NavLink to='/form'>Create</NavLink>
                </div>
            {
                pathname === '/home' ? (
                <div className={s.filtering}>
                    <SearchBar />
                    <Filter/>
                </div>
                ) : null
            }
            
            </header>
        </div>
    )
}