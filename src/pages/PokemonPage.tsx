import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

import PokeContext from "../contexts/PokeContext";
import HeartBadge from "../components/HeartBadge";
import Loading from "../components/Loading";

import { css } from "../../styled-system/css";
import { caretBack } from "ionicons/icons";

import { PokemonData, PokemonPagePageProps } from "../types/types";

const PokemonPage: React.FC<PokemonPagePageProps> = ({ match }) => {
  const [pokemon, setPokemon] = useState<PokemonData | null>();
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const currentPokemon = match.params.name;

  const router = useIonRouter();

  const { customPokemons, removeMyCustomPokemon } = useContext(PokeContext);

  const imageBlock = css({
    height: "280px",
    width: "100%",
  });

  const imageWrapper = css({
    position: "absolute",
    top: 0,
    display: "flex",
    height: "280px",
    width: "100%",
    bg: "white",
    marginLeft: "-16px",
    marginRight: "-16px",
    padding: "12px 0",
    justifyContent: "center",
    borderBottom: "4px solid var(--ion-color-primary)",
    borderRadius: "0 0 30px 30px",
  });

  const nameWrapper = css({
    display: "inline-block",
    margin: "0 auto",
    padding: "4px 12px",
    fontSize: "26px",
    textTransform: "uppercase",
    color: "var(--ion-color-primary)",
    fontWeight: "500",
    letterSpacing: "2px",
    bg: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  });

  const pokemonInfoCard = css({
    marginTop: "16px",
    padding: "0 16px",
    fontSize: "16px",
    borderRadius: "20px",
  });

  const pokemonInfoSection = css({
    margin: "12px 0",
    textTransform: "capitalize",
  });

  const fetchPokemon = useCallback(async () => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}`)
      .then((res) => {
        const pokemonData: PokemonData = {
          id: res.data.id,
          name: res.data.name,
          weight: res.data.weight,
          forms: res.data.forms,
          cries: res.data.cries || {},
          abilities: res.data.abilities,
          types: res.data.types,
        };

        setPokemon(pokemonData);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  }, [setPokemon, setIsLoading]);

  const findPokemon = useCallback(() => {
    setIsLoading(true);

    const customPokemonData = customPokemons?.filter(
      (item) => item.name === currentPokemon
    );

    if (customPokemonData.length) {
      const pokemonData: PokemonData = {
        id: customPokemonData[0].id,
        name: customPokemonData[0].name,
        weight: customPokemonData[0].weight || 0,
      };

      setPokemon(pokemonData);
      setIsCustom(true);
      setIsLoading(false);
    } else {
      fetchPokemon();
    }
  }, [setIsLoading, setIsCustom, setPokemon, fetchPokemon, customPokemons]);

  const deletePokemon = (name: string) => {
    removeMyCustomPokemon(pokemon!.name);
    router.push("/custom", "back");
  };

  useEffect(() => {
    findPokemon();
  }, [findPokemon]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonButtons slot="start">
            <IonBackButton
              text="Back"
              icon={caretBack}
              className={css({
                position: "absolute",
              })}
            ></IonBackButton>
          </IonButtons>
          <IonTitle>Personal Pokédex</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {pokemon ? (
              <>
                <div className={imageBlock}>
                  <div className={imageWrapper}>
                    <img
                      height="100%"
                      src={`https://img.pokemondb.net/artwork/${pokemon?.name}.jpg`}
                    />
                    <HeartBadge pokemonName={pokemon.name} />
                  </div>
                </div>
                <div
                  className={css({
                    padding: "0 12px",
                  })}
                >
                  <div
                    className={css({
                      width: "100%",
                      textAlign: "center",
                    })}
                  >
                    <div className={nameWrapper}>{pokemon.name}</div>
                  </div>
                  <IonCard className={pokemonInfoCard}>
                    <div className={pokemonInfoSection}>
                      <b>ID: </b>
                      {pokemon?.id}
                    </div>

                    <div className={pokemonInfoSection}>
                      <b>Weight: </b>
                      {pokemon?.weight}
                    </div>

                    {pokemon?.abilities && (
                      <div className={pokemonInfoSection}>
                        <b>Abilities: </b>
                        {pokemon?.abilities?.map((item) => (
                          <div key={item.ability.name}>
                            <span>- {item.ability.name}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {pokemon?.cries && (
                      <div className={pokemonInfoSection}>
                        <b>Cries: </b>
                        {Object.entries(pokemon.cries).map((item) => (
                          <div key={item[0]}>
                            <span>- {item[0]}</span>
                            <audio controls>
                              <source src={item[1]} type="audio/mpeg"></source>
                              Your browser does not support the
                              <code>audio</code> element.
                            </audio>
                          </div>
                        ))}
                      </div>
                    )}

                    {pokemon?.forms && (
                      <div className={pokemonInfoSection}>
                        <b>Forms: </b>
                        <p
                          className={css({
                            textTransform: "none",
                          })}
                        >
                          This pokemon has {pokemon.forms.length && "only "}
                          {pokemon.forms.length}
                          {pokemon.forms.length! > 1 ? " forms" : "form"}
                        </p>
                        {pokemon?.forms?.map((item) => (
                          <div key={item.name}>
                            <span>- {item.name}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {pokemon?.types && (
                      <div className={pokemonInfoSection}>
                        <b>Types: </b>
                        {pokemon.types.map((item) => (
                          <div key={item.type.name}>
                            <span>- {item.type.name}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {isCustom && (
                      <>
                        <div className={pokemonInfoSection}>
                          <IonButton color="danger" id="show-alert">
                            Delete Pokémon
                          </IonButton>
                        </div>
                        <IonAlert
                          trigger="show-alert"
                          header="Really want to delete pokemon?"
                          buttons={[
                            {
                              text: "No",
                            },
                            {
                              text: "Yes",
                              handler: () => {
                                deletePokemon(pokemon.name);
                              },
                            },
                          ]}
                        ></IonAlert>
                      </>
                    )}
                  </IonCard>
                </div>
              </>
            ) : (
              <>
                <h3>Sorry, no such pokemon found...</h3>
                <IonRouterLink routerLink={`/pokemons`}>
                  <p>Visit Pokémons here</p>
                </IonRouterLink>
              </>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default PokemonPage;
