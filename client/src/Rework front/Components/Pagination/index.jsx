import s from "./pagination.module.css";

export default function Pagination ({totalGames , paginate , notFound ,currentPage}){

    let pages = [];
    for (let i=1;i<=Math.ceil(totalGames/15);i++){
        pages.push(i)
    }
    return(
        <div>
            {totalGames>15 ? !notFound ? <ul className={s.container}>
                {
                pages.map(pageNumber=><li key={pageNumber}>{pageNumber===currentPage ? <a className={`${s.link} ${s.active}`} href="#">{pageNumber}</a> : <a className={s.link} href='#' onClick={()=>paginate(pageNumber)}>{pageNumber}</a>}</li>)
                }
            </ul> : null : null }
            
        </div>
    )
}