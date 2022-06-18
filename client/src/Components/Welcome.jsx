import { Link } from "react-router-dom";
import s from './Styles/welcome.module.css';

export default function Welcome (){
    return(
        <div>
            <Link to='/home'>Welcome!</Link>
        </div>
    )
}