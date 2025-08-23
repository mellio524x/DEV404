import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);

  const steps = [
    "Initializing DEV 404...",
    "Loading sonic architecture protocols...",
    "Loading Album_01",
    "Loading Album_02"
  ];

  useEffect(() => {
    let timer;
    
    if (currentStep === 0) {
      timer = setTimeout(() => setCurrentStep(1), 1000);
    } else if (currentStep === 1) {
      timer = setTimeout(() => setCurrentStep(2), 800);
    } else if (currentStep === 2) {
      // Start Album_01 progress
      const progressTimer1 = setInterval(() => {
        setProgress1(prev => {
          if (prev >= 90) {
            clearInterval(progressTimer1);
            setCurrentStep(3);
            return 90;
          }
          return prev + 20;
        });
      }, 100);
      return () => clearInterval(progressTimer1);
    } else if (currentStep === 3) {
      // Start Album_02 progress  
      const progressTimer2 = setInterval(() => {
        setProgress2(prev => {
          if (prev >= 100) {
            clearInterval(progressTimer2);
            setCurrentStep(4);
            return 100;
          }
          return prev + 20;
        });
      }, 100);
      return () => clearInterval(progressTimer2);
    } else if (currentStep === 4) {
      timer = setTimeout(() => setCurrentStep(5), 500);
    } else if (currentStep === 5) {
      timer = setTimeout(() => onComplete(), 1500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentStep, onComplete]);

  const getProgressBar = (progress) => {
    const filled = Math.floor(progress / 10);
    const empty = 10 - filled;
    return '[' + '█'.repeat(filled) + ' '.repeat(empty) + ']';
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-cyan-400">
      {/* Terminal Window */}
      <div className="bg-gray-900 rounded-lg shadow-2xl border border-gray-700 w-96 p-6">
        {/* Terminal Header */}
        <div className="flex items-center mb-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="ml-4 text-cyan-400 text-sm">dev404@terminal:~</div>
        </div>

        {/* Terminal Content */}
        <div className="space-y-2 text-sm">
          <div className="text-cyan-400">dev404@terminal:~</div>
          <div className="text-cyan-400 mt-4"></div>
          
          {currentStep >= 1 && (
            <div className="text-cyan-400">
              &gt; {steps[0]}
            </div>
          )}
          
          {currentStep >= 2 && (
            <div className="text-cyan-400">
              &gt; {steps[1]}
            </div>
          )}
          
          {currentStep >= 3 && (
            <div className="text-cyan-400 flex">
              &gt; {steps[2]} {getProgressBar(progress1)} {progress1}%
            </div>
          )}
          
          {currentStep >= 4 && (
            <div className="text-cyan-400 flex">
              &gt; {steps[3]} {getProgressBar(progress2)} {progress2}%
            </div>
          )}

          {currentStep >= 5 && (
            <>
              <div className="text-cyan-400">
                &gt; Syntax validated. No bugs found in harmony.
              </div>
              <div className="text-cyan-400">
                &gt; Welcome to the Full-Stack Sonic Experience...
              </div>
            </>
          )}
          
          {/* Loading dots */}
          <div className="flex justify-center mt-6">
            <div className="flex space-x-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    currentStep > i ? 'bg-cyan-400' : 'bg-gray-600'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;