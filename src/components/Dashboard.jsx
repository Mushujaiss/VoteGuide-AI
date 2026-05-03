import { useState } from 'react';
import { User, MapPin, Calendar, FileText, Mail, Briefcase, Users, Phone, Edit3, Save, Download, Bell, CheckCircle2 } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard({ userProfile, onLogout }) {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: userProfile?.name || 'Voter Name',
    email: '',
    phone: userProfile?.phone || '',
    occupation: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    maritalStatus: '',
    qualification: '',
    bloodGroup: '',
    constituency: userProfile?.constituency || 'New Delhi',
    pollingStation: userProfile?.pollingStation || 'Govt. Primary School, Room No. 5',
    epic: userProfile?.epic || 'IND' + Math.random().toString(36).substring(2, 9).toUpperCase(),
    address: userProfile?.address || '',
    nextElection: '2026 State Assembly Elections',
    reminderSet: false
  });

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <div className="dashboard fade-in">
      <div className="dash-header">
        <div className="dash-welcome">
          <img src="/images/avatar.png" alt="Profile" className="dash-avatar" />
          <div>
            <h2>Welcome, {profile.name}!</h2>
            <p className="dash-subtitle">Voter Dashboard • <span className="active-badge">Active Voter</span></p>
          </div>
        </div>
        <div className="dash-actions-top">
          {editing ? (
            <button className="btn-save" onClick={handleSave}><Save size={16} /> Save Changes</button>
          ) : (
            <button className="btn-edit" onClick={() => setEditing(true)}><Edit3 size={16} /> Edit Profile</button>
          )}
          <button className="btn-logout" onClick={onLogout}>Logout</button>
        </div>
      </div>

      <div className="dash-grid">
        {/* Quick Info Cards */}
        <div className="quick-cards">
          <div className="q-card">
            <MapPin size={20} color="var(--saffron)" />
            <div>
              <span className="q-label">Constituency</span>
              <span className="q-value">{profile.constituency}</span>
            </div>
          </div>
          <div className="q-card">
            <Calendar size={20} color="var(--green)" />
            <div>
              <span className="q-label">Next Election</span>
              <span className="q-value">{profile.nextElection}</span>
            </div>
          </div>
          <div className="q-card">
            <FileText size={20} color="#a5b4fc" />
            <div>
              <span className="q-label">EPIC Number</span>
              <span className="q-value epic-val">{profile.epic}</span>
            </div>
          </div>
          <div className="q-card clickable" onClick={() => {
            setProfile(prev => ({ ...prev, reminderSet: !prev.reminderSet }));
          }}>
            <Bell size={20} color={profile.reminderSet ? "var(--green)" : "var(--text-muted)"} />
            <div>
              <span className="q-label">Election Reminder</span>
              <span className="q-value">{profile.reminderSet ? '✅ Set!' : 'Click to Set'}</span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="dash-section">
          <h3><User size={18} /> Personal Information</h3>
          <div className="info-grid">
            <div className="info-field">
              <label>Full Name</label>
              {editing ? <input type="text" value={profile.name} onChange={e => handleChange('name', e.target.value)} /> : <p>{profile.name}</p>}
            </div>
            <div className="info-field">
              <label>Email ID</label>
              {editing ? <input type="email" placeholder="you@email.com" value={profile.email} onChange={e => handleChange('email', e.target.value)} /> : <p>{profile.email || '—'}</p>}
            </div>
            <div className="info-field">
              <label>Phone Number</label>
              {editing ? <input type="tel" placeholder="+91" value={profile.phone} onChange={e => handleChange('phone', e.target.value)} /> : <p>{profile.phone || '—'}</p>}
            </div>
            <div className="info-field">
              <label>Occupation</label>
              {editing ? (
                <select value={profile.occupation} onChange={e => handleChange('occupation', e.target.value)}>
                  <option value="">Select</option>
                  <option>Student</option>
                  <option>Employed (Govt.)</option>
                  <option>Employed (Private)</option>
                  <option>Self-Employed</option>
                  <option>Business</option>
                  <option>Homemaker</option>
                  <option>Retired</option>
                  <option>Other</option>
                </select>
              ) : <p>{profile.occupation || '—'}</p>}
            </div>
            <div className="info-field">
              <label>Qualification</label>
              {editing ? (
                <select value={profile.qualification} onChange={e => handleChange('qualification', e.target.value)}>
                  <option value="">Select</option>
                  <option>Below 10th</option>
                  <option>10th Pass</option>
                  <option>12th Pass</option>
                  <option>Graduate</option>
                  <option>Post Graduate</option>
                  <option>Doctorate</option>
                </select>
              ) : <p>{profile.qualification || '—'}</p>}
            </div>
            <div className="info-field">
              <label>Marital Status</label>
              {editing ? (
                <select value={profile.maritalStatus} onChange={e => handleChange('maritalStatus', e.target.value)}>
                  <option value="">Select</option>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Widowed</option>
                  <option>Divorced</option>
                </select>
              ) : <p>{profile.maritalStatus || '—'}</p>}
            </div>
            <div className="info-field">
              <label>Blood Group</label>
              {editing ? (
                <select value={profile.bloodGroup} onChange={e => handleChange('bloodGroup', e.target.value)}>
                  <option value="">Select</option>
                  <option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option>
                  <option>AB+</option><option>AB-</option>
                  <option>O+</option><option>O-</option>
                </select>
              ) : <p>{profile.bloodGroup || '—'}</p>}
            </div>
          </div>
        </div>

        {/* Family Details */}
        <div className="dash-section">
          <h3><Users size={18} /> Family Details</h3>
          <div className="info-grid">
            <div className="info-field">
              <label>Father's Name</label>
              {editing ? <input type="text" placeholder="Enter father's name" value={profile.fatherName} onChange={e => handleChange('fatherName', e.target.value)} /> : <p>{profile.fatherName || '—'}</p>}
            </div>
            <div className="info-field">
              <label>Mother's Name</label>
              {editing ? <input type="text" placeholder="Enter mother's name" value={profile.motherName} onChange={e => handleChange('motherName', e.target.value)} /> : <p>{profile.motherName || '—'}</p>}
            </div>
            <div className="info-field">
              <label>Spouse's Name</label>
              {editing ? <input type="text" placeholder="Enter spouse's name" value={profile.spouseName} onChange={e => handleChange('spouseName', e.target.value)} /> : <p>{profile.spouseName || '—'}</p>}
            </div>
          </div>
        </div>

        {/* Address & Polling Info */}
        <div className="dash-section">
          <h3><MapPin size={18} /> Address & Polling Information</h3>
          <div className="info-grid">
            <div className="info-field full-width">
              <label>Residential Address</label>
              {editing ? <textarea rows="2" placeholder="Enter full address" value={profile.address} onChange={e => handleChange('address', e.target.value)} /> : <p>{profile.address || '—'}</p>}
            </div>
            <div className="info-field">
              <label>Constituency</label>
              <p>{profile.constituency}</p>
            </div>
            <div className="info-field">
              <label>Polling Station</label>
              <p>{profile.pollingStation}</p>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="dash-downloads">
          <button className="btn-download-dash"><Download size={16} /> Download e-EPIC Card</button>
          <button className="btn-download-dash outline"><FileText size={16} /> Download Voter Slip</button>
        </div>
      </div>
    </div>
  );
}
