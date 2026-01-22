
import React from 'react';
import { RESEARCH_RESULTS } from '../constants';

interface ResearchProps {
  searchText: string;
}

const Research: React.FC<ResearchProps> = ({ searchText }) => {
  return (
    <div className="h-full bg-slate-50 flex flex-col">
      <div className="bg-white border-b border-slate-200 p-6">
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              readOnly
              value={searchText}
              placeholder="판례, 법령, 문헌 검색..."
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-full bg-slate-50 focus:outline-none"
            />
            <div className="absolute left-4 top-3.5">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button className="bg-slate-900 text-white px-8 py-3 rounded-full font-medium">검색</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-sm font-medium text-slate-500">검색 결과 약 1,240건</h2>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-slate-200 rounded-md text-xs">최신순</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs text-slate-400">정확도순</span>
            </div>
          </div>

          <div className="space-y-6">
            {RESEARCH_RESULTS.map((res) => (
              <div key={res.id} className="bg-white p-6 border border-slate-200 rounded-lg hover:shadow-md transition-shadow cursor-default">
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-bold text-blue-800 underline decoration-blue-200">{res.title}</h3>
                  <span className="text-xs text-slate-400 uppercase tracking-tighter">{res.source}</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">{res.summary}</p>
                <div className="mt-4 flex space-x-4">
                  <button className="text-xs text-slate-500 font-medium hover:text-blue-600 flex items-center">
                    <span className="mr-1">★</span> 즐겨찾기
                  </button>
                  <button className="text-xs text-slate-500 font-medium hover:text-blue-600 flex items-center">
                    <span className="mr-1">⎙</span> 의견서 반영
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
