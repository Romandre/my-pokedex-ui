import { memo, useCallback, useContext, useEffect, useState } from "react";
import {
  IonCol,
  IonGrid,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRow,
} from "@ionic/react";
import { css } from "../../styled-system/css";

import PokemonCard from "./PokemonCard";

import { Pokemon } from "../types/types";

interface PokemonsListProps {
  pokemons: Pokemon[];
}

const PokemonsList: React.FC<PokemonsListProps> = ({ pokemons }) => {
  const pokemonInView = 60;
  const [offset, setOffset] = useState<number>(pokemonInView);
  const [viewedPokemons, setViewedpokemons] = useState<Pokemon[]>([]);

  const loadPokemons = useCallback(() => {
    const section = pokemons.slice(0, offset);
    setViewedpokemons(section);
  }, [offset, pokemons]);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  return (
    <>
      <IonGrid>
        <IonRow
          className={css({
            "--ion-grid-columns": "3",
            md: { "--ion-grid-columns": "4" },
            lg: { "--ion-grid-columns": "6" },
          })}
        >
          {viewedPokemons?.map((item) => (
            <IonCol key={item.name} size="1">
              <PokemonCard pokemon={item} />
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
  );
};

export default memo(PokemonsList);
