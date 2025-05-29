import "./App.css";
import { BrowserRouter as Router } from 'react-router-dom';
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import "./fonts/Anakotmai-Bold.ttf";
import "./fonts/Anakotmai-Light.ttf";
import "./fonts/Anakotmai-Medium.ttf";

function App() {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
