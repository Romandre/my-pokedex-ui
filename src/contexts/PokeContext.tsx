import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import { Pokemon } from "../types/types";

interface PokemonItem {
  pokemon: string;
}

const PokeContext = createContext({
  pokemons: [] as Pokemon[],
  favouritePokemons: [] as string[],
  addToFavourites: (pokemon: string) => {},
  removeFromFavourites: (pokemon: string) => {},
  isLoading: false as boolean,
});

export const PokeProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [favouritePokemons, setFavouritepokemons] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userId = user?.id;

  // Fetch all pokemoms from pokeapi.co
  const fetchAllPokemons = useCallback(async () => {
    const storedPokemons = localStorage.getItem("pokemons");

    // Check if data is already in local storage
    if (storedPokemons) {
      setPokemons(JSON.parse(storedPokemons));
    } else {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        );
        const data = response.data.results;

        localStorage.setItem("pokemons", JSON.stringify(data));
        setPokemons(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  }, [setPokemons, setIsLoading]);

  // Fetch favourite pokemons for specific user
  const fetchFavourites = useCallback(async () => {
    const favouritesLocal = JSON.parse(
      localStorage.getItem(`favourites_user${userId}`) || "[]"
    );

    try {
      const response = await axios.get(
        `https://my-pokedex-api.onrender.com/api/getfavourites/${userId}`
      );
      const data = response.data;

      if (data) {
        const favouritesFromDb = data.map((item: PokemonItem) => item.pokemon);
        const mergeData: string[] = favouritesLocal.concat(favouritesFromDb);
        const unifyData: string[] = [...new Set(mergeData)];
        setFavouritepokemons(unifyData);
        localStorage.setItem(
          `favourites_user${userId}`,
          JSON.stringify(unifyData)
        );
      }
    } catch (error) {
      console.error("Error fetching data from server: ", error);
      setFavouritepokemons(favouritesLocal);
    }
  }, [userId, setFavouritepokemons]);

  // Add pokemon to your favourites
  const addToFavourites = (pokemon: string) => {
    const data = { userId: userId, pokemon: pokemon };

    axios
      .post("https://my-pokedex-api.onrender.com/api/addfavourites", data)
      .catch((error) => {
        console.error("Error:", error);
      });

    const updatedFavourites = [...favouritePokemons, pokemon];
    setFavouritepokemons(updatedFavourites);
    localStorage.setItem(
      `favourites_user${userId}`,
      JSON.stringify(updatedFavourites)
    );
  };

  // Remove pokemon from your favourites
  const removeFromFavourites = (pokemon: string) => {
    const data = { userId: userId, pokemon: pokemon };

    axios
      .post("https://my-pokedex-api.onrender.com/api/removefavourites", data)
      .catch((error) => {
        console.error("Error:", error);
      });

    const updatedFavourites = favouritePokemons.filter(
      (item) => item !== pokemon
    );

    setFavouritepokemons(updatedFavourites);
    localStorage.setItem(
      `favourites_user${userId}`,
      JSON.stringify(updatedFavourites)
    );
  };

  // Sync favourites between server and client by the time stamp
  const syncFavourites = () => {};

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllPokemons();
      fetchFavourites();
      //syncFavourites();
    }
  }, [fetchAllPokemons, fetchFavourites, setIsLoading, isAuthenticated]);

  const contextValue = useMemo(
    () => ({
      pokemons,
      favouritePokemons,
      addToFavourites,
      removeFromFavourites,
      isLoading,
    }),
    [
      pokemons,
      favouritePokemons,
      addToFavourites,
      removeFromFavourites,
      isLoading,
    ]
  );

  return (
    <PokeContext.Provider value={contextValue}>{children}</PokeContext.Provider>
  );
};

export default PokeContext;
