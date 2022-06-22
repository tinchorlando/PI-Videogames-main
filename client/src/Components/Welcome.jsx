import { Link } from "react-router-dom";
import s from './Styles/welcome.module.css';

export default function Welcome (){
    return(
        <div className={s.bgrd}>
            <img className={s.img} src='https://media.istockphoto.com/vectors/joystick-low-poly-blue-vector-id961784080?k=20&m=961784080&s=612x612&w=0&h=CDvkH-c-SIqKak3wgK2qdh9AJkKO60mUcBMEWhH-m_I=' alt='Welcome mage'/>
            <Link className={s.button} to='/home'>Welcome!</Link>
        </div>
    )
}