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
import Loading from "../components/Loading";

import { css } from "../../styled-system/css";

const PokemonsListPage: React.FC = () => {
  const { pokemons, isLoading } = useContext(PokeContext);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string[]>([]);

  const startSearch = (value: string) => {
    setSearchQuery(value);
    if (value.length) {
      const result = pokemons.filter((item) => item.includes(value));
      setSearchResult(result);
    } else {
      setSearchResult([]);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
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
          <>
            {isLoading ? (
              <Loading />
            ) : (
              <PokemonsList
                pokemons={searchResult.length ? searchResult : pokemons}
              />
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default PokemonsListPage;
