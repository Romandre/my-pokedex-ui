import {
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { css } from "../../styled-system/css";
import { FormEvent, useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { UserAuth } from "../types/types";

const SignInPage: React.FC = () => {
  const [isLoginForm, setIsloginForm] = useState<boolean>(true);
  const [isFormFlipped, setIsFormFlipped] = useState<boolean>(true);
  const [isButtonLoading, setIsButtonloading] = useState<boolean>(false);
  const [user, setUser] = useState<UserAuth | null>(null);
  const { login } = useContext(AuthContext);

  const apiUrl = import.meta.env.VITE_API_URL;

  const changeForm = () => {
    setIsFormFlipped(!isFormFlipped);

    // The form will be changed in 200ms after flip starts
    setTimeout(() => {
      setIsloginForm(!isLoginForm);
    }, 200);
  };

  const getUser = (token: string): void => {
    axios
      .get(`${apiUrl}api/auth/getuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        login(token, res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setIsButtonloading(true);
    toast.dismiss();

    isLoginForm
      ? await axios
          .post(`${apiUrl}api/auth/login`, user)
          .then((res) => {
            const token = res?.data?.token;
            if (!token) {
              console.error("Token is missing");
            } else {
              getUser(token);
            }
          })
          .catch((error) => {
            toast.error(error.response.data);
          })
      : await axios
          .post(`${apiUrl}api/auth/register`, user)
          .then((res) => {
            if (!res.data) {
              toast.error("Something went wrong! Try again...");
            }
            toast.success(res.data);
            changeForm();
          })
          .catch((error) => {
            toast.error(error.response.data);
          });

    setTimeout(() => {
      setIsButtonloading(false);
    }, 1000);
  };

  return (
    <IonPage>
      <IonHeader id="header">
        <IonToolbar color={"primary"}>
          <IonTitle>Personal Pokédex</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div
          className={css({
            position: "relative",
            bottom: "-45%",
            transform: "translateY(-50%)",
          })}
        >
          <IonCard
            className={css({
              maxWidth: "500px",
              margin: "12px auto",
              padding: "24px 16px",
              transition: "transform 0.8s",
              transformStyle: "preserve-3d",
              transform: isFormFlipped ? "" : "rotateY(180deg)",
            })}
          >
            {isLoginForm ? (
              <LoginForm
                user={user}
                setUser={setUser}
                handleSubmit={handleSubmit}
                changeForm={changeForm}
                isButtonLoading={isButtonLoading}
              />
            ) : (
              <RegisterForm
                user={user}
                setUser={setUser}
                handleSubmit={handleSubmit}
                changeForm={changeForm}
                isButtonLoading={isButtonLoading}
              />
            )}
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignInPage;
