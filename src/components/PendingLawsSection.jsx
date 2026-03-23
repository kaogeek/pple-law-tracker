import React, { useState } from "react";
import { IoDocumentAttach } from "react-icons/io5";

const categoryMap = {
  economy: "เศรษฐกิจเติบโตอย่างมีคุณภาพ",
  education: "เรียนรู้ทันโลก",
  life: "ยกระดับคุณภาพชีวิต",
  local: "ปลดล็อกชนบทไทย",
  government: "ปฏิรูปรัฐครั้งใหญ่",
  democracy: "ประชาธิปไตยเต็มใบ",
};

const PendingLawsSection = ({ laws }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!laws || laws.length === 0) return null;

  return (
    <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 overflow-hidden">
      {/* Header / Toggle */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-start justify-between px-4 py-3 text-left hover:bg-amber-100 transition-colors"
      >
        <div className="flex items-start gap-3">
          {/* Clock icon */}
          <span className="mt-0.5 text-amber-500 text-xl leading-none">⏳</span>
          <div>
            <p className="font-semibold text-amber-800 text-sm">
              กฎหมายค้างจากสภาชุดที่ 26 — รอ ครม. พิจารณาต่อ ใน 60 วัน
            </p>
            <p className="text-amber-700 text-xs mt-0.5">
              กฎหมายเหล่านี้ค้างการพิจารณาจากสภาชุดก่อน ปัจจุบันอยู่ระหว่างรอคณะรัฐมนตรีพิจารณาต่อภายใน 60 วัน
              &nbsp;·&nbsp;{laws.length} ร่าง
            </p>
          </div>
        </div>
        <span className="ml-4 mt-0.5 text-amber-600 shrink-0 text-lg leading-none">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {/* Collapsible content */}
      {isOpen && (
        <div className="border-t border-amber-200 divide-y divide-amber-100">
          {laws.map((law) => (
            <div
              key={law.Id}
              className="px-4 py-3 flex items-start justify-between gap-3 hover:bg-amber-100/60 transition-colors"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 leading-snug">
                  {law.ชื่อร่าง}
                </p>
                <div className="flex flex-wrap gap-x-3 mt-0.5 text-xs text-gray-500">
                  {law.ผู้เสนอ && <span>{law.ผู้เสนอ}</span>}
                  {law.ประเภท && (
                    <span className="text-amber-700">
                      {categoryMap[law.ประเภท] || law.ประเภท}
                    </span>
                  )}
                </div>
              </div>
              {law.ตัวอย่างร่าง && law.ตัวอย่างร่าง.trim() !== "" && (
                <a
                  href={law.ตัวอย่างร่าง}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="อ่านร่างกฎหมาย"
                  className="shrink-0 text-blue-500 hover:text-blue-700 mt-0.5"
                >
                  <IoDocumentAttach size={18} />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingLawsSection;
