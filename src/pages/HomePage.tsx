import {
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext } from "react";

import PokeContext from "../contexts/PokeContext";
import Loading from "../components/Loading";

import pikachu from "../assets/pikachu.png";
import bulbasaur from "../assets/bulbasaur.png";
import jigglypuff from "../assets/jigglypuff.png";
import eevee from "../assets/eevee.png";

import { css } from "../../styled-system/css";
import { buildSharp, heartSharp, listOutline } from "ionicons/icons";

const HomePage: React.FC = () => {
  const { isLoading } = useContext(PokeContext);

  const blockStyle = {
    display: "inline-block",
    width: "100%",
    height: "160px",
    marginBottom: "12px",
    padding: "16px",
    md: { width: "calc(50% - 10px)", _odd: { marginRight: "20px" } },
    lg: {
      width: "calc(33.3% - 24px)",
      _odd: { marginRight: "12px", marginLeft: "12px" },
      _even: { marginRight: "12px", marginLeft: "12px" },
    },
    xl: {
      width: "calc(25% - 24px)",
      _odd: { marginRight: "12px", marginLeft: "12px" },
      _even: { marginRight: "12px", marginLeft: "12px" },
    },
  };

  const blockTextCss = {
    display: "block",
    fontSize: "28px",
    fontWeight: "600",
    lineHeight: "2.2rem",
    color: "white",
    textShadow: "2px 2px rgba(0,0,0,0.3)",
    fontSmoothing: "antialiased",
  };

  const blockIconCss = {
    marginTop: "8px",
    fontSize: "34px",
  };

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
            <IonCard
              className={css(blockStyle, {
                bg: "linear-gradient(135deg, #0cb5c8 30%, #5dc40c 90%)",
                marginTop: "8px",
              })}
              routerLink={`/pokemons`}
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
              <div className={css(blockTextCss)}>
                Explore all <br /> Pokémons
              </div>
              <div className={css(blockTextCss, blockIconCss)}>
                <IonIcon icon={listOutline}></IonIcon>
              </div>
            </IonCard>

            <IonCard
              className={css(blockStyle, {
                bg: "linear-gradient(135deg, #0cb5c8 25%, #ffbb00 80%)",
              })}
              routerLink={`/favourites`}
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
              <div className={css(blockTextCss)}>
                View your <br />
                favourites
              </div>
              <div className={css(blockTextCss, blockIconCss)}>
                <IonIcon icon={heartSharp}></IonIcon>
              </div>
            </IonCard>

            <IonCard
              className={css(blockStyle, {
                bg: "linear-gradient(135deg, #0cb5c8 20%, #ff82cb 90%)",
              })}
              routerLink={`/custom`}
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
              <div className={css(blockTextCss)}>
                Create own
                <br />
                Pokémons
              </div>
              <div className={css(blockTextCss, blockIconCss)}>
                <IonIcon icon={buildSharp}></IonIcon>
              </div>
            </IonCard>

            <IonCard
              className={css(blockStyle, {
                bg: "linear-gradient(135deg, #0cb5c8 15%, #ed2e0c)",
              })}
              routerLink={`/create`}
              disabled
            >
              <img
                src={eevee}
                className={css({
                  position: "absolute",
                  top: "5px",
                  right: "-45px",
                  width: "200px",
                })}
              ></img>
              <div className={css(blockTextCss)}>
                Check other <br />
                creations
                <p className={css({ fontSize: "16px", fontStyle: "italic" })}>
                  Under construction...
                </p>
              </div>
            </IonCard>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
