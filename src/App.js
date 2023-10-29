import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Animals from "./pages/Animals";
import News from "./pages/News";
import BuyTicket from "./pages/BuyTicket";
import initializeApp from "./app/init";
import checkAuth from "./app/auth";
import LayoutSections from "./components/layout/LayoutSections";
import Layout from "./containers/Layout";
import { NewsDetail } from "./pages/news/NewsDetail";
import Page404 from "./pages/Page404";

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
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/buyticket" element={<BuyTicket />} />
        <Route path="/management/*" element={<Layout />} />
        
        <Route path="page404" element={<Page404 />} />

        <Route
          path="*"
          element={
            <Navigate to={token ? "/management/dashboard" : "/page404"} replace />
          }
        />
      </Routes>
    </BrowserRouter>
    // <LandingPage />
  );
}

export default App;
