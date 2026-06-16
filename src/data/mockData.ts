export interface Student {
  id: string;
  name: string;
  studentId: string;
  course: string;
  yearLevel: string;
  email: string;
  phone: string;
  address: string;
  joined: string;
  status: 'Active' | 'Inactive';
  totalEarnings: number;
  availableBalance: number;
  totalPayouts: number;
  hourlyRate: number;
  subjects: string[];
  avatarColor: string;
}

export interface Tutor {
  id: string;
  name: string;
  studentId: string;
  course: string;
  yearLevel: string;
  subjects: string;
  hourlyRate: number;
  status: 'Active' | 'Suspended' | 'Pending';
  avatarColor: string;
}

export interface Request {
  id: string;
  studentName: string;
  gradeLevel: string;
  subject: string;
  preferredSchedule: string;
  sessionType: string;
  message: string;
  parentContact: string;
  tutorName: string;
  tutorCourse: string;
  tutorYear: string;
  tutorRate: string;
  status: 'Pending' | 'Approved' | 'Assigned' | 'Declined';
  requestDate: string;
  avatarColor: string;
}

export interface Session {
  id: string;
  tutor: string;
  student: string;
  subject: string;
  schedule: string;
  duration: string;
  status: 'Ongoing' | 'Completed' | 'Cancelled';
  tutorAvatar: string;
  studentAvatar: string;
}

export interface Payment {
  id: string;
  date: string;
  student: string;
  studentId: string;
  orNumber: string;
  description: string;
  amount: number;
  method: string;
  recordedBy: string;
  status: 'Verified' | 'Pending';
}

export interface TuitionRecord {
  studentId: string;
  totalDue: number;
  totalPaid: number;
  balance: number;
  status: 'Paid' | 'Partial' | 'Overdue';
  paymentPlan: string;
  dueDate: string;
  academicYear: string;
  collectionRate: number;
  fees: TuitionFee[];
  recentPayments: TuitionPayment[];
}

export interface TuitionFee {
  description: string;
  amount: number;
  paid: number;
  balance: number;
  dueDate: string;
  status: 'Paid' | 'Partial';
}

export interface TuitionPayment {
  date: string;
  orNumber: string;
  description: string;
  amount: number;
  method: string;
}

