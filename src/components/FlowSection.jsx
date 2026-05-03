import { ArrowLeft } from 'lucide-react';
import './FlowSection.css';

export default function FlowSection({ title, steps, onBack }) {
  return (
    <div className="flow-section">
      <div className="section-header">
        <h2>{title}</h2>
        <button className="btn-secondary" onClick={onBack}>
          <ArrowLeft size={18} /> Back
        </button>
      </div>
      <div className="flow-grid">
        {steps.map((step, index) => (
          <div key={index} className="flow-step">
            <div className="step-number">{index + 1}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
