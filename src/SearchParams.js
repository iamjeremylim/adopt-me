import { useState, useEffect, useContext } from "react";
import ThemeContext from "./themeContext";
import useBreedList from "./useBreedList";
import Results from "./results";
import pf from "./api";


const ANIMALS = ["Cat", "Dog", "Rabbit"];

const SearchParams = () => {
  // const [location, setLocation] = useState("Seattle, WA");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext); // came from context

  useEffect(() => {
    requestPets();
  }, []); // include [] so that we only call requestPets() once

  async function requestPets() {
    const searchData = {
      type: animal,
    };

    const res = await pf.animal.search(searchData);
    const resData = await res.data.animals;
    let petData = [];
    await resData.map((pet) => {
      if (pet.breeds.primary === breed) {
        petData.push(pet);
      }
    });

    setPets(petData);
  }
  // function updateLocation(event) {
  //   setLocation(event.target.value);
  // }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        {/* <label htmlFor="location">
          Location
          <input
            id="location"
            // onChange={(e) => setLocation(e.target.value)}
            onChange={updateLocation}
            value={location}
            placeholder="Location"
          />
        </label> */}
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="darkblue">Dark Blue</option>
            <option value="peru">Peru</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
