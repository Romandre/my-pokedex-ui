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

const ProfilePage: React.FC = () => {
  const { user, logout, flushUsers, flushFavourites } = useContext(AuthContext);
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

        {user?.id === 1 && user?.username === "admin" && (
          <>
            <h3>Danger zone</h3>
            <IonButton
              id="flush-users"
              color={"danger"}
              className={css({ display: "block", marginTop: "16px" })}
            >
              Flush users
            </IonButton>
            <IonButton
              id="flush-favourites"
              color={"danger"}
              className={css({ display: "block", marginTop: "16px" })}
            >
              Flush all favourites
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
            <IonAlert
              trigger="flush-favourites"
              header="Really want to flush favourites data?"
              subHeader="All favourite Pokemons will be removed permanently."
              buttons={[
                {
                  text: "No",
                },
                {
                  text: "Yes",
                  handler: () => {
                    flushFavourites();
                  },
                },
              ]}
            ></IonAlert>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
