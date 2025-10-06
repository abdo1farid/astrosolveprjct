# 🌌 AstroSolve


<div align="center">

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB.svg)](https://reactjs.org/)
[![Powered by Flask](https://img.shields.io/badge/Powered%20by-Flask-000000.svg)](https://flask.palletsprojects.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Enabled-FFCA28.svg)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/Styled%20with-Tailwind-38B2AC.svg)](https://tailwindcss.com/)
[![ML Powered](https://img.shields.io/badge/ML-Powered-FF6F61.svg)](https://scikit-learn.org/)

<p align="center">
  <img src="/public/AstroSolve.png" alt="AstroSolve Logo" width="200"/>
</p>

🚀 An immersive educational platform where astronomy meets gaming, inspiring the next generation of space explorers!

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## ✨ Features

### 🎮 Interactive Learning Paths

#### 1. 🌍 Solar System Gate | `Beginner Level` | 100 XP
- **Interactive Planet Sorting**: Drag-and-drop celestial bodies
- **Real-time Feedback**: Visual and audio cues for learning
- **Educational Content**: Learn about planet classifications
- **Achievement System**: Earn badges and points

#### 2. 🔭 Telescope Challenge | `Intermediate Level` | 250 XP
- **Transit Method Simulation**: Learn how scientists discover exoplanets
- **Interactive Telescope**: Control and observe star patterns
- **Real Scientific Methods**: Based on actual astronomical techniques
- **Progressive Learning**: Step-by-step guidance

#### 3. 👨‍🚀 Space Mission | `Advanced Level` | 500 XP
- Future expansion planned
- Advanced space exploration concepts
- Complex astronomical phenomena
- Interactive missions and challenges

### 👨‍🔬 Scientist Portal

- **Data Analysis**: Upload and process astronomical data
- **ML Integration**: Powered by advanced machine learning models
- **Visualization**: Interactive data presentations
- **Export Functionality**: Download predictions and analyses

### 🎯 Educational Focus

- Learn about exoplanet detection methods
- Understand astronomical phenomena
- Engage with real scientific concepts
- Progressive difficulty levels

## 🛠️ Technical Architecture

### Frontend Technologies
```
React │ TailwindCSS │ Framer Motion │ Firebase SDK
```

### Backend & ML Stack
```
Flask │ Scikit-learn │ Pandas │ NumPy │ Firebase
```

### Development Tools
```
Vite │ ESLint │ PostCSS │ Git
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Python (3.9+)
- npm or yarn
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/astrosolve.git
   cd astrosolve
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Python Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1 - Frontend
   npm run dev

   # Terminal 2 - ML API
   cd ML
   python api.py
   ```

## 📁 Project Structure

```
astrosolve/
├── src/                      # Frontend source code
│   ├── components/           # React components
│   ├── contexts/            # Context providers
│   ├── hooks/              # Custom hooks
│   └── utils/              # Utility functions
├── ML/                      # Machine learning backend
│   ├── models/             # Trained ML models
│   └── utils/              # ML utilities
├── public/                  # Static assets
│   ├── planets/            # Planet images
│   ├── sfx/                # Sound effects
│   └── img/                # General images
└── docs/                   # Documentation
```

## 🎯 Core Features

### Authentication System
- **Multi-role Support**: Children and Scientists
- **Secure Access**: Firebase Authentication
- **Profile Management**: Customizable user profiles

### Educational Games
- **Progressive Learning**: Structured level system
- **Interactive Elements**: Real-time feedback
- **Achievement System**: XP points and badges
- **Educational Content**: Space science fundamentals

### Scientific Tools
- **Data Analysis**: CSV processing
- **ML Integration**: Predictive modeling
- **Results Export**: Download capabilities
- **Visualization**: Interactive data display

## 🔧 Configuration

### Environment Variables
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
FLASK_API_URL=http://localhost:5000
```

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication
3. Set up Realtime Database
4. Configure Firebase Rules

## 📚 Documentation

- [User Guide](docs/USER_GUIDE.md)
- [API Documentation](docs/API.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [ML Model Details](docs/ML_MODELS.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Astronomical data from NASA
- Planet images from ESA
- Sound effects from [source]
- Icons from [source]

## 🔗 Contact

Project Link: [(https://github.com/abdo1farid/astrosolveprjct)](https://github.com/abdo1farid/astrosolveprjct)

---

<div align="center">

Made with ❤️ by the AstroSolve Team

</div>


