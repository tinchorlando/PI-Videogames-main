import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOne } from "../Redux/Actions";
export default function Card (props){
    const dispatch = useDispatch()
    const handleClick = ()=>{
        dispatch(getOne(props.id))
    }
    return(
        <div id={props.id} onClick={handleClick}>
            <Link to='/detail'>
                <h2>{props.name}</h2>
                <img src={props.image} alt={`${props.name}'s foto`}/>
                <ul>
                    {
                        props.genre.map(p=>{
                            return(
                                <li>{p.name}</li>
                            )
                        })
                    }
                </ul>
            </Link>            
        </div>
    )
}