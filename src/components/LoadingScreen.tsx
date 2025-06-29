import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading..." }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Initializing system...",
    "Loading user data...",
    "Connecting to servers...",
    "Preparing dashboard...",
    "Almost ready..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 3 + 1;
        
        // Update step based on progress
        const stepIndex = Math.floor((newProgress / 100) * steps.length);
        setCurrentStep(Math.min(stepIndex, steps.length - 1));
        
        return Math.min(newProgress, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-24 h-24 bg-yellow-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div 
                key={i} 
                className="border border-blue-400/30 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo Container */}
        <div className="relative mb-8">
          {/* Outer Rotating Ring */}
          <div className="absolute inset-0 w-32 h-32 mx-auto">
            <div className="w-full h-full border-4 border-transparent border-t-blue-400 border-r-blue-400 rounded-full animate-spin"></div>
          </div>
          
          {/* Middle Ring */}
          <div className="absolute inset-2 w-28 h-28 mx-auto">
            <div className="w-full h-full border-3 border-transparent border-b-yellow-400 border-l-yellow-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
          </div>
          
          {/* Inner Ring */}
          <div className="absolute inset-4 w-24 h-24 mx-auto">
            <div className="w-full h-full border-2 border-transparent border-t-orange-400 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
          </div>
          
          {/* Logo */}
          <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
            <div className="relative">
              <img 
                src="/public/Logo_PIS-removebg-preview.png" 
                alt="PARA Logo" 
                className="w-16 h-16 drop-shadow-2xl animate-pulse"
              />
              {/* Glow Effect */}
              <div className="absolute inset-0 w-16 h-16 bg-blue-400/30 rounded-full blur-lg animate-ping"></div>
            </div>
          </div>
        </div>
        
        {/* Brand Name */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-wider">
            <span className="inline-block animate-bounce" style={{ animationDelay: '0s' }}>P</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>A</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>R</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.3s' }}>A</span>
          </h1>
          <p className="text-blue-200 text-lg font-medium">Smart Attendance System</p>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          {/* Progress Bar */}
          <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full"></div>
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          
          {/* Progress Text */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-blue-200">{Math.round(progress)}%</span>
            <span className="text-blue-200">Loading...</span>
          </div>
        </div>

        {/* Loading Steps */}
        <div className="mb-8">
          <p className="text-white font-medium mb-4 min-h-[24px] transition-all duration-500">
            {steps[currentStep]}
          </p>
          
          {/* Step Indicators */}
          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-blue-400 scale-125' 
                    : 'bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"
              style={{ 
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>

        {/* Loading Message */}
        <div className="mt-8">
          <p className="text-blue-200/80 text-sm">
            Preparing your workspace...
          </p>
        </div>
      </div>

      {/* Bottom Branding */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <p className="text-blue-300/60 text-xs">
          Powered by PARA Technology
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;