import { useState } from "react";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonSpinner,
  IonTitle,
} from "@ionic/react";

import { css } from "../../styled-system/css";
import { eyeOffSharp, eyeSharp } from "ionicons/icons";

import { SignInFormProps } from "../types/types";

const RegisterForm: React.FC<SignInFormProps> = ({
  user,
  handleSubmit,
  setUser,
  changeForm,
  isButtonLoading,
}) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={css({ transform: "rotateY(180deg)" })}
    >
      <IonTitle
        className={css({
          marginBottom: "16px",
          textAlign: "center",
        })}
      >
        Create account
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
          onClick={() => setIsShowPassword(!isShowPassword)}
        ></IonIcon>
        <IonInput
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

      <IonItem>
        <IonIcon
          icon={isShowPassword ? eyeSharp : eyeOffSharp}
          color="primary"
          slot="end"
          onClick={() => setIsShowPassword(!isShowPassword)}
        ></IonIcon>
        <IonInput
          type={isShowPassword ? "text" : "password"}
          label="Repeat password"
          labelPlacement="floating"
          placeholder="Enter password again"
          value={user?.repeatPass}
          onIonInput={(e) =>
            setUser((prevUser) => ({
              ...prevUser,
              repeatPass: e.target.value as string,
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
          fill="clear"
          onClick={changeForm}
          className={css({
            margin: "0 -8px",
          })}
        >
          I have an account
        </IonButton>
        <IonButton
          type="submit"
          className={css({
            width: "160px",
            height: "36px",
          })}
        >
          {isButtonLoading ? (
            <IonSpinner name="circles"></IonSpinner>
          ) : (
            "Create profile"
          )}
        </IonButton>
      </div>
    </form>
  );
};

export default RegisterForm;
