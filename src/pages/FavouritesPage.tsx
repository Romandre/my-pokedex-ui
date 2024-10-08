import { useContext, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonPopover,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
  withIonLifeCycle,
} from "@ionic/react";

import PokeContext from "../contexts/PokeContext";
import PokemonsList from "../components/PokemonsList";
import SortingMenu from "../components/SortingMenu";
import Loading from "../components/Loading";

import { css } from "../../styled-system/css";
import { caretBack, funnelOutline } from "ionicons/icons";

const FavouritesPage: React.FC = () => {
  const { favouritePokemons, isLoading, fetchFavourites } =
    useContext(PokeContext);
  const [sorting, setSorting] = useState<string>("");
  const router = useIonRouter();

  const favourites = [...favouritePokemons].reverse();
  const isSortingVisible = true;

  useIonViewWillEnter(() => {
    fetchFavourites();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            })}
          >
            <div
              onClick={() => {
                router.push("/pokemons", "back");
              }}
            >
              <div
                className={css({
                  display: "flex",
                  paddingLeft: "12px",
                  alignItems: "center",
                  gap: "8px",
                })}
              >
                <IonIcon
                  id="popover-button"
                  icon={caretBack}
                  className={css({
                    fontSize: "24px",
                  })}
                ></IonIcon>
                <p
                  className={css({
                    fontSize: "14px",
                    fontWeight: "500",
                    textTransform: "uppercase",
                  })}
                >
                  Pokémons list
                </p>
              </div>
            </div>
            {isSortingVisible && (
              <div
                className={css({
                  width: "36px",
                  paddingTop: "6px",
                  fontSize: "26px",
                })}
              >
                <IonIcon id="fav-sorting" icon={funnelOutline}></IonIcon>
              </div>
            )}
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <p className={css({ margin: "12px 0", fontSize: "24px" })}>
              Favourite Pokémons
            </p>
            <PokemonsList
              pokemons={favourites}
              listType="favourite"
              sorting={sorting}
            />
            {isSortingVisible && (
              <IonPopover
                trigger="fav-sorting"
                dismissOnSelect={true}
                showBackdrop={false}
              >
                <SortingMenu setSorting={setSorting}></SortingMenu>
              </IonPopover>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default withIonLifeCycle(FavouritesPage);
