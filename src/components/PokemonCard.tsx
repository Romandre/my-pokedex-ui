import { useContext } from "react";
import PokeContext from "../contexts/PokeContext";
import { IonBadge, IonCard, IonIcon, IonRouterLink } from "@ionic/react";

import { css } from "../../styled-system/css";
import { heartOutline, heartSharp } from "ionicons/icons";
import { Pokemon } from "../types/types";

export interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { favouritePokemons, addToFavourites, removeFromFavourites } =
    useContext(PokeContext);
  const pokeName = pokemon.name;
  const isFavourite = favouritePokemons?.includes(pokeName);

  return (
    <IonCard className={css({ margin: "6px" })}>
      <IonBadge
        className={css({
          position: "absolute",
          right: "0",
          width: "40px",
          height: "40px",
        })}
        onClick={() =>
          isFavourite
            ? removeFromFavourites(pokeName)
            : addToFavourites(pokeName)
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
      <IonRouterLink
        routerLink={`/pokemon/${pokeName}`}
        className={css({
          display: "block",
          height: "100px",
          padding: "4px",
        })}
      >
        <img
          className={css({
            height: "100%",
            display: "block",
            margin: "0 auto",
          })}
          src={`https://img.pokemondb.net/artwork/${pokeName}.jpg`}
        />
      </IonRouterLink>
      <IonRouterLink
        routerLink={`/pokemon/${pokeName}`}
        className={css({
          display: "block",
          padding: "4px",
          textTransform: "capitalize",
          color: "black",
        })}
      >
        <div
          className={css({
            display: "flex",
            height: "40px",
            alignItems: "center",
            justifyContent: "center",
            verticalAlign: "middle",
            textAlign: "center",
            lineHeight: "1rem",
          })}
        >
          <p>{pokeName}</p>
        </div>
      </IonRouterLink>
    </IonCard>
  );
};

export default PokemonCard;
