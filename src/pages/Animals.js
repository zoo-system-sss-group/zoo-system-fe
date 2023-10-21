import Footer from "../components/landingPage/Footer";
import Header from "../components/landingPage/Header";
import GuestLayout from "../components/layout/GuestLayout";
import ImgAnimal1 from "../assets/an-1.jpg";
import ImgAnimal2 from "../assets/an-2.jpg";
import ImgAnimal3 from "../assets/an-3.jpg";
import ImgAnimal4 from "../assets/an-4.jpg";
import ImgAnimal5 from "../assets/an-5.jpg";
import Pagination from "../components/layout/Pagination";
import React from "react";
const animals = [
  {
    src: ImgAnimal1,
    id: "anima1",
    especie: "iguana",
    descricao:
      "Aliquam erat volutpat. Suspendisse lobortis lacus eu metus viverra vulputate.",
  },
  {
    src: ImgAnimal2,
    id: "anima2",
    especie: "leão",
    descricao:
      "Aenean at ipsum a eros sollicitudin fringilla. Nullam blandit nisi nec enim faucibus, in consequat nisi varius.",
  },
  {
    src: ImgAnimal3,
    id: "anima3",
    especie: "Flamingo",
    descricao:
      "Donec in massa eget sem consectetur pulvinar. Aliquam erat volutpat. Suspendisse lobortis lacus eu metus viverra vulputate.",
  },
  {
    src: ImgAnimal4,
    id: "anima4",
    especie: "Rinoceronte",
    descricao:
      " Curabitur sit amet volutpat nulla. Vivamus leo lorem, interdum eget consequat id, aliquet id metus.",
  },
  {
    src: ImgAnimal5,
    id: "anima5",
    especie: "mico-leão-dourado",
    descricao:
      "Aliquam tincidunt ante magna, bibendum fermentum dolor venenatis ut. Praesent ipsum nulla, sodales ac posuere quis, tristique eu leo.",
  },
  {
    src: ImgAnimal4,
    id: "anima4",
    especie: "Rinoceronte",
    descricao:
      " Curabitur sit amet volutpat nulla. Vivamus leo lorem, interdum eget consequat id, aliquet id metus.",
  },
  {
    src: ImgAnimal5,
    id: "anima5",
    especie: "mico-leão-dourado",
    descricao:
      "Aliquam tincidunt ante magna, bibendum fermentum dolor venenatis ut. Praesent ipsum nulla, sodales ac posuere quis, tristique eu leo.",
  },
  {
    src: ImgAnimal1,
    id: "anima1",
    especie: "iguana",
    descricao:
      "Aliquam erat volutpat. Suspendisse lobortis lacus eu metus viverra vulputate.",
  },
  {
    src: ImgAnimal2,
    id: "anima2",
    especie: "leão",
    descricao:
      "Aenean at ipsum a eros sollicitudin fringilla. Nullam blandit nisi nec enim faucibus, in consequat nisi varius.",
  },
  {
    src: ImgAnimal3,
    id: "anima3",
    especie: "Flamingo",
    descricao:
      "Donec in massa eget sem consectetur pulvinar. Aliquam erat volutpat. Suspendisse lobortis lacus eu metus viverra vulputate.",
  },
  {
    src: ImgAnimal4,
    id: "anima4",
    especie: "Rinoceronte",
    descricao:
      " Curabitur sit amet volutpat nulla. Vivamus leo lorem, interdum eget consequat id, aliquet id metus.",
  },
  {
    src: ImgAnimal5,
    id: "anima5",
    especie: "mico-leão-dourado",
    descricao:
      "Aliquam tincidunt ante magna, bibendum fermentum dolor venenatis ut. Praesent ipsum nulla, sodales ac posuere quis, tristique eu leo.",
  },
];
const params = new URLSearchParams(window.location.search) // id=123
var page = params.get('page') ?? 1;
const pageSize = 4;
function Animals() {

    

  return (
    
    <div>
      <Header />
      <GuestLayout title="All animals">
        {/* container all animals */}
        <div className="mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                justify-center gap-4 my-6 ">
          {animals.map((animal) => (
            <div
              key={animal.id}
              className="card w-72 md:w-90 mx-auto bg-cor4 shadow-xl hover:scale-[1.075] hover:transition"
              title={animal.descricao}
            >
              <figure>
                <img
                  className="w-full h-40 object-cover"
                  src={animal.src}
                  alt={animal.especie}
                />
              </figure>
              <div className="card-body px-4 py-6">
                <h2 className="card-title text-cor2">{animal.especie}</h2>
                <p className="text-cor7 line-clamp-4">{animal.descricao}</p>
              </div>
            </div>
          ))}
        </div>
        {/* paging */}
        <Pagination
          clicked={(value) => {
            page = value
            console.log(`clicked ${page}`);
          }}
          pageIndex={page}
          pageSize={pageSize}
          totalItems={animals.length}
        />
      </GuestLayout>
      <Footer />
    </div>
  );
}

export default Animals;
