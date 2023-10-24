import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Animals from "./pages/Animals"
import News from "./pages/News";
import BuyTicket from "./pages/BuyTicket";
import initializeApp from "./app/init";
import checkAuth from "./app/auth";
import LayoutSections from "./components/layout/LayoutSections";
import Layout from "./containers/Layout";

initializeApp();

const token = checkAuth();

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

          <Route path="/management/*" element={<Layout />} />

					<Route
						path="*"
						element={
							<Navigate to={token ? "/management/dashboard" : "/"} replace />
						}
					/>
      </Routes>
    </BrowserRouter>
    // <LandingPage />
  );
}

export default App;
