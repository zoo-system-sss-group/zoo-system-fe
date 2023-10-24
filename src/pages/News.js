import Footer from "../components/landingPage/Footer";
import Header from "../components/landingPage/Header";
import image from "../assets/an-2.jpg";
import GuestLayout from "../components/layout/GuestLayout";

function News() {
  return (
    <div>
      <Header />
      <GuestLayout title="All news">
        {/* container all news */}
        <div className="mx-8 mb-6">
          <div className="card w-64 bg-cor4 shadow-xl">
            <figure>
              <img
                className="w-full h-40 object-cover"
                src={image}
                alt="Tiger"
              />
            </figure>
            <div className="card-body px-4 py-6">
              <h2 className="card-title text-cor2">Tiger</h2>
              <p className="text-cor7">If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
        </div>
        {/* paging */}
        <div className="flex justify-center">
          <div className="join  mb-8 outline">
            <button className="join-item btn">1</button>
            <button className="join-item btn">2</button>
            <button className="join-item btn btn-disabled">...</button>
            <button className="join-item btn">99</button>
            <button className="join-item btn">100</button>
          </div>
        </div>
        </GuestLayout> 
      <Footer />
    </div>
  );
}

export default News;
