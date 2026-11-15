/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  profileImage?: string;
  createdAt: string;
  xp?: number;
  badges?: string[];
}

export interface Module {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  price: number;
  instructorId: string;
  instructorName: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modules: Module[];
  createdAt: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  completedModules: string[];
  enrolledAt: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  studentName: string;
  courseTitle: string;
  issuedAt: string;
  certificateId: string;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  questions: Question[];
}

export interface QuizResult {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  completedAt: string;
}
