import Card from "./Card"
import Filter from "./Filter"
import SearchBar from "./SearchBar"
import s from './Styles/CardHolder.module.css'

export default function CardHolder({ videogames , currentGames , loaded , searchedGame , endSearch,notFound}){

    const mapCard = (p=>(<Card key={p.id} id={p.id} name={p.name} image={p.image}  genres={p.genres}/>))


    if (loaded){
        return(
            <div>
                <header className={s.tops}>
                    <SearchBar />
                    <Filter />
                </header>         
                {
                    videogames.key === 'searched' ? (
                    <div className={s.searchs}>
                        <h2>Search results for {searchedGame}:</h2> <button onClick={endSearch}> Close search</button>                       
                        {
                            notFound ? `No matches found for ${searchedGame}` : currentGames.map(mapCard) 
                        }    
                    </div>
                    ) : (
                    <div>
                            <div className={s.gamesHolder}>
                        {
                            notFound ? 'No matches found' : currentGames.map(mapCard)
                        }
                            </div>
                    </div>
                    ) 
                
                }
            </div>
            
            )
    }else {
        return (<h2>Loading...</h2>)
    }
}