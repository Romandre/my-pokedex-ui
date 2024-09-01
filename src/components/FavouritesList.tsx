import { memo, useContext } from "react";
import { IonCol, IonGrid, IonRouterLink, IonRow } from "@ionic/react";
import { css } from "../../styled-system/css";

import PokeContext from "../contexts/PokeContext";
import PokemonCard from "./PokemonCard";

const FavouritesList: React.FC = () => {
  const { favouritePokemons } = useContext(PokeContext);
  const formattedPokemons = favouritePokemons?.map((name) => ({ name }));

  return (
    <>
      {favouritePokemons.length ? (
        <>
          <p className={css({ margin: "12px 0", fontSize: "24px" })}>
            Favourites list
          </p>
          <IonGrid>
            <IonRow
              className={css({
                "--ion-grid-columns": "3",
                md: { "--ion-grid-columns": "4" },
                lg: { "--ion-grid-columns": "6" },
              })}
            >
              {formattedPokemons?.reverse().map((item) => (
                <IonCol key={item.name} size="1">
                  <PokemonCard pokemon={item} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </>
      ) : (
        <>
          <h3>You don't have favourite pokemons yet.</h3>
          <IonRouterLink routerLink={`/pokemons`}>
            <p>Visit Pokémons list first</p>
          </IonRouterLink>
        </>
      )}
    </>
  );
};

export default memo(FavouritesList);
