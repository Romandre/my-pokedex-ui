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

import { toast } from "react-toastify";
import { CustomPokemon, PokemonData } from "../types/types";

const PokeContext = createContext({
  pokemons: [] as string[],
  favouritePokemons: [] as string[],
  customPokemons: [] as CustomPokemon[],
  createMyCustomPokemon: (data: CustomPokemon) => {},
  removeMyCustomPokemon: (pokemon: string) => {},
  flushCustomPokemons: () => {},
  addToFavourites: (pokemon: string) => {},
  removeFromFavourites: (pokemon: string) => {},
  flushFavourites: () => {},
  isLoading: false as boolean,
});

export const PokeProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [pokemons, setPokemons] = useState<string[]>([]);
  const [customPokemons, setCustomPokemons] = useState<CustomPokemon[]>([]);
  const [favouritePokemons, setFavouritePokemons] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const userId = user?.id;

  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch all pokemoms from pokeapi.co
  const fetchAllPokemons = useCallback(async () => {
    const storedPokemons = localStorage.getItem("pokemons");

    // Check if data is already in local storage
    if (storedPokemons) {
      setPokemons(JSON.parse(storedPokemons));
    } else {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        );
        const data = response.data.results;
        const names = data.map(
          (item: { name: string; url: string }) => item.name
        );

        localStorage.setItem("pokemons", JSON.stringify(names));
        setPokemons(names);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  }, [setPokemons, setIsLoading]);

  // Fetch user custom pokemons
  const fetchMyCustomPokemons = useCallback(async () => {
    const storedCustomPoke = JSON.parse(
      localStorage.getItem(`customPoke`) || "[]"
    );

    try {
      const response = await axios.get(
        `${apiUrl}api/custompokemon/get/${userId}`
      );
      const data = response.data;

      localStorage.setItem("customPoke", JSON.stringify(data));
      setCustomPokemons(data);
    } catch (error) {
      console.error("Error fetching custom pokemons: ", error);
      setCustomPokemons(storedCustomPoke);
    }
  }, [userId, setCustomPokemons]);

  // Create new custom Pokémon
  const createMyCustomPokemon = async (pokemon: CustomPokemon) => {
    const { name, weight, mainAbility, secondAbility, isPrivate } = pokemon;
    const customPokemon = {
      id: customPokemons.length + 1,
      userId: userId,
      name,
      weight,
      mainAbility,
      secondAbility,
      isPrivate,
    };

    axios
      .post(`${apiUrl}api/custompokemon/add`, customPokemon)
      .then((res) => {
        toast.success(res.data);
      })
      .catch((error) => {
        toast.error(error);
      });

    const updatedCustomPokemons = [...customPokemons, customPokemon];
    setCustomPokemons(updatedCustomPokemons);
    localStorage.setItem("customPoke", JSON.stringify(updatedCustomPokemons));
  };

  // Remove custom Pokémon
  const removeMyCustomPokemon = (pokemon: string) => {
    const data = { userId: userId, name: pokemon };

    axios.post(`${apiUrl}api/custompokemon/remove`, data).catch((error) => {
      toast.success(error);
    });

    const updatedCustomPokemons = customPokemons.filter(
      (item) => item.name !== pokemon
    );

    setCustomPokemons(updatedCustomPokemons);
    localStorage.setItem("customPoke", JSON.stringify(updatedCustomPokemons));
  };

  // Flush all custom Pokémons for specific user
  const flushCustomPokemons = () => {
    localStorage.removeItem("customPoke");
    setCustomPokemons([]);

    axios
      .post(`${apiUrl}api/custompokemon/removeall`, { userId })
      .then((res) => {
        if (!res.data) {
          toast.error("Something went wrong! Try again...");
        }
        toast.success(res.data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  // Fetch favourite pokemons for specific user
  const fetchFavourites = useCallback(async () => {
    const favouritesLocal = JSON.parse(
      localStorage.getItem(`favourites_user${userId}`) || "[]"
    );

    try {
      const response = await axios.get(`${apiUrl}api/favourites/get/${userId}`);
      const data = response.data;

      if (data) {
        const favouritesFromDb = data.map(
          (item: { pokemon: string }) => item.pokemon
        );
        const mergeData: string[] = favouritesFromDb.concat(favouritesLocal);
        const unifyData: string[] = [...new Set(mergeData)];

        setFavouritePokemons(unifyData);
        localStorage.setItem(
          `favourites_user${userId}`,
          JSON.stringify(unifyData)
        );
      }
    } catch (error) {
      console.error("Error fetching data from server: ", error);
      setFavouritePokemons(favouritesLocal);
    }
  }, [userId, setFavouritePokemons]);

  // Add pokemon to your favourites
  const addToFavourites = (pokemon: string) => {
    const data = { userId: userId, pokemon: pokemon };

    axios.post(`${apiUrl}api/favourites/add`, data).catch((error) => {
      console.error("Error:", error);
    });

    const updatedFavourites = [...favouritePokemons, pokemon];
    setFavouritePokemons(updatedFavourites);
    localStorage.setItem(
      `favourites_user${userId}`,
      JSON.stringify(updatedFavourites)
    );
  };

  // Remove pokemon from your favourites
  const removeFromFavourites = (pokemon: string) => {
    const data = { userId: userId, pokemon: pokemon };

    axios.post(`${apiUrl}api/favourites/remove`, data).catch((error) => {
      console.error("Error:", error);
    });

    const updatedFavourites = favouritePokemons.filter(
      (item) => item !== pokemon
    );

    setFavouritePokemons(updatedFavourites);
    localStorage.setItem(
      `favourites_user${userId}`,
      JSON.stringify(updatedFavourites)
    );
  };

  // Flush favourites table data for specific user
  const flushFavourites = () => {
    localStorage.removeItem(`favourites_user${user?.id}`);
    setFavouritePokemons([]);

    axios
      .post(`${apiUrl}api/favourites/removeall`, { userId })
      .then((res) => {
        if (!res.data) {
          toast.error("Something went wrong! Try again...");
        }
        toast.success(res.data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  // Sync favourites between server and client by the time stamp
  const syncFavourites = () => {};

  useEffect(() => {
    if (isAuthenticated && userId) {
      setIsLoading(true);
      fetchAllPokemons();
      fetchMyCustomPokemons();
      fetchFavourites();
      //syncFavourites();

      // Add timeout just for sake of seeing the loading
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [fetchAllPokemons, fetchFavourites, setIsLoading, isAuthenticated]);

  const contextValue = useMemo(
    () => ({
      pokemons,
      favouritePokemons,
      customPokemons,
      createMyCustomPokemon,
      removeMyCustomPokemon,
      flushCustomPokemons,
      addToFavourites,
      removeFromFavourites,
      flushFavourites,
      isLoading,
    }),
    [
      pokemons,
      favouritePokemons,
      customPokemons,
      createMyCustomPokemon,
      removeMyCustomPokemon,
      flushCustomPokemons,
      addToFavourites,
      removeFromFavourites,
      flushFavourites,
      isLoading,
    ]
  );

  return (
    <PokeContext.Provider value={contextValue}>{children}</PokeContext.Provider>
  );
};

export default PokeContext;
