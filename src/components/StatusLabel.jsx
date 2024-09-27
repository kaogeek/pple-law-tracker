import React from "react";

const StatusLabel = ({ label }) => {
  return (
    <th className="px-1 py-2 text-center w-[100px] sticky top-0 bg-gray-100 z-10 text-sm">
      {label}
    </th>
  );
};

export default StatusLabel;