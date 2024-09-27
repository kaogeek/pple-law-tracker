import "./AppContent.css";
import AppLawsTable from "./AppLawsTable.jsx";
import ScrollToTopButton from "./ScrollToTopButton.jsx";

function AppContent() {
  
  return (
    <div className="p-4">
      <AppLawsTable />
      <ScrollToTopButton /> {/* Add Scroll to Top Button here */}
    </div>
  );
}

export default AppContent;
