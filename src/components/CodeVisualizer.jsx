import React from 'react';

const CodeVisualizer = ({ isPlaying }) => {
  if (!isPlaying) return null;

  const codeSnippets = [
    'function playMusic() {',
    'const beat = Math.random();',
    'if (beat > 0.7) {',
    'return "harmony";',
    '}',
    'const synth = new Audio();',
    'synth.frequency = 440;',
    'synth.play();',
    'let volume = 1.0;',
    'const reverb = true;',
    'console.log("beat");',
    'export default Music;',
    '<AudioContext />',
    'npm install sound',
    'git commit -m "beat"',
    'const DEV404 = "🎵";'
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top floating code */}
      <div className="absolute -top-8 left-4 code-float">
        <div className="text-cyan-400 text-xs font-mono opacity-70 code-pulse">
          {codeSnippets[0]}
        </div>
      </div>
      
      <div className="absolute -top-6 right-8 code-float" style={{ animationDelay: '0.5s' }}>
        <div className="text-blue-400 text-xs font-mono opacity-60 code-pulse" style={{ animationDelay: '0.5s' }}>
          {codeSnippets[1]}
        </div>
      </div>

      {/* Left side code */}
      <div className="absolute top-8 -left-12 code-float" style={{ animationDelay: '1s' }}>
        <div className="text-pink-400 text-xs font-mono opacity-70 code-pulse" style={{ animationDelay: '1s' }}>
          {codeSnippets[2]}
        </div>
      </div>

      <div className="absolute top-20 -left-16 code-float" style={{ animationDelay: '1.5s' }}>
        <div className="text-green-400 text-xs font-mono opacity-60 code-pulse" style={{ animationDelay: '1.5s' }}>
          {codeSnippets[3]}
        </div>
      </div>

      {/* Right side code */}
      <div className="absolute top-12 -right-8 code-float" style={{ animationDelay: '2s' }}>
        <div className="text-yellow-400 text-xs font-mono opacity-70 code-pulse" style={{ animationDelay: '2s' }}>
          {codeSnippets[4]}
        </div>
      </div>

      <div className="absolute top-32 -right-12 code-float" style={{ animationDelay: '2.5s' }}>
        <div className="text-purple-400 text-xs font-mono opacity-60 code-pulse" style={{ animationDelay: '2.5s' }}>
          {codeSnippets[5]}
        </div>
      </div>

      {/* Bottom floating code */}
      <div className="absolute -bottom-4 left-8 code-float" style={{ animationDelay: '3s' }}>
        <div className="text-orange-400 text-xs font-mono opacity-70 code-pulse" style={{ animationDelay: '3s' }}>
          {codeSnippets[6]}
        </div>
      </div>

      <div className="absolute -bottom-6 right-4 code-float" style={{ animationDelay: '3.5s' }}>
        <div className="text-red-400 text-xs font-mono opacity-60 code-pulse" style={{ animationDelay: '3.5s' }}>
          {codeSnippets[7]}
        </div>
      </div>

      {/* Corner codes */}
      <div className="absolute top-4 left-2 code-float" style={{ animationDelay: '4s' }}>
        <div className="text-indigo-400 text-xs font-mono opacity-50 code-pulse" style={{ animationDelay: '4s' }}>
          {codeSnippets[8]}
        </div>
      </div>

      <div className="absolute bottom-8 right-2 code-float" style={{ animationDelay: '4.5s' }}>
        <div className="text-teal-400 text-xs font-mono opacity-50 code-pulse" style={{ animationDelay: '4.5s' }}>
          {codeSnippets[9]}
        </div>
      </div>

      {/* Additional floating elements */}
      <div className="absolute top-1/2 -left-8 code-float" style={{ animationDelay: '5s' }}>
        <div className="text-lime-400 text-xs font-mono opacity-60 code-pulse" style={{ animationDelay: '5s' }}>
          {codeSnippets[10]}
        </div>
      </div>

      <div className="absolute top-1/3 -right-16 code-float" style={{ animationDelay: '5.5s' }}>
        <div className="text-sky-400 text-xs font-mono opacity-60 code-pulse" style={{ animationDelay: '5.5s' }}>
          {codeSnippets[11]}
        </div>
      </div>

      {/* Special elements */}
      <div className="absolute top-2 right-1/4 code-float" style={{ animationDelay: '6s' }}>
        <div className="text-violet-400 text-xs font-mono opacity-50 code-pulse" style={{ animationDelay: '6s' }}>
          {codeSnippets[12]}
        </div>
      </div>

      <div className="absolute bottom-2 left-1/4 code-float" style={{ animationDelay: '6.5s' }}>
        <div className="text-rose-400 text-xs font-mono opacity-50 code-pulse" style={{ animationDelay: '6.5s' }}>
          {codeSnippets[13]}
        </div>
      </div>

      <div className="absolute top-1/4 left-1/2 code-float" style={{ animationDelay: '7s' }}>
        <div className="text-amber-400 text-xs font-mono opacity-40 code-pulse" style={{ animationDelay: '7s' }}>
          {codeSnippets[14]}
        </div>
      </div>

      <div className="absolute bottom-1/4 right-1/3 code-float" style={{ animationDelay: '7.5s' }}>
        <div className="text-emerald-400 text-xs font-mono opacity-40 code-pulse" style={{ animationDelay: '7.5s' }}>
          {codeSnippets[15]}
        </div>
      </div>

      {/* Central pulse effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 border border-cyan-400/20 rounded-full code-ring"></div>
        <div className="absolute w-24 h-24 border border-blue-400/20 rounded-full code-ring" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute w-16 h-16 border border-purple-400/20 rounded-full code-ring" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default CodeVisualizer;