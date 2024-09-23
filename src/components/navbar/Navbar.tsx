import "./navbar.scss";
import { FaMoon, FaSun } from "react-icons/fa"; 
import { Dispatch, SetStateAction } from "react";

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
        <span>EUrope dashboard</span>
      </div>
      <div className="icons">
        {/* Przełącznik trybu */}
        <div className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
