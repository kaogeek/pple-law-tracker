import "./AppContent.css";
// import AppLawItem from "./AppLawItem.js";
import DraftLawsTable from "./DraftLawsTable.js";
import lawFile from "../assets/law.json"

const lawLists = lawFile;
console.log(lawLists)

function AppContent() {
  // const lawElements = lawLists.map((law, index) => {
  //   return <AppLawItem key={index} law={law} />;
  // });

  return (
    <div className="p-4">
      {/* <div className="text-2xl">สำรวจร่างกฎหมายพรรคประชาชน</div> */}
      <DraftLawsTable />
    </div>
  );
}

export default AppContent;
