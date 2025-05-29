import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { IoDocumentAttach } from "react-icons/io5";
import { getStatusColor } from "./StatusIcon";

const categoryMap = {
  economy: "เศรษฐกิจเติบโตอย่างมีคุณภาพ",
  education: "เรียนรู้ทันโลก",
  life: "ยกระดับคุณภาพชีวิต",
  local: "ปลดล็อกชนบทไทย",
  government: "ปฏิรูปรัฐครั้งใหญ่",
  democracy: "ประชาธิปไตยเต็มใบ",
};

const bigbangCategory = (category) => {
  return categoryMap[category] || "ไม่มีหมวด"; // Default for unknown categories
};

const getStatusValue = (status) => {
  if (status === "done") return 1;
  if (status === "working") return 2;
  if (status === "paused") return 3;
  if (status === "skipped") return 4;
  return 0;
};

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

  // Convert status fields to array
  const statusArray = [
    getStatusValue(law["ยื่นเข้าสภา"]),
    getStatusValue(law["นายกรับรอง"]),
    getStatusValue(law["บรรจุวาระ"]),
    getStatusValue(law["ครม. ดึงไปศึกษา"]),
    getStatusValue(law["วาระ 1"]),
    getStatusValue(law["ศึกษาใน กมธ."]),
    getStatusValue(law["วาระ 2"]),
    getStatusValue(law["วาระ 3"]),
    getStatusValue(law["ผ่าน สว"]),
    getStatusValue(law["ลงนามพระปรมา"])
  ];

  // Check if law.link is valid (non-empty string after trim)
  const isLinkValid = law.ตัวอย่างร่าง && law.ตัวอย่างร่าง.trim() !== "";

  const [isModalOpen, setIsModalOpen] = useState(false); // State for handling modal

  const lastNonZeroIndex = statusArray.findLastIndex((status) => status !== 0);
  const lastStatusLabel =
    lastNonZeroIndex !== -1 ? statusLabels[lastNonZeroIndex] : "Unknown Status";
  const lastStage = statusArray[lastNonZeroIndex];

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

  // Handler to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div key={law.Id} className="mb-4 border-b pb-2 relative">
        <div>
          <h2 className="text-lg font-semibold">
            {law.ชื่อร่าง}
            {law.ตัวอย่างร่าง && law.ตัวอย่างร่าง.trim() !== "" && (
              <a
                href={law.ตัวอย่างร่าง}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex items-center text-blue-500"
                aria-label="Open document link"
                title="อ่านร่างกฎหมายที่นี่"
              >
                <IoDocumentAttach size={14} />
              </a>
            )}
          </h2>
        </div>
        <div className="grid grid-cols-2 divide-x rounded-md bg-gray-50 my-2">
          {/* Full document link */}
          <a
            href={isLinkValid ? law.ตัวอย่างร่าง : "#"}
            target={isLinkValid ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={`flex text-blue-600 items-center justify-center gap-x-2.5 p-2 text-sm font-semibold leading-6 ${
              isLinkValid
                ? "text-gray-900 hover:bg-gray-100"
                : "text-gray-400 cursor-not-allowed"
            }`}
            onClick={(e) => {
              if (!isLinkValid) {
                e.preventDefault(); // Prevent navigation if the link is invalid
              }
            }}
          >
            <IoDocumentAttach size={18} />
            ร่างฉบับเต็ม
          </a>

          {/* Summary version link */}
          <button
            onClick={handleOpenModal}
            className="flex text-blue-600 items-center justify-center gap-x-2.5 p-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 cursor-pointer"
          >
            <FaFileAlt size={18} />
            สรุปร่างฉบับนี้
          </button>
        </div>
        {law.ผู้เสนอ && (
          <div className="text-sm flex">
            <div className="text-black">ผู้เสนอ:&nbsp;</div>
            <div className="text-gray-500">{law.ผู้เสนอ}</div>
          </div>
        )}
        {law.ประเภท && (
          <div className="text-sm flex">
            <div className="text-black">หมวดหมู่:&nbsp;</div>
            <div className="text-gray-500">{bigbangCategory(law.ประเภท)}</div>
          </div>
        )}
        <div className="text-sm flex">
          <div className="text-black">สถานะล่าสุด:&nbsp;</div>
          <div className={getStageColor(lastStage)}>
            {getStatusText(lastStage, lastStatusLabel)}
          </div>
        </div>

        <div className="grid grid-cols-10 gap-1 mt-2 mb-2">
          {statusArray.map((status, idx) => (
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          {/* This container ensures that the modal content is scrollable */}
          <div className="bg-white w-11/12 max-w-lg rounded-lg shadow-lg p-6 relative overflow-hidden max-h-full">
            {/* Scrollable modal content */}
            <div className="overflow-y-auto max-h-[80vh]">
              <div className="text-right">
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={handleCloseModal}
                >
                  ✖
                </button>
              </div>
              <div className="text-gray-800">
                <h3 className="text-xl font-bold mb-4">รายละเอียดเพิ่มเติม</h3>

                <div className="text-gray-700 text-sm mb-4">
                  <div className="font-bold">ปัญหาและที่มา</div>
                  <p className="mb-2">
                    {law.รายละเอียด}
                  </p>
                  <div className="font-bold">แนวทางการแก้ไข</div>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {law.แนวทาง}
                  </p>
                </div>
              </div>
            </div>

            {/* Close button at the bottom */}
            <div className="text-right mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleCloseModal}
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LawCard;
