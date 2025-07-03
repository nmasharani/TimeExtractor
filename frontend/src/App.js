import React, { useState } from 'react';
import './App.css';

function App() {
  const [icsUrl, setIcsUrl] = useState('https://calendar.google.com/calendar/ical/nisha.masharani%40includedhealth.com/public/basic.ics');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchEvents = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setEvents([]);
    try {
      const response = await fetch(`/api/free-times?ics_url=${encodeURIComponent(icsUrl)}`);
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
            placeholder="Enter public ICS URL"
          />
          <button type="submit" style={{ marginLeft: 10 }}>Fetch Events</button>
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
