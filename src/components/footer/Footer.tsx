import { useState, useEffect } from "react";
import "./footer.scss";

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className={`footer ${isDarkMode ? 'dark' : 'light'}`}>
      <span>{currentTime.toLocaleTimeString()}</span> 
      <span>
        crafted by{" "}
        <a
          href="https://www.bbwebdevelop.pl"
          target="_blank"
          rel="noopener noreferrer"
        >
          bbwebdevelop
        </a>
      </span>
    </div>
  );
};

export default Footer;
