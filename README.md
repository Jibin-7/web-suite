# Web Development Internship Projects

An interactive front-end web application portfolio built to fulfill core web development internship requirements. This project is developed using **HTML5, CSS3, and JavaScript (ES6+)** without external UI libraries or frameworks (no Tailwind, Bootstrap, or React required).

---

## 🚀 Live Projects Dashboard

To view and interact with both projects, open the main dashboard file in any web browser:
👉 **`index.html`** *(Root Directory)*

The dashboard provides a dark-themed, responsive interface linking to both standalone tasks, complete with project summaries and an interactive requirements checklist.

---

## 📁 Project Structure

```text
web_internship_tasks/
├── index.html                 # 🏠 Main Projects Dashboard
├── style.css                  # 🎨 Dashboard Styles & Theme Variables
├── dashboard.js               # ⚡ Theme Switcher & Report Generator Logic
├── README.md                  # 📖 Project Documentation & Setup Guide
│
├── task1_login_form/          # 🛡️ TASK 1: Login Form & JS Validation
│   ├── index.html             #    - Form Layout & Validation Criteria Guide
│   ├── style.css              #    - Dark Theme & Password Strength Indicators
│   └── script.js              #    - Real-time Regex Checks & Alert() Popups
│
└── task2_spotify_downloader/  # 🎵 TASK 2: RapidAPI Spotify Downloader
    ├── index.html             #    - Downloader Interface & Audio Player
    ├── style.css              #    - Spotify Green Theme & Sound Wave Visuals
    └── script.js              #    - RapidAPI Fetch Requests & Sample Previews
```

---

## 🛡️ Task 1: Login Form & JavaScript Validation

### 📋 Requirement Specification
> *"Create a login form using HTML, CSS & JS. Also add form validation using JavaScript & use alert to show results/errors."*

### ✨ Implemented Features
1. **Real-Time Input Verification**:
   - **Email Verification**: Uses standard RFC 5322 regular expressions (`name@domain.com`) to validate email format as the user types or leaves the input field.
   - **Password Security Indicator**: Analyzes password strength in real-time checking for minimum 8 characters, at least 1 uppercase letter, and 1 numeric digit.
   - **Terms Acceptance Checkbox**: Validates that the terms and conditions checkbox is checked prior to form submission.
2. **Interactive UI Feedback**:
   - Dynamic 4-bar colored strength meter (Weak ➔ Fair ➔ Good ➔ Strong 🔥).
   - Floating input label animations and border focus highlights.
   - Password visibility toggle (eye icon).
3. **Browser Alert() Dialogs** *(Task Requirement)*:
   - **Error Alert**: When validation checks fail, JavaScript prevents form submission and displays a browser `alert()` detailing the exact errors that need attention.
   - **Success Alert**: When all validation criteria are met, an `alert()` confirms successful authentication alongside an on-screen notification.
4. **Sample Data Helpers**:
   - **"Quick Fill Sample Data"** button auto-completes valid credentials for testing.
   - **"Test Invalid Inputs"** button auto-fills incorrect data to demonstrate error alert handling.

---

## 🎵 Task 2: Spotify Song Downloader via RapidAPI

### 📋 Requirement Specification
> *"Create a web application using HTML, CSS & JS that will help you to download spotify song. You have to put a link of any spotify song and the application will help you to download that song. Use RapidAPI for Implementing that feature."*

### ✨ Implemented Features
1. **RapidAPI Integration Architecture**:
   - Built using the native asynchronous `fetch()` API with `X-RapidAPI-Key` and `X-RapidAPI-Host` headers.
   - Includes an expandable configuration panel where users can enter an API key and switch between standard Spotify Downloader API endpoints (`spotify-downloader-downloader-spotify-track-album-playlist.p.rapidapi.com`, `spotify81.p.rapidapi.com`, etc.).
2. **🎧 Offline Sample Preview Mode**:
   - To allow testing the user interface and audio player without requiring an API key, the app includes an **Offline Sample Preview Mode**.
   - Clicking **"🎧 Load Sample Track (Offline Preview)"** loads sample track metadata, artwork, and a working streaming audio preview with MP3 download capabilities.
3. **Interactive Track Result Card**:
   - **Album Artwork & Play Controls**: Responsive artwork card with hover play/pause buttons.
   - **Audio Preview Player**: Native HTML5 `<audio controls>` element for streaming track previews directly in the browser.
   - **MP3 Download Trigger**: Clicking **"Download Audio File (MP3)"** triggers an automatic browser file download of the audio track.
4. **Session History**:
   - Records recently queried tracks during the active session for quick access and re-loading.

---

## 🛠️ Technology Stack & Methods
- **HTML5**: Semantic markup, accessible form inputs, and custom data attributes.
- **CSS3**: Custom properties (CSS variables), Flexbox, CSS Grid layouts, media queries for responsiveness, and CSS keyframe animations.
- **JavaScript (ES6+)**: Event listeners, DOM manipulation, regular expression validation, asynchronous `async/await` network requests, and JSON data parsing.

---

### https://web-suite.vercel.app/
*Developed for Web Development Internship Submission &bull; 2026*
