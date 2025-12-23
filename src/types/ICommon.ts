export interface Exam {
  id: number;
  title: string;
  description: string;
  status: 'ongoing' | 'completed' | 'upcoming';
  questionCount: number;
  duration: number;
  date: string;
  time: string;
}

export interface Student {
  id?: number;
  name: string;
  nis: string;
  examCount: number;
  avatar?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface StudentResponse extends ApiResponse<Student> {}
export interface ExamsResponse extends ApiResponse<Exam[]> {}