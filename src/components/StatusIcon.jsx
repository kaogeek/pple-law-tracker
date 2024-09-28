import React from "react";

const getStatusColor = (status) => {
  switch (status) {
    case 1: // done
      return "bg-green-500";
    case 2: // ongoing
      return "bg-yellow-500";
    case 3: // stopped
      return "bg-red-500";
    // case 4: //skipped
    //   return "bg-green-500";
    case 4: //skipped
      return "bg-white border-2 border-green-500";
    default:
      return "bg-gray-300";
  }
};

const StatusIcon = ({ status }) => {
  return <div className={`h-4 w-full rounded-3xl ${getStatusColor(status)}`}></div>;
};

// Export both the component and the function
export { getStatusColor };
export default StatusIcon;