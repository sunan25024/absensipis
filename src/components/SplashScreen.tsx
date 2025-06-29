import React, { useEffect, useState } from 'react';

const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show logo first
    setTimeout(() => setShowLogo(true), 300);
    // Show text after logo
    setTimeout(() => setShowText(true), 800);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1.5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/60 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="text-center relative z-10">
        {/* Logo Container */}
        <div className={`mb-12 transition-all duration-1000 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="relative">
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 w-40 h-40 mx-auto">
              <div className="w-full h-full border-4 border-transparent border-t-blue-400 border-r-blue-400 rounded-full animate-spin"></div>
            </div>
            
            {/* Middle Ring */}
            <div className="absolute inset-3 w-34 h-34 mx-auto">
              <div className="w-full h-full border-3 border-transparent border-b-yellow-400 border-l-orange-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
            </div>
            
            {/* Logo */}
            <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
              <div className="relative group">
                <img 
                  src="/logo.png" 
                  alt="PARA Logo" 
                  className="w-24 h-24 drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                />
                {/* Pulsing Glow */}
                <div className="absolute inset-0 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-ping"></div>
                <div className="absolute inset-2 w-20 h-20 bg-yellow-400/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Company Name and Tagline */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-6xl font-bold text-white mb-4 tracking-wider">
            <span className="inline-block animate-bounce bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent" style={{ animationDelay: '0s' }}>P</span>
            <span className="inline-block animate-bounce bg-gradient-to-r from-blue-300 to-yellow-400 bg-clip-text text-transparent" style={{ animationDelay: '0.1s' }}>A</span>
            <span className="inline-block animate-bounce bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent" style={{ animationDelay: '0.2s' }}>R</span>
            <span className="inline-block animate-bounce bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent" style={{ animationDelay: '0.3s' }}>A</span>
          </h1>
          <p className="text-blue-200 text-xl font-light tracking-wide">Smart Attendance Management System</p>
          <p className="text-blue-300/80 text-sm mt-2">Powered by Advanced AI Technology</p>
        </div>

        {/* Enhanced Loading Section */}
        <div className={`w-80 mx-auto transition-all duration-1000 delay-500 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Progress Bar Container */}
          <div className="relative mb-6">
            <div className="w-full h-4 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/50">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                {/* Animated Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-pulse"></div>
                {/* Moving Highlight */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
              </div>
            </div>
            
            {/* Progress Percentage */}
            <div className="flex justify-between items-center mt-3">
              <span className="text-blue-200 text-sm font-medium">Loading System</span>
              <span className="text-blue-200 text-sm font-mono">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Loading Status */}
          <div className="mb-8">
            <p className="text-blue-100 text-sm font-medium mb-3">
              {progress < 25 ? 'Initializing core systems...' :
               progress < 50 ? 'Loading security protocols...' :
               progress < 75 ? 'Preparing user interface...' :
               progress < 95 ? 'Finalizing setup...' :
               'Ready to launch!'}
            </p>
          </div>

          {/* Animated Loading Dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"
                style={{ 
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-blue-300/60 text-xs">
          © 2024 PARA Technology • All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;