import { useState } from 'react';
import { voterService } from '../api/voterService';
import { Search, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import './VoterLookup.css';

export default function VoterLookup() {
  const [epic, setEpic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!epic) return;

    setLoading(true);
    setResult(null);
    setError(null);

    const response = await voterService.lookupVoter(epic);
    
    if (response.success) {
      setResult(response.data);
    } else {
      setError(response.error);
    }
    setLoading(false);
  };

  return (
    <section className="api-lookup-section glass-panel">
      <h2><CheckCircle2 className="icon" /> Check Voter Status</h2>
      <p className="subtitle">Enter your EPIC (Voter ID) number to search the electoral roll.</p>
      
      <form onSubmit={handleSearch} className="lookup-container">
        <input 
          type="text" 
          placeholder="e.g. IND1234567" 
          value={epic}
          onChange={(e) => setEpic(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !epic} className="btn-search">
          {loading ? <Loader2 className="spin" /> : <Search />}
          <span>Search</span>
        </button>
      </form>

      <div className="lookup-result">
        {result && (
          <div className="voter-card">
            <div className="voter-card-header">
              <div className="voter-avatar-char">{result.avatar}</div>
              <div>
                <h4><CheckCircle2 color="var(--green)" size={20} /> Voter Verified</h4>
                <p className="epic-badge">{result.epic}</p>
              </div>
            </div>
            <div className="voter-details-grid">
              <p><strong>Name:</strong> {result.name}</p>
              <p><strong>Age:</strong> {result.age}</p>
              <p><strong>Gender:</strong> {result.gender}</p>
              <p><strong>Address:</strong> {result.address}</p>
              <p><strong>Constituency:</strong> {result.constituency}</p>
              <p><strong>Polling Station:</strong> {result.pollingStation}</p>
            </div>
            <div className="status-badge">{result.status}</div>
          </div>
        )}
        {error && (
          <div className="error-card">
            <AlertCircle color="#ef4444" />
            <p>{error}</p>
          </div>
        )}
      </div>
    </section>
  );
}
