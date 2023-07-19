import { useEffect, useState } from "react";
import { apiFetch } from "../services/data-fetching";


export default function useFetch(url){
    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(null)
    const [error,setError] = useState(null)

    useEffect(()=>{
        setLoading(true);
        setData(null);
        setError(null);
        apiFetch(url)
        .then(
            res=>{
                setLoading(false);
                res && setData(res)
            }
        )
        .catch(err=>{
            setLoading(false);
            setError(err)
        })
    },[url])

    return {data,loading,error}
}