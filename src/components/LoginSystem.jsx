import { useState } from 'react';
import { voterService } from '../api/voterService';
import { X, Loader2 } from 'lucide-react';
import './LoginSystem.css';

export default function LoginSystem({ onClose, onLoginSuccess }) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = () => {
    if (phone.length >= 10) {
      setOtpSent(true);
      setOtp('123456'); // Auto-fill demo OTP
    } else {
      setError('Please enter a valid 10-digit mobile number.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = await voterService.loginUser(phone, otp);
    
    if (response.success) {
      onLoginSuccess(response.profile);
    } else {
      setError(response.error);
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <button className="close-modal" onClick={onClose}><X /></button>
        <h2>Voter Login</h2>
        <p className="login-desc">Enter your registered mobile number to access your voter dashboard.</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Mobile Number</label>
            <div className="phone-input-row">
              <span className="country-code">+91</span>
              <input 
                type="tel" 
                placeholder="9876543210" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
                required
              />
            </div>
          </div>
          
          {!otpSent ? (
            <button type="button" className="btn-primary full-width" onClick={handleSendOTP}>
              Send OTP
            </button>
          ) : (
            <>
              <div className="input-group">
                <label>OTP <span className="otp-hint">(Demo: auto-filled)</span></label>
                <input 
                  type="text" 
                  placeholder="Enter 6-digit OTP" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                />
              </div>
              {error && <p className="error-msg">{error}</p>}
              <button type="submit" className="btn-primary full-width" disabled={loading}>
                {loading ? <Loader2 className="spin" /> : "Verify & Login"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
