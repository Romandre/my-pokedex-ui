import { useContext, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonPopover,
  IonSearchbar,
  IonToolbar,
} from "@ionic/react";

import PokeContext from "../contexts/PokeContext";
import PokemonsList from "../components/PokemonsList";
import SortingMenu from "../components/SortingMenu";
import Loading from "../components/Loading";

import { css } from "../../styled-system/css";
import { funnelOutline } from "ionicons/icons";

const PokemonsListPage: React.FC = () => {
  const { pokemons, isLoading } = useContext(PokeContext);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [sorting, setSorting] = useState<string>("");
  const [searchSorting, setSearchSorting] = useState<string>("");

  const startSearch = (value: string) => {
    setSearchQuery(value);
    if (value.length) {
      const result = pokemons.filter((item) => item.includes(value));
      setSearchResult(result);
    } else {
      setSearchResult([]);
      setSearchSorting("");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <div
            className={css({
              display: "flex",
              alignItems: "center",
            })}
          >
            <div
              className={css({
                width: "calc(100% - 36px)",
              })}
            >
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
            </div>
            <div
              className={css({
                width: "36px",
                fontSize: "26px",
              })}
            >
              <IonIcon id="sorting" icon={funnelOutline}></IonIcon>
            </div>
          </div>
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
              <>
                <PokemonsList
                  pokemons={searchResult.length ? searchResult : pokemons}
                  sorting={searchResult.length ? searchSorting : sorting}
                />
                <IonPopover
                  trigger="sorting"
                  dismissOnSelect={true}
                  showBackdrop={false}
                >
                  <SortingMenu
                    setSorting={
                      searchResult.length ? setSearchSorting : setSorting
                    }
                  ></SortingMenu>
                </IonPopover>
              </>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default PokemonsListPage;
