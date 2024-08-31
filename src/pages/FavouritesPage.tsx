import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import FavouritesList from "../components/FavouritesList";

const FavouritesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>My Pokédex</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <FavouritesList />
      </IonContent>
    </IonPage>
  );
};

export default FavouritesPage;
