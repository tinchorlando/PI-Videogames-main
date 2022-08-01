import Card from "../../Components/Card";


export default function CardContainer ({videogames,currentGames,searchedGame,endSearch,notFound}){
    const mapCard = (p=>(<Card key={p.id} id={p.id} name={p.name} image={p.image} genres={p.genres}/>))
    return (
      <div>
        {videogames.key === "searched" ? (
          <div>
            <section>
              <h2> Search results for {searchedGame}:</h2>
              <button onClick={endSearch}>Close search</button>
            </section>
            <section>
              {notFound ? (
                <h3>No matches found for {searchedGame}</h3>
              ) : (
                currentGames.map(mapCard)
              )}
            </section>
          </div>
        ) : (
          <div>
            <section>
              {notFound ? (
                <h3>No matches found</h3>
              ) : (
                currentGames.map(mapCard)
              )}
            </section>
          </div>
        )}
      </div>
    );
}