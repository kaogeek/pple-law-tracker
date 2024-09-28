import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { getStatusColor } from "./StatusIcon";

const getStageColor = (status) => {
  switch (status) {
    case 1:
      return "text-green-500";
    case 2: // ongoing
      return "text-yellow-500";
    case 3: // stopped
      return "text-red-500";
    case 4:
      return "text-yellow-500";
    default:
      return "text-black";
  }
};

const getStatusText = (status, text) => {
  switch (status) {
    case 1:
      return text;
    case 2:
      return "รอ" + text;
    case 3:
      return "ถูกปัดตก " + text;
    case 4:
      return text;
    default:
      return "ไม่มีข้อมูล";
  }
};

const LawCard = ({ law, statusLabels }) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
    idx: 0,
  });

  const lastNonZeroIndex = law.status.findLastIndex((status) => status !== 0);
  const lastStatusLabel =
    lastNonZeroIndex !== -1 ? statusLabels[lastNonZeroIndex] : "Unknown Status";
  const lastStage = law.status[lastNonZeroIndex];

  // Handler for showing the tooltip
  const handleStatusClick = (event, status, idx) => {
    const targetRect = event.target.getBoundingClientRect(); // Get element's position

    // Adjust position relative to the parent container or page offset
    const tooltipX = targetRect.left + window.scrollX;
    const tooltipY = targetRect.top + window.scrollY + targetRect.height;

    setTooltip({
      visible: true,
      content: `สถานะ: ${status}`, // Customize this content as needed
      x: tooltipX,
      y: tooltipY,
      idx: idx,
    });
  };

  // Handler for hiding the tooltip
  const handleTooltipHide = () => {
    setTooltip({ visible: false, content: "", x: 0, y: 0, idx: 0 });
  };

  return (
    <div key={law.no} className="mb-4 border-b pb-2 relative">
      <div>
        <h2 className="text-lg font-semibold">
          {law.title}
          {law.link && law.link.trim() !== "" && (
            <a
              href={law.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center text-blue-500"
              aria-label="Open document link"
              title="อ่านร่างกฎหมายที่นี่"
            >
              <FaFileAlt size={14} />
            </a>
          )}
        </h2>
      </div>
      {law.name && (
        <div className="text-sm flex">
          <div className="text-black">ผู้เสนอ:&nbsp;</div>
          <div className="text-gray-500">{law.name}</div>
        </div>
      )}
      <div className="text-sm flex">
        <div className="text-black">สถานะล่าสุด:&nbsp;</div>
        <div className={getStageColor(lastStage)}>
          {getStatusText(lastStage, lastStatusLabel)}
        </div>
      </div>
      <div className="grid grid-cols-10 gap-1 mt-2 mb-2">
        {law.status.map((status, idx) => (
          <div
            key={idx}
            className={`h-4 rounded cursor-pointer ${getStatusColor(status)}`}
            onClick={(e) => handleStatusClick(e, status, idx)} // Show tooltip on click
            onMouseLeave={handleTooltipHide} // Hide tooltip on mouse leave
          ></div>
        ))}
      </div>
      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute bg-black text-white text-xs rounded p-2 z-50"
          style={{
            left: tooltip.idx === 9 ? 200 : tooltip.x, // Conditionally set the left position
            top: "unset", // Use tooltip.y instead of "unset" for proper positioning
          }}
        >
          {statusLabels[tooltip.idx]}
        </div>
      )}
    </div>
  );
};

export default LawCard;
