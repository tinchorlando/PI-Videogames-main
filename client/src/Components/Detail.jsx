import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { exitDetail, getOne } from "../Redux/Actions";

export default function Detail (){
    let state = useSelector(state=>state.gameDetail);
    const [dataLoaded,setDataLoaded] = useState(false);
    const { id } = useParams()
    const dispatch = useDispatch()


    useEffect(()=>{
        if (!state.name) dispatch(getOne(id))
        else setDataLoaded(true)         
    },[state])
    //componentWillUnmount↓
    useEffect(()=>{
        return()=>{
            dispatch(exitDetail())
        }},[])
    return(
        <div>
            {
                dataLoaded ? (
                <div>
                    <h2>{state.name}</h2>
                    <br></br>
                    <img src={state.image} alt={`${state.name}'s foto`}/>
                    <br></br>
                    <ul>
                        {
                            state.genres.map(p=>{
                                return(
                                    <li>{p.name}</li>
                                )
                            })
                        }
                    </ul>
                    <p>{state.description}</p>
                    <br></br>
                    <span>{state.released}</span>
                    <br></br>
                    <span>{state.rating}</span>
                    <br></br>
                    <ul>
                        {
                            state.platforms.map(p=>{
                                return(
                                    <li>{p}</li>
                                )
                            })
                        }
                    </ul>
                    
                </div>
                ) : '...Loading'
            }
        </div>
    )
}