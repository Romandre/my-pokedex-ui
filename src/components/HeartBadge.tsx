import { useContext } from "react";
import { IonBadge, IonIcon } from "@ionic/react";

import PokeContext from "../contexts/PokeContext";

import { css } from "../../styled-system/css";
import { heartOutline, heartSharp } from "ionicons/icons";

const HeartBadge: React.FC<{ pokemonName: string }> = ({ pokemonName }) => {
  const { favouritePokemons, addToFavourites, removeFromFavourites } =
    useContext(PokeContext);

  const isFavourite = favouritePokemons?.includes(pokemonName);

  return (
    <IonBadge
      className={css({
        position: "absolute",
        top: "0",
        right: "0",
        width: "40px",
        height: "40px",
        cursor: "pointer",
      })}
      onClick={() =>
        isFavourite
          ? removeFromFavourites(pokemonName)
          : addToFavourites(pokemonName)
      }
    >
      {isFavourite ? (
        <IonIcon
          icon={heartSharp}
          className={css({
            width: "100%",
            height: "40px",
          })}
        />
      ) : (
        <IonIcon
          icon={heartOutline}
          className={css({
            width: "100%",
            height: "40px",
          })}
        />
      )}
    </IonBadge>
  );
};

export default HeartBadge;
