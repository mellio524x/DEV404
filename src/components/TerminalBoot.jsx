import React, { useState, useEffect } from 'react';

const TerminalBoot = ({ onBootComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [output, setOutput] = useState([]);
  const [showCursor, setShowCursor] = useState(true);

  const bootSequence = [
    { text: "dev404@terminal:~$ ", delay: 800 },
    { text: "> Initializing DEV 404...", delay: 1000 },
    { text: "> Loading sonic architecture protocols...", delay: 1200 },
    { text: "> Checking audio drivers... ✓", delay: 800 },
    { text: "> Loading Album_01 [████████████████████] 100%", delay: 1500 },
    { text: "> Loading Album_02 [████████████████████] 100%", delay: 1500 },
    { text: "> Loading Album_03 [████████████████████] 100%", delay: 1500 },
    { text: "> Syntax validated. No bugs found in harmony.", delay: 1000 },
    { text: "> Welcome to the Full-Stack Sonic Experience...", delay: 1200 },
    { text: "> System ready. Launching interface...", delay: 800 }
  ];

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentStep < bootSequence.length) {
      const timer = setTimeout(() => {
        setOutput(prev => [...prev, bootSequence[currentStep].text]);
        setCurrentStep(prev => prev + 1);
      }, bootSequence[currentStep].delay);

      return () => clearTimeout(timer);
    } else if (currentStep === bootSequence.length) {
      setTimeout(() => {
        onBootComplete();
      }, 1500);
    }
  }, [currentStep, onBootComplete]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono text-cyan-400 p-8">
      <div className="w-full max-w-4xl">
        {/* Terminal Window */}
        <div className="bg-gray-900 rounded-t-lg border border-gray-700 shadow-2xl">
          {/* Terminal Header */}
          <div className="bg-gray-800 rounded-t-lg px-4 py-3 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4 text-sm text-gray-300">Terminal - DEV 404 Boot Sequence</div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 min-h-[400px] bg-black rounded-b-lg">
            <div className="text-sm space-y-2">

              {output.map((line, index) => (
                <div key={index} className="typing-effect">
                  {line}
                </div>
              ))}

              {currentStep < bootSequence.length && (
                <div className="flex">
                  <span>{bootSequence[currentStep] && bootSequence[currentStep].text}</span>
                  <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
                </div>
              )}

              {currentStep >= bootSequence.length && (
                <div className="mt-4 text-green-400 animate-pulse">
                  <span>█</span> Loading complete. Starting interface...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalBoot;