const Notices = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full justify-center bg-[#F8F9FA] px-5 py-10">
      
      
      <div className="w-full max-w-2xl rounded-xl bg-[#F8F9FA]">
        
        
        <div className="mb-6 border-b border-gray-300 pb-4 text-center">
          <h1 className="text-2xl font-semibold text-[#1B2433]">
            Notice Board
          </h1>
        </div>

        
        <div className="flex flex-col gap-4">

          
          <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex flex-col">
              <span className="text-[17px] font-medium text-[#1B2433]">
                notice 2
              </span>

              <span className="mt-1 text-sm text-gray-400">
                Apr 16, 2026 - 07:06 PM
              </span>
            </div>

            <span className="rounded-full bg-[#E03C4B] px-4 py-1.5 text-xs font-medium text-white">
              High
            </span>
          </div>

          
          <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex flex-col">
              <span className="text-[17px] font-medium text-[#1B2433]">
                nt 3
              </span>

              <span className="mt-1 text-sm text-gray-400">
                Apr 16, 2026 - 07:06 PM
              </span>
            </div>

            <span className="rounded-full bg-[#D98C36] px-4 py-1.5 text-xs font-medium text-white">
              Medium
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Notices