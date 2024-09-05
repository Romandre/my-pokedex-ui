import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext } from "react";

import PokeContext from "../contexts/PokeContext";
import PokemonsList from "../components/PokemonsList";
import Loading from "../components/Loading";

import { css } from "../../styled-system/css";

const FavouritesPage: React.FC = () => {
  const { favouritePokemons, isLoading } = useContext(PokeContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Personal Pokédex</IonTitle>
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
            <PokemonsList pokemons={favouritePokemons} listType="favourite" />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default FavouritesPage;
