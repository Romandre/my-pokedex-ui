import {
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext } from "react";
import PokeContext from "../contexts/PokeContext";

import { css } from "../../styled-system/css";
import Loading from "../components/Loading";

import pikachu from "../assets/pikachu.png";
import bulbasaur from "../assets/bulbasaur.png";
import jigglypuff from "../assets/jigglypuff.png";

const HomePage: React.FC = () => {
  const { isLoading } = useContext(PokeContext);
  const blockTextCss = css({
    display: "inline",
    fontSize: "30px",
    fontWeight: "800",
    lineHeight: "2.5rem",
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Personal Pokédex</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={css({})}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <IonRouterLink routerLink={`/pokemons`}>
              <IonCard
                className={css({
                  height: "160px",
                  color: "white",
                  bg: "linear-gradient(135deg, #0cb5c8 30%, #5dc40c 90%)",
                  padding: "16px",
                  marginTop: "8px",
                  marginBottom: "20px",
                })}
              >
                <img
                  src={bulbasaur}
                  className={css({
                    position: "absolute",
                    top: "-10px",
                    right: "-70px",
                    width: "210px",
                  })}
                ></img>
                <div className={blockTextCss}>
                  Check all <br /> Pokémons
                </div>
              </IonCard>
            </IonRouterLink>
            <IonRouterLink routerLink={`/favourites`}>
              <IonCard
                className={css({
                  height: "160px",
                  color: "white",
                  bg: "linear-gradient(135deg, #0cb5c8 25%, #ffbb00 80%)",
                  padding: "16px",
                  marginBottom: "20px",
                })}
              >
                <img
                  src={pikachu}
                  className={css({
                    position: "absolute",
                    top: "-40px",
                    right: "-80px",
                    width: "250px",
                  })}
                ></img>
                <div className={blockTextCss}>
                  View your <br />
                  favourites
                </div>
              </IonCard>
            </IonRouterLink>
            {/*<IonRouterLink routerLink={`/create`}>*/}
            <IonCard
              className={css({
                height: "160px",
                color: "white",
                bg: "linear-gradient(135deg, #0cb5c8 20%, #ff82cb 90%)",
                padding: "16px",
              })}
              disabled
            >
              <img
                src={jigglypuff}
                className={css({
                  position: "absolute",
                  top: "10px",
                  right: "-45px",
                  width: "180px",
                })}
              ></img>
              <div className={blockTextCss}>
                Create your <br />
                own Pokémon
              </div>
              <p className={css({ fontSize: "16px", fontStyle: "italic" })}>
                Under construction...
              </p>
            </IonCard>
            {/* </IonRouterLink> */}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
