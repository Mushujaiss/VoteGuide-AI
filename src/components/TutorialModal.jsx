import { useState } from 'react';
import { X, ArrowRight, Search, Bot, Vote } from 'lucide-react';
import './TutorialModal.css';

const slides = [
  {
    emoji: "🇮🇳",
    title: "Welcome to VoteGuide AI",
    description: "Your complete, step-by-step guide to the Indian election process. Whether you're a first-time voter or already registered, we've got you covered."
  },
  {
    emoji: "🆕",
    title: "New Voter?",
    description: "Click 'First-Time Voter' to walk through the entire registration process — from Form 6 to your EPIC card. We'll show you exactly what documents you need and where to upload them."
  },
  {
    emoji: "🔍",
    title: "Check Your Voter Status",
    description: "Enter your EPIC number in the 'Check Voter Status' section to instantly look up your voter details, polling station, and constituency."
  },
  {
    emoji: "🤖",
    title: "AI Assistant",
    description: "Got questions? Click the orange chat icon at the bottom right to talk to VoteGuide AI. Ask about Form 6, EVMs, VVPAT, required documents, and more!"
  }
];

export default function TutorialModal({ onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-modal">
        <button className="tutorial-close" onClick={onClose}><X size={20} /></button>
        
        <div className="tutorial-content">
          <div className="tutorial-emoji">{slides[currentSlide].emoji}</div>
          <h2>{slides[currentSlide].title}</h2>
          <p>{slides[currentSlide].description}</p>
        </div>

        <div className="tutorial-footer">
          <div className="tutorial-dots">
            {slides.map((_, i) => (
              <div key={i} className={`dot ${i === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(i)} />
            ))}
          </div>
          <button className="btn-primary" onClick={nextSlide}>
            {currentSlide < slides.length - 1 ? (
              <>Next <ArrowRight size={18} /></>
            ) : (
              "Get Started 🚀"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
