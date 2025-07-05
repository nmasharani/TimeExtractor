# TimeExtractor

A web application that fetches and displays events from public ICS calendar feeds.

## Features

- Fetch events from any public ICS calendar URL
- Filter events within ±2 weeks of current date
- Simple, clean web interface
- RESTful API backend

## Project Structure

```
TimeExtractor/
├── backend/          # Flask API server
│   ├── app.py       # Main Flask application
│   ├── requirements.txt
│   └── Procfile     # For Heroku deployment
└── frontend/        # React frontend
    ├── src/
    │   └── App.js   # Main React component
    └── package.json
```

## Development Setup

### Backend (Flask)

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the development server:
   ```bash
   python app.py
   ```

The backend will be available at `http://localhost:5000`

### Frontend (React)

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### GET /api/free-times

Fetches calendar events from a public ICS URL.

**Query Parameters:**
- `ics_url` (optional): Public ICS calendar URL. If not provided, uses default.

**Response:**
```json
{
  "events": [
    {
      "name": "Event Name",
      "begin": "2025-01-01T10:00:00+00:00",
      "end": "2025-01-01T11:00:00+00:00",
      "all_day": false
    }
  ]
}
```

## Production Deployment

### Environment Variables

**Backend:**
- `PORT`: Port number (default: 5000)
- `FLASK_ENV`: Set to 'development' for debug mode

**Frontend:**
- `REACT_APP_API_URL`: Backend API URL (e.g., https://your-api-domain.com)

### Deployment Options

#### Heroku

1. **Backend:**
   ```bash
   cd backend
   heroku create your-app-name
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

2. **Frontend:**
   ```bash
   cd frontend
   # Set the backend URL
   heroku config:set REACT_APP_API_URL=https://your-backend-app.herokuapp.com
   git add .
   git commit -m "Deploy frontend"
   git push heroku main
   ```

#### Vercel (Frontend)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   cd frontend
   vercel
   ```

#### Railway

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Build Commands

**Frontend Production Build:**
```bash
cd frontend
npm run build
```

**Backend Production Server:**
```bash
cd backend
gunicorn app:app
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License 