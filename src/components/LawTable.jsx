import React from "react";
import StatusLabel from "./StatusLabel";
import LawRow from "./LawRow";

const LawTable = ({ data, statusLabels }) => {
  return (
    <table className="min-w-full table-auto border-collapse border-spacing-0">
      <thead className="bg-gray-100 sticky top-0 z-20">
        <tr>
          <th className="px-4 py-2 w-[600px] text-sm">หัวข้อ</th>
          {statusLabels.map((label, index) => (
            <StatusLabel key={index} label={label} />
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((law) => (
          <LawRow key={law.no} law={law} statusLabels={statusLabels} />
        ))}
      </tbody>
    </table>
  );
};

export default LawTable;