import News from "./components/landingPage/News";
import Animals from "./components/landingPage/Animals";
import EmailSection from "./components/landingPage/EmailSection";
import Home from "./components/landingPage/Home";
import Faq from "./components/landingPage/Faq";
import Footer from "./components/landingPage/Footer";
import Header from "./components/landingPage/Header";
import About from "./components/landingPage/About";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Home />
        <Animals />
        <News />
        <About />
        <Faq />
        <EmailSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
