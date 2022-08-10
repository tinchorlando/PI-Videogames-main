import Card from "../../Components/Card";
import s from "./cardContainer.module.css";
import Button from "../../Components/Buttons/index.jsx"


export default function CardContainer ({videogames,currentGames,searchedGame,endSearch,notFound}){
    const mapCard = (p=>(<Card key={p.id} id={p.id} name={p.name} image={p.image} genres={p.genres}/>))
   
    return (
      <div>
        {videogames.key === "searched" ? (
          <div>
            <section className={s.results}>
              <h2 className={s.tit}> Search results for {searchedGame}:</h2><div className={s.btn}>
              <Button action={endSearch} text="Close search"/></div>
            </section>
            <section className={s.results}>
              {notFound ? (
                <h3 className={s.tit}>No matches found for {searchedGame}</h3>
              ) : (
                <section className={s.games}>
                {currentGames.map(mapCard)}
                </section>
              )}
            </section>
          </div>
        ) : (
          <div>
            <section className={s.games}>
              {notFound ? (
                <h3 className={s.tit}>No matches found</h3>
              ) : (
                currentGames.map(mapCard)
              )}
            </section>
          </div>
        )}
      </div>
    );
}