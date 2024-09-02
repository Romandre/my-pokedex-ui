import {
  IonAlert,
  IonAvatar,
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { css } from "../../styled-system/css";
import { useContext } from "react";
import { useIonRouter } from "@ionic/react";
import AuthContext from "../contexts/AuthContext";

import profile from "../assets/profile.png";
import PokeContext from "../contexts/PokeContext";

const ProfilePage: React.FC = () => {
  const { user, logout, flushUsers } = useContext(AuthContext);
  const { flushFavourites, flushCustomPokemons } = useContext(PokeContext);
  const router = useIonRouter();

  const handleLogout = () => {
    logout();
    router.push("/", "forward");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Personal Pokédex - Account settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p className={css({ margin: "12px 0", fontSize: "24px" })}>
          Profile settings
        </p>
        <IonCard
          className={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
          })}
        >
          <div
            className={css({
              width: "20%",
            })}
          >
            <IonAvatar>
              <img alt="profile" src={profile} />
            </IonAvatar>
          </div>

          <div
            className={css({
              fontSize: "1.6rem",
              textTransform: "capitalize",
            })}
          >
            {user?.username}
          </div>
          <IonButton id="present-alert">Log out</IonButton>
        </IonCard>

        <IonAlert
          trigger="present-alert"
          header="Really want to logout?"
          buttons={[
            {
              text: "No",
            },
            {
              text: "Yes",
              handler: () => {
                handleLogout();
              },
            },
          ]}
        ></IonAlert>

        <IonCard
          className={css({
            marginTop: "24px",
            padding: "16px",
          })}
        >
          <p className={css({ margin: "0 0 12px", fontSize: "20px" })}>
            Manage data
          </p>

          {user?.id === 1 && user?.username === "admin" && (
            <>
              <IonButton
                id="flush-users"
                color={"danger"}
                className={css({ display: "block", marginTop: "16px" })}
              >
                Flush users
              </IonButton>
              <IonAlert
                trigger="flush-users"
                header="Really want to flush users data?"
                subHeader="Admin user will not be removed!"
                buttons={[
                  {
                    text: "No",
                  },
                  {
                    text: "Yes",
                    handler: () => {
                      flushUsers();
                    },
                  },
                ]}
              ></IonAlert>
            </>
          )}

          <IonButton
            id="flush-pokemons"
            color={"danger"}
            className={css({ display: "block", marginTop: "16px" })}
          >
            Flush all your favourites & custom pokemons
          </IonButton>

          <IonAlert
            trigger="flush-pokemons"
            header="Really want to flush favourites and custom pokemons data?"
            subHeader="All your favourite and custom Pokemons will be removed permanently."
            buttons={[
              {
                text: "No",
              },
              {
                text: "Yes",
                handler: () => {
                  flushFavourites();
                  flushCustomPokemons();
                },
              },
            ]}
          ></IonAlert>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
