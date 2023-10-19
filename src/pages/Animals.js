import Footer from "../components/landingPage/Footer";
import Header from "../components/landingPage/Header";
import Pagination from "./Pagination";
import ImgAnimal1 from "../assets/an-1.jpg";
import ImgAnimal2 from "../assets/an-2.jpg";
import ImgAnimal3 from "../assets/an-3.jpg";
import ImgAnimal4 from "../assets/an-4.jpg";
import ImgAnimal5 from "../assets/an-5.jpg";
// import image from "../assets/an-2.jpg";
import GuestLayout from "../components/layout/GuestLayout";
const animals = [
  {
    src: ImgAnimal1,
    id: "anima1",
    species: "iguana",
    description:
      "Aliquam erat volutpat. Suspendisse lobortis lacus eu metus viverra vulputate.",
  },
  {
    src: ImgAnimal2,
    id: "anima2",
    species: "leão",
    description:
      "Aenean at ipsum a eros sollicitudin fringilla. Nullam blandit nisi nec enim faucibus, in consequat nisi varius.",
  },
  {
    src: ImgAnimal3,
    id: "anima3",
    species: "Flamingo",
    description:
      "Donec in massa eget sem consectetur pulvinar. Aliquam erat volutpat. Suspendisse lobortis lacus eu metus viverra vulputate.",
  },
  {
    src: ImgAnimal4,
    id: "anima4",
    species: "Rinoceronte",
    description:
      " Curabitur sit amet volutpat nulla. Vivamus leo lorem, interdum eget consequat id, aliquet id metus.",
  },
  {
    src: ImgAnimal5,
    id: "anima5",
    species: "mico-leão-dourado",
    description:
      "Aliquam tincidunt ante magna, bibendum fermentum dolor venenatis ut. Praesent ipsum nulla, sodales ac posuere quis, tristique eu leo.",
  },
];
const page = 5;
const pageSize = 10;
function Animals() {
  return (
    <div>
      <Header />
      <GuestLayout title="All animals">
        {/* container all animals */}
        <ul className="grid gap-8 m-[2rem] xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 justify-center">
          {animals.map((animal) => (
            <li
              className="w-auto flex items-stretch rounded-xl 
                      hover:scale-[105%] hover:transition hover:cursor-pointer"
            >
              <div className="card bg-cor4 shadow-xl">
                <figure>
                  <img
                    className="w-full h-40 object-cover"
                    src={animal.src}
                    alt={animal.species}
                  />
                </figure>
                <div className="card-body px-4 py-6">
                  <h2 className="card-title text-cor2">{animal.species}</h2>
                  <p className="text-cor7">{animal.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {/* paging */}

        <div className="flex justify-center">
          <div className="join  mb-8 outline">
            <button className="join-item btn">1</button>
            <button className="join-item btn ">2</button>
            <button className="join-item btn btn-disabled">...</button>
            <button className="join-item btn">99</button>
            <button className="join-item btn">100</button>
          </div>
        </div>
        <Pagination currentPage={page} totalPages={pageSize} onPageChange={()=>{
          console.log("page Changed")
        }} />
      </GuestLayout>
      <Footer />
    </div>
  );
}

export default Animals;
