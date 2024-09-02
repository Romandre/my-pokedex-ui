import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
} from "@ionic/react";
import { useContext, useEffect, useRef, useState } from "react";
import PokeContext from "../contexts/PokeContext";

import PokemonsList from "../components/PokemonsList";
import CustomPokemonForm from "../components/CustomPokemonForm";
import Loading from "../components/Loading";

import { add } from "ionicons/icons";
import { css } from "../../styled-system/css";
import { CustomPokemon } from "../types/types";

const CustomPokemonsPage: React.FC = () => {
  const { isLoading, customPokemons, createMyCustomPokemon } =
    useContext(PokeContext);
  const formattedPokemons = customPokemons?.map((item) => item.name);
  const [newPokemon, setNewPokemon] = useState<CustomPokemon | null>();

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  const [lightDismiss, setLightDismiss] = useState(false);

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const [present] = useIonActionSheet();

  const onSubmit = (data: CustomPokemon) => {
    setNewPokemon(data);
    dismiss();
  };

  function dismiss() {
    modal.current?.dismiss();
  }

  function canDismiss() {
    return new Promise<boolean>((resolve, reject) => {
      lightDismiss
        ? present({
            header: "Want to cancel Pokémon creation?",
            buttons: [
              {
                text: "Yes, go back to list!",
                role: "confirm",
              },
              {
                text: "No, I want to keep creating!",
                role: "cancel",
              },
            ],
            onWillDismiss: (ev) => {
              if (ev.detail.role === "confirm") {
                resolve(true);
              }
              if (ev.detail.role === "cancel") {
                resolve(false);
              } else {
                resolve(false);
              }
            },
          })
        : present({
            header: "Ready to submit new custom Pokémon?",
            buttons: [
              {
                text: "Yes, save my new Pokémon",
                role: "confirm",
              },
              {
                text: "No, edit Pokémon",
                role: "edit",
              },
            ],
            onWillDismiss: (ev) => {
              if (ev.detail.role === "confirm") {
                createMyCustomPokemon(newPokemon!);
                resolve(true);
              }
              if (ev.detail.role === "edit") {
                resolve(false);
              } else {
                resolve(false);
              }
            },
          });
      setLightDismiss(false);
    });
  }

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  return (
    <IonPage ref={page}>
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
              Your custom pokemons
            </p>
            <IonBadge
              id="open-modal"
              className={css({
                position: "absolute",
                bottom: "20px",
                right: "20px",
                width: "60px",
                height: "60px",
                fontSize: "60px",
                "--border-radius": "50%",
              })}
            >
              <IonIcon icon={add} />
            </IonBadge>
            <IonModal
              ref={modal}
              trigger="open-modal"
              canDismiss={canDismiss}
              presentingElement={presentingElement!}
            >
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Custom Pokémon builder</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                <CustomPokemonForm onSubmit={onSubmit} />
                <div
                  className={css({
                    display: "flex",
                    margin: "24px 0 0",
                    justifyContent: "end",
                  })}
                >
                  <IonButton
                    color="danger"
                    onClick={() => {
                      setLightDismiss(true);
                      dismiss();
                    }}
                  >
                    Cancel
                  </IonButton>
                </div>
              </IonContent>
            </IonModal>

            <PokemonsList pokemons={formattedPokemons} />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CustomPokemonsPage;
