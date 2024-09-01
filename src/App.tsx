import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";

/* Auth Context */
import AuthContext from "./contexts/AuthContext";

/* Pages */
import HomePage from "./pages/HomePage";
import PokemonsListPage from "./pages/PokemonsListPage";
import FavouritesPage from "./pages/FavouritesPage";
import PokemonPage from "./pages/PokemonPage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";

/* Icons */
import { home, heart, person, list } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { ToastContainer } from "react-toastify";

setupIonicReact();

const App: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <IonApp>
      <ToastContainer position="top-center" autoClose={3000} />
      {isAuthenticated === true ? (
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/home" component={HomePage} exact />
              <Route path="/pokemons" component={PokemonsListPage} exact />
              <Route path="/pokemon/:name" component={PokemonPage} exact />
              <Route path="/favourites" component={FavouritesPage} exact />
              <Route path="/profile" component={ProfilePage} exact />
              <Route path="/" render={() => <Redirect to="/home" />} exact />
              <Route
                path="/signin"
                render={() => <Redirect to="/home" />}
                exact
              />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="pokemons" href="/pokemons">
                <IonIcon icon={list} />
                <IonLabel>Pokemons</IonLabel>
              </IonTabButton>
              <IonTabButton tab="favourites" href="/favourites">
                <IonIcon icon={heart} />
                <IonLabel>Favourites</IonLabel>
              </IonTabButton>
              <IonTabButton tab="profile" href="/profile">
                <IonIcon icon={person} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      ) : (
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/signin" component={SignInPage} exact />
            <Route path="/" render={() => <Redirect to="/signin" />} exact />
          </IonRouterOutlet>
        </IonReactRouter>
      )}
    </IonApp>
  );
};
export default App;
