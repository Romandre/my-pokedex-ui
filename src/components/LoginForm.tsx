import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonSpinner,
  IonTitle,
} from "@ionic/react";
import { css } from "../../styled-system/css";
import { useRef, useState } from "react";
import { eyeOffSharp, eyeSharp } from "ionicons/icons";
import { SignInFormProps, UserAuth } from "../types/types";

const LoginForm: React.FC<SignInFormProps> = ({
  user,
  handleSubmit,
  setUser,
  changeForm,
  isButtonLoading,
}) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const passRef = useRef<HTMLIonInputElement>(null);

  const togglePassword = (): void => {
    passRef.current!.setFocus();
    setIsShowPassword(!isShowPassword);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <IonTitle
        className={css({
          marginBottom: "16px",
          textAlign: "center",
        })}
      >
        Log in to your account
      </IonTitle>
      <IonItem>
        <IonInput
          type="text"
          label="Username"
          labelPlacement="floating"
          placeholder="Enter username"
          value={user?.username}
          onIonInput={(e) =>
            setUser((prevUser) => ({
              ...prevUser,
              username: e.target.value as string,
            }))
          }
          required
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon
          icon={isShowPassword ? eyeSharp : eyeOffSharp}
          color="primary"
          slot="end"
          onClick={togglePassword}
        ></IonIcon>
        <IonInput
          ref={passRef}
          type={isShowPassword ? "text" : "password"}
          label="Password"
          labelPlacement="floating"
          placeholder="Enter password"
          value={user?.password}
          onIonInput={(e) =>
            setUser((prevUser) => ({
              ...prevUser,
              password: e.target.value as string,
            }))
          }
          clearOnEdit={false}
          required
        ></IonInput>
      </IonItem>

      <div
        className={css({
          display: "flex",
          margin: "24px 0 0",
          justifyContent: "space-between",
        })}
      >
        <IonButton
          type="button"
          fill="clear"
          className={css({
            margin: "0 -8px",
          })}
          onClick={changeForm}
        >
          I don't have account
        </IonButton>
        <IonButton
          type="submit"
          className={css({
            width: "115px",
            height: "36px",
          })}
        >
          {isButtonLoading ? (
            <IonSpinner name="circles"></IonSpinner>
          ) : (
            "Let me in!"
          )}
        </IonButton>
      </div>
    </form>
  );
};

export default LoginForm;
