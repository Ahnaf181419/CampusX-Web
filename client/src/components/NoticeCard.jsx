import { RiMailLine, RiArrowDropDownLine } from "react-icons/ri";

const NoticeCard = ({ notice, isChecked, onToggle, onClick }) => {
  const getCategoryStyle = (category) => {
    if (category === 'Emergency') return 'bg-[#E03C4B] text-white';
    if (category === 'Important') return 'bg-[#D98C36] text-white';
    return 'bg-white border border-gray-300 text-gray-500';
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          className="h-5 w-5 cursor-pointer rounded border-gray-300 accent-[#1B2433]"
          checked={isChecked}
          onChange={() => onToggle(notice._id)}
        />

        <div className="flex cursor-pointer flex-col" onClick={() => onClick(notice)}>
          <span className={`text-[17px] font-medium ${isChecked ? 'text-gray-400 line-through' : 'text-[#1B2433]'}`}>
            {notice.title}
          </span>
          <span className="mt-1 text-sm text-gray-400">
            {new Date(notice.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex cursor-pointer items-center gap-4" onClick={() => onClick(notice)}>
        <span className={`rounded-full px-4 py-1.5 text-xs font-medium ${getCategoryStyle(notice.category)}`}>
          {notice.category}
        </span>

        <div className="flex gap-3 text-gray-400 hover:text-gray-600 transition-colors">
          <RiMailLine className="h-4.5 w-4.5" />
          <RiArrowDropDownLine className="h-4.5 w-4.5" />
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;