import React from "react";

const StatusPopup = ({ status, onClose }) => {
  if (!status) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-4">รายละเอียดขั้นตอน</h3>
        <p>สถานะ: {status}</p>
      </div>
    </div>
  );
};

export default StatusPopup;