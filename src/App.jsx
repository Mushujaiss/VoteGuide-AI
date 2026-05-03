import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VoterLookup from './components/VoterLookup';
import RegistrationFlow from './components/RegistrationFlow';
import VotingFlow from './components/VotingFlow';
import LoginSystem from './components/LoginSystem';
import ChatAssistant from './components/ChatAssistant';
import TutorialModal from './components/TutorialModal';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [view, setView] = useState('home');
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('voteguide_isLoggedIn') === 'true';
  });
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('voteguide_userProfile');
    return saved ? JSON.parse(saved) : null;
  });
  const [showTutorial, setShowTutorial] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('voteguide_theme') || 'default';
  });

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('voteguide_tutorial_seen');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('voteguide_theme', theme);
  }, [theme]);

  const closeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('voteguide_tutorial_seen', 'true');
  };

  const handleLoginSuccess = (profile) => {
    setIsLoggedIn(true);
    setUserProfile(profile);
    localStorage.setItem('voteguide_isLoggedIn', 'true');
    localStorage.setItem('voteguide_userProfile', JSON.stringify(profile));
    setShowLogin(false);
    setView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    localStorage.removeItem('voteguide_isLoggedIn');
    localStorage.removeItem('voteguide_userProfile');
    setView('home');
  };

  return (
    <>
      <div className="bg-elements">
        <div className="glow glow-saffron"></div>
        <div className="glow glow-green"></div>
        <div className="glow glow-blue"></div>
      </div>

      <Navbar 
        onLoginClick={() => setShowLogin(true)} 
        isLoggedIn={isLoggedIn}
        onDashboardClick={() => setView('dashboard')}
        theme={theme}
        setTheme={setTheme}
      />

      <main className="container">
        {view === 'home' && (
          <div className="fade-in">
            <Hero setView={setView} onLoginClick={() => setShowLogin(true)} />
            <VoterLookup />
          </div>
        )}

        {view === 'registration' && (
          <RegistrationFlow onBack={() => setView('home')} />
        )}

        {view === 'voting' && (
          <VotingFlow onBack={() => setView('home')} />
        )}

        {view === 'dashboard' && isLoggedIn && (
          <Dashboard userProfile={userProfile} onLogout={handleLogout} />
        )}
      </main>

      {showLogin && (
        <LoginSystem 
          onClose={() => setShowLogin(false)} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {showTutorial && <TutorialModal onClose={closeTutorial} />}

      <ChatAssistant />
    </>
  );
}

export default App;
