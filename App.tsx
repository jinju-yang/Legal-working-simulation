
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppTab, TypingInstruction, TaskLog } from './types';
import { SIMULATION_SCRIPT, TASK_LOGS, INITIAL_EDITOR_TEXT } from './constants';
import Editor from './components/Editor';
import Research from './components/Research';
import Timesheet from './components/Timesheet';
import Cursor from './components/Cursor';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AppTab>(AppTab.EDITOR);
  const [editorText, setEditorText] = useState(INITIAL_EDITOR_TEXT);
  const [selection, setSelection] = useState<[number, number] | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [researchSearch, setResearchSearch] = useState('');
  const [logs, setLogs] = useState<TaskLog[]>(TASK_LOGS);
  const [cursorPos, setCursorPos] = useState({ x: 500, y: 500 });
  const [isClicking, setIsClicking] = useState(false);
  const [toasts, setToasts] = useState<string[]>([]);
  const [version, setVersion] = useState('v0.8');
  
  const scriptIndexRef = useRef(0);
  const isRunningRef = useRef(true);

  const addToast = useCallback((msg: string) => {
    setToasts(prev => [...prev, msg]);
    setTimeout(() => {
      setToasts(prev => prev.slice(1));
    }, 4000);
  }, []);

  useEffect(() => {
    const runStep = async () => {
      if (!isRunningRef.current) return;

      const instruction = SIMULATION_SCRIPT[scriptIndexRef.current];
      
      if (!instruction) {
        // Loop restart: Clear and re-fill for subtle change
        scriptIndexRef.current = 0;
        setEditorText(INITIAL_EDITOR_TEXT);
        setResearchSearch('');
        setVersion('v0.8');
        setSelection(null);
        setScrollOffset(0);
        setLogs(prev => prev.map(l => ({ ...l, completed: l.id <= 2 })));
        setTimeout(runStep, 5000); // Wait 5s before loop restart
        return;
      }

      switch (instruction.type) {
        case 'type':
          const chars = instruction.text!.split('');
          for (const char of chars) {
            if (!isRunningRef.current) break;
            if (currentTab === AppTab.EDITOR) {
              setEditorText(prev => prev + char);
            } else if (currentTab === AppTab.RESEARCH) {
              setResearchSearch(prev => prev + char);
            }
            // Human-like speed with variance
            const delay = 40 + Math.random() * 80;
            await new Promise(r => setTimeout(r, delay));
            
            // Random pause mid-sentence
            if (Math.random() > 0.96) {
              await new Promise(r => setTimeout(r, 600 + Math.random() * 1000));
            }
          }
          break;

        case 'delete':
          for (let i = 0; i < instruction.count!; i++) {
            if (!isRunningRef.current) break;
            setEditorText(prev => prev.slice(0, -1));
            await new Promise(r => setTimeout(r, 50));
          }
          setSelection(null);
          break;

        case 'pause':
          await new Promise(r => setTimeout(r, instruction.duration!));
          break;

        case 'move':
          setCursorPos({ x: instruction.x!, y: instruction.y! });
          // Time taken for physical mouse travel
          await new Promise(r => setTimeout(r, 800));
          break;

        case 'click':
          setIsClicking(true);
          await new Promise(r => setTimeout(r, 150));
          setIsClicking(false);
          // Auto-check log if on timesheet
          if (currentTab === AppTab.TIMESHEET) {
            setLogs(prev => {
              const next = [...prev];
              const target = next.find(l => !l.completed);
              if (target) target.completed = true;
              return next;
            });
          }
          break;

        case 'scroll':
          setScrollOffset(instruction.y!);
          await new Promise(r => setTimeout(r, 1000));
          break;

        case 'select':
          setSelection(instruction.selectionRange!);
          await new Promise(r => setTimeout(r, 500));
          break;

        case 'switch_tab':
          setCurrentTab(instruction.tab!);
          await new Promise(r => setTimeout(r, 1000));
          break;

        case 'toast':
          addToast(instruction.message!);
          break;

        case 'version_up':
          setVersion(v => {
            const num = parseFloat(v.substring(1));
            return `v${(num + 0.1).toFixed(1)}`;
          });
          addToast(`버전 업데이트됨`);
          break;
          
        case 'comment':
          // Visually simulated by adding toast and potentially updating UI list (via components internal state or global)
          addToast("새 주석이 등록됨");
          break;
      }

      if (isRunningRef.current) {
        scriptIndexRef.current++;
        runStep();
      }
    };

    runStep();

    return () => {
      isRunningRef.current = false;
    };
  }, [currentTab, addToast]);

  return (
    <div className="flex flex-col h-screen select-none bg-slate-50 overflow-hidden">
      {/* OS Top Bar / System Tray Mockup */}
      <div className="h-7 bg-black text-white flex items-center px-4 justify-between text-[11px] font-medium opacity-90">
        <div className="flex items-center space-x-4">
          <span className="font-bold">LegalWork OS</span>
          <span className="text-slate-500">File</span>
          <span className="text-slate-500">Edit</span>
          <span className="text-slate-500">View</span>
          <span className="text-slate-500">Tools</span>
        </div>
        <div className="flex items-center space-x-3">
          <span>{new Date().toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit' })}</span>
          <div className="w-3 h-3 bg-green-500 rounded-full border border-black"></div>
        </div>
      </div>

      {/* App Header */}
      <header className="h-16 bg-slate-900 text-white flex items-center px-6 shadow-2xl z-20">
        <div className="flex items-center space-x-3 mr-12 group cursor-pointer">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center font-black italic shadow-lg shadow-blue-900/40">L</div>
          <div>
            <span className="font-bold tracking-tight text-lg block leading-none">LEX ENGINE</span>
            <span className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">Enterprise v4.0</span>
          </div>
        </div>

        <nav className="flex space-x-2 h-full pt-3">
          <TabItem
            active={currentTab === AppTab.EDITOR}
            label="문서 편집기"
            icon="📄"
          />
          <TabItem
            active={currentTab === AppTab.RESEARCH}
            label="판례 리서치"
            icon="⚖️"
          />
          <TabItem
            active={currentTab === AppTab.TIMESHEET}
            label="타임시트"
            icon="⏱️"
          />
        </nav>

        <div className="ml-auto flex items-center space-x-8">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-slate-400 uppercase leading-none font-bold">Cloud Sync</p>
            <div className="flex items-center justify-end space-x-1.5 mt-1">
              <span className="text-xs font-semibold text-green-400">{version} Saved</span>
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-center space-x-3 border-l border-slate-700 pl-8">
            <div className="text-right">
              <p className="text-xs font-bold">KIM 변호사</p>
              <p className="text-[9px] text-slate-500">Corporate Team</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center border border-slate-600 shadow-inner">
              <span className="text-xs font-bold text-slate-300">KJ</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 relative overflow-hidden flex">
        <div className="flex-1 overflow-hidden relative">
          {currentTab === AppTab.EDITOR && <Editor text={editorText} selection={selection} scrollOffset={scrollOffset} />}
          {currentTab === AppTab.RESEARCH && <Research searchText={researchSearch} />}
          {currentTab === AppTab.TIMESHEET && <Timesheet logs={logs} />}
        </div>

        {/* Action Toasts */}
        <div className="absolute bottom-10 right-10 flex flex-col items-end space-y-3 pointer-events-none z-30">
          {toasts.map((msg, idx) => (
            <div 
              key={`${msg}-${idx}`} 
              className="bg-slate-800/95 backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.3)] border border-slate-700 text-sm flex items-center space-x-3 animate-in slide-in-from-right duration-500"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
              <span className="font-medium">{msg}</span>
            </div>
          ))}
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="h-8 bg-slate-100 border-t border-slate-200 flex items-center px-6 text-[11px] text-slate-500 font-medium z-20">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Connected to Central Database</span>
          </div>
          <span className="text-slate-300">|</span>
          <span>Unicode (UTF-8)</span>
          <span className="text-slate-300">|</span>
          <span className="text-blue-600 font-bold uppercase tracking-tighter">Read/Write Access</span>
        </div>
        <div className="ml-auto font-bold text-slate-400 tracking-widest">
          S.I.D: 2026-KR-LEX-77281-A
        </div>
      </footer>

      <Cursor x={cursorPos.x} y={cursorPos.y} clicking={isClicking} />
    </div>
  );
};

const TabItem = ({ active, label, icon }: any) => {
  return (
    <div
      className={`px-8 flex items-center space-x-2 h-full rounded-t-xl transition-all text-sm font-semibold cursor-default ${
        active
          ? 'bg-slate-50 text-slate-900 border-x border-t border-slate-200 shadow-[0_-5px_15px_rgba(0,0,0,0.08)] scale-100'
          : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      <span className="text-lg grayscale-0">{icon}</span>
      <span>{label}</span>
    </div>
  );
};

export default App;
