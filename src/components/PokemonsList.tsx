import { useCallback, useEffect, useState } from "react";
import {
  IonCol,
  IonGrid,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRouterLink,
  IonRow,
} from "@ionic/react";

import PokemonCard from "./PokemonCard";

import { css } from "../../styled-system/css";

type PokemonsListProps = {
  pokemons: string[];
  listType?: string;
  sorting?: string;
};

const PokemonsList: React.FC<PokemonsListProps> = ({
  pokemons,
  listType = "all",
  sorting,
}) => {
  const pokemonInView = 60;
  const [offset, setOffset] = useState<number>(pokemonInView);
  const [viewedPokemons, setViewedpokemons] = useState<string[]>([]);

  const loadPokemons = useCallback(() => {
    let pokemonsList = [...pokemons];

    /* Perform sorting */
    if (sorting === "reverse") {
      pokemonsList = [...pokemons].reverse();
    }
    if (sorting === "alphabet") {
      pokemonsList = pokemonsList.sort((a, b) => a.localeCompare(b));
    }
    if (sorting === "alpharev") {
      pokemonsList = pokemonsList.sort((a, b) => a.localeCompare(b)).reverse();
    }

    const section = pokemonsList.slice(0, offset);
    setViewedpokemons(section);
  }, [offset, pokemons, sorting]);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  return (
    <>
      {pokemons && pokemons.length ? (
        <>
          {" "}
          <IonGrid>
            <IonRow
              className={css({
                "--ion-grid-columns": "3",
                md: { "--ion-grid-columns": "4" },
                lg: { "--ion-grid-columns": "6" },
              })}
            >
              {viewedPokemons?.map((pokemon) => (
                <IonCol key={pokemon} size="1">
                  <PokemonCard pokemon={pokemon} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
          {viewedPokemons.length !== pokemons.length && (
            <IonInfiniteScroll
              onIonInfinite={(ev) => {
                const newOffset = offset + pokemonInView;
                setOffset(newOffset);
                setTimeout(() => ev.target.complete(), 500);
              }}
            >
              <IonInfiniteScrollContent
                loadingText="Loading more Pokemones..."
                loadingSpinner="bubbles"
              ></IonInfiniteScrollContent>
            </IonInfiniteScroll>
          )}
        </>
      ) : (
        <>
          <h3>You don't have {listType} pokemons yet.</h3>
          {listType !== "custom" && (
            <IonRouterLink routerLink={`/pokemons`}>
              <p>Visit Pokémons list first</p>
            </IonRouterLink>
          )}
        </>
      )}
    </>
  );
};

export default PokemonsList;
