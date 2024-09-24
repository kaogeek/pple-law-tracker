import "./AppContent.css";
// import AppLawItem from "./AppLawItem.js";
import AppLawsTable from "./AppLawsTable.js";
import ScrollToTopButton from "./ScrollToTopButton";

function AppContent() {
  // const lawElements = lawLists.map((law, index) => {
  //   return <AppLawItem key={index} law={law} />;
  // });

  return (
    <div className="p-4">
      <AppLawsTable />
      <ScrollToTopButton /> {/* Add Scroll to Top Button here */}
    </div>
  );
}

export default AppContent;
