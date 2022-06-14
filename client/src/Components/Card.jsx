import { Link } from "react-router-dom";
export default function Card (props){
    return(
        <div id={props.id}>
            <Link to={`/detail/${props.id}`}>
                <h2>{props.name}</h2>
                <img src={props.image} alt={`${props.name}'s foto`}/>
                <ul>
                    {
                        props.genres.map(p=>{
                            
                            return(
                                <li key={p}>{p}</li>
                            )
                        })
                    }
                </ul>
            </Link>            
        </div>
    )
}