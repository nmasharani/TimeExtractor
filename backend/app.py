from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return 'TimeExtractor Backend is running.'

# TODO: Add Google OAuth routes and /api/free-times endpoint

if __name__ == '__main__':
    app.run(debug=True) 