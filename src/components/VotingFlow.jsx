import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './VotingFlow.css';

const votingSteps = [
  {
    title: "Go to Polling Booth",
    icon: "🏫",
    content: (
      <div className="vote-step-detail">
        <h3>Step 1: Visit Your Assigned Polling Booth</h3>
        <p>On Election Day, head to your designated polling station. It is assigned by the Election Commission based on your registered address.</p>
        <div className="tip-cards">
          <div className="tip-card">
            <span className="tip-emoji">⏰</span>
            <div>
              <h4>Polling Hours</h4>
              <p>Typically 7:00 AM to 6:00 PM. Arrive early to avoid queues.</p>
            </div>
          </div>
          <div className="tip-card">
            <span className="tip-emoji">📍</span>
            <div>
              <h4>Find Your Booth</h4>
              <p>Check your Voter Slip or use the Voter Helpline App to locate your booth.</p>
            </div>
          </div>
          <div className="tip-card">
            <span className="tip-emoji">🚫</span>
            <div>
              <h4>Not Allowed</h4>
              <p>Mobile phones, cameras, and weapons are strictly prohibited inside the booth.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Identity Verification",
    icon: "🪪",
    content: (
      <div className="vote-step-detail">
        <h3>Step 2: Show Your ID at the Polling Station</h3>
        <p>A polling officer will verify your identity against the electoral roll. You must present a valid photo ID.</p>
        
        <div className="accepted-ids">
          <h4>Accepted Identity Documents:</h4>
          <div className="id-grid">
            <div className="id-item active-id">
              <img src="/images/aadhaar.png" alt="Aadhaar" className="id-img" />
              <span>Aadhaar Card</span>
            </div>
            <div className="id-item">
              <div className="id-placeholder">🪪</div>
              <span>EPIC (Voter ID)</span>
            </div>
            <div className="id-item">
              <div className="id-placeholder">🛂</div>
              <span>Passport</span>
            </div>
            <div className="id-item">
              <div className="id-placeholder">🪪</div>
              <span>Driving License</span>
            </div>
          </div>
        </div>

        <div className="info-box">
          <strong>📋 Process:</strong> The officer marks your name in the register, and you sign or provide a thumbprint to confirm attendance.
        </div>
      </div>
    )
  },
  {
    title: "Indelible Ink",
    icon: "✍️",
    content: (
      <div className="vote-step-detail">
        <h3>Step 3: Indelible Ink Mark on Your Finger</h3>
        <p>After identity verification, an indelible (permanent) ink mark is applied to the cuticle of your <strong>left index finger</strong>.</p>
        
        <div className="ink-info">
          <div className="ink-visual">
            <div className="finger-icon">☝️</div>
            <div className="ink-dot"></div>
          </div>
          <div className="ink-details">
            <h4>Why the ink mark?</h4>
            <ul>
              <li>It prevents <strong>duplicate voting</strong> (bogus voting).</li>
              <li>The ink contains <strong>silver nitrate</strong> and lasts for <strong>2–4 weeks</strong>.</li>
              <li>It is applied <strong>before</strong> you cast your vote.</li>
              <li>It is <strong>non-toxic</strong> and completely safe.</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Cast Vote on EVM",
    icon: "🗳️",
    content: (
      <div className="vote-step-detail">
        <h3>Step 4: Cast Your Vote Using the EVM</h3>
        <p>You enter the voting compartment where the <strong>EVM (Electronic Voting Machine)</strong> ballot unit is placed.</p>
        
        <div className="evm-showcase">
          <img src="/images/evm.png" alt="EVM and VVPAT Machine" className="evm-image" />
        </div>

        <div className="evm-instructions">
          <h4>How to Use the EVM:</h4>
          <ol>
            <li>Find your candidate's <strong>name and party symbol</strong> on the ballot unit.</li>
            <li>Press the <strong>blue button</strong> next to your chosen candidate.</li>
            <li>You will hear a <strong>beep sound</strong> and a <strong>red light</strong> will glow next to the candidate's name.</li>
            <li>This confirms your vote has been recorded.</li>
          </ol>
        </div>

        <div className="info-box">
          <strong>⚠️ Important:</strong> You can only press one button. Once pressed, the EVM locks and no further input is accepted. Your vote is completely secret.
        </div>
      </div>
    )
  },
  {
    title: "VVPAT Confirmation",
    icon: "✅",
    content: (
      <div className="vote-step-detail">
        <h3>Step 5: Verify via VVPAT Slip</h3>
        <p>After pressing the button on the EVM, the <strong>VVPAT (Voter Verifiable Paper Audit Trail)</strong> machine generates a printed slip.</p>
        
        <div className="vvpat-demo">
          <div className="vvpat-machine">
            <div className="vvpat-window">
              <div className="vvpat-slip">
                <p className="slip-serial">Sl. No: 0042</p>
                <p className="slip-candidate">✦ Candidate Name</p>
                <p className="slip-party">Party Symbol</p>
                <div className="slip-line"></div>
              </div>
            </div>
            <p className="vvpat-label">VVPAT Glass Window</p>
          </div>
        </div>

        <div className="vvpat-steps">
          <h4>How VVPAT Works:</h4>
          <ul>
            <li>The printed slip is visible behind a <strong>glass window</strong> for exactly <strong>7 seconds</strong>.</li>
            <li>It shows the candidate's <strong>name, serial number, and party symbol</strong>.</li>
            <li>After 7 seconds, the slip is <strong>automatically cut</strong> and drops into a sealed box.</li>
            <li>You <strong>cannot touch</strong> the slip — it is for visual verification only.</li>
          </ul>
        </div>

        <div className="info-box success">
          <strong>🎉 Done!</strong> Your vote has been successfully cast and verified. You may now leave the polling booth. Democracy thanks you!
        </div>
      </div>
    )
  }
];

export default function VotingFlow({ onBack }) {
  const [currentStep, setCurrentStep] = useState(0);

  const goNext = () => {
    if (currentStep < votingSteps.length - 1) setCurrentStep(currentStep + 1);
  };

  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="voting-flow">
      <div className="section-header">
        <h2>🗳️ How Voting Works in India</h2>
        <button className="btn-secondary" onClick={onBack}>
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      <div className="step-progress">
        {votingSteps.map((step, index) => (
          <div key={index} className={`progress-item ${index <= currentStep ? 'active' : ''} ${index === currentStep ? 'current' : ''}`} onClick={() => setCurrentStep(index)}>
            <div className="progress-dot">{index < currentStep ? '✓' : step.icon}</div>
            <span className="progress-label">{step.title}</span>
          </div>
        ))}
      </div>

      <div className="step-container">
        {votingSteps[currentStep].content}
      </div>

      <div className="step-nav">
        <button className="btn-secondary" onClick={goPrev} disabled={currentStep === 0}>
          <ArrowLeft size={18} /> Previous
        </button>
        <span className="step-counter">Step {currentStep + 1} of {votingSteps.length}</span>
        <button className="btn-primary" onClick={goNext} disabled={currentStep === votingSteps.length - 1}>
          Next <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
