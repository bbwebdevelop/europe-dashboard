import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import './styles/global.scss';

function App() {
  const [selectedCountry, setSelectedCountry] = useState("PL");
  const [isDarkMode, setIsDarkMode] = useState(true); // Domyślnie dark mode

  useEffect(() => {
    // Dodajemy klasę do body zależnie od trybu
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const Layout = () => (
    <div className="main">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="container">
        <div className="menuContainer">
          <Menu isDarkMode={isDarkMode} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
        },
        
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
