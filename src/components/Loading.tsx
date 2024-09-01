import { IonSpinner } from "@ionic/react";
import { css } from "../../styled-system/css";

const Loading: React.FC = () => {
  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100%",
        width: "100%",
      })}
    >
      <IonSpinner id="main" name="dots"></IonSpinner>
    </div>
  );
};

export default Loading;
