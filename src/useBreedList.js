import { useState, useEffect } from "react";
import pf from "./api";

const localCache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedlist();
    }
    async function requestBreedlist() {
      setBreedList([]);
      setStatus("loading");

      let searchTerm = {
        type: animal,
      };

      const res = await pf.animal.search(searchTerm);
      const petData = await res.data;
      const petBreedsData = await petData.animals.map((animal) => {
        return animal.breeds.primary;
      });
      const petBreeds = await [...new Set(petBreedsData)].sort((a, b) =>
        a[0] < b[0] ? -1 : 1
      );
      // const res = await fetch(
      //   `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
      // );
      // const json = await res.json();
      localCache[animal] = petBreeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);
  return [breedList, status];
}
