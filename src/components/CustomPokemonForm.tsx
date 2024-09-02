import { FormEvent, useState } from "react";
import {
  IonButton,
  IonCheckbox,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonTitle,
  IonToggle,
} from "@ionic/react";
import { css } from "../../styled-system/css";

import { CustomPokemonFormProps, CustomPokemon } from "../types/types";

const CustomPokemonForm: React.FC<CustomPokemonFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>("");
  const [weight, setWeight] = useState<number | null>(null);
  const [mainAbility, setMainAbility] = useState<string>("");
  const [secondAbility, setSecondAbility] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const abilities = [];
    if (mainAbility?.length) abilities.push({ ability: { name: mainAbility } });
    if (secondAbility?.length)
      abilities.push({ ability: { name: secondAbility } });
    const data: CustomPokemon = {
      id: 0,
      name,
      weight,
      abilities,
      isPrivate,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <IonTitle
        className={css({
          marginBottom: "16px",
          textAlign: "center",
        })}
      >
        Create you own Pokémon
      </IonTitle>
      <IonItem>
        <IonInput
          type="text"
          label="Name"
          labelPlacement="floating"
          placeholder="Enter pokemon name"
          value={name}
          onIonInput={(e) => {
            setName(e.target.value as string);
          }}
          required
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput
          type="number"
          label="Weight"
          labelPlacement="floating"
          placeholder="Enter weight"
          value={weight}
          onIonInput={(e) => {
            setWeight(e.target.value as number);
          }}
          clearOnEdit={false}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput
          type="text"
          label="Main ability"
          labelPlacement="floating"
          placeholder="Enter main ability"
          value={mainAbility}
          onIonInput={(e) => {
            setMainAbility(e.target.value as string);
          }}
          clearOnEdit={false}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput
          type="text"
          label="Second ability"
          labelPlacement="floating"
          placeholder="Enter second ability"
          value={secondAbility}
          onIonInput={(e) => {
            setSecondAbility(e.target.value as string);
          }}
          clearOnEdit={false}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonToggle
          onClick={(e) => {
            // @ts-ignore
            setIsPrivate(!isPrivate);
          }}
        >
          <IonLabel>Make it private?</IonLabel>
          <IonNote color="medium">
            Other users will never see your Pokémon if it's private.
          </IonNote>
        </IonToggle>
      </IonItem>

      <div
        className={css({
          display: "flex",
          margin: "24px 0 0",
          justifyContent: "end",
        })}
      >
        <IonButton type="submit">Create Pokémon</IonButton>
      </div>
    </form>
  );
};

export default CustomPokemonForm;
