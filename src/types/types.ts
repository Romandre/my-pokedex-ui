import { RouteComponentProps } from "react-router";

export type Pokemon = {
  name: string;
  url?: string;
};

export type PokemonData = {
  id: number;
  name: string;
  weight: number;
  forms: Forms[];
  cries?: {
    latest?: string;
    legacy?: string;
  };
  abilities: Abilities[];
  types: Types[];
};

type Abilities = {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot?: number;
};

type Forms = {
  name: string;
  url: string;
};

type Types = {
  slot: number;
  type: Forms;
};

export type User = {
  id: number;
  username: string;
};

export type UserAuth = {
  id?: number;
  username?: string;
  password?: string;
  repeatPass?: string;
};

export type SignInFormProps = {
  user: UserAuth | null;
  setUser: React.Dispatch<React.SetStateAction<UserAuth | null>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  changeForm: () => void;
  isButtonLoading: boolean;
};

export interface PokemonPagePageProps
  extends RouteComponentProps<{
    name: string;
  }> {}
