import "./AppContent.css";
import { Routes, Route } from 'react-router-dom';
import AppLawsTable from "./AppLawsTable.jsx";
import LocalLaws from "./LocalLaws.jsx";
import ScrollToTopButton from "./ScrollToTopButton.jsx";

function AppContent() {
  return (
    <div className="p-4">
      <Routes>
        <Route path="/" element={<AppLawsTable />} />
        <Route path="/local" element={<LocalLaws />} />
      </Routes>
      <ScrollToTopButton />
    </div>
  );
}

export default AppContent;
