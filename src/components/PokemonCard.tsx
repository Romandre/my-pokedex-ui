import { IonCard, IonRouterLink } from "@ionic/react";

import { css } from "../../styled-system/css";
import HeartBadge from "./HeartBadge";

export interface PokemonCardProps {
  pokemon: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <IonCard
      className={css({
        margin: "6px",
        borderBottom: "2px solid var(--ion-color-primary)",
      })}
    >
      <HeartBadge pokemonName={pokemon} />
      <IonRouterLink
        routerLink={`/pokemon/${pokemon}`}
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
          src={`https://img.pokemondb.net/artwork/${pokemon}.jpg`}
        />
      </IonRouterLink>
      <IonRouterLink
        routerLink={`/pokemon/${pokemon}`}
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
          <p>{pokemon}</p>
        </div>
      </IonRouterLink>
    </IonCard>
  );
};

export default PokemonCard;
