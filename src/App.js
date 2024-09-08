import "./App.css";
import AppHeader from "./components/AppHeader.js";
import AppContent from "./components/AppContent.js";
import "./fonts/Anakotmai-Bold.ttf";
import "./fonts/Anakotmai-Light.ttf";
import "./fonts/Anakotmai-Medium.ttf";

function App() {
  return (
    <div className="app">
      <AppHeader />
      <AppContent />
    </div>
  );
}

export default App;
