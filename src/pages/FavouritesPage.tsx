import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext } from "react";
import PokeContext from "../contexts/PokeContext";
import FavouritesList from "../components/FavouritesList";
import Loading from "../components/Loading";

const FavouritesPage: React.FC = () => {
  const { isLoading } = useContext(PokeContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Personal Pokédex</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>{isLoading ? <Loading /> : <FavouritesList />}</IonContent>
    </IonPage>
  );
};

export default FavouritesPage;
