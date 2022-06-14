export default function Pagination ({totalGames , paginate}){

    let pages = [];
    for (let i=1;i<=Math.ceil(totalGames/15);i++){
        pages.push(i)
    }
    return(
        <div>
            
            <ul>
                {
                pages.map(pageNumber=><li key={pageNumber}><a href='#' onClick={()=>paginate(pageNumber)}>{pageNumber}</a></li>)
                }
            </ul>
        </div>
    )
}