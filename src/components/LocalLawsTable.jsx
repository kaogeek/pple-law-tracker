import React, { useEffect, useState } from 'react';
import { fetchLocalLawsData } from "../utils/api";

// import StatusPopup from './StatusPopup';

function LocalLawsTable() {
  const [laws, setLaws] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLocalLawsData();
        setLaws(data);
      } catch (error) {
        setLaws([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;

  const getStatusColor = (status) => {
    switch (status) {
      case 'done':
        return 'bg-green-500';
      case 'working':
        return 'bg-yellow-500';
      case 'paused':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const legend = (
    <div className="flex gap-6 mb-4 text-sm">
      <div className="flex items-center gap-2">
        <span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
        <span>ผ่าน</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="inline-block w-4 h-4 rounded-full bg-yellow-500"></span>
        <span>อยู่ระหว่างดำเนินการ</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="inline-block w-4 h-4 rounded-full bg-gray-300"></span>
        <span>ยังไม่ดำเนินการ/ไม่มีข้อมูล</span>
      </div>
    </div>
  );

  return (
    <div className="overflow-x-auto">
      {legend}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-64">ชื่อกฎหมาย</th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จังหวัด</th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">องค์กรปกครองส่วนท้องถิ่น</th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ตัวอย่างกฎหมาย</th>
            <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ยื่นเสนอ</th>
            <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">วาระ 1</th>
            <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">วาระ 2</th>
            <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">วาระ 3</th>
            <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ประกาศใช้</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {laws.map((law, index) => (
            <tr key={law.Id || index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">
                <div className="font-medium text-gray-900 break-words">{law['ชื่อข้อบัญญัติ']}</div>
                {law['ผู้เสนอ'] && (
                  <div className="text-xs text-gray-500 mt-1">ผู้เสนอ: {law['ผู้เสนอ']}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {law['จังหวัด'] || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {law['ชื่อท้องถิ่น'] || "-"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                {law['ตัวอย่างกฎหมาย'] ? (
                  <a
                    href={law['ตัวอย่างกฎหมาย'].startsWith('http') ? law['ตัวอย่างกฎหมาย'] : `https://${law['ตัวอย่างกฎหมาย']}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    เปิดไฟล์
                  </a>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className={`h-4 w-full rounded-3xl ${getStatusColor(law['ยื่นเข้าสภา'])}`}></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className={`h-4 w-full rounded-3xl ${getStatusColor(law['วาระ 1'])}`}></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className={`h-4 w-full rounded-3xl ${getStatusColor(law['วาระ 2'])}`}></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className={`h-4 w-full rounded-3xl ${getStatusColor(law['วาระ 3'])}`}></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className={`h-4 w-full rounded-3xl ${getStatusColor(law['ประกาศใช้'])}`}></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LocalLawsTable;