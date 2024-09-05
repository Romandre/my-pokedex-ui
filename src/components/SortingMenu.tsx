import { IonContent, IonItem, IonList } from "@ionic/react";

type SortingMenuProps = {
  setSorting: React.Dispatch<React.SetStateAction<string>>;
};

const SortingMenu: React.FC<SortingMenuProps> = ({ setSorting }) => {
  return (
    <IonList>
      <IonItem
        button={true}
        detail={false}
        onClick={() => {
          setSorting("");
        }}
      >
        Default list
      </IonItem>
      <IonItem
        button={true}
        detail={false}
        onClick={() => {
          setSorting("reverse");
        }}
      >
        Default reverse
      </IonItem>
      <IonItem
        button={true}
        detail={false}
        onClick={() => {
          setSorting("alphabet");
        }}
      >
        Alphabetically
      </IonItem>
      <IonItem
        button={true}
        detail={false}
        onClick={() => {
          setSorting("alpharev");
        }}
      >
        Alphabetically reverse
      </IonItem>
    </IonList>
  );
};

export default SortingMenu;
