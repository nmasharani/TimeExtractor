from flask import Flask, jsonify, request
import requests
from ics import Calendar
from datetime import datetime, timedelta, timezone
from flask_cors import CORS


app = Flask(__name__)

CORS(app)

ICS_URL_DEFAULT = "https://calendar.google.com/calendar/ical/nisha.masharani%40includedhealth.com/public/basic.ics"

@app.route('/')
def index():
    return 'TimeExtractor Backend is running.'

@app.route('/api/free-times')
def free_times():
    # Get ICS URL from query parameter, or use default
    ics_url = request.args.get('ics_url', ICS_URL_DEFAULT)
    # Fetch the ICS file
    r = requests.get(ics_url)
    r.raise_for_status()
    c = Calendar(r.text)
    # Time window: +/- 2 weeks from now
    now = datetime.now(timezone.utc)
    start_window = now - timedelta(weeks=2)
    end_window = now + timedelta(weeks=2)
    # Extract events within the window
    events = []
    for event in c.events:
        # event.begin and event.end are Arrow objects; convert to datetime
        event_start = event.begin.datetime if hasattr(event.begin, 'datetime') else event.begin
        event_end = event.end.datetime if hasattr(event.end, 'datetime') else event.end
        if event_end >= start_window and event_start <= end_window:
            events.append({
                "name": event.name,
                "begin": str(event.begin),
                "end": str(event.end),
                "all_day": event.all_day
            })
    return jsonify({"events": events})

if __name__ == '__main__':
    app.run(debug=True) 