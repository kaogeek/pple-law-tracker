import React, { useState, useEffect } from "react";
import { fetchLawsData } from "../utils/api"; // Import the utility function
import SearchBar from "./SearchBar";
import FilterButtons from "./FilterButtons";
import LawTable from "./LawTable";
import LawCard from "./LawCard"; // Add LawCard component for mobile view

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

// Function to get the status type based on the last non-zero value in the array
const getLawStatus = (statusArray) => {
  const lastNonZeroIndex = statusArray.findLastIndex((status) => status !== 0);
  const lastStatus = statusArray[lastNonZeroIndex];

  if (
    lastStatus === 2 ||
    (lastStatus === 1 && lastNonZeroIndex !== statusArray.length - 1)
  ) {
    return "ongoing"; // Law is ongoing
  } else if (lastStatus === 3) {
    return "stopped"; // Law is stopped
  } else if (lastStatus === 1 && lastNonZeroIndex === statusArray.length - 1) {
    return "passed"; // Law is passed
  }
  return "other"; // For any other cases
};

const AppLawsTable = () => {
  const [data, setData] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search input
  const [filter, setFilter] = useState("all"); // State to hold the current filter
  const [counts, setCounts] = useState({
    all: 0,
    ongoing: 0,
    stopped: 0,
    passed: 0,
  });

  useEffect(() => {
    // Fetch data from API using the utility function
    const fetchData = async () => {
      try {
        const result = await fetchLawsData();
        setData(result); // Update state with fetched data
        updateCounts(result); // Update counts based on fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched or there's an error
      }
    };

    fetchData();
  }, []);

  // Function to update the counts for each filter category
  const updateCounts = (data) => {
    const allCount = data.length;
    const ongoingCount = data.filter(
      (item) => getLawStatus(item.status) === "ongoing"
    ).length;
    const stoppedCount = data.filter(
      (item) => getLawStatus(item.status) === "stopped"
    ).length;
    const passedCount = data.filter(
      (item) => getLawStatus(item.status) === "passed"
    ).length;

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

  const filteredData = data
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => {
      if (filter === "all") return true; // Show all if filter is 'all'
      const lawStatus = getLawStatus(item.status);
      return lawStatus === filter;
    })
    .sort((a, b) => a.title.localeCompare(b.title, "th"));

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

          {/* Table View for Desktop */}
          <div
            className="hidden lg:block"
            style={{
              maxHeight: "calc(100vh - 200px)", // Adjusted for navbar and header height
              overflowY: "auto",
            }}
          >
            <LawTable data={filteredData} statusLabels={statusLabels} />
          </div>

          {/* Card View for Mobile */}
          <div className="lg:hidden">
            {filteredData.map((law) => (
              <LawCard key={law.no} law={law} statusLabels={statusLabels} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AppLawsTable;
