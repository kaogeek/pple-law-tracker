import React, { useState, useEffect } from "react";
import lawFile from "../assets/law.json";

// Sample data with 10 status stages for each item
const data = lawFile;

// 10 Status Labels
const statusLabels = [
  "ยื่นเข้าสภา",
  "นายกรับรอง (ไม่ใช่ร่างการเงิน)*",
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

  if (lastStatus === 2) {
    return "ongoing"; // Law is ongoing
  } else if (lastStatus === 3) {
    return "stopped"; // Law is stopped
  } else if (lastStatus === 1 && lastNonZeroIndex === statusArray.length - 1) {
    return "passed"; // Law is passed
  }
  return "other"; // For any other cases
};

const getStatusColor = (status) => {
  switch (status) {
    case 1:
      return "bg-green-500"; // Green for done
    case 2:
      return "bg-yellow-500"; // Yellow for working
    case 3:
      return "bg-red-500"; // Red for paused
    case 4:
      return "bg-white border border-green";
    default:
      return "bg-gray-300"; // Default to gray if the stage is unknown
  }
};

const getStageColor = (stage) => {
  switch (stage) {
    case "proposed":
      return "text-blue-500"; // Blue for proposed
    case "working":
      return "text-yellow-500"; // Yellow for working
    case "paused":
      return "text-red-500"; // Red for paused
    case "done":
      return "text-green-500"; // Green for done
    default:
      return "text-gray-300"; // Default to gray if the stage is unknown
  }
};

const getStatusText = (stage, text) => {
  switch (stage) {
    case "proposed":
      return text; // Blue for proposed
    case "working":
      return "รอ" + text; // Yellow for working
    case "paused":
      return "ถูกปัดตกใน" + text; // Red for paused
    case "done":
      return text; // Green for done
    default:
      return "ไม่มีข้อมูล"; // Default to gray if the stage is unknown
  }
};

const AppLawsTable = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search input
  const [filter, setFilter] = useState("all"); // State to hold the current filter
  const [counts, setCounts] = useState({
    all: 0,
    ongoing: 0,
    stopped: 0,
    passed: 0,
  });

  // Calculate counts for each filter category
  useEffect(() => {
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
  }, []);

  // Function to handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Sort and filter data by title in Thai alphabetical order and search term
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
    <div className="p-4">
      {/* Table Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h1 className="text-2xl font-bold text-pple-orange">
          สำรวจร่างกฎหมายพรรคประชาชน
        </h1>
      </div>

      {/* Table Wrapper */}
      <div
        className="hidden lg:block"
        style={{
          maxHeight: "calc(100vh - 200px)", // Adjusted for navbar and header height
          overflowY: "auto",
        }}
      >
        {/* search area and description */}
        <div className="flex justify-between items-center py-2">
          <div>
            <input
              type="text"
              placeholder="ค้นหาร่างกฎหมาย..."
              className="border p-2 w-full rounded-md"
              style={{ width: "600px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm when typing
            />
          </div>
          <div className="flex space-x-2">
            <button
              className={`px-2 py-2 rounded ${
                filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => handleFilterChange("all")}
            >
              ทั้งหมด ({counts.all})
            </button>
            <button
              className={`px-2 py-2 rounded ${
                filter === "ongoing"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleFilterChange("ongoing")}
            >
              กำลังดำเนินการ ({counts.ongoing})
            </button>
            <button
              className={`px-2 py-2 rounded ${
                filter === "stopped" ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => handleFilterChange("stopped")}
            >
              ถูกปัดตก ({counts.stopped})
            </button>
            <button
              className={`px-2 py-2 rounded ${
                filter === "passed" ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => handleFilterChange("passed")}
            >
              ผ่านแล้ว ({counts.passed})
            </button>
          </div>
        </div>

        {/* Table Content */}
        <table className="min-w-full table-auto border-collapse border-spacing-0">
          <thead className="bg-gray-100 sticky top-0 z-20">
            <tr>
              <th className="px-4 py-2 w-[600px] text-sm">หัวข้อ</th>
              {statusLabels.map((label, index) => (
                <th
                  key={index}
                  className="px-1 py-2 text-center w-[100px] sticky top-0 bg-gray-100 z-10 text-sm"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.no} className="bg-white border-b">
                <td className="px-4 py-2">
                  <div className="font-bold">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.name}</div>
                </td>
                {item.status.map((status, idx) => (
                  <td key={idx} className="px-1 py-2 text-center w-[100px]">
                    <div
                      className={`h-4 w-full rounded-3xl ${getStatusColor(
                        status,
                        item.stage
                      )}`}
                    ></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end p-2">*สามารถข้ามขั้นตอนนี้ได้</div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        <div className="mb-4">
          <input
            type="text"
            placeholder="ค้นหาร่างกฎหมาย..."
            className="border p-2 w-full rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm when typing
          />
        </div>
        <div className="flex space-x-2 mb-4">
          <button
            className={`px-2 py-2 rounded text-sm ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilterChange("all")}
          >
            ทั้งหมด ({counts.all})
          </button>
          <button
            className={`px-2 py-2 rounded text-sm ${
              filter === "ongoing" ? "bg-yellow-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilterChange("ongoing")}
          >
            ดำเนินการ ({counts.ongoing})
          </button>
          <button
            className={`px-2 py-2 rounded text-sm ${
              filter === "stopped" ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilterChange("stopped")}
          >
            ปัดตก ({counts.stopped})
          </button>
          <button
            className={`px-2 py-2 rounded text-sm ${
              filter === "passed" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilterChange("passed")}
          >
            ประกาศใช้ ({counts.passed})
          </button>
        </div>

        {filteredData.map((item) => {
          const lastNonZeroIndex = item.status.findLastIndex(
            (status) => status !== 0
          );
          const lastStatusLabel =
            lastNonZeroIndex !== -1
              ? statusLabels[lastNonZeroIndex]
              : "Unknown Status";

          return (
            <div key={item.no} className="mb-4 border-b pb-2">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <div className="text-sm flex">
                <div className="text-black">ผู้เสนอ:&nbsp;</div>
                <div className="text-gray-500">{item.name}</div>
              </div>
              <div className="text-sm flex">
                <div className="text-black">สถานะล่าสุด:&nbsp;</div>
                <div className={getStageColor(item.stage)}>
                  {getStatusText(item.stage, lastStatusLabel)}
                </div>
              </div>
              <div className="grid grid-cols-10 gap-1 mt-2">
                {item.status.map((status, idx) => (
                  <div
                    key={idx}
                    className={`h-4 rounded ${getStatusColor(status)}`}
                  ></div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppLawsTable;
