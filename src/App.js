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
  const [finalMessage, setFinalMessage] = useState(false); // To handle "From QT Family"
  const [showFinalMessage, setShowFinalMessage] = useState(false); // Final message animation state

  useEffect(() => {
    const timer = setTimeout(() => setShowElement(false), 4000); // Trigger fade-out after 4 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, currentStep]);

  useEffect(() => {
    if (!showElement) {
      const timer = setTimeout(() => {
        if (currentStep === 0 && currentIndex < messages.length - 1) {
          setCurrentIndex((prev) => prev + 1); // Move to the next message
        } else if (currentStep === 0 && currentIndex === messages.length - 1) {
          setCurrentStep(1); // Switch to images
          setCurrentIndex(0); // Reset index for images
        } else if (currentStep === 1 && currentIndex < images.length - 1) {
          setCurrentIndex((prev) => prev + 1); // Move to the next image
        } else if (currentStep === 1 && currentIndex === images.length - 1) {
          setFinalMessage(true); // Trigger final message state
          setTimeout(() => setShowFinalMessage(true), 800); // Smooth delay before showing final message
        }
        setShowElement(true); // Fade-in the next element
      }, 800); // Slight delay between transitions
      return () => clearTimeout(timer);
    }
  }, [showElement, currentStep, currentIndex]);

  return (
    <div className="App">
      <header className="App-header">
        {currentStep === 0 && (
          <CSSTransition
            in={showElement}
            timeout={2000}
            classNames="fade"
            unmountOnExit
          >
            <h1 className="animated-text">{messages[currentIndex]}</h1>
          </CSSTransition>
        )}
        {currentStep === 1 && !finalMessage && (
          <CSSTransition
            in={showElement}
            timeout={2000}
            classNames={
              currentIndex === 0
                ? "popup"
                : transitions[currentIndex % transitions.length]
            }
            unmountOnExit
          >
            <div className="image-container">
              <img
                src={images[currentIndex]}
                className="animated-image"
                alt={`Birthday image ${currentIndex + 1}`}
              />
              {currentIndex === images.length - 1 && (
                <div className="overlay-text">Happy Birthday Nethun</div>
              )}
            </div>
          </CSSTransition>
        )}
        {finalMessage && (
          <CSSTransition
            in={showFinalMessage}
            timeout={2000} // Smooth transition for final message
            classNames="slide-up" // Apply the "slide-up" animation
            unmountOnExit
          >
            <h1 className="final-message">From QT Family</h1>
          </CSSTransition>
        )}
      </header>
    </div>
  );
}

export default App;
