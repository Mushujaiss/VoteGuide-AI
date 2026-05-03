import { Vote, LayoutDashboard, Sun, Moon, Palette } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onLoginClick, isLoggedIn, onDashboardClick, theme, setTheme }) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => window.location.reload()}>
        <Vote color="var(--saffron)" />
        <span>VoteGuide<span className="white">AI</span> <span className="green">🇮🇳</span></span>
      </div>
      
      <div className="nav-actions">
        <div className="theme-switcher glass-panel">
          <button 
            className={`theme-opt ${theme === 'default' ? 'active' : ''}`} 
            onClick={() => setTheme('default')}
            title="Default Theme"
          >
            <Palette size={16} />
          </button>
          <button 
            className={`theme-opt ${theme === 'dark' ? 'active' : ''}`} 
            onClick={() => setTheme('dark')}
            title="Dark Theme"
          >
            <Moon size={16} />
          </button>
          <button 
            className={`theme-opt ${theme === 'light' ? 'active' : ''}`} 
            onClick={() => setTheme('light')}
            title="Light Theme"
          >
            <Sun size={16} />
          </button>
        </div>

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
