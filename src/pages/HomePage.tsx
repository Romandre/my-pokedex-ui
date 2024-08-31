import {
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { css } from "../../styled-system/css";

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Personal Pokédex</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={css({})}>
        <IonRouterLink routerLink={`/pokemons`}>
          <IonCard
            className={css({
              color: "white",
              bg: "linear-gradient(135deg, #0a5b98 0%, #0b8db2, 70%, #0cb5c8 100%)",
              padding: "16px",
              marginBottom: "16px",
            })}
          >
            <h3>Check all Pokémons</h3>
          </IonCard>
        </IonRouterLink>
        <IonRouterLink routerLink={`/favourites`}>
          <IonCard
            className={css({
              color: "white",
              bg: "linear-gradient(135deg, #f0a10c 15%,  #0cb5c8)",
              padding: "16px",
              marginBottom: "16px",
            })}
          >
            <h3>View your favourites</h3>
          </IonCard>
        </IonRouterLink>
        <IonRouterLink routerLink={`/pokemons`}>
          <IonCard
            className={css({
              color: "white",
              bg: "linear-gradient(135deg, #5dc40c 15%, #0cb5c8)",
              padding: "16px",
            })}
          >
            <h3>Create your own Pokémon</h3>
          </IonCard>
        </IonRouterLink>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
