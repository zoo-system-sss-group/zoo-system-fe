import Footer from "../components/landingPage/Footer";
import Header from "../components/landingPage/Header";
import image from "../assets/an-2.jpg";

function Animals() {
  return (
    <div>
      <Header />
      <main>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src={image}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Animals;