export interface Notification {
  id: string;
  type: 'system' | 'payment' | 'session';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

export interface PayoutRequest {
  id: string;
  student: string;
  studentId: string;
  date: string;
  amount: number;
  method: string;
  accountDetail: string;
  status: 'Pending' | 'Approved' | 'Paid' | 'Declined';
}

export interface UniversityProfile {
  name: string;
  email: string;
  contact: string;
  address: string;
  dateJoined: string;
  totalTutors: number;
  totalEarnings: number;
}

export interface AdminUser {
  name: string;
  email: string;
  role: string;
  contact: string;
  bio: string;
  department: string;
  employeeId: string;
}

export const avatarColors = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#7C3AED', '#EC4899', '#06B6D4', '#84CC16'];

export const students: Student[] = [
  { id: '1', name: 'Maria Santos', studentId: '2071334', course: 'BSEd Mathematics', yearLevel: '4th Year', email: 'maria.santos@bsu.edu.ph', phone: '0912 345 6789', address: 'La Trinidad, Benguet', joined: 'January 10, 2025', status: 'Active', totalEarnings: 18000, availableBalance: 5200, totalPayouts: 12800, hourlyRate: 250, subjects: ['Mathematics'], avatarColor: avatarColors[0] },
  { id: '2', name: 'Juan Cruz', studentId: '2071121', course: 'BSIT', yearLevel: '3rd Year', email: 'juan.cruz@bsu.edu.ph', phone: '0918 234 5678', address: 'Baguio City', joined: 'February 15, 2025', status: 'Active', totalEarnings: 12500, availableBalance: 2500, totalPayouts: 10000, hourlyRate: 300, subjects: ['Programming', 'IT'], avatarColor: avatarColors[1] },
  { id: '3', name: 'Pedro Reyes', studentId: '2071456', course: 'BS Biology', yearLevel: '2nd Year', email: 'pedro.reyes@bsu.edu.ph', phone: '0919 345 6789', address: 'La Trinidad, Benguet', joined: 'March 1, 2025', status: 'Active', totalEarnings: 6500, availableBalance: 1500, totalPayouts: 5000, hourlyRate: 220, subjects: ['Biology', 'Science'], avatarColor: avatarColors[2] },
  { id: '4', name: 'Lisa Salvador', studentId: '2071567', course: 'BSEd Physics', yearLevel: '3rd Year', email: 'lisa.salvador@bsu.edu.ph', phone: '0927 456 7890', address: 'Baguio City', joined: 'January 20, 2025', status: 'Active', totalEarnings: 7200, availableBalance: 1200, totalPayouts: 6000, hourlyRate: 240, subjects: ['Physics'], avatarColor: avatarColors[3] },
  { id: '5', name: 'Mark Anthony Tuason', studentId: '2071678', course: 'BS Accountancy', yearLevel: '4th Year', email: 'mark.tuason@bsu.edu.ph', phone: '0930 567 8901', address: 'La Trinidad, Benguet', joined: 'February 1, 2025', status: 'Active', totalEarnings: 14000, availableBalance: 4000, totalPayouts: 10000, hourlyRate: 260, subjects: ['Accounting', 'Finance'], avatarColor: avatarColors[4] },
  { id: '6', name: 'Anna Mae Flores', studentId: '2071899', course: 'BS Psychology', yearLevel: '2nd Year', email: 'anna.flores@bsu.edu.ph', phone: '0917 678 9012', address: 'Baguio City', joined: 'March 10, 2025', status: 'Active', totalEarnings: 6000, availableBalance: 2000, totalPayouts: 4000, hourlyRate: 200, subjects: ['Psychology'], avatarColor: avatarColors[5] },
  { id: '7', name: 'Rico Dela Cruz', studentId: '2071990', course: 'BS Computer Science', yearLevel: '3rd Year', email: 'rico.delacruz@bsu.edu.ph', phone: '0920 789 0123', address: 'La Trinidad, Benguet', joined: 'April 5, 2025', status: 'Active', totalEarnings: 10000, availableBalance: 1500, totalPayouts: 8500, hourlyRate: 300, subjects: ['Programming'], avatarColor: avatarColors[6] },
];

export const tutors: Tutor[] = [
  { id: '1', name: 'Maria Santos', studentId: '2071334', course: 'BSEd Mathematics', yearLevel: '4th Year', subjects: 'Mathematics', hourlyRate: 250, status: 'Active', avatarColor: avatarColors[0] },
  { id: '2', name: 'Juan Cruz', studentId: '2071121', course: 'BSIT', yearLevel: '3rd Year', subjects: 'Programming, IT', hourlyRate: 300, status: 'Active', avatarColor: avatarColors[1] },
  { id: '3', name: 'Pedro Reyes', studentId: '2071456', course: 'BS Biology', yearLevel: '2nd Year', subjects: 'Biology, Science', hourlyRate: 220, status: 'Active', avatarColor: avatarColors[2] },
  { id: '4', name: 'Lisa Salvador', studentId: '2071567', course: 'BSEd Physics', yearLevel: '3rd Year', subjects: 'Physics', hourlyRate: 240, status: 'Active', avatarColor: avatarColors[3] },
  { id: '5', name: 'Mark Anthony Tuason', studentId: '2071678', course: 'BS Accountancy', yearLevel: '4th Year', subjects: 'Accounting, Finance', hourlyRate: 260, status: 'Pending', avatarColor: avatarColors[4] },
  { id: '6', name: 'Anna Mae Flores', studentId: '2071899', course: 'BS Psychology', yearLevel: '2nd Year', subjects: 'Psychology', hourlyRate: 200, status: 'Suspended', avatarColor: avatarColors[5] },
  { id: '7', name: 'Rico Dela Cruz', studentId: '2071990', course: 'BS Computer Science', yearLevel: '3rd Year', subjects: 'Programming', hourlyRate: 300, status: 'Active', avatarColor: avatarColors[6] },
];

export const requests: Request[] = [
  { id: '1', studentName: 'Ana Dela Cruz', gradeLevel: 'Grade 10', subject: 'Algebra', preferredSchedule: 'June 3, 2026 - 2:00 PM', sessionType: 'Online', message: 'Hello, my daughter needs help in Algebra, especially with equations and problem solving.', parentContact: '0912 345 6789', tutorName: 'Maria Santos', tutorCourse: 'BSEd Mathematics', tutorYear: '4th Year', tutorRate: 'P250/hr', status: 'Pending', requestDate: 'June 2, 2026 - 9:15 AM', avatarColor: avatarColors[0] },
  { id: '2', studentName: 'John Mark P.', gradeLevel: 'Grade 12', subject: 'Calculus', preferredSchedule: 'June 4, 2026 - 10:00 AM', sessionType: 'In-Person', message: 'Need help with calculus integration and derivatives for upcoming exam.', parentContact: '0918 234 5678', tutorName: 'Juan Cruz', tutorCourse: 'BSIT', tutorYear: '3rd Year', tutorRate: 'P300/hr', status: 'Pending', requestDate: 'June 2, 2026 - 8:30 AM', avatarColor: avatarColors[1] },
  { id: '3', studentName: 'Lisa Salvador', gradeLevel: 'Grade 11', subject: 'Physics', preferredSchedule: 'June 4, 2026 - 1:30 PM', sessionType: 'Online', message: 'Struggling with physics mechanics and thermodynamics topics.', parentContact: '0927 456 7890', tutorName: 'Pedro Reyes', tutorCourse: 'BS Biology', tutorYear: '2nd Year', tutorRate: 'P220/hr', status: 'Pending', requestDate: 'June 1, 2026 - 3:00 PM', avatarColor: avatarColors[2] },
  { id: '4', studentName: 'Carla Mendoza', gradeLevel: 'Grade 9', subject: 'English', preferredSchedule: 'June 5, 2026 - 3:00 PM', sessionType: 'Online', message: 'Need help with essay writing and grammar for English class.', parentContact: '0919 876 5432', tutorName: '', tutorCourse: '', tutorYear: '', tutorRate: '', status: 'Pending', requestDate: 'June 1, 2026 - 11:00 AM', avatarColor: avatarColors[3] },
  { id: '5', studentName: 'Mark Angelo', gradeLevel: 'Grade 8', subject: 'Science', preferredSchedule: 'June 5, 2026 - 11:00 AM', sessionType: 'In-Person', message: 'Looking for help with general science topics and lab report writing.', parentContact: '0930 123 4567', tutorName: '', tutorCourse: '', tutorYear: '', tutorRate: '', status: 'Pending', requestDate: 'May 31, 2026 - 2:00 PM', avatarColor: avatarColors[4] },
  { id: '6', studentName: 'Maria Santos', gradeLevel: 'Grade 10', subject: 'Algebra', preferredSchedule: 'June 2, 2026 - 2:00 PM', sessionType: 'Online', message: 'Need review on quadratic equations and functions.', parentContact: '0912 345 6789', tutorName: 'Maria Santos', tutorCourse: 'BSEd Mathematics', tutorYear: '4th Year', tutorRate: 'P250/hr', status: 'Approved', requestDate: 'June 2, 2026 - 9:15 AM', avatarColor: avatarColors[0] },
];

export const sessions: Session[] = [
  { id: '1', tutor: 'Maria Santos', student: 'Ana Dela Cruz', subject: 'Algebra', schedule: 'June 2, 2026 - 2:00 PM', duration: '-', status: 'Ongoing', tutorAvatar: avatarColors[0], studentAvatar: avatarColors[1] },
  { id: '2', tutor: 'Juan Cruz', student: 'John Mark P.', subject: 'Calculus', schedule: 'June 2, 2026 - 10:00 AM', duration: '1.5 hrs', status: 'Completed', tutorAvatar: avatarColors[1], studentAvatar: avatarColors[2] },
  { id: '3', tutor: 'Lisa Salvador', student: 'Carla Mendoza', subject: 'Physics', schedule: 'June 2, 2026 - 4:00 PM', duration: '-', status: 'Ongoing', tutorAvatar: avatarColors[3], studentAvatar: avatarColors[4] },
  { id: '4', tutor: 'Pedro Reyes', student: 'Mark Angelo', subject: 'Biology', schedule: 'June 2, 2026 - 5:00 PM', duration: '1 hr', status: 'Completed', tutorAvatar: avatarColors[2], studentAvatar: avatarColors[5] },
  { id: '5', tutor: 'Maria Santos', student: 'Zachary Lim', subject: 'Algebra', schedule: 'June 1, 2026 - 3:00 PM', duration: '1.5 hrs', status: 'Completed', tutorAvatar: avatarColors[0], studentAvatar: avatarColors[6] },
  { id: '6', tutor: 'Juan Cruz', student: 'Kyle Bustista', subject: 'Programming', schedule: 'June 1, 2026 - 1:00 PM', duration: '2 hrs', status: 'Completed', tutorAvatar: avatarColors[1], studentAvatar: avatarColors[7] },
];

export const payments: Payment[] = [
  { id: '1', date: 'May 30, 2026', student: 'Maria Santos', studentId: '2071334', orNumber: 'OR-2026-5567', description: 'Tuition Payment', amount: 4000, method: 'GCash', recordedBy: 'Admin', status: 'Verified' },
  { id: '2', date: 'May 28, 2026', student: 'Pedro Reyes', studentId: '2071456', orNumber: 'OR-2026-5544', description: 'Tuition Payment', amount: 2500, method: 'Bank Transfer', recordedBy: 'Admin', status: 'Verified' },
  { id: '3', date: 'May 27, 2026', student: 'Lisa Salvador', studentId: '2071567', orNumber: 'OR-2026-5533', description: 'Tuition Payment', amount: 3000, method: 'BDO Online', recordedBy: 'Admin', status: 'Verified' },
  { id: '4', date: 'May 25, 2026', student: 'Juan Cruz', studentId: '2071121', orNumber: 'OR-2026-5522', description: 'Full Payment', amount: 15000, method: 'GCash', recordedBy: 'Admin', status: 'Verified' },
  { id: '5', date: 'May 23, 2026', student: 'Mark Tuason', studentId: '2071678', orNumber: 'OR-2026-5511', description: 'Tuition Payment', amount: 5000, method: 'Bank Transfer', recordedBy: 'Admin', status: 'Verified' },
  { id: '6', date: 'May 22, 2026', student: 'Anna Mae Flores', studentId: '2071899', orNumber: 'OR-2026-5500', description: 'Tuition Payment', amount: 6500, method: 'Cash', recordedBy: 'Admin', status: 'Verified' },
  { id: '7', date: 'May 18, 2026', student: 'Rico Dela Cruz', studentId: '2071990', orNumber: 'OR-2026-5499', description: 'Tuition Payment', amount: 2000, method: 'GCash', recordedBy: 'Admin', status: 'Pending' },
  { id: '8', date: 'May 15, 2026', student: 'Maria Santos', studentId: '2071334', orNumber: 'OR-2026-5488', description: 'Tuition Payment', amount: 5800, method: 'Bank Transfer', recordedBy: 'Admin', status: 'Verified' },
];

export const tuitionRecords: TuitionRecord[] = [
  {
    studentId: '2071334',
    totalDue: 18000,
    totalPaid: 12800,
    balance: 5200,
    status: 'Partial',
    paymentPlan: '2 Installments',
    dueDate: 'Dec 31, 2025',
    academicYear: '2025 – 2026',
    collectionRate: 71.11,
    fees: [
      { description: 'Tuition Fee', amount: 12000, paid: 8000, balance: 4000, dueDate: 'Dec 31, 2025', status: 'Partial' },
      { description: 'Miscellaneous Fee', amount: 3000, paid: 2500, balance: 500, dueDate: 'Dec 31, 2025', status: 'Partial' },
      { description: 'Laboratory Fee', amount: 2000, paid: 2000, balance: 0, dueDate: 'Dec 31, 2025', status: 'Paid' },
      { description: 'ID Fee', amount: 500, paid: 300, balance: 200, dueDate: 'Dec 31, 2025', status: 'Partial' },
    ],
    recentPayments: [
      { date: 'May 30, 2026', orNumber: 'OR-2026-5567', description: 'Tuition Payment', amount: 4000, method: 'GCash' },
      { date: 'Mar 15, 2026', orNumber: 'OR-2026-3342', description: 'Tuition Payment', amount: 5000, method: 'Bank Transfer' },
      { date: 'Jan 10, 2026', orNumber: 'OR-2026-1529', description: 'Down Payment', amount: 3800, method: 'Cash' },
    ],
  },
  {
    studentId: '2071121',
    totalDue: 15000,
    totalPaid: 15000,
    balance: 0,
    status: 'Paid',
    paymentPlan: 'Full Payment',
    dueDate: 'Dec 31, 2025',
    academicYear: '2025 – 2026',
    collectionRate: 100,
    fees: [
      { description: 'Tuition Fee', amount: 10000, paid: 10000, balance: 0, dueDate: 'Dec 31, 2025', status: 'Paid' },
      { description: 'Miscellaneous Fee', amount: 2500, paid: 2500, balance: 0, dueDate: 'Dec 31, 2025', status: 'Paid' },
      { description: 'Laboratory Fee', amount: 1500, paid: 1500, balance: 0, dueDate: 'Dec 31, 2025', status: 'Paid' },
      { description: 'ID Fee', amount: 1000, paid: 1000, balance: 0, dueDate: 'Dec 31, 2025', status: 'Paid' },
    ],
    recentPayments: [
      { date: 'May 25, 2026', orNumber: 'OR-2026-5522', description: 'Full Payment', amount: 15000, method: 'GCash' },
    ],
  },
  {
    studentId: '2071456',
    totalDue: 14000,
    totalPaid: 6500,
    balance: 7500,
    status: 'Partial',
    paymentPlan: '2 Installments',
    dueDate: 'Dec 31, 2025',
    academicYear: '2025 – 2026',
    collectionRate: 46.43,
    fees: [
      { description: 'Tuition Fee', amount: 9000, paid: 4000, balance: 5000, dueDate: 'Dec 31, 2025', status: 'Partial' },
      { description: 'Miscellaneous Fee', amount: 2500, paid: 1500, balance: 1000, dueDate: 'Dec 31, 2025', status: 'Partial' },
      { description: 'Laboratory Fee', amount: 2000, paid: 1000, balance: 1000, dueDate: 'Dec 31, 2025', status: 'Partial' },
      { description: 'ID Fee', amount: 500, paid: 0, balance: 500, dueDate: 'Dec 31, 2025', status: 'Partial' },
    ],
    recentPayments: [
      { date: 'May 28, 2026', orNumber: 'OR-2026-5544', description: 'Tuition Payment', amount: 2500, method: 'Bank Transfer' },
    ],
  },
  {
    studentId: '2071567',
    totalDue: 16000,
    totalPaid: 8800,
    balance: 7200,
    status: 'Partial',
    paymentPlan: '2 Installments',
    dueDate: 'Dec 31, 2025',
    academicYear: '2025 – 2026',
    collectionRate: 55.0,
    fees: [
      { description: 'Tuition Fee', amount: 10000, paid: 5000, balance: 5000, dueDate: 'Dec 31, 2025', status: 'Partial' },
      { description: 'Miscellaneous Fee', amount: 3000, paid: 2000, balance: 1000, dueDate: 'Dec 31, 2025', status: 'Partial' },
      { description: 'Laboratory Fee', amount: 2500, paid: 1500, balance: 1000, dueDate: 'Dec 31, 2025', status: 'Partial' },
      { description: 'ID Fee', amount: 500, paid: 300, balance: 200, dueDate: 'Dec 31, 2025', status: 'Partial' },
    ],
    recentPayments: [
      { date: 'May 27, 2026', orNumber: 'OR-2026-5533', description: 'Tuition Payment', amount: 3000, method: 'BDO Online' },
    ],
  },
  {
    studentId: '2071678',
    totalDue: 20000,
    totalPaid: 10000,
    balance: 10000,
    status: 'Partial',
    paymentPlan: '3 Installments',
    dueDate: 'Dec 31, 2025',
    academicYear: '2025 – 2026',
    collectionRate: 50.0,
    fees: [
      { description: 'Tuition Fee', amount: 13000, paid: 6000, balance: 7000, dueDate: 'Dec 31, 2025', status: 'Partial' },
      { description: 'Miscellaneous Fee', amount: 3500, paid: 2000, balance: 1500, dueDate: 'Dec 31, 2025', status: 'Partial' },
      { description: 'Laboratory Fee', amount: 2500, paid: 1500, balance: 1000, dueDate: 'Dec 31, 2025', status: 'Partial' },
      { description: 'ID Fee', amount: 1000, paid: 500, balance: 500, dueDate: 'Dec 31, 2025', status: 'Partial' },
    ],
    recentPayments: [
      { date: 'May 23, 2026', orNumber: 'OR-2026-5511', description: 'Tuition Payment', amount: 5000, method: 'Bank Transfer' },
    ],
  },
  {
    studentId: '2071899',
    totalDue: 13000,
    totalPaid: 13000,
    balance: 0,
    status: 'Paid',
    paymentPlan: 'Full Payment',
    dueDate: 'Dec 31, 2025',
    academicYear: '2025 – 2026',
    collectionRate: 100,
    fees: [
      { description: 'Tuition Fee', amount: 8500, paid: 8500, balance: 0, dueDate: 'Dec 31, 2025', status: 'Paid' },
      { description: 'Miscellaneous Fee', amount: 2500, paid: 2500, balance: 0, dueDate: 'Dec 31, 2025', status: 'Paid' },
      { description: 'Laboratory Fee', amount: 1500, paid: 1500, balance: 0, dueDate: 'Dec 31, 2025', status: 'Paid' },
      { description: 'ID Fee', amount: 500, paid: 500, balance: 0, dueDate: 'Dec 31, 2025', status: 'Paid' },
    ],
    recentPayments: [
      { date: 'May 22, 2026', orNumber: 'OR-2026-5500', description: 'Tuition Payment', amount: 6500, method: 'Cash' },
    ],
  },
  {
    studentId: '2071990',
    totalDue: 17000,
    totalPaid: 4000,
    balance: 13000,
    status: 'Overdue',
    paymentPlan: '2 Installments',
    dueDate: 'Dec 31, 2025',
    academicYear: '2025 – 2026',
    collectionRate: 23.53,
    fees: [
      { description: 'Tuition Fee', amount: 11000, paid: 2000, balance: 9000, dueDate: 'Dec 31, 2025', status: 'Partial' },
      { description: 'Miscellaneous Fee', amount: 3000, paid: 1000, balance: 2000, dueDate: 'Dec 31, 2025', status: 'Partial' },
      { description: 'Laboratory Fee', amount: 2000, paid: 1000, balance: 1000, dueDate: 'Dec 31, 2025', status: 'Partial' },
      { description: 'ID Fee', amount: 1000, paid: 0, balance: 1000, dueDate: 'Dec 31, 2025', status: 'Partial' },
    ],
    recentPayments: [
      { date: 'May 18, 2026', orNumber: 'OR-2026-5499', description: 'Tuition Payment', amount: 2000, method: 'GCash' },
    ],
  },
];

export const notifications: Notification[] = [
  { id: '1', type: 'system', title: 'New student tutor application submitted', description: 'Juan Mark P. has submitted a tutor application for Grade 12 Calculus. Review pending.', timestamp: '2 hours ago', read: false },
  { id: '2', type: 'payment', title: 'Payment verified successfully', description: 'Tuition payment of P4,000 from Maria Santos has been verified. OR-2026-5567.', timestamp: '5 hours ago', read: false },
  { id: '3', type: 'session', title: 'Session completion reminder', description: 'Maria Santos has an ongoing session with Ana Dela Cruz scheduled to end at 3:30 PM.', timestamp: '8 hours ago', read: false },
  { id: '4', type: 'system', title: 'New request assigned', description: 'A tutoring request for Grade 10 Math has been assigned to Maria Santos.', timestamp: '1 day ago', read: true },
  { id: '5', type: 'payment', title: 'Overdue payment alert', description: 'Rico Dela Cruz has an overdue balance of P13,000. Payment was due on May 1, 2026.', timestamp: '2 days ago', read: true },
];

export const payoutRequests: PayoutRequest[] = [
  { id: '1', student: 'Maria Santos', studentId: '2071334', date: 'June 2, 2026 10:30 AM', amount: 5000, method: 'Bank Transfer (BPI)', accountDetail: '**** **** **** 1234', status: 'Pending' },
  { id: '2', student: 'Juan Cruz', studentId: '2071121', date: 'June 1, 2026 9:15 AM', amount: 3000, method: 'GCash', accountDetail: '0912 345 6789', status: 'Pending' },
  { id: '3', student: 'Lisa Salvador', studentId: '2071567', date: 'May 31, 2026 4:45 PM', amount: 1500, method: 'Bank Transfer (BDO)', accountDetail: '**** **** **** 5678', status: 'Approved' },
  { id: '4', student: 'Pedro Reyes', studentId: '2071456', date: 'May 30, 2026 11:20 AM', amount: 2500, method: 'GCash', accountDetail: '0919 876 5432', status: 'Approved' },
  { id: '5', student: 'Mark Tuason', studentId: '2071678', date: 'May 29, 2026 8:10 AM', amount: 4000, method: 'Bank Transfer (BPI)', accountDetail: '**** **** **** 9012', status: 'Paid' },
  { id: '6', student: 'Anna Mae Flores', studentId: '2071899', date: 'May 28, 2026 2:30 PM', amount: 1800, method: 'GCash', accountDetail: '0927 111 2222', status: 'Paid' },
];

export const universityProfile: UniversityProfile = {
  name: 'Benguet State University',
  email: 'admin@bsu.edu.ph',
  contact: '(074) 422 1234',
  address: 'La Trinidad, Benguet, Philippines 2601',
  dateJoined: 'January 15, 2026',
  totalTutors: 542,
  totalEarnings: 1534000,
};

export const adminUser: AdminUser = {
  name: 'Maria Elena Cruz',
  email: 'admin@bsu.edu.ph',
  role: 'Administrator',
  contact: '0912 345 6789',
  bio: 'University administrator managing the EduFund tutoring program.',
  department: 'Student Affairs Office',
  employeeId: 'EMP-2026-001',
};

// Chart data for dashboard
export const monthlyOverviewData = [
  { month: 'Jan', requests: 80, sessions: 60, earnings: 150000 },
  { month: 'Feb', requests: 120, sessions: 85, earnings: 200000 },
  { month: 'Mar', requests: 150, sessions: 100, earnings: 250000 },
  { month: 'Apr', requests: 180, sessions: 130, earnings: 300000 },
  { month: 'May', requests: 200, sessions: 160, earnings: 380000 },
  { month: 'Jun', requests: 170, sessions: 140, earnings: 320000 },
];

export const earningsTrendData = [
  { week: 'Week 1', earnings: 50000 },
  { week: 'Week 2', earnings: 65000 },
  { week: 'Week 3', earnings: 80000 },
  { week: 'Week 4', earnings: 55000 },
  { week: 'Week 5', earnings: 284500 },
];

export const studentEarningsTrend = [
  { month: 'Jan', earnings: 3000 },
  { month: 'Feb', earnings: 5000 },
  { month: 'Mar', earnings: 8000 },
  { month: 'Apr', earnings: 10000 },
  { month: 'May', earnings: 15000 },
  { month: 'Jun', earnings: 18000 },
];

export const collectionTrendData = [
  { month: 'Jan', collected: 1200000, paid: 800000 },
  { month: 'Feb', collected: 1500000, paid: 1100000 },
  { month: 'Mar', collected: 1800000, paid: 1400000 },
  { month: 'Apr', collected: 2100000, paid: 1700000 },
  { month: 'May', collected: 2500000, paid: 2000000 },
  { month: 'Jun', collected: 1900000, paid: 1600000 },
];

export const balanceByYearData = [
  { year: '1st Year', balance: 620000 },
  { year: '2nd Year', balance: 850000 },
  { year: '3rd Year', balance: 940000 },
  { year: '4th Year', balance: 620000 },
  { year: '5th Year', balance: 347800 },
];

export const subjectDemandData = [
  { subject: 'Mathematics', value: 45, fill: '#2563EB' },
  { subject: 'English', value: 25, fill: '#10B981' },
  { subject: 'Science', value: 15, fill: '#7C3AED' },
  { subject: 'Programming', value: 10, fill: '#F59E0B' },
  { subject: 'Others', value: 5, fill: '#94A3B8' },
];

export const paymentStatusData = [
  { name: 'Paid in Full', value: 326, fill: '#2563EB' },
  { name: 'Partial', value: 154, fill: '#F59E0B' },
  { name: 'No Payment', value: 62, fill: '#EF4444' },
];

export const sessionOverviewData = [
  { name: 'Completed', value: 68, fill: '#10B981' },
  { name: 'Ongoing', value: 18, fill: '#2563EB' },
  { name: 'Cancelled', value: 30, fill: '#EF4444' },
];

export const requestsVsSessionsData = [
  { month: 'Jan', requests: 80, sessions: 60 },
  { month: 'Feb', requests: 120, sessions: 85 },
  { month: 'Mar', requests: 150, sessions: 100 },
  { month: 'Apr', requests: 180, sessions: 130 },
  { month: 'May', requests: 200, sessions: 160 },
  { month: 'Jun', requests: 170, sessions: 140 },
];

export const tutorPerformanceData = [
  { tutor: 'Maria Santos', score: 95 },
  { tutor: 'Juan Cruz', score: 89 },
  { tutor: 'Pedro Reyes', score: 87 },
  { tutor: 'Lisa Salvador', score: 84 },
  { tutor: 'Anna Mae Flores', score: 81 },
];

export const analyticsEarningsData = [
  { month: 'Jan', earnings: 150000 },
  { month: 'Feb', earnings: 200000 },
  { month: 'Mar', earnings: 250000 },
  { month: 'Apr', earnings: 300000 },
  { month: 'May', earnings: 380000 },
  { month: 'Jun', earnings: 320000 },
];

export const topProgramsData = [
  { program: 'BS Accountancy', amount: 980000 },
  { program: 'BSIT', amount: 850000 },
  { program: 'BSEd Mathematics', amount: 720000 },
  { program: 'BS Biology', amount: 650000 },
  { program: 'BS Psychology', amount: 630000 },
];

export const recentActivities = [
  { text: 'New tutoring request from Ana Dela Cruz', time: '2 minutes ago', color: '#2563EB' },
  { text: 'Maria Santos completed a session', time: '15 minutes ago', color: '#10B981' },
  { text: 'Juan Mark P. submitted feedback', time: '1 hour ago', color: '#F59E0B' },
  { text: 'Payout for Juan Cruz was processed', time: '3 hours ago', color: '#7C3AED' },
];
