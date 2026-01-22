
import React, { useRef, useEffect } from 'react';

interface EditorProps {
  text: string;
  selection: [number, number] | null;
  scrollOffset: number;
}

const Editor: React.FC<EditorProps> = ({ text, selection, scrollOffset }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollOffset,
        behavior: 'smooth'
      });
    }
  }, [scrollOffset]);

  const renderContent = () => {
    if (!selection) return text;
    
    const start = Math.min(selection[0], selection[1]);
    const end = Math.max(selection[0], selection[1]);
    
    return (
      <>
        {text.substring(0, start)}
        <span className="bg-blue-200 text-blue-900">{text.substring(start, end)}</span>
        {text.substring(end)}
      </>
    );
  };

  return (
    <div className="flex h-full bg-slate-100 p-6 overflow-hidden">
      <div 
        ref={scrollRef}
        className="flex-1 bg-white shadow-xl rounded-sm p-16 overflow-y-auto serif-font min-h-[1056px] max-w-[800px] mx-auto relative border border-slate-200 transition-all duration-1000"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold border-b-2 border-slate-900 inline-block pb-1 tracking-widest">의 견 서</h1>
          <div className="mt-4 text-sm text-slate-500 flex justify-between px-4">
            <span>사건번호: 2026-가단-77281</span>
            <span>작성자: 김 변호사</span>
          </div>
        </div>
        
        <div className="space-y-6 text-[17px] leading-[1.8] text-slate-800 whitespace-pre-wrap">
          {renderContent()}
          <span className="inline-block w-[2px] h-5 bg-blue-600 animate-pulse ml-1 align-middle" />
        </div>

        <div className="mt-20 h-40 border-t border-slate-100 pt-8 text-slate-400 text-sm">
          <p>본 서면의 내용은 더미 데이터이며 실제와 무관합니다.</p>
        </div>

        <div className="absolute bottom-10 left-0 right-0 text-center text-slate-400 text-sm">
          - 1 -
        </div>
      </div>

      {/* Right Comments Panel */}
      <div className="w-80 ml-6 flex flex-col space-y-4">
        <div className="bg-white p-5 shadow-sm border border-slate-200 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">검토 주석 (3)</h3>
            <button className="text-[10px] bg-slate-100 px-2 py-1 rounded">최신순</button>
          </div>
          <div className="space-y-4">
            <CommentItem author="김 변호사" text="지체상금 요율이 일반적인 수준보다 높게 설정된 경위 파악 필요" time="25분 전" color="amber" />
            <CommentItem author="이 파트너" text="관련 판례 v0.7 참고해서 문언 정리할 것" time="1시간 전" color="slate" />
            <CommentItem author="시스템" text="유사 판례 3건 검색됨 - 리서치 탭 확인" time="지금" color="blue" isNew />
          </div>
        </div>

        <div className="bg-slate-900 p-5 shadow-xl rounded-xl text-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI 법률 분석기</h3>
            <span className="text-[10px] bg-blue-600 px-1.5 py-0.5 rounded">BETA</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-400">승소 가능성</span>
                <span className="text-green-400 font-bold">78%</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full">
                <div className="w-[78%] h-full bg-green-500 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              * 유사 사실관계 판례 12건 분석 결과, '이행 지체' 입증 시 의뢰인 우세.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentItem = ({ author, text, time, color, isNew }: any) => {
  const colors: any = {
    amber: 'border-amber-400 bg-amber-50',
    slate: 'border-slate-400 bg-slate-50',
    blue: 'border-blue-400 bg-blue-50'
  };
  return (
    <div className={`p-3 border-l-4 text-xs rounded-r-md transition-all ${colors[color]} ${isNew ? 'ring-2 ring-blue-200' : ''}`}>
      <div className="flex justify-between mb-1">
        <span className="font-bold text-slate-900">{author}</span>
        <span className="text-[9px] text-slate-400">{time}</span>
      </div>
      <p className="text-slate-700 leading-snug">{text}</p>
    </div>
  );
};

export default Editor;
