import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext, useState } from "react";
import PokeContext from "../contexts/PokeContext";
import PokemonsList from "../components/PokemonsList";

import { Pokemon } from "../types/types";
import { css } from "../../styled-system/css";

const FavouritesPage: React.FC = () => {
  const { pokemons } = useContext(PokeContext);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Pokemon[]>([]);

  const startSearch = (value: string) => {
    setSearchQuery(value);
    if (value.length) {
      const result = pokemons.filter((item) => item.name.includes(value));
      setSearchResult(result);
    } else {
      setSearchResult([]);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Personal Pokédex</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            animated={true}
            placeholder="Search Pokémon"
            value={searchQuery}
            debounce={100}
            onIonInput={(e) => startSearch(e.target.value as string)}
            className={css({
              padding: "8px 12px",
            })}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {searchQuery.length && searchResult.length === 0 ? (
          <h2>Sorry, no Pokémon found...</h2>
        ) : (
          <PokemonsList
            pokemons={searchResult.length ? searchResult : pokemons}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default FavouritesPage;
