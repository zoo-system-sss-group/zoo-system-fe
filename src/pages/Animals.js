import Footer from "../components/landingPage/Footer";
import Header from "../components/landingPage/Header";
import GuestLayout from "../components/layout/GuestLayout";
import Pagination from "../components/layout/Pagination";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Animal } from "../app/class/Animal";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
const params = new URLSearchParams(window.location.search); // id=123
const pageSize = 8;
function Animals() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [animals, setAnimals] = useState([]);
  const [err, setError] = useState(null);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const page = params.get("page") ?? 1;

  const [pageIndex, setIndex] = useState(page ? parseInt(page) : 1);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/odata/animals?$count=true&$orderby=BirthDate desc&$top=${pageSize}&$skip=${
          pageSize * pageIndex - pageSize
        }&$expand=species`
      )
      .then((resp) => {
        var animalData = resp.data.value;
        setData(resp.data || {});
        const animals = animalData.map((data) => new Animal(data));
        setAnimals(animals);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          setError("Server Not Loaded!");
        }
        setAnimals([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pageIndex]);

  const handlePageChange = (newPage) => {
    setIndex(newPage);
    navigate(`/animals?page=${newPage}`, { replace: true });
  };
  return (
    <div>
      <Header />
      {animals ? (
        <GuestLayout title="All animals">
          <div
            className={
              "mx-8 my-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-10 relative"
            }
          >
            {loading ? (
              <>
                <div className="absolute loading m-auto inset-0"></div>
              </>
            ) : (
              animals.map((animal) => (
                <Link to={`${animal.Id}?page=${page}`}
                  key={animal.Id}
                  className="card w-full  mx-auto bg-cor4 shadow-xl hover:scale-[1.05] hover:transition"
                  title={animal.Description}
                >
                  <figure>
                    <img
                      className="w-full aspect-square object-cover  "
                      src={animal.Image ? animal.Image : "img/noimage.jpg"}
                      alt={animal.Species.Name}
                    />
                  </figure>
                  <div className="card-body px-4 py-6">
                    <h2 className="card-title text-cor2">
                      {animal.Name}
                      <span className="text-cor7 text-sm inline-block my-auto">
                        {" "}
                        ({animal.Species.Name})
                      </span>
                    </h2>
                    <p className="text-cor7 line-clamp-4">
                      {animal.Description}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
          {err && <h1 className="text-center align-middle h-12">{err}</h1>}
          {/* paging */}
          <Pagination
            clicked={handlePageChange}
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalItems={data["@odata.count"]}
          />
        </GuestLayout>
      ) : (
        <div>Error</div>
      )}

      <Footer />
    </div>
  );
}

export default Animals;
