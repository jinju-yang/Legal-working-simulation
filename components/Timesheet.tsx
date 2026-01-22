
import React from 'react';
import { TaskLog } from '../types';

interface TimesheetProps {
  logs: TaskLog[];
}

const Timesheet: React.FC<TimesheetProps> = ({ logs }) => {
  const completedCount = logs.filter(l => l.completed).length;
  const progress = Math.round((completedCount / logs.length) * 100);

  return (
    <div className="h-full bg-slate-100 p-12 flex justify-center overflow-y-auto">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
          <div className="bg-slate-900 p-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">변호사 작업 관리 시스템</h2>
                <p className="text-slate-400 text-xs mt-1 font-mono uppercase">Case ID: 2026-LIT-77281 (Corporate Disput)</p>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Billing Duration</div>
                <div className="text-3xl font-mono font-bold text-blue-400">03:22:15</div>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-400">오늘의 진척도</span>
                <span className="text-blue-400 font-bold">{progress}% Complete</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className="h-full bg-blue-500 transition-all duration-1000 shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-b border-slate-100">
            <div className="flex text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">
              <span className="w-12">Status</span>
              <span className="w-20">Time</span>
              <span className="flex-1">Task Description</span>
              <span>Category</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-white">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center p-5 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors group">
                <div className="w-12 flex justify-center">
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-500 ${log.completed ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-200' : 'border-slate-200 bg-white'}`}>
                    {log.completed && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="w-20 text-xs font-mono text-slate-400">{log.time}</div>
                <div className={`flex-1 text-sm ${log.completed ? 'text-slate-400 line-through' : 'text-slate-700 font-bold'}`}>
                  {log.content}
                </div>
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-tighter border border-slate-200 px-2 py-1 rounded group-hover:border-slate-300">
                  {log.id <= 2 ? 'Review' : 'Drafting'}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-6 border-t border-slate-200 flex justify-between items-center">
            <div className="flex space-x-4">
              <button className="bg-white border border-slate-300 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold hover:shadow-sm">수정 로그</button>
              <button className="bg-white border border-slate-300 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold hover:shadow-sm">청구서 미리보기</button>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center italic">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Real-time synchronization active...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timesheet;
