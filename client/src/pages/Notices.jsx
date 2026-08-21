import React, { useState } from 'react';
import NoticeCard from '../components/NoticeCard';
import EmergencyBanner from '../components/EmergencyBanner';

// Mock database to simulate backend
const mockNotices = [
  { id: 1, title: "nt 3", date: "Apr 16, 2026 - 07:06 PM", priority: "Medium", details: "nt 3 details" },
  { id: 2, title: "notice 2", date: "Apr 16, 2026 - 07:06 PM", priority: "High", details: "notice 2 details" },
  { id: 3, title: "sk", date: "Apr 16, 2026 - 06:51 PM", priority: "High", details: "sk details" },
  { id: 4, title: "nt 2", date: "Apr 16, 2026 - 06:50 PM", priority: "Low", details: "nt 2 details" },
  { id: 5, title: "notice 1", date: "Apr 16, 2026 - 06:50 PM", priority: "Medium", details: "notice 1 details" },
  { id: 6, title: "eheu", date: "Apr 16, 2026 - 03:00 PM", priority: "Medium", details: "eheu details" }
];

const Notices = () => {
  const [checkedNotices, setCheckedNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Unread');

  // Logic to handle checkbox toggle
  const toggleCheck = (id) => {
    if (checkedNotices.includes(id)) {
      setCheckedNotices(checkedNotices.filter(noticeId => noticeId !== id));
    } else {
      setCheckedNotices([...checkedNotices, id]);
    }
  };

  // Logic to filter the notices based on the active button
  const filteredNotices = mockNotices.filter(notice => {
    if (activeFilter === 'Unread') return !checkedNotices.includes(notice.id);
    if (activeFilter === 'Important') return notice.priority === 'High';
    return true; // 'All'
  });

  const getPriorityStyle = (priority) => {
    if (priority === 'High') return 'bg-[#E03C4B] text-white';
    if (priority === 'Medium') return 'bg-[#D98C36] text-white';
    return 'bg-white border border-gray-300 text-gray-500'; 
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] w-full justify-center bg-[#F8F9FA] px-5 py-10">
      
      <div className="w-full max-w-2xl rounded-xl bg-[#F8F9FA]">
        
        {/* Header */}
        <div className="mb-6 border-b border-gray-300 pb-4 text-center">
          <h1 className="text-2xl font-semibold text-[#1B2433]">Notice Board</h1>
        </div>

        {/* Optional Emergency Banner (Uncomment if needed based on backend data) */}
        {/* <EmergencyBanner title="O+ Blood Needed" date="Aug 21, 2026" details="Contact student welfare." /> */}

        {/* Filter Buttons */}
        <div className="mb-6 flex gap-3">
          {['Unread', 'Important', 'All'].map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                activeFilter === filter 
                  ? 'bg-[#1B2433] text-white' 
                  : 'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Render the Notice Cards */}
        <div className="flex flex-col gap-4">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <NoticeCard 
                key={notice.id}
                notice={notice}
                isChecked={checkedNotices.includes(notice.id)}
                onToggle={toggleCheck}
                onClick={setSelectedNotice}
              />
            ))
          ) : (
            <div className="mt-10 text-center text-gray-500">No notices in this category.</div>
          )}
        </div>
      </div>

      {/* Modal Popup Overlay */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            
            <div className="flex items-start justify-between">
              <h2 className="text-[19px] font-semibold text-[#1B2433]">{selectedNotice.title}</h2>
              <span className={`rounded-full px-4 py-1 text-xs font-medium ${getPriorityStyle(selectedNotice.priority)}`}>
                {selectedNotice.priority}
              </span>
            </div>
            
            <p className="mt-1 text-sm text-gray-400">{selectedNotice.date}</p>
            
            <hr className="my-4 border-gray-200" />
            
            <p className="mb-6 text-[15px] text-gray-500">{selectedNotice.details}</p>
            
            <button 
              onClick={() => setSelectedNotice(null)}
              className="w-full rounded-xl bg-[#1B2433] py-3 text-sm font-medium text-white transition-all hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Notices;