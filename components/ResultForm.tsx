
import React, { useState } from 'react';
import { ExamType, ViewType } from '../types';

interface ResultFormProps {
  onSearch: (hallticket: string, examType: ExamType, viewType: ViewType) => void;
}

const ResultForm: React.FC<ResultFormProps> = ({ onSearch }) => {
  const [hallticket, setHallticket] = useState('');
  const [examType, setExamType] = useState<ExamType>(ExamType.GENERAL);
  const [viewType, setViewType] = useState<ViewType>(ViewType.ALL_SEMESTERS);
  const [examDropdownOpen, setExamDropdownOpen] = useState(false);
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hallticket) return;
    onSearch(hallticket.trim().toLowerCase(), examType, viewType);
  };

  return (
    <div className="bg-white rounded-[1.25rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] max-w-[600px] w-full overflow-hidden border border-gray-100">
      <div className="bg-[#445b7e] py-14 text-center">
        <h1 className="text-white text-[1.75rem] font-medium tracking-wide">Exam Results</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="px-10 py-12 space-y-10">
        {/* Hallticket Number */}
        <div className="space-y-3">
          <label className="text-[0.95rem] font-medium text-gray-400">
            Hallticket number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={hallticket}
            onChange={(e) => setHallticket(e.target.value)}
            className="w-full p-[1.15rem] bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-800 text-[1.05rem]"
            placeholder="e.g. 23EG107A01 or 23EG107B23"
            required
          />
        </div>

        {/* Exam Type Dropdown */}
        <div className="space-y-3 relative">
          <label className="text-[0.95rem] font-medium text-gray-400">
            Select Exam Type <span className="text-red-500">*</span>
          </label>
          <div 
            onClick={() => setExamDropdownOpen(!examDropdownOpen)}
            className="w-full p-[1.15rem] border border-gray-200 rounded-xl flex justify-between items-center cursor-pointer hover:border-gray-400 transition-all bg-white"
          >
            <span className="text-gray-700 text-[1.05rem]">{examType}</span>
            <svg className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${examDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {examDropdownOpen && (
            <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden py-1 animate-in fade-in slide-in-from-top-2">
              {Object.values(ExamType).map((type) => (
                <div
                  key={type}
                  onClick={() => {
                    setExamType(type);
                    setExamDropdownOpen(false);
                  }}
                  className="px-6 py-4 hover:bg-[#f0f5ff] cursor-pointer text-gray-700 transition-colors text-[1rem]"
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View Type Dropdown */}
        <div className="space-y-3 relative">
          <label className="text-[0.95rem] font-medium text-gray-400">
            View Type
          </label>
          <div 
            onClick={() => setViewDropdownOpen(!viewDropdownOpen)}
            className="w-full p-[1.15rem] border border-gray-200 rounded-xl flex justify-between items-center cursor-pointer hover:border-gray-400 transition-all bg-white"
          >
            <span className="text-gray-700 text-[1.05rem]">{viewType}</span>
            <svg className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${viewDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {viewDropdownOpen && (
            <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden py-1 animate-in fade-in slide-in-from-top-2">
              {Object.values(ViewType).map((type) => (
                <div
                  key={type}
                  onClick={() => {
                    setViewType(type);
                    setViewDropdownOpen(false);
                  }}
                  className="px-6 py-4 hover:bg-[#f0f5ff] cursor-pointer text-gray-700 transition-colors text-[1rem]"
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#2e31f2] text-white py-[1.15rem] rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-[0_10px_20px_rgba(46,49,242,0.3)] active:scale-[0.98]"
        >
          Get Result
        </button>
      </form>
    </div>
  );
};

export default ResultForm;
