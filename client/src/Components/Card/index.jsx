import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import s from '../../Styles/Card.module.css';
import Loading from "../Loading";
export default function Card (props){
    const [showImage,setShowImage] = useState(false)
    let firstRender = true
    useEffect(()=>{
        if (firstRender){            
            setTimeout(()=>{            
                setShowImage(true)
            },3000)
            firstRender=false;
        }
    },[])
    
    return(
        <div id={props.id}>

            <Link className={s.Link} to={`/detail/${props.id}`}>

                <div className={s.card}>

                    <h2 className={s.cardName}>{props.name}</h2>
                    {
                        showImage ? <img className={s.cardImg} src={props.image} alt={`${props.name}'s foto`}/> : <Loading/>
                    }
                    

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