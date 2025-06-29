import { Employee, AttendanceRecord, DashboardStats, LeaveRequest, Department, Shift, Holiday, Notification } from '../types';

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    employeeId: 'EMP001',
    phone: '+1234567890',
    address: '123 Main St, City, State',
    emergencyContact: '+1234567891',
    salary: 85000,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    faceTemplate: 'face_template_1',
    workSchedule: {
      monday: { isWorkDay: true, startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      tuesday: { isWorkDay: true, startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      wednesday: { isWorkDay: true, startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      thursday: { isWorkDay: true, startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      friday: { isWorkDay: true, startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      saturday: { isWorkDay: false, startTime: '', endTime: '' },
      sunday: { isWorkDay: false, startTime: '', endTime: '' }
    },
    permissions: [
      { module: 'attendance', actions: ['view', 'checkin', 'checkout'] },
      { module: 'profile', actions: ['view', 'edit'] }
    ],
    biometricData: {
      faceTemplate: 'encoded_face_data_1',
      fingerprint: 'encoded_fingerprint_1'
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    department: 'Design',
    position: 'UI/UX Designer',
    employeeId: 'EMP002',
    phone: '+1234567892',
    address: '456 Oak Ave, City, State',
    emergencyContact: '+1234567893',
    salary: 75000,
    isActive: true,
    createdAt: new Date('2024-01-20'),
    faceTemplate: 'face_template_2',
    workSchedule: {
      monday: { isWorkDay: true, startTime: '08:30', endTime: '16:30', breakStart: '12:00', breakEnd: '13:00' },
      tuesday: { isWorkDay: true, startTime: '08:30', endTime: '16:30', breakStart: '12:00', breakEnd: '13:00' },
      wednesday: { isWorkDay: true, startTime: '08:30', endTime: '16:30', breakStart: '12:00', breakEnd: '13:00' },
      thursday: { isWorkDay: true, startTime: '08:30', endTime: '16:30', breakStart: '12:00', breakEnd: '13:00' },
      friday: { isWorkDay: true, startTime: '08:30', endTime: '16:30', breakStart: '12:00', breakEnd: '13:00' },
      saturday: { isWorkDay: false, startTime: '', endTime: '' },
      sunday: { isWorkDay: false, startTime: '', endTime: '' }
    },
    permissions: [
      { module: 'attendance', actions: ['view', 'checkin', 'checkout'] },
      { module: 'profile', actions: ['view', 'edit'] },
      { module: 'projects', actions: ['view', 'edit'] }
    ],
    biometricData: {
      faceTemplate: 'encoded_face_data_2'
    }
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    department: 'Marketing',
    position: 'Marketing Manager',
    employeeId: 'EMP003',
    phone: '+1234567894',
    address: '789 Pine St, City, State',
    emergencyContact: '+1234567895',
    salary: 90000,
    isActive: true,
    createdAt: new Date('2024-02-01'),
    faceTemplate: 'face_template_3',
    workSchedule: {
      monday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breakStart: '12:30', breakEnd: '13:30' },
      tuesday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breakStart: '12:30', breakEnd: '13:30' },
      wednesday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breakStart: '12:30', breakEnd: '13:30' },
      thursday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breakStart: '12:30', breakEnd: '13:30' },
      friday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breakStart: '12:30', breakEnd: '13:30' },
      saturday: { isWorkDay: false, startTime: '', endTime: '' },
      sunday: { isWorkDay: false, startTime: '', endTime: '' }
    },
    permissions: [
      { module: 'attendance', actions: ['view', 'checkin', 'checkout'] },
      { module: 'profile', actions: ['view', 'edit'] },
      { module: 'team', actions: ['view', 'manage'] }
    ],
    biometricData: {
      faceTemplate: 'encoded_face_data_3',
      voicePrint: 'encoded_voice_data_3'
    }
  }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    checkIn: new Date('2024-12-19T09:00:00'),
    checkOut: new Date('2024-12-19T17:30:00'),
    date: '2024-12-19',
    status: 'present',
    workingHours: 8.5,
    overtimeHours: 0.5,
    location: 'Main Office',
    ipAddress: '192.168.1.100',
    deviceInfo: 'Chrome/Windows',
    breaks: [
      {
        id: 'b1',
        startTime: new Date('2024-12-19T12:00:00'),
        endTime: new Date('2024-12-19T13:00:00'),
        type: 'lunch',
        duration: 60
      },
      {
        id: 'b2',
        startTime: new Date('2024-12-19T15:30:00'),
        endTime: new Date('2024-12-19T15:45:00'),
        type: 'coffee',
        duration: 15
      }
    ]
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    checkIn: new Date('2024-12-19T09:15:00'),
    checkOut: new Date('2024-12-19T17:45:00'),
    date: '2024-12-19',
    status: 'late',
    workingHours: 8.5,
    location: 'Main Office',
    ipAddress: '192.168.1.101',
    deviceInfo: 'Safari/MacOS',
    breaks: [
      {
        id: 'b3',
        startTime: new Date('2024-12-19T12:30:00'),
        endTime: new Date('2024-12-19T13:30:00'),
        type: 'lunch',
        duration: 60
      }
    ]
  }
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    type: 'vacation',
    startDate: new Date('2024-12-25'),
    endDate: new Date('2024-12-27'),
    days: 3,
    reason: 'Christmas vacation with family',
    status: 'approved',
    approvedBy: 'HR Manager',
    approvedAt: new Date('2024-12-15')
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    type: 'sick',
    startDate: new Date('2024-12-20'),
    endDate: new Date('2024-12-20'),
    days: 1,
    reason: 'Medical appointment',
    status: 'pending'
  }
];

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Engineering',
    description: 'Software development and technical operations',
    managerId: 'EMP001',
    employeeCount: 15,
    budget: 2500000,
    location: 'Floor 3'
  },
  {
    id: '2',
    name: 'Design',
    description: 'UI/UX design and creative services',
    managerId: 'EMP002',
    employeeCount: 8,
    budget: 800000,
    location: 'Floor 2'
  },
  {
    id: '3',
    name: 'Marketing',
    description: 'Marketing and business development',
    managerId: 'EMP003',
    employeeCount: 12,
    budget: 1200000,
    location: 'Floor 1'
  }
];

