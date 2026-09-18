import { useState, useEffect } from 'react';
import NoticeCard from '../components/NoticeCard';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedNotices, setCheckedNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Unread');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch('/api/notices');
        if (!res.ok) throw new Error('Failed to fetch notices');
        const data = await res.json();
        setNotices(data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const toggleCheck = (id) => {
    if (checkedNotices.includes(id)) {
      setCheckedNotices(checkedNotices.filter(noticeId => noticeId !== id));
    } else {
      setCheckedNotices([...checkedNotices, id]);
    }
  };

  // category (not the dead `important` flag) drives every filter
  const filteredNotices = notices.filter(notice => {
    if (activeFilter === 'Unread') return !checkedNotices.includes(notice._id);
    if (activeFilter === 'Important') return notice.category === 'Important' || notice.category === 'Emergency';
    return true; // 'All'
  });

  const getCategoryStyle = (category) => {
    if (category === 'Emergency') return 'bg-[#E03C4B] text-white';
    if (category === 'Important') return 'bg-[#D98C36] text-white';
    return 'bg-white border border-gray-300 text-gray-500';
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] w-full justify-center bg-[#F8F9FA] px-5 py-10">
      <div className="w-full max-w-2xl rounded-xl bg-[#F8F9FA]">
        <div className="mb-6 border-b border-gray-300 pb-4 text-center">
          <h1 className="text-2xl font-semibold text-[#1B2433]">Notice Board</h1>
        </div>

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

        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="mt-10 text-center text-gray-500">Loading notices...</div>
          ) : filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <NoticeCard
                key={notice._id}
                notice={notice}
                isChecked={checkedNotices.includes(notice._id)}
                onToggle={toggleCheck}
                onClick={setSelectedNotice}
              />
            ))
          ) : (
            <div className="mt-10 text-center text-gray-500">No notices in this category.</div>
          )}
        </div>
      </div>

      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <h2 className="text-[19px] font-semibold text-[#1B2433]">{selectedNotice.title}</h2>
              <span className={`rounded-full px-4 py-1 text-xs font-medium ${getCategoryStyle(selectedNotice.category)}`}>
                {selectedNotice.category}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-400">
              {new Date(selectedNotice.createdAt).toLocaleString()}
            </p>

            <hr className="my-4 border-gray-200" />

            <p className="mb-6 text-[15px] text-gray-500">{selectedNotice.description}</p>

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