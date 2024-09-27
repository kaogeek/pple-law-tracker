import React from "react";

const FilterButtons = ({ counts, filter, onFilterChange }) => {
  const buttons = [
    { label: "ทั้งหมด", value: "all", count: counts.all, color: "bg-blue-500" },
    { label: "ดำเนินการ", value: "ongoing", count: counts.ongoing, color: "bg-yellow-500" },
    { label: "ปัดตก", value: "stopped", count: counts.stopped, color: "bg-red-500" },
    { label: "ผ่านแล้ว", value: "passed", count: counts.passed, color: "bg-green-500" },
  ];

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-2">
      {buttons.map((button) => (
        <button
          key={button.value}
          className={`px-2 py-2 rounded text-xs lg:text-base ${
            filter === button.value ? `${button.color} text-white` : "bg-gray-200"
          }`}
          onClick={() => onFilterChange(button.value)}
        >
          {button.label} ({button.count})
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