export const mockShifts: Shift[] = [
  {
    id: '1',
    name: 'Morning Shift',
    startTime: '08:00',
    endTime: '16:00',
    breakDuration: 60,
    isActive: true,
    departments: ['Engineering', 'Design']
  },
  {
    id: '2',
    name: 'Day Shift',
    startTime: '09:00',
    endTime: '17:00',
    breakDuration: 60,
    isActive: true,
    departments: ['Marketing', 'HR', 'Finance']
  },
  {
    id: '3',
    name: 'Evening Shift',
    startTime: '14:00',
    endTime: '22:00',
    breakDuration: 60,
    isActive: true,
    departments: ['Support', 'Operations']
  }
];

export const mockHolidays: Holiday[] = [
  {
    id: '1',
    name: 'New Year\'s Day',
    date: new Date('2024-01-01'),
    type: 'national',
    isRecurring: true
  },
  {
    id: '2',
    name: 'Christmas Day',
    date: new Date('2024-12-25'),
    type: 'national',
    isRecurring: true
  },
  {
    id: '3',
    name: 'Company Anniversary',
    date: new Date('2024-06-15'),
    type: 'company',
    isRecurring: true
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Leave Request Approved',
    message: 'Your vacation request for Dec 25-27 has been approved',
    type: 'success',
    timestamp: new Date('2024-12-15T10:30:00'),
    read: false,
    userId: 'EMP001'
  },
  {
    id: '2',
    title: 'Overtime Alert',
    message: 'You have worked 2 hours overtime today',
    type: 'warning',
    timestamp: new Date('2024-12-19T19:00:00'),
    read: false,
    userId: 'EMP001'
  },
  {
    id: '3',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on Dec 22, 2:00 AM - 4:00 AM',
    type: 'info',
    timestamp: new Date('2024-12-18T09:00:00'),
    read: true,
    userId: 'EMP001'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalEmployees: 45,
  presentToday: 38,
  lateToday: 3,
  absentToday: 4,
  avgWorkingHours: 8.2,
  overtimeHours: 12.5,
  productivityScore: 87,
  attendanceRate: 94.2
};