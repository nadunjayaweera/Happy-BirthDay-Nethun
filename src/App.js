import React, { useState, useEffect } from "react";
import "./App.css";
import { CSSTransition } from "react-transition-group";
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";
import image3 from "./image3.jpg";
import image4 from "./image44.jpg";

const messages = ["Hay Mister Butter Cup", "We know it's your special Day."];
const images = [image1, image2, image3, image4];
const transitions = ["fade", "slide-left", "rotate", "flip"];

function App() {
  const [currentStep, setCurrentStep] = useState(0); // 0 for messages, 1 for images
  const [currentIndex, setCurrentIndex] = useState(0); // Index for messages or images
  const [showElement, setShowElement] = useState(true); // Controls fade-in and fade-out

  useEffect(() => {
    const timer = setTimeout(() => setShowElement(false), 3000); // Trigger fade-out after 3 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, currentStep]);

  useEffect(() => {
    if (!showElement) {
      // After fade-out
      const timer = setTimeout(() => {
        if (currentStep === 0 && currentIndex < messages.length - 1) {
          setCurrentIndex((prev) => prev + 1); // Move to the next message
        } else if (currentStep === 0 && currentIndex === messages.length - 1) {
          setCurrentStep(1); // Switch to images
          setCurrentIndex(0); // Reset index for images
        } else if (currentStep === 1 && currentIndex < images.length - 1) {
          setCurrentIndex((prev) => prev + 1); // Move to the next image
        }
        setShowElement(true); // Fade-in the next element
      }, 500); // Wait for fade-out animation to finish
      return () => clearTimeout(timer);
    }
  }, [showElement, currentStep, currentIndex]);

  return (
    <div className="App">
      <header className="App-header">
        {currentStep === 0 && (
          <CSSTransition
            in={showElement}
            timeout={1000}
            classNames="fade"
            unmountOnExit
          >
            <h1 className="animated-text">{messages[currentIndex]}</h1>
          </CSSTransition>
        )}
        {currentStep === 1 && (
          <CSSTransition
            in={showElement}
            timeout={1000}
            classNames={transitions[currentIndex % transitions.length]}
            unmountOnExit
          >
            <img
              src={images[currentIndex]}
              className="animated-image"
              alt={`Birthday image ${currentIndex + 1}`}
            />
          </CSSTransition>
        )}
      </header>
    </div>
  );
}

export default App;
