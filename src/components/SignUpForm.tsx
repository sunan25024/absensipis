import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Building, Phone, MapPin, Camera, CheckCircle, AlertCircle } from 'lucide-react';
import FaceEnrollment from './FaceEnrollment';

interface SignUpFormProps {
  onBack: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    emergencyContact: '',
    
    // Work Information
    department: '',
    position: '',
    employeeId: '',
    
    // Account Information
    password: '',
    confirmPassword: '',
    
    // Face Recognition
    faceEnrolled: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const departments = [
    'Engineering',
    'Design',
    'Marketing',
    'HR',
    'Finance',
    'Operations',
    'Sales',
    'Support'
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    }

    if (step === 2) {
      if (!formData.department) newErrors.department = 'Department is required';
      if (!formData.position.trim()) newErrors.position = 'Position is required';
      if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    }

    if (step === 3) {
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    if (step === 4) {
      if (!formData.faceEnrolled) newErrors.face = 'Face enrollment is required for attendance tracking';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsLoading(true);
    
    // Mock registration process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Here you would typically send data to backend
    console.log('Registration data:', formData);
    
    setIsLoading(false);
    alert('Registration successful! Please wait for admin approval.');
    onBack();
  };

  const handleFaceEnrollment = (success: boolean) => {
    setFormData({ ...formData, faceEnrolled: success });
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Work Details', icon: Building },
    { number: 3, title: 'Account Setup', icon: Lock },
    { number: 4, title: 'Face Setup', icon: Camera }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-600/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button
              onClick={handleBack}
              className="p-2 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors mr-4"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create Account
              </h1>
              <p className="text-gray-600 mt-1">Join PARA Smart Attendance System</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <div key={step.number} className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isCompleted ? 'bg-green-500 text-white' :
                      isActive ? 'bg-blue-500 text-white' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="ml-3">
                      <div className={`text-sm font-medium ${
                        isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        Step {step.number}
                      </div>
                      <div className={`text-xs ${
                        isActive ? 'text-blue-500' : isCompleted ? 'text-green-500' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-4 rounded ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <div className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.firstName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.lastName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.phone ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.address ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full address"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                    <input
                      type="tel"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.emergencyContact ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Emergency contact phone number"
                    />
                    {errors.emergencyContact && <p className="text-red-500 text-xs mt-1">{errors.emergencyContact}</p>}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Work Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.department ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.position ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your position"
                    />
                    {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                    <input
                      type="text"
                      value={formData.employeeId}
                      onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.employeeId ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your employee ID"
                    />
                    {errors.employeeId && <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Account Security</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.password ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Create a strong password"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Face Recognition Setup</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-800">Face Recognition Required</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        To use the attendance system, you need to enroll your face for recognition. 
                        This ensures secure and accurate attendance tracking.
                      </p>
                    </div>
                  </div>
                </div>
                
                <FaceEnrollment 
                  employeeId={formData.employeeId}
                  onEnrollmentComplete={handleFaceEnrollment}
                />
                
                {errors.face && <p className="text-red-500 text-sm">{errors.face}</p>}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Back
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading || !formData.faceEnrolled}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Complete Registration'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;