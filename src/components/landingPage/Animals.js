import React, { useEffect, useState } from "react";
import ImgAnimal1 from "../../assets/an-1.jpg";
import ImgAnimal2 from "../../assets/an-2.jpg";
import ImgAnimal3 from "../../assets/an-3.jpg";
import ImgAnimal4 from "../../assets/an-4.jpg";
import ImgAnimal5 from "../../assets/an-5.jpg";
import LayoutSections from "../layout/LayoutSections";
import Slider from "../layout/Slider";
import axios from "axios";
import { Animal } from "../../app/class/Animal";
const Animals = () => {
  const [animals, setAnimals] = useState([]);
  const animalData = [
    {
      src: ImgAnimal1,
      id: "anima1",
      specie: "iguana",
      description:
        "Aliquam erat volutpat. Suspendisse lobortis lacus eu metus viverra vulputate.",
    },
    {
      src: ImgAnimal2,
      id: "anima2",
      especie: "leão",
      description:
        "Aenean at ipsum a eros sollicitudin fringilla. Nullam blandit nisi nec enim faucibus, in consequat nisi varius.",
    },
    {
      src: ImgAnimal3,
      id: "anima3",
      especie: "Flamingo",
      description:
        "Donec in massa eget sem consectetur pulvinar. Aliquam erat volutpat. Suspendisse lobortis lacus eu metus viverra vulputate.",
    },
    {
      src: ImgAnimal4,
      id: "anima4",
      specie: "Rinoceronte",
      description:
        " Curabitur sit amet volutpat nulla. Vivamus leo lorem, interdum eget consequat id, aliquet id metus.",
    },
    {
      src: ImgAnimal5,
      id: "anima5",
      specie: "mico-leão-dourado",
      description:
        "Aliquam tincidunt ante magna, bibendum fermentum dolor venenatis ut. Praesent ipsum nulla, sodales ac posuere quis, tristique eu leo.",
    },
  ];
  useEffect(() => {
    axios
      .get("/odata/animals?$top=5&$expand=species")
      .then((resp) => {
        var animalData = resp.data.value;
        const animals = animalData.map((data) => new Animal(data));
        setAnimals(animals);
      })
      .catch((err) => {
        console.log(err)
        setAnimals([]);
      });
  }, []);
  if (animals)
    return (
      <section className="bg-cor1 bg-[url('/src/assets/bg.png')] bg-cover flex flex-col sm:flex-row pt-0 sm:pt-16 pb-16">
        <LayoutSections title="All Animals" className="lg:order-1">
          <p className="max-w-[450px]">
            Meet Our Amazing Animals: Lions, Tigers, Elephants, and More!
          </p>

          <a href="/animals" className="btn btn-accent mt-4">
            See all animals
          </a>
        </LayoutSections>
        <Slider className="sm:h-[360px] lg:h-[400px]">
          {animals.map((animal) => (
            <li key={animal.id} className="p-4 rounded-xl bg-cor4 text-co">
              <img
                className="w-full object-cover mb-4 h-[250px] md:h-[180px]"
                src={animal.src}
                alt={animal.Species.Name}
              />
              <h3 className="text-base mb-4 font-medium capitalize text-cor2">
                {animal.Species.Name}
              </h3>

              <p className="text-cor7">{animal.Description}</p>
            </li>
          ))}
        </Slider>
      </section>
    );
};

export default Animals;
