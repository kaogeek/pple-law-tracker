import React from "react";
import { FaFileAlt } from "react-icons/fa";
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
  return (
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
              <FaFileAlt size={14} />
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
            <div className="text-gray-500">{bigbangCategory(law.category)}</div>
          </div>
        )}
        {/* <div className="text-sm text-gray-500">ผู้เสนอ: {law.name}</div> */}
      </td>
      {law.status.map((status, idx) => (
        <td key={idx} className="px-1 py-2 text-center w-[100px]">
          <StatusIcon status={status} />
        </td>
      ))}
    </tr>
  );
};

export default LawRow;
