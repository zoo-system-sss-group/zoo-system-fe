import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/landingPage/Header";

import GuestLayout from "../../components/layout/GuestLayout";
import Footer from "../../components/landingPage/Footer";
import { ArrowLeftIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
const INITIAL_ANIMAL_OBJ = {
  Id: "",
  Name: "",
  Image: "",
  Description: "",
  Weight: 0,
  Height: 0,
  BirthDate: "",
  SpeciesId: 0,
  Species: {
    Name: "",
    ScientificName: "",
    LifeSpan: 0,
    Description: "",
    WildDiet: "",
    Habitat: "",
    Id: 0,
    CreationDate: "",
    ModificationDate: "",
    DeletionDate: null,
    IsDeleted: false,
  },
  CageHistories: [],
  CreationDate: "",
  DeletionDate: "",
  IsDeleted: false,
};
function AnimalDetail() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(INITIAL_ANIMAL_OBJ);
  const [error, setError] = useState(null);
  const navigate = useNavigate(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`/odata/animals(${id})?$expand=species`)
      .then((resp) => {
        var animalData = resp.data;
        if (animalData.IsDeleted) animalData = null;
        setAnimal(animalData);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          setError("Server Not Loaded!");
        }
        if (err.response.status === 404) {
          navigate("/404", { replace: true });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);



  return (
    <div>
      <Header />
      {animal && (
        <main className="flex flex-wrap min-h-[500px]">
          <div className="w-full lg:w-1/2  relative bg-cor4 border-r-cor6 border-r ">
            <img
              className="w-full border border-solid rounded-sm "
              src={animal.Image}
              alt={animal.Name}
            />
            <Link
              to="../animals"
              className="hidden lg:block rounded-lg absolute  items-center justify-center
               p-2 btn btn-primary transition duration-500   top-1 right-1 bg-cor1"
            >
              <ArrowLeftIcon className="h-6 w-6 inline-block font-extrabold stroke-2 relative z-10 text-cor4" />
            </Link>
          </div>
          <section className="w-full lg:w-1/2 p-2 bg-cor4 text-cor2 text-lg relative ">
            {loading ? (
              <div className="loading absolute inset-0"></div>
            ) : (
              <>
                <h1 className="text-5xl my-2 card-title">{animal.Name}</h1>
                <p className="text-lg text-cor2">{animal.Description}</p>
                <div className="mt-4 text-cor2">
                  <ul>
                    <li>
                      <strong className="text-cor2">Weight:</strong>{" "}
                      {animal.Weight} kg
                    </li>
                    {animal.Height && (
                      <li>
                        <strong className="text-cor2">Height:</strong>{" "}
                        {animal.Height} meters
                      </li>
                    )}
                    <li>
                      <strong className="text-cor2">Birth Date:</strong>{" "}
                      {new Date(animal.BirthDate).toLocaleDateString()}
                    </li>
                  </ul>
                  <h2 className="text-3xl my-2 text-cor2">Animal Details</h2>
                  <ul>
                    <li>
                      <strong className="text-cor2">Species:</strong>{" "}
                      {animal.Species.Name}{" "}
                      <span className="text-cor2">
                        ({animal.Species.ScientificName})
                      </span>
                    </li>

                    <li>
                      <strong className="text-cor2">Life Span:</strong>{" "}
                      {animal.Species.LifeSpan} years
                    </li>
                    <li>
                      <strong className="text-cor2">Habitat:</strong>{" "}
                      {animal.Species.Habitat}
                    </li>

                    <li>
                      <strong className="text-cor2">Status:</strong>{" "}
                      {animal.Status}
                    </li>
                    <li>
                      <strong className="text-cor2">Wild Diet:</strong>{" "}
                      {animal.Species.WildDiet}
                    </li>
                  </ul>
                </div>
                <Link
                  to={"../animals"}
                  className="absolute ms-auto bottom-5 right-5 p-2 btn btn-primary"
                >
                  Go Back
                </Link>
              </>
            )}
          </section>
        </main>
      )}
      <div className="block m-auto">{error}</div>
      <Footer />
    </div>
  );
}

export default AnimalDetail;
