import Card from "./Card"
import Filter from "./Filter"
import SearchBar from "./SearchBar"

export default function CardHolder({ videogames , currentGames , loaded , searchedGame , endSearch}){
    const mapCard = (p=>(<Card key={p.id} id={p.id} name={p.name} image={p.image}  genres={p.genres}/>))

    if (loaded){
        return(
            <div>
                <div>
                    <Filter videogames={videogames.list}/>
                    <SearchBar/>
                </div>
                
                {
                    videogames.key === 'searched' ? (
                    <div>
                        <h2>Search results for {searchedGame}:</h2> <button onClick={endSearch}> Close search</button>                       
                        {
                            currentGames.map(mapCard)
                        }    
                    </div>
                    ) :(
                    <div>
                        <h2>Games:</h2>
                        {
                            currentGames.map(mapCard)
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