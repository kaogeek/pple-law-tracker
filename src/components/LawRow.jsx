import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { IoDocumentAttach } from "react-icons/io5";
import StatusIcon from "./StatusIcon";

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

const LawRow = ({ law, statusLabels }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <tr key={law.no} className="bg-white border-b">
        <td className="px-4 py-2">
          <div className="font-bold">
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
                <IoDocumentAttach size={14} />
              </a>
            )}
          </div>
          {law.name && (
            <div className="text-sm flex">
              <div className="text-black">ผู้เสนอ:&nbsp;</div>
              <div className="text-gray-500">{law.name}</div>
            </div>
          )}
          {law.category && (
            <div className="text-sm flex">
              <div className="text-black">หมวดหมู่:&nbsp;</div>
              <div className="text-gray-500">
                {bigbangCategory(law.category)}
              </div>
            </div>
          )}
        </td>

        {/* Button to open modal */}
        <td className="px-1 py-2 text-center w-[150px]">
          {law.detail && law.detail.trim() !== "" && (
            <div className="flex justify-center">
              <button
                onClick={handleOpenModal}
                className="flex text-blue-600 items-center justify-center gap-x-2.5 p-2 text-sm font-semibold leading-6 text-gray-900 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
              >
                <FaFileAlt size={18} />
                อ่านสรุป
              </button>
            </div>
          )}
        </td>

        {law.status.map((status, idx) => (
          <td key={idx} className="px-1 py-2 text-center w-[100px]">
            <StatusIcon status={status} />
          </td>
        ))}
      </tr>

      {/* Modal moved outside of the table */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
                    {/* Replace this with real content */}
                    {law.detail}
                  </p>
                  <div className="font-bold">แนวทางการแก้ไข</div>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {/* Replace this with real content */}
                    {law.solution}
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

export default LawRow;
