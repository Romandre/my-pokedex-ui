import { useContext } from "react";
import PokeContext from "../contexts/PokeContext";
import { IonBadge, IonCard, IonIcon, IonRouterLink } from "@ionic/react";

import { css } from "../../styled-system/css";
import { heartOutline, heartSharp } from "ionicons/icons";
import { Pokemon } from "../types/types";
import HeartBadge from "./HeartBadge";

export interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const pokeName = pokemon.name;

  return (
    <IonCard
      className={css({
        margin: "6px",
        borderBottom: "2px solid var(--ion-color-primary)",
      })}
    >
      <HeartBadge pokemonName={pokeName} />
      <IonRouterLink
        routerLink={`/pokemon/${pokeName}`}
        className={css({
          display: "block",
          height: "100px",
          padding: "8px 4px 4px 4px",
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
            fontWeight: "500",
            letterSpacing: "1px",
          })}
        >
          <p>{pokeName}</p>
        </div>
      </IonRouterLink>
    </IonCard>
  );
};

export default PokemonCard;
