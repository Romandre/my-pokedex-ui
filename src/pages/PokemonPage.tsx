import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { css } from "../../styled-system/css";
import { caretBack } from "ionicons/icons";
import axios from "axios";

interface PokemonData {
  id: number;
  name: string;
  cries: object;
}

interface PokemonPagePageProps
  extends RouteComponentProps<{
    name: string;
  }> {}

const PokemonPage: React.FC<PokemonPagePageProps> = ({ match }) => {
  const [pokemon, setPokemon] = useState<PokemonData | null>();

  const fetchPokemons = useCallback(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${match.params.name}`)
      .then((res) => {
        const pokemonData: PokemonData = {
          id: res.data.id,
          name: res.data.name,
          cries: res.data.cries || {},
        };
        console.log(pokemonData);
        setPokemon(pokemonData);
      });
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonButtons slot="start">
            <IonBackButton text="Back" icon={caretBack}></IonBackButton>
          </IonButtons>
          <IonTitle>Personal Pokédex</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div
          className={css({
            height: "250px",
            display: "flex",
            justifyContent: "center",
          })}
        >
          <img
            height="100%"
            src={`https://img.pokemondb.net/artwork/${pokemon?.name}.jpg`}
          />
        </div>
        <div>Pokemon {pokemon?.name}</div>
        <div>
          Sounds:
          {pokemon?.cries &&
            Object.entries(pokemon?.cries).map((item) => (
              <div key={item[0]}>
                <span>{item[0]}</span>
                <audio controls src={item[1]}>
                  Your browser does not support the
                  <code>audio</code> element.
                </audio>
              </div>
            ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PokemonPage;
