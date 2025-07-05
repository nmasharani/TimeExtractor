import React, { useState } from 'react';
import './App.css';

function App() {
  const [icsUrl, setIcsUrl] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Use environment variable for API URL, fallback to localhost for development
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

  const fetchEvents = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setEvents([]);
    try {
      const response = await fetch(`${API_BASE_URL}/api/free-times?ics_url=${encodeURIComponent(icsUrl)}`);
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data.events);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ICS Calendar Event Viewer</h1>
        <form onSubmit={fetchEvents} style={{ marginBottom: 20 }}>
          <input
            type="text"
            value={icsUrl}
            onChange={e => setIcsUrl(e.target.value)}
            style={{ width: 400 }}
            placeholder="Enter public ICS URL (e.g. https://...)"
          />
          <button type="submit" style={{ marginLeft: 10 }} disabled={!icsUrl}>Fetch Events</button>
        </form>
        {loading && <p>Loading events...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul style={{ textAlign: 'left', maxWidth: 600, margin: '0 auto' }}>
          {events.map((event, idx) => (
            <li key={idx}>
              <strong>{event.name}</strong><br />
              {event.begin} - {event.end} {event.all_day ? '(All day)' : ''}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
