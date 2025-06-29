export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  employeeId: string;
  avatar?: string;
  faceTemplate?: string;
  isActive: boolean;
  createdAt: Date;
  phone?: string;
  address?: string;
  emergencyContact?: string;
  salary?: number;
  workSchedule: WorkSchedule;
  permissions: Permission[];
  biometricData?: BiometricData;
}

export interface WorkSchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isWorkDay: boolean;
  startTime: string;
  endTime: string;
  breakStart?: string;
  breakEnd?: string;
}

export interface Permission {
  module: string;
  actions: string[];
}

export interface BiometricData {
  faceTemplate?: string;
  fingerprint?: string;
  voicePrint?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  checkIn?: Date;
  checkOut?: Date;
  date: string;
  status: 'present' | 'absent' | 'late' | 'partial' | 'overtime' | 'holiday' | 'sick' | 'vacation';
  workingHours?: number;
  overtimeHours?: number;
  location?: string;
  ipAddress?: string;
  deviceInfo?: string;
  notes?: string;
  approvedBy?: string;
  breaks: BreakRecord[];
}

export interface BreakRecord {
  id: string;
  startTime: Date;
  endTime?: Date;
  type: 'lunch' | 'coffee' | 'personal' | 'meeting';
  duration?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  employeeId?: string;
  permissions: Permission[];
  lastLogin?: Date;
  isOnline: boolean;
}

export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  lateToday: number;
  absentToday: number;
  avgWorkingHours: number;
  overtimeHours: number;
  productivityScore: number;
  attendanceRate: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'vacation' | 'sick' | 'personal' | 'maternity' | 'emergency';
  startDate: Date;
  endDate: Date;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: Date;
  documents?: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
  read: boolean;
  userId: string;
  actionUrl?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  managerId: string;
  employeeCount: number;
  budget?: number;
  location: string;
}

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  breakDuration: number;
  isActive: boolean;
  departments: string[];
}

export interface Holiday {
  id: string;
  name: string;
  date: Date;
  type: 'national' | 'company' | 'religious';
  isRecurring: boolean;
}

export interface PayrollData {
  employeeId: string;
  month: string;
  year: number;
  baseSalary: number;
  overtime: number;
  bonuses: number;
  deductions: number;
  netSalary: number;
  workingDays: number;
  presentDays: number;
  leaveDays: number;
}