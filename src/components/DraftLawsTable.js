import React, { useState } from "react";
import lawFile from "../assets/law.json";

// Sample data with 10 status stages for each item
const data = lawFile;

// 6 bigbang
const category = [
  "การศึกษาตกยุค",
  "คุณภาพชีวิตโลกที่สาม",
  "เผด็จการซ่อนรูป",
  "ภาคเกษตรถูกแช่แข็ง",
  "รัฐล้าหลัง",
  "เศรษฐกิจปิดโอกาส",
];

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

const getStatusColor = (status, stage) => {
  if (stage === "proposed") {
    if (status === 1) {
      return "bg-blue-500";
    } else {
      return "bg-gray-300";
    }
  }

  if (status === 1) {
    // Check the stage and return the appropriate color
    switch (stage) {
      case "proposed":
        return "bg-yellow-500"; // Blue for proposed
      case "working":
        return "bg-yellow-500"; // Yellow for working
      case "paused":
        return "bg-red-500"; // Red for paused
      case "done":
        return "bg-green-500"; // Green for done
      default:
        return "bg-gray-300"; // Default to gray if the stage is unknown
    }
  } else if (status === 2) {
    return "bg-black";
  } else {
    return "bg-gray-300"; // Grey if status is 0
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

const DraftLawsTable = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search input

  // Sort and filter data by title in Thai alphabetical order and search term
  const filteredData = data
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
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
        style={{ maxHeight: "calc(100% - 285px)", overflowY: "auto" }}
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
          <div className="flex justify-end items-center">
            {/* <div
              className={`h-4 ml-2 mr-1 w-[35px] rounded ${getStatusColor(5)}`}
            ></div>
            <div>ยื่นเข้าสภา</div> */}
            <div
              className={`h-4 ml-2 mr-1 w-[35px] rounded ${getStatusColor(
                1,
                "working"
              )}`}
            ></div>
            <div>ดำเนินการ</div>
            <div
              className={`h-4 ml-2 mr-1 w-[35px] rounded ${getStatusColor(
                1,
                "paused"
              )}`}
            ></div>
            <div>ปัดตก</div>
            <div
              className={`h-4 ml-2 mr-1 w-[35px] rounded ${getStatusColor(
                1,
                "done"
              )}`}
            ></div>
            <div>ผ่าน</div>
          </div>
        </div>
        <table className="min-w-full table-auto border-collapse border-spacing-0">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 w-[600px] text-sm">หัวข้อ</th>
              {/* Status Columns */}
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
              <tr key={item.id} className="bg-white border-b">
                {/* Title and Subtitle */}
                <td className="px-4 py-2">
                  <div className="font-bold">{item.title}</div>{" "}
                  {/* Main title */}
                  <div className="text-sm text-gray-500">{item.name}</div>{" "}
                  {/* Subtitle */}
                </td>

                {/* Render status with color */}
                {item.status.map((status, idx) => (
                  <td key={idx} className="px-1 py-2 text-center w-[100px]">
                    <div
                      className={`h-4 w-full rounded-3xl ${getStatusColor(
                        status,
                        item.stage // Pass stage here
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
        {filteredData.map((item) => {
          // Find the index of the last non-zero status
          const lastNonZeroIndex = item.status.findLastIndex(
            (status) => status !== 0
          );

          // Get the corresponding label from statusLabels
          const lastStatusLabel =
            lastNonZeroIndex !== -1
              ? statusLabels[lastNonZeroIndex]
              : "Unknown Status";

          return (
            <div key={item.id} className="mb-4 border-b pb-2">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <div className="text-sm flex">
                <div className="text-black">ผู้เสนอ:&nbsp;</div>
                <div className="text-gray-500"> {item.name}</div>
              </div>

              {/* Display the last non-zero status label */}
              <div className="text-sm flex">
                <div className="text-black">สถานะล่าสุด:&nbsp;</div>
                <div className={getStageColor(item.stage)}>
                  {getStatusText(item.stage, lastStatusLabel)}
                </div>
                {/* <div>
                  <a href={item.url}>อ่านร่างกฎหมาย</a>
                </div> */}
              </div>

              <div className="grid grid-cols-10 gap-1 mt-2">
                {item.status.map((status, idx) => (
                  <div
                    key={idx}
                    className={`h-4 rounded ${getStatusColor(
                      status,
                      item.stage
                    )}`}
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

export default DraftLawsTable;
