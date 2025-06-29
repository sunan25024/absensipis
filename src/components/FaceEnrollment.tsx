import React, { useState, useEffect } from 'react';
import { Camera, CheckCircle, XCircle, Loader, AlertTriangle, RotateCcw } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';
import { useFaceRecognition } from '../hooks/useFaceRecognition';

interface FaceEnrollmentProps {
  employeeId: string;
  onEnrollmentComplete: (success: boolean) => void;
}

const FaceEnrollment: React.FC<FaceEnrollmentProps> = ({ employeeId, onEnrollmentComplete }) => {
  const { videoRef, isInitialized, error, isLoading, initializeCamera, stopCamera, captureImage } = useCamera();
  const { isProcessing, detectedFace, facePosition, detectFace, enrollFace } = useFaceRecognition();
  const [enrollmentStep, setEnrollmentStep] = useState<'setup' | 'detecting' | 'capturing' | 'processing' | 'success' | 'error'>('setup');
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [enrollmentMessage, setEnrollmentMessage] = useState('');
  const [faceDetectionInterval, setFaceDetectionInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start continuous face detection when camera is initialized
    if (isInitialized && enrollmentStep === 'detecting') {
      const interval = setInterval(async () => {
        const imageData = captureImage();
        if (imageData) {
          await detectFace(imageData);
        }
      }, 500); // Check every 500ms
      
      setFaceDetectionInterval(interval);
    }

    return () => {
      if (faceDetectionInterval) {
        clearInterval(faceDetectionInterval);
      }
    };
  }, [isInitialized, enrollmentStep, captureImage, detectFace]);

  useEffect(() => {
    return () => {
      stopCamera();
      if (faceDetectionInterval) {
        clearInterval(faceDetectionInterval);
      }
    };
  }, [stopCamera, faceDetectionInterval]);

  const handleStartEnrollment = async () => {
    setEnrollmentStep('detecting');
    await initializeCamera();
  };

  const handleCaptureImage = async () => {
    if (!detectedFace) {
      setEnrollmentMessage('Please position your face in the detection area');
      return;
    }

    const imageData = captureImage();
    if (!imageData) return;

    const newImages = [...capturedImages, imageData];
    setCapturedImages(newImages);

    if (newImages.length >= 3) {
      // Stop face detection
      if (faceDetectionInterval) {
        clearInterval(faceDetectionInterval);
        setFaceDetectionInterval(null);
      }
      
      setEnrollmentStep('processing');
      
      // Process enrollment with multiple images
      const result = await enrollFace(newImages[0], employeeId);
      
      if (result.success) {
        setEnrollmentStep('success');
        setEnrollmentMessage(result.message);
        onEnrollmentComplete(true);
      } else {
        setEnrollmentStep('error');
        setEnrollmentMessage(result.message);
        onEnrollmentComplete(false);
      }
    } else {
      setEnrollmentMessage(`Image ${newImages.length}/3 captured. Please turn your head slightly for the next capture.`);
    }
  };

  const handleRetry = () => {
    setCapturedImages([]);
    setEnrollmentStep('setup');
    setEnrollmentMessage('');
    onEnrollmentComplete(false);
    stopCamera();
  };

  const getInstructionText = () => {
    switch (enrollmentStep) {
      case 'setup':
        return 'Click "Start Face Enrollment" to begin setting up face recognition for your account.';
      case 'detecting':
        return detectedFace 
          ? 'Face detected! Click "Capture" to take a photo.' 
          : 'Please position your face in the camera view. Make sure you are well-lit and looking directly at the camera.';
      case 'capturing':
        return `Capturing image ${capturedImages.length + 1}/3. Please hold still.`;
      case 'processing':
        return 'Processing your face data. This may take a moment...';
      case 'success':
        return 'Face enrollment completed successfully! You can now use face recognition for attendance.';
      case 'error':
        return 'Face enrollment failed. Please try again with better lighting and positioning.';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Camera Section */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Face Enrollment Camera</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              enrollmentStep === 'success' ? 'bg-green-500' :
              enrollmentStep === 'error' ? 'bg-red-500' :
              isInitialized ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
            }`}></div>
            <span className="text-sm text-gray-600">
              {enrollmentStep === 'success' ? 'Complete' :
               enrollmentStep === 'error' ? 'Error' :
               isInitialized ? 'Live' : 'Offline'}
            </span>
          </div>
        </div>

        <div className="relative bg-gray-900 rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
          {enrollmentStep === 'setup' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">Ready to start face enrollment</p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-blue-900">
              <div className="text-center">
                <Loader className="w-8 h-8 text-white animate-spin mx-auto mb-2" />
                <p className="text-white">Initializing camera...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-900">
              <div className="text-center">
                <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <p className="text-red-400">{error}</p>
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

          {/* Face Detection Overlay */}
          {isInitialized && enrollmentStep === 'detecting' && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Detection Area */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-80 border-4 border-dashed border-blue-400 rounded-2xl opacity-60"></div>
              
              {/* Face Detection Box */}
              {detectedFace && facePosition && (
                <div 
                  className="absolute border-4 border-green-400 rounded-lg"
                  style={{
                    left: facePosition.x,
                    top: facePosition.y,
                    width: facePosition.width,
                    height: facePosition.height
                  }}
                >
                  <div className="absolute -top-8 left-0 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Face Detected
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded-xl text-sm backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${detectedFace ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
                  <span>{detectedFace ? 'Face detected - Ready to capture' : 'Looking for face...'}</span>
                </div>
              </div>

              {/* Capture Counter */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded-xl text-sm backdrop-blur-sm">
                Images: {capturedImages.length}/3
              </div>
            </div>
          )}

          {/* Processing Overlay */}
          {isProcessing && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
              <div className="text-center bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-md">
                <Loader className="w-8 h-8 text-white animate-spin mx-auto mb-3" />
                <p className="text-white font-medium">Processing face enrollment...</p>
                <p className="text-blue-200 text-sm mt-1">Please wait while we analyze your face data</p>
              </div>
            </div>
          )}

          {/* Success Overlay */}
          {enrollmentStep === 'success' && (
            <div className="absolute inset-0 bg-green-900 bg-opacity-80 flex items-center justify-center">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <p className="text-green-100 font-medium text-lg">Enrollment Successful!</p>
              </div>
            </div>
          )}

          {/* Error Overlay */}
          {enrollmentStep === 'error' && (
            <div className="absolute inset-0 bg-red-900 bg-opacity-80 flex items-center justify-center">
              <div className="text-center">
                <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <p className="text-red-100 font-medium text-lg">Enrollment Failed</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="mt-4 flex space-x-4">
          {enrollmentStep === 'setup' && (
            <button
              onClick={handleStartEnrollment}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
            >
              <div className="flex items-center justify-center">
                <Camera className="w-5 h-5 mr-2" />
                Start Face Enrollment
              </div>
            </button>
          )}

          {enrollmentStep === 'detecting' && (
            <button
              onClick={handleCaptureImage}
              disabled={!detectedFace}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <div className="flex items-center justify-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Capture Image ({capturedImages.length}/3)
              </div>
            </button>
          )}

          {(enrollmentStep === 'error' || enrollmentStep === 'success') && (
            <button
              onClick={handleRetry}
              className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 font-medium"
            >
              <div className="flex items-center justify-center">
                <RotateCcw className="w-5 h-5 mr-2" />
                Try Again
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className={`p-4 rounded-xl border ${
        enrollmentStep === 'success' ? 'bg-green-50 border-green-200' :
        enrollmentStep === 'error' ? 'bg-red-50 border-red-200' :
        'bg-blue-50 border-blue-200'
      }`}>
        <div className="flex items-start space-x-3">
          {enrollmentStep === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
          ) : enrollmentStep === 'error' ? (
            <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
          )}
          <div>
            <h4 className={`text-sm font-medium ${
              enrollmentStep === 'success' ? 'text-green-800' :
              enrollmentStep === 'error' ? 'text-red-800' :
              'text-blue-800'
            }`}>
              {enrollmentStep === 'success' ? 'Enrollment Complete' :
               enrollmentStep === 'error' ? 'Enrollment Failed' :
               'Face Enrollment Instructions'}
            </h4>
            <p className={`text-sm mt-1 ${
              enrollmentStep === 'success' ? 'text-green-700' :
              enrollmentStep === 'error' ? 'text-red-700' :
              'text-blue-700'
            }`}>
              {enrollmentMessage || getInstructionText()}
            </p>
          </div>
        </div>
      </div>

      {/* Tips */}
      {enrollmentStep !== 'success' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">Tips for Better Enrollment:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Ensure good lighting on your face</li>
            <li>• Look directly at the camera</li>
            <li>• Remove glasses or hats if possible</li>
            <li>• Keep your face within the detection area</li>
            <li>• Stay still during image capture</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FaceEnrollment;