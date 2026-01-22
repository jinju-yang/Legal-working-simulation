
import React from 'react';

interface CursorProps {
  x: number;
  y: number;
  clicking: boolean;
}

const Cursor: React.FC<CursorProps> = ({ x, y, clicking }) => {
  return (
    <div
      className={`fixed z-50 pointer-events-none transition-transform duration-75 ${clicking ? 'scale-90' : 'scale-100'}`}
      style={{
        left: x,
        top: y,
        transition: 'left 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), top 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)'
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        className="drop-shadow-lg"
      >
        <path
          d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
          fill="black"
          strokeLinejoin="round"
        />
      </svg>
      {clicking && (
        <div className="absolute top-0 left-0 w-8 h-8 -ml-2 -mt-2 rounded-full border-2 border-slate-400 opacity-50 animate-ping" />
      )}
    </div>
  );
};

export default Cursor;
