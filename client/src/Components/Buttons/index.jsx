import s from "../../Styles/Button.module.css"
export default function Button ({text , action,argAction , arg}){
    const handleClick = ()=>{
        if (typeof action === 'function'){
            action()
        }
        if (typeof argAction === "function"){
            argAction(arg)
        }
    }
    return(
        <div className={s.btn} onClick={handleClick}>{text}</div>
    )
}