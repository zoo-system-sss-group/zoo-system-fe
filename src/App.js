import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Animals from "./pages/Animals"
import News from "./pages/News";
import BuyTicket from "./pages/BuyTicket";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/news" element={<News />} />
          <Route path="/buyticket" element={<BuyTicket />} />
      </Routes>
    </BrowserRouter>
    // <LandingPage />
  );
}

export default App;
