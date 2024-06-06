import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show or hide the button based on scroll position
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll the window to the top
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
    <div className="fixed bottom-16 lg:bottom-12 left-[50%] lg:transform-none transform -translate-x-1/2 lg:left-[4.7rem] ">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          GO UP
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
