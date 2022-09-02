import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { exitDetail, getOne } from "../Redux/Actions";
import Loading from "../Rework front/Components/Loading";
import s from './Styles/Detail.module.css';
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

    const divStyle ={
        backgroundImage: `url(${state.image})`,        
        backgroundSize:'cover',
        backgroundRepeat:'norepeat',
        backgroundPositionX:'center',
        borderRadius:'20px',
        margin: '10px auto',
        padding: '10px',
        boxShadow: 'rgba(0 0 0 / 95%) 0px 0px 15px',        
    }

//box-shadow: rgba(0 0 0 / 95%) 0px 5px 15px
    return(
        <div style={divStyle}>
            {
                dataLoaded ? (
                <div className={s.content}>
                    <div className={`${s.desc} ${s.shadow}`}>
                        <h1 className={`${s.txt} ${s.tit}`}>{state.name}</h1>                    
                        <h3 className={`${s.txt} ${s.tit}`}>Description:</h3>
                        <p>{state.description}</p>
                    </div>
                    <div className={`${s.num} ${s.shadow}`}>
                        <h4 className={`${s.dat} ${s.txt}`}>
                            Released on: {state.released}
                        </h4>

                        <h4 className={`${s.dat} ${s.txt}`}>
                            Rating: {state.rating ? state.rating : 'No data'}
                        </h4>
                    </div>

                    <div className={`${s.listados} ${s.shadow}`}>
                        <ul className={s.bigList}>
                            <li><h3 className={s.txt}>Genres:</h3>
                                <ul className={s.lists}>
                                {
                                state.genres.length ? state.genres.map(p=>{
                                    return(
                                        <li key={p.id}>{p.name}</li>
                                    )
                                }) : 'No data'
                                }
                                </ul>
                            </li>
                            <li><h3 className={s.txt}>Platforms</h3>
                                <ul className={s.lists}>
                                {
                                state.platforms.length ? state.platforms.map(p=>{
                                    return(
                                        <li key={p}>{p}</li>
                                    )
                                }) : 'No data'
                                }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                ) : (<div className={s.load}><Loading/></div>)
            }
        </div>
    )
}