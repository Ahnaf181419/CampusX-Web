import React from 'react';

const EmergencyBanner = ({ title, date, details }) => {
  return (
    <div className="mb-6 flex flex-col rounded-xl border-2 border-[#E03C4B] bg-red-50 p-5 shadow-sm">
      <div className="mb-2 flex items-center gap-3">
        <span className="rounded-full bg-[#E03C4B] px-3 py-1 text-xs font-bold tracking-wider text-white uppercase">
          Urgent
        </span>
        <h2 className="text-[17px] font-bold text-[#E03C4B]">{title}</h2>
      </div>
      <p className="mb-2 text-sm font-medium text-red-700">{details}</p>
      <span className="text-xs font-medium text-red-400">Posted: {date}</span>
    </div>
  );
};

export default EmergencyBanner;