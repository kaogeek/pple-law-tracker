import React, { useState, useEffect } from "react";
import { fetchLawsDataNoco } from "../utils/api"; // Import the utility function
import SearchBar from "./SearchBar";
import FilterButtons from "./FilterButtons";
import LawTable from "./LawTable";
import LawCard from "./LawCard"; // Add LawCard component for mobile view
import PendingLawsSection from "./PendingLawsSection";

// 10 Status Labels
const statusLabels = [
  "ยื่นเข้าสภา",
  "นายกรับรอง (ร่างการเงิน)*",
  "บรรจุวาระ",
  "ครม. ดึงไปศึกษา (ไม่เกิน 60 วัน)*",
  "วาระ 1",
  "ศึกษาใน กมธ.",
  "วาระ 2",
  "วาระ 3",
  "ผ่าน สว. พิจารณา",
  "ลงนามพระปรมาภิไธย/ประกาศใช้",
];

// Function to get the status type based on the status values
const getLawStatus = (law) => {
  const statusMap = {
    "ยื่นเข้าสภา": 0,
    "นายกรับรอง": 1,
    "บรรจุวาระ": 2,
    "ครม. ดึงไปศึกษา": 3,
    "วาระ 1": 4,
    "ศึกษาใน กมธ.": 5,
    "วาระ 2": 6,
    "วาระ 3": 7,
    "ผ่าน สว": 8,
    "ลงนามพระปรมา": 9
  };

  const statusValues = Object.entries(statusMap).map(([key, index]) => {
    const value = law[key];
    if (value === "done") return 1;
    if (value === "working") return 2;
    if (value === "skipped") return 4;
    if (value === "paused") return 3;
    return 0;
  });

  const lastNonZeroIndex = statusValues.findLastIndex((status) => status !== 0);
  const lastStatus = statusValues[lastNonZeroIndex];

  if (lastStatus === 2 || (lastStatus === 1 && lastNonZeroIndex !== statusValues.length - 1)) {
    return "ongoing";
  } else if (lastStatus === 3) {
    return "stopped";
  } else if (lastStatus === 1 && lastNonZeroIndex === statusValues.length - 1) {
    return "passed";
  }
  return "other";
};

const AppLawsTable = () => {
  const [currentData, setCurrentData] = useState([]); // ชุดที่ 27
  const [pendingData, setPendingData] = useState([]); // ชุดที่ 26
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [counts, setCounts] = useState({
    all: 0,
    ongoing: 0,
    stopped: 0,
    passed: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchLawsDataNoco();
        const set27 = result.filter((item) => item["ชุดที่"] === "27");
        const set26 = result.filter((item) => item["ชุดที่"] === "26");
        setCurrentData(set27);
        setPendingData(set26);
        updateCounts(set27);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to update the counts for each filter category (ชุดที่ 27 only)
  const updateCounts = (data) => {
    const allCount = data.length;
    const ongoingCount = data.filter((item) => getLawStatus(item) === "ongoing").length;
    const stoppedCount = data.filter((item) => getLawStatus(item) === "stopped").length;
    const passedCount = data.filter((item) => getLawStatus(item) === "passed").length;

    setCounts({
      all: allCount,
      ongoing: ongoingCount,
      stopped: stoppedCount,
      passed: passedCount,
    });
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const filteredData = currentData
    .filter((item) =>
      item.ชื่อร่าง && item.ชื่อร่าง.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => {
      if (filter === "all") return true;
      const lawStatus = getLawStatus(item);
      return lawStatus === filter;
    })
    .sort((a, b) => {
      const nameA = a.ชื่อร่าง || '';
      const nameB = b.ชื่อร่าง || '';
      return nameA.localeCompare(nameB, "th");
    });

  return (
    <div>
      {/* Table Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h1 className="text-2xl font-bold text-pple-orange">
          สำรวจร่างกฎหมายพรรคประชาชน
        </h1>
      </div>

      {/* Show loading indicator while data is being fetched */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pple-orange border-opacity-50"></div>
          <div className="mt-4 text-xl font-semibold">Loading data...</div>
        </div>
      ) : (
        <>
          {/* Search and Filter Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center py-2 space-y-2 lg:space-y-0 lg:space-x-2">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />
            <FilterButtons
              counts={counts}
              filter={filter}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          <div className="hidden lg:flex justify-end py-2 items-center">
            <div className={`h-4 w-[50px] rounded-3xl bg-green-500 mx-2`}></div>
            <div>ผ่าน</div>
            <div
              className={`h-4 w-[50px] rounded-3xl bg-yellow-500 mx-2`}
            ></div>
            <div>ดำเนินการ</div>
            <div
              className={`h-4 w-[50px] rounded-3xl bg-white border-2 border-green-500 mx-2`}
            ></div>
            <div>ไม่ถูกดึงไปพิจารณา</div>
            <div className={`h-4 w-[50px] rounded-3xl bg-red-500 mx-2`}></div>
            <div>ระงับ/ปัดตก</div>
          </div>

          {/* Table View for Desktop */}
          <div
            className="hidden lg:block"
            style={{
              maxHeight: "calc(100vh - 245px)", // Adjusted for navbar and header height
              overflowY: "auto",
            }}
          >
            <LawTable data={filteredData} statusLabels={statusLabels} />
          </div>

          {/* Card View for Mobile */}
          <div className="lg:hidden">
            {filteredData.map((law) => (
              <LawCard key={law.Id} law={law} statusLabels={statusLabels} />
            ))}
          </div>

          {/* Pending laws from สภาชุดที่ 26 */}
          <PendingLawsSection laws={pendingData} />
        </>
      )}
    </div>
  );
};

export default AppLawsTable;
