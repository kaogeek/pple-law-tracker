import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa"; // Import an icon from react-icons

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition transform hover:scale-110 focus:outline-none"
          style={{
            backgroundColor: "rgb(255, 106, 19)", // Set custom orange color
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          title="Scroll to top"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
