import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Animals from "./pages/Animals"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    // <LandingPage />
  );
}

export default App;
