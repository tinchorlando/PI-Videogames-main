import Card from "./Card"
import SearchBar from "./SearchBar"

export default function CardHolder({ videogames , currentGames , loaded , searchedGame , endSearch}){
    if (loaded){
        return(
            <div>
                <div>
                    <span>filter 1</span> <span> filter 2 </span> <span>filter 3</span><SearchBar/>
                </div>
                
                {
                    videogames.key === 'searched' ? (
                    <div>
                        <h2>Search results for {searchedGame}:</h2> <button onClick={endSearch}> Close search</button>                       
                        {
                            currentGames.map(p=><Card key={p.id} id={p.id} name={p.name} image={p.image}  genre={p.genre}/>)
                        }    
                    </div>
                    ) :(
                    <div>
                        <h2>Games:</h2>
                        {
                            currentGames.map(p=><Card key={p.id} id={p.id} name={p.name} image={p.image}  genre={p.genre}/>)
                        }
                    </div>
                    )
                
                }
            </div>
            
            )
    }else {
        return (<h2>Loading...</h2>)
    }
}