import { UserPlus, LogIn, BookOpen, HelpCircle } from 'lucide-react';
import './Hero.css';

export default function Hero({ setView, onLoginClick }) {
  return (
    <header className="hero">
      <div className="hero-pill">Powered by Election Commission Guidelines</div>
      <h1>From Registration to Results<br/><span className="highlight-saffron">India's Election Process</span> Made Simple.</h1>
      <p>Your complete, step-by-step interactive guide to registering, campaigning, and voting in the world's largest democracy.</p>
      
      {/* Two Main Paths */}
      <div className="hero-cards">
        <div className="hero-path-card new-voter" onClick={() => setView('registration')}>
          <div className="path-icon">🆕</div>
          <h3>First-Time Voter</h3>
          <p>New to voting? Start here for a complete registration tutorial with Form 6, document uploads, and verification steps.</p>
          <span className="path-cta"><UserPlus size={16} /> Start Registration Guide →</span>
        </div>

        <div className="hero-path-card registered" onClick={onLoginClick}>
          <div className="path-icon">🔐</div>
          <h3>Already Registered</h3>
          <p>Have a Voter ID? Log in to view your constituency, polling station, election dates, and download your voter slip.</p>
          <span className="path-cta"><LogIn size={16} /> Login / Sign Up →</span>
        </div>
      </div>

      {/* Secondary Actions */}
      <div className="hero-actions">
        <button className="btn-secondary" onClick={() => setView('voting')}>
          <BookOpen size={18} /> Learn How Voting Works
        </button>
      </div>
    </header>
  );
}
