import { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, CheckCircle2, FileText, Camera, PenTool, Download, ExternalLink } from 'lucide-react';
import './RegistrationFlow.css';

export default function RegistrationFlow({ onBack }) {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form 6 state
  const [formData, setFormData] = useState({
    fullName: '', fatherName: '', motherName: '', dob: '', gender: '',
    address: '', pincode: '', state: '', district: '', mobile: '', email: '',
    idType: '', idNumber: ''
  });

  // Document uploads state
  const [uploads, setUploads] = useState({
    photo: null, idProof: null, addressProof: null, signature: null
  });

  // Checklist state
  const [eligibility, setEligibility] = useState({
    citizen: false, age: false, resident: false, notDisqualified: false
  });

  // State-specific data
  const stateData = {
    "Delhi": { districts: ["New Delhi", "South Delhi", "North Delhi"], constituencies: ["New Delhi", "Chandni Chowk", "East Delhi"] },
    "Maharashtra": { districts: ["Mumbai", "Pune", "Nagpur"], constituencies: ["Mumbai North", "Pune City", "Nagpur Central"] },
    "Uttar Pradesh": { districts: ["Lucknow", "Kanpur", "Varanasi"], constituencies: ["Lucknow", "Varanasi", "Amethi"] },
    "Karnataka": { districts: ["Bengaluru", "Mysuru", "Hubballi"], constituencies: ["Bengaluru Central", "Mysore", "Hubli-Dharwad Central"] }
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      if (field === 'state') {
        const data = stateData[value];
        if (data) {
          newData.district = data.districts[0];
          newData.constituency = data.constituencies[0];
        } else {
          newData.district = '';
          newData.constituency = '';
        }
      }
      return newData;
    });
  };

  const handleFileUpload = (field, e) => {
    const file = e.target.files[0];
    if (file) {
      setUploads(prev => ({ ...prev, [field]: { name: file.name, url: URL.createObjectURL(file) } }));
    }
  };

  const allEligible = Object.values(eligibility).every(v => v);
  const formComplete = formData.fullName && formData.fatherName && formData.dob && formData.gender && formData.address && formData.state;
  const docsComplete = uploads.photo && uploads.idProof && uploads.addressProof && uploads.signature;

  const handleDownloadEPIC = () => {
    // Generate a fake EPIC card as downloadable content
    const epicContent = `
====================================
  ELECTION COMMISSION OF INDIA
  Electors Photo Identity Card
====================================

Name:           ${formData.fullName || 'Voter Name'}
Father's Name:  ${formData.fatherName || 'Father Name'}
Date of Birth:  ${formData.dob || 'DD/MM/YYYY'}
Gender:         ${formData.gender || 'N/A'}
Address:        ${formData.address || 'Address'}
State:          ${formData.state || 'State'}
District:       ${formData.district || 'District'}
Constituency:   ${formData.constituency || 'N/A'}

EPIC Number:    IND${Math.random().toString(36).substring(2, 9).toUpperCase()}
Status:         ACTIVE

====================================
  This is a digitally generated card
  from VoteGuide AI (Demo)
====================================
    `.trim();

    const blob = new Blob([epicContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'EPIC_VoterID_Card.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const goNext = () => { if (currentStep < 4) setCurrentStep(currentStep + 1); };
  const goPrev = () => { if (currentStep > 0) setCurrentStep(currentStep - 1); };

  const stepTitles = ["Eligibility", "Fill Form 6", "Upload Documents", "BLO Verification", "EPIC Issued"];

  return (
    <div className="registration-flow">
      <div className="section-header">
        <h2>🆕 First-Time Voter Registration</h2>
        <button className="btn-secondary" onClick={onBack}><ArrowLeft size={18} /> Back</button>
      </div>

      {/* Progress Bar */}
      <div className="step-progress">
        {stepTitles.map((title, index) => (
          <div key={index} className={`progress-item ${index <= currentStep ? 'active' : ''} ${index === currentStep ? 'current' : ''}`} onClick={() => setCurrentStep(index)}>
            <div className="progress-dot">{index < currentStep ? '✓' : index + 1}</div>
            <span className="progress-label">{title}</span>
          </div>
        ))}
      </div>

      {/* STEP 0: Eligibility */}
      {currentStep === 0 && (
        <div className="step-split">
          <div className="split-tutorial">
            <div className="tutorial-badge">📖 Guide</div>
            <h3>Check Your Eligibility</h3>
            <p>Before you register, you need to make sure you meet all the requirements set by the Election Commission of India.</p>
            <ul className="guide-list">
              <li>You must be an <strong>Indian Citizen</strong> by birth or naturalization.</li>
              <li>You must have completed <strong>18 years of age</strong> on or before January 1st of the qualifying year.</li>
              <li>You must be a <strong>resident</strong> of the constituency where you want to vote.</li>
              <li>You must <strong>not</strong> be disqualified under Section 16 of the Representation of the People Act.</li>
            </ul>
            <div className="guide-tip">💡 If you turned 18 recently, you can still register for the next election cycle!</div>
          </div>
          <div className="split-form">
            <h3>✅ Confirm Your Eligibility</h3>
            <p className="form-desc">Check each box to confirm you meet the requirement:</p>
            <div className="eligibility-checks">
              {[
                { key: 'citizen', label: 'I am an Indian Citizen' },
                { key: 'age', label: 'I am 18 years or older (as of Jan 1st)' },
                { key: 'resident', label: 'I am a resident of my constituency' },
                { key: 'notDisqualified', label: 'I am not disqualified under any law' }
              ].map(item => (
                <label key={item.key} className={`elig-check ${eligibility[item.key] ? 'checked' : ''}`}>
                  <input type="checkbox" checked={eligibility[item.key]} onChange={() => setEligibility(prev => ({ ...prev, [item.key]: !prev[item.key] }))} />
                  <span className="check-mark">{eligibility[item.key] ? <CheckCircle2 size={20} color="var(--green)" /> : <div className="empty-check" />}</span>
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
            {allEligible && <div className="success-msg">🎉 You are eligible to register! Proceed to Step 2.</div>}
          </div>
        </div>
      )}

      {/* STEP 1: Form 6 */}
      {currentStep === 1 && (
        <div className="step-split">
          <div className="split-tutorial">
            <div className="tutorial-badge">📖 Guide</div>
            <h3>About Form 6</h3>
            <p>Form 6 is the official application for <strong>inclusion in the electoral roll</strong> for the first time. It is prescribed under Rule 26 of the Registration of Electors Rules, 1960.</p>
            <h4>Where to Submit:</h4>
            <ul className="guide-list">
              <li><strong>Online:</strong> Via the NVSP Portal (nvsp.in)</li>
              <li><strong>App:</strong> Via the Voter Helpline App</li>
              <li><strong>Offline:</strong> Submit at the nearest Electoral Registration Office</li>
            </ul>
            <h4>Important Tips:</h4>
            <ul className="guide-list">
              <li>Enter your name <strong>exactly as it appears</strong> on your Aadhaar card.</li>
              <li>Your mobile number is required for <strong>OTP verification</strong>.</li>
              <li>Provide your <strong>current residential address</strong> where you live.</li>
            </ul>
            <div className="portal-links">
              <a href="https://www.nvsp.in/" target="_blank" rel="noreferrer" className="portal-btn"><ExternalLink size={14} /> NVSP Portal</a>
              <a href="https://voterportal.eci.gov.in/" target="_blank" rel="noreferrer" className="portal-btn"><ExternalLink size={14} /> Voter Portal</a>
            </div>
          </div>
          <div className="split-form">
            <div className="form-header-bar">
              <FileText size={18} />
              <span>Form 6 — Application for Inclusion in Electoral Roll</span>
            </div>
            <div className="live-form">
              <div className="form-row">
                <label>Full Name (as per Aadhaar) <span className="req">*</span></label>
                <input type="text" placeholder="e.g. Rahul Sharma" value={formData.fullName} onChange={e => handleFormChange('fullName', e.target.value)} />
              </div>
              <div className="form-row-group">
                <div className="form-row">
                  <label>Father's Name <span className="req">*</span></label>
                  <input type="text" placeholder="e.g. Suresh Sharma" value={formData.fatherName} onChange={e => handleFormChange('fatherName', e.target.value)} />
                </div>
                <div className="form-row">
                  <label>Mother's Name</label>
                  <input type="text" placeholder="e.g. Sunita Sharma" value={formData.motherName} onChange={e => handleFormChange('motherName', e.target.value)} />
                </div>
              </div>
              <div className="form-row-group">
                <div className="form-row">
                  <label>Date of Birth <span className="req">*</span></label>
                  <input type="date" value={formData.dob} onChange={e => handleFormChange('dob', e.target.value)} />
                </div>
                <div className="form-row">
                  <label>Gender <span className="req">*</span></label>
                  <select value={formData.gender} onChange={e => handleFormChange('gender', e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <label>Current Address <span className="req">*</span></label>
                <textarea rows="2" placeholder="House No, Street, Area, City" value={formData.address} onChange={e => handleFormChange('address', e.target.value)} />
              </div>
              <div className="form-row-group">
                <div className="form-row">
                  <label>State <span className="req">*</span></label>
                  <select value={formData.state} onChange={e => handleFormChange('state', e.target.value)}>
                    <option value="">Select State</option>
                    {Object.keys(stateData).map(s => <option key={s} value={s}>{s}</option>)}
                    {["Andhra Pradesh","Assam","Bihar","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Kerala","Madhya Pradesh","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttarakhand","West Bengal"].filter(s => !stateData[s]).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-row">
                  <label>District</label>
                  {stateData[formData.state] ? (
                    <select value={formData.district} onChange={e => handleFormChange('district', e.target.value)}>
                      {stateData[formData.state].districts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  ) : (
                    <input type="text" placeholder="District" value={formData.district} onChange={e => handleFormChange('district', e.target.value)} />
                  )}
                </div>
              </div>
              <div className="form-row">
                <label>Constituency</label>
                {stateData[formData.state] ? (
                  <select value={formData.constituency} onChange={e => handleFormChange('constituency', e.target.value)}>
                    {stateData[formData.state].constituencies.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                ) : (
                  <input type="text" placeholder="Constituency" value={formData.constituency} onChange={e => handleFormChange('constituency', e.target.value)} />
                )}
              </div>
              <div className="form-row-group">
                <div className="form-row">
                  <label>PIN Code</label>
                  <input type="text" maxLength="6" placeholder="e.g. 110001" value={formData.pincode} onChange={e => handleFormChange('pincode', e.target.value)} />
                </div>
                <div className="form-row">
                  <label>Mobile Number</label>
                  <input type="tel" placeholder="+91 9876543210" value={formData.mobile} onChange={e => handleFormChange('mobile', e.target.value)} />
                </div>
              </div>
              {formComplete && <div className="success-msg">✅ Form looks good! Proceed to upload documents.</div>}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Upload Documents */}
      {currentStep === 2 && (
        <div className="step-split">
          <div className="split-tutorial">
            <div className="tutorial-badge">📖 Guide</div>
            <h3>Required Documents</h3>
            <p>You must upload the following documents as part of your Form 6 application:</p>
            <div className="doc-guide">
              <div className="doc-guide-item">
                <Camera size={18} /> <strong>Passport Photo</strong>
                <p>Recent colour photograph. JPG/PNG, 20KB–50KB.</p>
                <img src="/images/avatar.png" alt="Sample" className="guide-sample-img" />
              </div>
              <div className="doc-guide-item">
                <FileText size={18} /> <strong>Identity Proof</strong>
                <p>Aadhaar / PAN / Passport. Scanned copy, max 2MB.</p>
                <img src="/images/aadhaar.png" alt="Aadhaar" className="guide-sample-img" />
              </div>
              <div className="doc-guide-item">
                <FileText size={18} /> <strong>Address Proof</strong>
                <p>Electricity bill / Ration card / Passport. Must match current address.</p>
              </div>
              <div className="doc-guide-item">
                <PenTool size={18} /> <strong>Signature</strong>
                <p>Your signature on white paper. JPG/PNG, 10KB–20KB.</p>
              </div>
            </div>
          </div>
          <div className="split-form">
            <h3>📄 Upload Your Documents</h3>
            <p className="form-desc">Select and upload your files according to the requirements.</p>
            <div className="upload-stack">
              {[
                { key: 'photo', label: 'Passport Size Photo', icon: <Camera size={24} />, accept: 'image/*', guide: '📷 Recent Color Photo' },
                { key: 'idProof', label: 'Identity Proof', icon: <FileText size={24} />, accept: 'image/*,.pdf', guide: '🪪 Aadhaar / PAN' },
                { key: 'addressProof', label: 'Address Proof', icon: <FileText size={24} />, accept: 'image/*,.pdf', guide: '🏠 Electricity Bill' },
                { key: 'signature', label: 'Scanned Signature', icon: <PenTool size={24} />, accept: 'image/*', guide: '✍️ Signed on Paper' }
              ].map(doc => (
                <div key={doc.key} className="upload-row-item-simple">
                  <div className="upload-info-left">
                    <span className="upload-label-main">{doc.label}</span>
                    <span className="upload-guide-sub">{doc.guide}</span>
                  </div>
                  <label className={`upload-box-small ${uploads[doc.key] ? 'uploaded' : ''}`}>
                    <input type="file" accept={doc.accept} onChange={e => handleFileUpload(doc.key, e)} hidden />
                    {uploads[doc.key] ? (
                      <div className="uploaded-preview-small">
                        <CheckCircle2 size={18} color="var(--green)" />
                        <span className="uploaded-name-small">{uploads[doc.key].name}</span>
                      </div>
                    ) : (
                      <div className="upload-placeholder-small">
                        <Upload size={16} />
                        <span>Upload File</span>
                      </div>
                    )}
                  </label>
                </div>
              ))}
            </div>
            {docsComplete && <div className="success-msg">🎉 All documents uploaded! Your application is ready for verification.</div>}
          </div>
        </div>
      )}

      {/* STEP 3: BLO Verification */}
      {currentStep === 3 && (
        <div className="step-split">
          <div className="split-tutorial">
            <div className="tutorial-badge">📖 Guide</div>
            <h3>What is BLO Verification?</h3>
            <p>After your Form 6 and documents are submitted, a <strong>Booth Level Officer (BLO)</strong> is assigned to physically verify your identity and address.</p>
            <h4>What to Expect:</h4>
            <ul className="guide-list">
              <li>The BLO will visit your <strong>registered address</strong>.</li>
              <li>They will ask to see your <strong>original documents</strong> (Aadhaar, etc.).</li>
              <li>They may take a <strong>photograph</strong> of you at your residence.</li>
              <li>The entire visit usually takes <strong>10–15 minutes</strong>.</li>
            </ul>
            <div className="guide-tip">⏱️ The verification process typically completes within <strong>15–30 days</strong> of application.</div>
          </div>
          <div className="split-form">
            <h3>📋 Your Verification Status</h3>
            <div className="verification-tracker">
              {[
                { label: 'Form 6 Submitted', status: 'done', desc: 'Your application has been received by the ERO.' },
                { label: 'BLO Assigned', status: 'done', desc: 'A local BLO has been assigned to your area.' },
                { label: 'Home Visit Scheduled', status: 'current', desc: 'The BLO will visit your home to verify your identity.' },
                { label: 'Verification Complete', status: 'pending', desc: 'Awaiting physical verification.' },
                { label: 'ERO Approval', status: 'pending', desc: 'Final approval by the Electoral Registration Officer.' }
              ].map((step, i) => (
                <div key={i} className={`tracker-step ${step.status}`}>
                  <div className="tracker-dot">
                    {step.status === 'done' ? '✓' : step.status === 'current' ? '●' : '○'}
                  </div>
                  <div className="tracker-content">
                    <h4>{step.label}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: EPIC Issued */}
      {currentStep === 4 && (
        <div className="final-step-container fade-in">
          <div className="epic-card-center-wrapper">
            <div className="epic-card-final">
              <div className="epic-top-bar">
                <span>ELECTION COMMISSION OF INDIA</span>
                <span className="epic-sub">Electors Photo Identity Card</span>
              </div>
              <div className="epic-body-final">
                <div className="epic-photo-section">
                  {uploads.photo ? (
                    <img src={uploads.photo.url} alt="Your Photo" className="epic-user-photo" />
                  ) : (
                    <img src="/images/avatar.png" alt="Voter" className="epic-user-photo" />
                  )}
                </div>
                <div className="epic-details">
                  <p><strong>Name:</strong> {formData.fullName || 'Your Name'}</p>
                  <p><strong>Father:</strong> {formData.fatherName || 'Father Name'}</p>
                  <p><strong>DOB:</strong> {formData.dob || 'DD/MM/YYYY'}</p>
                  <p><strong>Gender:</strong> {formData.gender || 'N/A'}</p>
                  <p><strong>Address:</strong> {formData.address || 'Your Address'}</p>
                  <p><strong>EPIC No:</strong> <span className="epic-number">IND{Math.random().toString(36).substring(2,9).toUpperCase()}</span></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="final-actions">
            <button className="btn-innovative-download" onClick={handleDownloadEPIC}>
              <div className="btn-glow"></div>
              <Download size={20} /> 
              <span>Download e-EPIC Card</span>
            </button>
            <div className="congrats-message">
              <CheckCircle2 size={24} />
              <span>Congratulations! You are now a registered voter in India!</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="step-nav">
        <button className="btn-secondary" onClick={goPrev} disabled={currentStep === 0}><ArrowLeft size={18} /> Previous</button>
        <span className="step-counter">Step {currentStep + 1} of 5</span>
        <button className="btn-primary" onClick={goNext} disabled={currentStep === 4}>Next <ArrowRight size={18} /></button>
      </div>
    </div>
  );
}
