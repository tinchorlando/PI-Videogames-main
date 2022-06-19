import { Link } from "react-router-dom";
import s from './Styles/welcome.module.css';

export default function Welcome (){
    return(
        <div>
            <Link className={s.button} to='/home'>Welcome!</Link>
        </div>
    )
}