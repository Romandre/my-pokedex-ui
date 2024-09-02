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
import eevee from "../assets/eevee.png";

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

  const blockTextCss = css({
    display: "inline",
    fontSize: "28px",
    fontWeight: "800",
    lineHeight: "2.5rem",
    color: "white",
  });

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
              <div className={blockTextCss}>
                Explore all <br /> Pokémons
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
              <div className={blockTextCss}>
                View your <br />
                favourites
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
              <div className={blockTextCss}>
                Manage castom <br />
                Pokémons
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
              <div className={blockTextCss}>
                View what other <br />
                users created
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
