import { NavLink } from "react-router-dom";
import s from './Styles/Nav.module.css'
export default function Nav (){
    return(
        <div>
            <header className={s.navBar}>
                <div className={s.navigation}>
                    <NavLink className={s.navBtn} activeClassName={s.activeBtn} to='/home'>Home</NavLink>
                    <NavLink className={s.navBtn} activeClassName={s.activeBtn} to='/form'>Create</NavLink>
                </div>            
            </header>
        </div>
    )
}