import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Mic, 
  MapPin, 
  Wifi, 
  Battery, 
  Smartphone, 
  CheckCircle, 
  Clock, 
  Zap,
  Target,
  Heart,
  Brain,
  Scan,
  Volume2,
  VolumeX,
  RotateCcw,
  Settings,
  Award,
  TrendingUp
} from 'lucide-react';
import { useCamera } from '../hooks/useCamera';
import { useFaceRecognition } from '../hooks/useFaceRecognition';

const QuickCheckIn: React.FC = () => {
  const { videoRef, isInitialized, error, isLoading, initializeCamera, stopCamera, captureImage } = useCamera();
  const { isProcessing, confidence, detectedFace, facePosition, detectFace, recognizeFace } = useFaceRecognition();
  
  const [checkInMethod, setCheckInMethod] = useState<'face' | 'voice' | 'qr'>('face');
  const [isListening, setIsListening] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [isOnline, setIsOnline] = useState(true);
  const [checkInStatus, setCheckInStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [lastCheckIn, setLastCheckIn] = useState<Date | null>(null);
  const [workingHours, setWorkingHours] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // AI Insights
  const [aiInsights, setAiInsights] = useState({
    optimalCheckInTime: '09:00',
    productivityScore: 92,
    energyLevel: 85,
    recommendedBreakTime: '14:30'
  });

  useEffect(() => {
    // Get location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.error('Location error:', error)
      );
    }

    // Simulate battery level
    const updateBattery = () => {
      setBatteryLevel(Math.max(20, Math.min(100, 85 + Math.random() * 10 - 5)));
    };
    const batteryInterval = setInterval(updateBattery, 30000);

    // Check working hours
    if (lastCheckIn) {
      const hoursInterval = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - lastCheckIn.getTime();
        setWorkingHours(diff / (1000 * 60 * 60));
      }, 60000);
      return () => clearInterval(hoursInterval);
    }

    return () => clearInterval(batteryInterval);
  }, [lastCheckIn]);

  const handleFaceCheckIn = async () => {
    if (!detectedFace) {
      alert('Silakan posisikan wajah Anda di area kamera');
      return;
    }

    setCheckInStatus('processing');
    const imageData = captureImage();
    if (!imageData) return;

    const result = await recognizeFace(imageData);
    
    if (result.recognized && result.confidence > 0.75) {
      setCheckInStatus('success');
      setLastCheckIn(new Date());
      if (soundEnabled) {
        // Play success sound
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
      }
    } else {
      setCheckInStatus('error');
    }

    setTimeout(() => setCheckInStatus('idle'), 3000);
  };

  const handleVoiceCheckIn = async () => {
    setIsListening(true);
    setCheckInStatus('processing');
    
    // Simulate voice recognition
    setTimeout(() => {
      setVoiceCommand('Absen masuk');
      setCheckInStatus('success');
      setLastCheckIn(new Date());
      setIsListening(false);
      
      setTimeout(() => {
        setCheckInStatus('idle');
        setVoiceCommand('');
      }, 3000);
    }, 2000);
  };

  const handleQRCheckIn = () => {
    setCheckInStatus('processing');
    
    // Simulate QR scan
    setTimeout(() => {
      setCheckInStatus('success');
      setLastCheckIn(new Date());
      
      setTimeout(() => setCheckInStatus('idle'), 3000);
    }, 1500);
  };

  const getStatusColor = () => {
    switch (checkInStatus) {
      case 'processing': return 'from-yellow-500 to-orange-500';
      case 'success': return 'from-green-500 to-emerald-600';
      case 'error': return 'from-red-500 to-pink-600';
      default: return 'from-blue-500 to-purple-600';
    }
  };

  const getStatusMessage = () => {
    switch (checkInStatus) {
      case 'processing': return 'Memproses...';
      case 'success': return 'Absen Berhasil!';
      case 'error': return 'Absen Gagal';
      default: return 'Siap untuk Absen';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
          Absen Cepat ⚡
        </h1>
        <p className="text-gray-600">Pilih metode absen yang Anda sukai</p>
      </div>

      {/* Status Card */}
      <div className={`bg-gradient-to-r ${getStatusColor()} rounded-3xl shadow-2xl p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold mb-1">{getStatusMessage()}</div>
              <div className="text-sm opacity-90">
                {lastCheckIn ? `Absen terakhir: ${lastCheckIn.toLocaleTimeString()}` : 'Belum absen hari ini'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{workingHours.toFixed(1)}j</div>
              <div className="text-sm opacity-90">Jam Kerja</div>
            </div>
          </div>
          
          {/* System Status */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Wifi className={`w-4 h-4 ${isOnline ? 'text-green-300' : 'text-red-300'}`} />
              <span>{isOnline ? 'Online' : 'Offline'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Battery className="w-4 h-4 text-green-300" />
              <span>{batteryLevel}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-blue-300" />
              <span>Kantor Pusat</span>
            </div>
            <div className="flex items-center space-x-1">
              <Smartphone className="w-4 h-4 text-purple-300" />
              <span>Resmi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Check-in Method Selector */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Pilih Metode Absen</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: 'face', label: 'Pengenalan Wajah', icon: Camera, color: 'blue' },
            { id: 'voice', label: 'Perintah Suara', icon: Mic, color: 'green' },
            { id: 'qr', label: 'Kode QR', icon: Scan, color: 'purple' }
          ].map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setCheckInMethod(method.id as any)}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                  checkInMethod === method.id
                    ? `border-${method.color}-500 bg-${method.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-12 h-12 bg-${method.color}-500 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-medium text-gray-900">{method.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Check-in Interface */}
      {checkInMethod === 'face' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Absen dengan Pengenalan Wajah</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden mb-6" style={{ aspectRatio: '4/3' }}>
            {!isInitialized && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 font-medium">Kamera belum diinisialisasi</p>
                  <button
                    onClick={initializeCamera}
                    className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Mulai Kamera
                  </button>
                </div>
              </div>
            )}
            
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            
            {/* Face Detection Overlay */}
            {isInitialized && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-80 border-4 border-dashed border-blue-400 rounded-2xl opacity-60"></div>
                
                {detectedFace && facePosition && (
                  <div 
                    className="absolute border-4 border-green-400 rounded-lg animate-pulse"
                    style={{
                      left: facePosition.x,
                      top: facePosition.y,
                      width: facePosition.width,
                      height: facePosition.height
                    }}
                  >
                    <div className="absolute -top-8 left-0 bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-bold">
                      Wajah Terdeteksi ✓
                    </div>
                  </div>
                )}
                
                <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded-xl text-sm backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${detectedFace ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
                    <span>{detectedFace ? 'Siap untuk absen' : 'Posisikan wajah Anda'}</span>
                  </div>
                </div>
              </div>
            )}
            
            {isProcessing && (
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                <div className="text-center bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-md">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
                  <p className="text-white font-medium">Memproses pengenalan wajah...</p>
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={handleFaceCheckIn}
            disabled={!detectedFace || isProcessing || checkInStatus === 'processing'}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg"
          >
            {isProcessing ? 'Memproses...' : 'Absen dengan Pengenalan Wajah'}
          </button>
        </div>
      )}

      {checkInMethod === 'voice' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Absen dengan Perintah Suara</h3>
          
          <div className="text-center mb-6">
            <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
              isListening 
                ? 'bg-gradient-to-r from-red-500 to-pink-600 animate-pulse scale-110' 
                : 'bg-gradient-to-r from-green-500 to-emerald-600'
            }`}>
              <Mic className="w-16 h-16 text-white" />
            </div>
            
            {isListening && (
              <div className="mb-4">
                <div className="text-lg font-semibold text-red-600 mb-2">Mendengarkan...</div>
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-8 bg-red-500 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            )}
            
            {voiceCommand && (
              <div className="mb-4 p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="text-sm text-green-600 mb-1">Perintah Suara Terdeteksi:</div>
                <div className="text-lg font-semibold text-green-800">"{voiceCommand}"</div>
              </div>
            )}
          </div>
          
          <button
            onClick={handleVoiceCheckIn}
            disabled={isListening || checkInStatus === 'processing'}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg"
          >
            {isListening ? 'Mendengarkan...' : 'Mulai Absen Suara'}
          </button>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Katakan: "Absen masuk" atau "PARA, absen masuk"</p>
          </div>
        </div>
      )}

      {checkInMethod === 'qr' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Absen dengan Kode QR</h3>
          
          <div className="text-center mb-6">
            <div className="w-64 h-64 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-6 border-4 border-dashed border-gray-300">
              <div className="text-center">
                <Scan className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Pindai Kode QR</p>
                <p className="text-sm text-gray-500 mt-2">Arahkan kamera ke kode QR</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleQRCheckIn}
            disabled={checkInStatus === 'processing'}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg"
          >
            {checkInStatus === 'processing' ? 'Memindai...' : 'Pindai Kode QR'}
          </button>
        </div>
      )}

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-6 h-6" />
          <h3 className="text-lg font-bold">Wawasan AI</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5" />
              <span className="font-semibold">Prediksi Produktivitas</span>
            </div>
            <div className="text-2xl font-bold mb-1">{aiInsights.productivityScore}%</div>
            <p className="text-sm opacity-90">Performa puncak diperkirakan jam 15:00</p>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Heart className="w-5 h-5" />
              <span className="font-semibold">Tingkat Energi</span>
            </div>
            <div className="text-2xl font-bold mb-1">{aiInsights.energyLevel}%</div>
            <p className="text-sm opacity-90">Energi bagus untuk hari ini!</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Streak', value: '15 hari', icon: Award, color: 'yellow' },
          { label: 'Minggu Ini', value: '5/5 hari', icon: CheckCircle, color: 'green' },
          { label: 'Rata-rata', value: '8.2j', icon: Clock, color: 'blue' },
          { label: 'Performa', value: '+12%', icon: TrendingUp, color: 'purple' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickCheckIn;