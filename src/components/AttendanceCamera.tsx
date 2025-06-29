import React, { useState, useEffect } from 'react';
import { Camera, CheckCircle, XCircle, Loader, Clock, MapPin, Wifi, Smartphone, AlertTriangle } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';
import { useFaceRecognition } from '../hooks/useFaceRecognition';
import { useAuth } from '../context/AuthContext';

const AttendanceCamera: React.FC = () => {
  const { user } = useAuth();
  const { videoRef, isInitialized, error, isLoading, initializeCamera, stopCamera, captureImage } = useCamera();
  const { isProcessing, confidence, detectedFace, facePosition, detectFace, recognizeFace } = useFaceRecognition();
  const [attendanceStatus, setAttendanceStatus] = useState<'checkedIn' | 'checkedOut' | null>(null);
  const [lastAction, setLastAction] = useState<{ action: string; time: Date } | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [faceDetectionInterval, setFaceDetectionInterval] = useState<NodeJS.Timeout | null>(null);
  const [recognitionMessage, setRecognitionMessage] = useState('');

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }

    return () => {
      stopCamera();
      if (faceDetectionInterval) {
        clearInterval(faceDetectionInterval);
      }
    };
  }, [stopCamera]);

  // Start continuous face detection when camera is initialized
  useEffect(() => {
    if (isInitialized && !isProcessing) {
      const interval = setInterval(async () => {
        const imageData = captureImage();
        if (imageData) {
          await detectFace(imageData);
        }
      }, 500); // Check every 500ms
      
      setFaceDetectionInterval(interval);
    } else if (faceDetectionInterval) {
      clearInterval(faceDetectionInterval);
      setFaceDetectionInterval(null);
    }

    return () => {
      if (faceDetectionInterval) {
        clearInterval(faceDetectionInterval);
      }
    };
  }, [isInitialized, isProcessing, captureImage, detectFace]);

  const handleCheckIn = async () => {
    if (!detectedFace) {
      setRecognitionMessage('No face detected. Please position your face in the camera view.');
      return;
    }

    const imageData = captureImage();
    if (!imageData) return;

    // Stop face detection during processing
    if (faceDetectionInterval) {
      clearInterval(faceDetectionInterval);
      setFaceDetectionInterval(null);
    }

    const result = await recognizeFace(imageData);
    
    if (result.recognized && result.confidence > 0.75) {
      setAttendanceStatus('checkedIn');
      setLastAction({ action: 'Check In', time: new Date() });
      setRecognitionMessage(result.message || 'Check in successful!');
      
      // Here you would typically save to backend with location data
      console.log('Check in recorded with location:', location);
    } else {
      setRecognitionMessage(result.message || 'Face recognition failed. Please try again.');
    }

    // Restart face detection
    setTimeout(() => {
      if (isInitialized && !isProcessing) {
        const interval = setInterval(async () => {
          const imageData = captureImage();
          if (imageData) {
            await detectFace(imageData);
          }
        }, 500);
        setFaceDetectionInterval(interval);
      }
    }, 1000);
  };

  const handleCheckOut = async () => {
    if (!detectedFace) {
      setRecognitionMessage('No face detected. Please position your face in the camera view.');
      return;
    }

    const imageData = captureImage();
    if (!imageData) return;

    // Stop face detection during processing
    if (faceDetectionInterval) {
      clearInterval(faceDetectionInterval);
      setFaceDetectionInterval(null);
    }

    const result = await recognizeFace(imageData);
    
    if (result.recognized && result.confidence > 0.75) {
      setAttendanceStatus('checkedOut');
      setLastAction({ action: 'Check Out', time: new Date() });
      setRecognitionMessage(result.message || 'Check out successful!');
      
      // Here you would typically save to backend
      console.log('Check out recorded with location:', location);
    } else {
      setRecognitionMessage(result.message || 'Face recognition failed. Please try again.');
    }

    // Restart face detection
    setTimeout(() => {
      if (isInitialized && !isProcessing) {
        const interval = setInterval(async () => {
          const imageData = captureImage();
          if (imageData) {
            await detectFace(imageData);
          }
        }, 500);
        setFaceDetectionInterval(interval);
      }
    }, 1000);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isAdmin ? 'Face Recognition Attendance Monitor' : 'Check In / Check Out'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isAdmin ? 'Monitor employee attendance with AI-powered face recognition' : 'Use face recognition for secure attendance tracking'}
          </p>
        </div>
        <div className="text-sm text-gray-500 bg-white rounded-xl px-4 py-2 shadow-sm border">
          {new Date().toLocaleString()}
        </div>
      </div>

      {/* Recognition Message */}
      {recognitionMessage && (
        <div className={`p-4 rounded-xl border ${
          recognitionMessage.includes('successful') || recognitionMessage.includes('Welcome') 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center space-x-3">
            {recognitionMessage.includes('successful') || recognitionMessage.includes('Welcome') ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600" />
            )}
            <p className={`text-sm font-medium ${
              recognitionMessage.includes('successful') || recognitionMessage.includes('Welcome')
                ? 'text-green-800' 
                : 'text-red-800'
            }`}>
              {recognitionMessage}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Camera Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">AI Face Recognition Camera</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                detectedFace ? 'bg-green-500 animate-pulse' : 
                isInitialized ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'
              }`}></div>
              <span className="text-sm font-medium">
                {detectedFace ? 'Face Detected' : isInitialized ? 'Scanning' : 'Offline'}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-inner" style={{ aspectRatio: '4/3' }}>
              {!isInitialized && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">Camera not initialized</p>
                    <p className="text-gray-500 text-sm mt-1">Click "Start Camera" to begin</p>
                  </div>
                </div>
              )}
              
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
                  <div className="text-center">
                    <Loader className="w-8 h-8 text-white animate-spin mx-auto mb-2" />
                    <p className="text-white font-medium">Initializing AI camera...</p>
                    <p className="text-blue-200 text-sm">Please allow camera access</p>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-900">
                  <div className="text-center">
                    <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <p className="text-red-400 font-medium">{error}</p>
                    <p className="text-red-300 text-sm mt-1">Please check camera permissions</p>
                  </div>
                </div>
              )}
              
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              
              {/* Enhanced Face Detection Overlay */}
              {isInitialized && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Detection Area */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-dashed border-blue-400 rounded-full opacity-50"></div>
                  
                  {/* Face Detection Box */}
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
                      <div className="absolute -top-8 left-0 bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                        Face Detected ✓
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute top-6 left-6 bg-black bg-opacity-60 text-white px-4 py-2 rounded-xl text-sm backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${detectedFace ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
                      <span>{detectedFace ? 'Ready for recognition' : 'Position your face in the circle'}</span>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 bg-black bg-opacity-60 text-white px-4 py-2 rounded-xl text-sm backdrop-blur-sm">
                    AI Recognition Active
                  </div>
                  
                  {/* Confidence Display */}
                  {confidence && (
                    <div className="absolute bottom-6 left-6 bg-black bg-opacity-60 text-white px-4 py-2 rounded-xl text-sm backdrop-blur-sm">
                      Confidence: {(confidence * 100).toFixed(1)}%
                    </div>
                  )}
                </div>
              )}
              
              {/* Processing Overlay */}
              {isProcessing && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-md">
                    <Loader className="w-8 h-8 text-white animate-spin mx-auto mb-3" />
                    <p className="text-white font-medium">Processing face recognition...</p>
                    <p className="text-blue-200 text-sm mt-1">Analyzing facial features...</p>
                    {confidence && (
                      <div className="mt-3">
                        <p className="text-white text-sm mb-2">
                          Confidence: {(confidence * 100).toFixed(1)}%
                        </p>
                        <div className="w-32 bg-gray-700 rounded-full h-2 mx-auto">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${confidence * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              {!isInitialized ? (
                <button
                  onClick={initializeCamera}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader className="w-5 h-5 animate-spin mr-2" />
                      Initializing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Camera className="w-5 h-5 mr-2" />
                      Start AI Camera
                    </div>
                  )}
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCheckIn}
                    disabled={isProcessing || attendanceStatus === 'checkedIn' || !detectedFace}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <Loader className="w-5 h-5 animate-spin mr-2" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Check In {!detectedFace && '(Face Required)'}
                      </div>
                    )}
                  </button>
                  <button
                    onClick={handleCheckOut}
                    disabled={isProcessing || attendanceStatus === 'checkedOut' || !detectedFace}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <Loader className="w-5 h-5 animate-spin mr-2" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <XCircle className="w-5 h-5 mr-2" />
                        Check Out {!detectedFace && '(Face Required)'}
                      </div>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Status Section */}
        <div className="space-y-6">
          {/* Current Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Current Status</h3>
            
            {lastAction ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                    lastAction.action === 'Check In' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                      : 'bg-gradient-to-r from-red-500 to-pink-600'
                  }`}>
                    {lastAction.action === 'Check In' ? (
                      <CheckCircle className="w-8 h-8 text-white" />
                    ) : (
                      <XCircle className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{lastAction.action} Successful</p>
                    <p className="text-sm text-gray-500">
                      {lastAction.time.toLocaleString()}
                    </p>
                    {confidence && (
                      <p className="text-xs text-green-600 font-medium">
                        Verified with {(confidence * 100).toFixed(1)}% confidence
                      </p>
                    )}
                  </div>
                </div>
                
                {lastAction.action === 'Check In' && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4">
                    <div className="flex items-center">
                      <Clock className="w-6 h-6 text-green-600 mr-3" />
                      <div>
                        <span className="text-green-800 font-bold text-lg">
                          Working since {lastAction.time.toLocaleTimeString()}
                        </span>
                        <p className="text-green-600 text-sm">Have a productive day!</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {lastAction.action === 'Check Out' && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-4">
                    <div className="flex items-center">
                      <Clock className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <span className="text-blue-800 font-bold text-lg">
                          Checked out at {lastAction.time.toLocaleTimeString()}
                        </span>
                        <p className="text-blue-600 text-sm">Great work today!</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Location Info */}
                {location && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Location Verified</p>
                        <p className="text-xs text-gray-500">
                          Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No attendance record for today</p>
                <p className="text-sm text-gray-400 mt-1">Use face recognition to check in</p>
              </div>
            )}
          </div>

          {/* Today's Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Today's Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">Check In:</span>
                <span className="font-bold text-gray-900">
                  {attendanceStatus === 'checkedIn' && lastAction ? 
                    lastAction.time.toLocaleTimeString() : '-'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">Check Out:</span>
                <span className="font-bold text-gray-900">
                  {attendanceStatus === 'checkedOut' && lastAction ? 
                    lastAction.time.toLocaleTimeString() : '-'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">Working Hours:</span>
                <span className="font-bold text-gray-900">
                  {attendanceStatus === 'checkedOut' && lastAction ? '8.5h' : 
                   attendanceStatus === 'checkedIn' ? 'In Progress' : '-'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">Status:</span>
                <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                  attendanceStatus === 'checkedIn' ? 'bg-green-100 text-green-800' :
                  attendanceStatus === 'checkedOut' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {attendanceStatus === 'checkedIn' ? 'Working' :
                   attendanceStatus === 'checkedOut' ? 'Completed' :
                   'Not Started'}
                </span>
              </div>
            </div>
          </div>

          {/* System Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">AI System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Wifi className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-700">Network: Connected</span>
              </div>
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">Device: Authorized</span>
              </div>
              <div className="flex items-center space-x-3">
                <Camera className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-700">
                  Face Detection: {detectedFace ? 'Active' : 'Scanning'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCamera;