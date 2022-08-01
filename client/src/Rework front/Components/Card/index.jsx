import { Link } from "react-router-dom";
import s from '../../../Components/Styles/Card.module.css';
export default function Card (props){
    return(
        <div id={props.id}>

            <Link className={s.Link} to={`/detail/${props.id}`}>

                <div className={s.card}>

                    <h2 className={s.cardName}>{props.name}</h2>

                    <img className={s.cardImg} src={props.image} alt={`${props.name}'s foto`}/>

                    <ul className={s.genreList}>
                        {
                            props.genres.map(p=>{
                                
                                return(
                                    <li key={p}>{p}</li>
                                )
                            })
                        }
                    </ul>

                </div>
            </Link>            
        </div>
    )
}