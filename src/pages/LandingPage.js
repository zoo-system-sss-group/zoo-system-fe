import News from "../components/landingPage/News";
import Animals from "../components/landingPage/Animals";
import EmailSection from "../components/landingPage/EmailSection";
import Home from "../components/landingPage/Home";
import Footer from "../components/landingPage/Footer";
import Header from "../components/landingPage/Header";
import About from "../components/landingPage/About";

function LandingPage() {
  return (
    <div>
      <Header />
      <main>
        <Home />
        <Animals />
        <News />
        <About />
        <EmailSection />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
