import { RiMailLine, RiArrowDropDownLine } from "react-icons/ri";

const NoticeCard = ({ notice, isChecked, onToggle, onClick }) => {
  const getPriorityStyle = (priority) => {
    if (priority === 'High') return 'bg-[#E03C4B] text-white';
    if (priority === 'Medium') return 'bg-[#D98C36] text-white';
    return 'bg-white border border-gray-300 text-gray-500'; // Low priority
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        {/* Acknowledgement Checkbox */}
        <input 
          type="checkbox" 
          className="h-5 w-5 cursor-pointer rounded border-gray-300 accent-[#1B2433]"
          checked={isChecked}
          onChange={() => onToggle(notice.id)}
        />
        
        {/* Clickable Title Area */}
        <div className="flex cursor-pointer flex-col" onClick={() => onClick(notice)}>
          <span className={`text-[17px] font-medium ${isChecked ? 'text-gray-400 line-through' : 'text-[#1B2433]'}`}>
            {notice.title}
          </span>
          <span className="mt-1 text-sm text-gray-400">{notice.date}</span>
        </div>
      </div>

      {/* Priority Badge & Icons */}
      <div className="flex cursor-pointer items-center gap-4" onClick={() => onClick(notice)}>
        <span className={`rounded-full px-4 py-1.5 text-xs font-medium ${getPriorityStyle(notice.priority)}`}>
          {notice.priority}
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