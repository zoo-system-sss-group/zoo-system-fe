import Footer from "../components/landingPage/Footer";
import Header from "../components/landingPage/Header";
import GuestLayout from "../components/layout/GuestLayout";
import Pagination from "../components/layout/Pagination";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Animal } from "../app/class/Animal";
import { useParams } from "react-router";
const params = new URLSearchParams(window.location.search); // id=123
const pageSize = 12;
function Animals() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [animals, setAnimals] = useState([]);
  const { page } = useParams();
  const [pageIndex, setIndex] = useState(page ? parseInt(page) : 1);
  useEffect(() => {
    console.log(page);
    setLoading(true);
    axios
      .get(
        `/odata/animals?$count=true&$top=${pageSize}&$skip=${
          pageSize * pageIndex - pageSize
        }&$expand=species`
      )
      .then((resp) => {
        setLoading(false);

        var animalData = resp.data.value;
        setData(resp.data || {});
        const animals = animalData.map((data) => new Animal(data));
        setAnimals(animals);
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
        setAnimals([]);
      });
  }, [pageIndex]);
  const handlePageChange = (newPage) => {
    setIndex(newPage);
  };
  if (animals)
    return (
      <div>
        <Header />
        <GuestLayout title="All animals">
          <div
            className={
              "mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative xl:grid-cols-4 justify-center gap-4 my-6 "
            }
          >
            {loading ? (
              <>
                <div className="absolute loading m-auto inset-0"></div>
                <div className=" h-[300px]"></div>
              </>
            ) : (
              animals.map((animal) => (
                <div
                  key={animal.Id}
                  className="card w-72 md:w-90 mx-auto bg-cor4 shadow-xl hover:scale-[1.075] hover:transition"
                  title={animal.Description}
                >
                  <figure>
                    <img
                      className="w-full h-40 object-cover"
                      src={animal.Image}
                      alt={animal.Species.Name}
                    />
                  </figure>
                  <div className="card-body px-4 py-6">
                    <h2 className="card-title text-cor2">
                      {animal.Species.Name}
                    </h2>
                    <p className="text-cor7 line-clamp-4">
                      {animal.Description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* paging */}
          <Pagination
            clicked={handlePageChange}
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalItems={data["@odata.count"]}
          />
        </GuestLayout>
        <Footer />
      </div>
    );
}

export default Animals;
