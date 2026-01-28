# AI Humanizer (Beginner-Friendly MVP)

AI Humanizer is a simple web app that rewrites text to sound more natural and human. It is intentionally small and easy to understand so beginners can learn how a full-stack project is put together.

## Features
- **Text input with limits** (up to 1000 characters)
- **Tone control**: Casual, Professional, or Very Human
- **Humanized output** in a read-only area
- **Copy to clipboard** button
- **Validation and friendly error messages**
- **Simple safety guard** for blocked keywords
- **Mock AI fallback** when no API key is provided

## Project structure
```
/ai-humanizer
  /frontend
    index.html
    style.css
    script.js
  /backend
    server.js
    package.json
  README.md
```

## Local setup (step by step)

### 1) Install Node.js
- Use **Node.js 18+** so `fetch` works in the backend without extra libraries.
- Download: https://nodejs.org

### 2) Install backend dependencies
```bash
cd backend
npm install
```

### 3) Start the backend server
```bash
npm start
```
By default it runs on http://localhost:3000

### 4) Open the frontend
- Open `frontend/index.html` in your browser.
- You can double-click the file or use a simple static server.

## How the AI integration works
- The backend calls an external AI API if an API key is present.
- If no key is found, it falls back to a mock implementation so you can still test the app.
- **The API key is never exposed to the frontend.**

## Add a real API key (optional)
1. Choose an AI provider (example: OpenAI).
2. Set an environment variable named `AI_API_KEY` before starting the backend.

On macOS/Linux:
```bash
export AI_API_KEY="your-key-here"
npm start
```

On Windows (PowerShell):
```powershell
$env:AI_API_KEY="your-key-here"
npm start
```

## Next ideas (optional)
- Add streaming output
- Support more tones
- Add a real moderation API
- Add file upload support
