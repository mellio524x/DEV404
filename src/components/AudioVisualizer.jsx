import React from 'react';

const AudioVisualizer = ({ isPlaying }) => {
  if (!isPlaying) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 opacity-80">
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex items-end space-x-1 h-32">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`
                bg-gradient-to-t from-cyan-500 to-blue-500 
                w-3 rounded-t-sm
                ${isPlaying ? 'animate-bounce' : ''}
              `}
              style={{
                height: `${Math.random() * 60 + 20}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${Math.random() * 0.5 + 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudioVisualizer;