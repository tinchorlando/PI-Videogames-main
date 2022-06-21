import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { exitDetail, getOne } from "../Redux/Actions";
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
        backgroundSize: 'cover',

    }
    return(
        <div style={divStyle}>
            {
                dataLoaded ? (
                <div className={s.content}>
                    <h2 className={`${s.txt} ${s.tit}`}>
                        {state.name}
                    </h2>                    
                    <h3 className={`${s.txt} ${s.tit}`}>
                        Description:
                    </h3>
                    <p className={s.desc}>
                        {state.description}
                    </p>
                    <div className={s.num}>
                    <h4 className={`${s.dat} ${s.txt}`}>
                        Released on: {state.released}
                    </h4>

                    <h4 className={`${s.dat} ${s.txt}`}>
                        Rating: {state.rating ? state.rating : 'No data'}
                    </h4>
                    </div>

                    
                    <div className={s.listados}>
                        <h3 className={s.txt}>
                            Genres:
                        </h3>
                        <ul className={s.lists}>
                            {
                                state.genres.length ? state.genres.map(p=>{
                                    return(
                                        <li key={p.id}>{p.name}</li>
                                    )
                                }) : 'No data'
                            }
                        </ul>
                        <h3 className={s.txt}>
                            Platforms: 
                        </h3>
                        <ul className={s.lists}>
                            {
                                state.platforms.length ? state.platforms.map(p=>{
                                    return(
                                        <li key={p}>{p}</li>
                                    )
                                }) : 'No data'
                            }
                        </ul>
                    </div>
                </div>
                ) : '...Loading'
            }
        </div>
    )
}