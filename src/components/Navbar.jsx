import { Vote, UserCircle2, LayoutDashboard } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onLoginClick, isLoggedIn, onDashboardClick }) {
  return (
    <nav className="navbar glass-panel">
      <div className="logo" onClick={() => window.location.reload()} style={{cursor: 'pointer'}}>
        <Vote color="var(--saffron)" />
        <span>VoteGuide<span className="white">AI</span> <span className="green">🇮🇳</span></span>
      </div>
      <div className="nav-actions">
        {isLoggedIn ? (
          <button className="nav-btn-active" onClick={onDashboardClick}>
            <LayoutDashboard size={16} />
            <span>My Dashboard</span>
          </button>
        ) : (
          <button className="nav-btn" onClick={onLoginClick}>
            Login / Sign Up
          </button>
        )}
      </div>
    </nav>
  );
}
