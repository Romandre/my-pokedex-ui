export type Pokemon = {
  name: string;
  url?: string;
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
