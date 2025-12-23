import type { StudentResponse, ExamsResponse, Student, Exam } from '@/types/ICommon';

const mockStudent: Student = {
  id: 1,
  name: 'Ahmad Rizki Pratama',
  nis: '2024001',
  examCount: 3,
  avatar: ''
};

const mockExams: Exam[] = [
  {
    id: 1,
    title: 'UAS Semester Ganjil 2024',
    description: 'Ujian Akhir Semester Ganjil Tahun Ajaran 2024/2025 - Mata Pelajaran Informatika',
    status: 'ongoing' as const,
    questionCount: 10,
    duration: 90,
    date: '1 Desember 2024',
    time: '08.00',
  },
  {
    id: 2,
    title: 'Try Out UTBK 2025',
    description: 'Simulasi Ujian Tulis Berbasis Komputer untuk persiapan SNBT 2025',
    status: 'ongoing' as const,
    questionCount: 10,
    duration: 120,
    date: '15 Desember 2024',
    time: '08.00',
  },
  {
    id: 3,
    title: 'UTS Semester Genap 2025',
    description: 'Ujian Tengah Semester Genap - Akan dimulai bulan Maret 2025',
    status: 'completed' as const,
    questionCount: 0,
    duration: 60,
    date: '1 Maret 2025',
    time: '08.00',
  }
];

// Service untuk mengambil data dari API
export class ExamService {
  // private apiBaseUrl: string;

  // constructor(apiBaseUrl?: string) {
  //   this.apiBaseUrl = apiBaseUrl || import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';
  // }

  // Method untuk mengambil data siswa
  async getStudentData(): Promise<StudentResponse> {
    try {
      // Contoh implementasi dengan fetch API
      // const response = await fetch(`${this.apiBaseUrl}/students/${studentId || 'me'}`);
      // const data = await response.json();
      // return data;
      
      // Untuk sekarang pakai mock data
      return {
        data: mockStudent,
        message: 'Student data retrieved successfully',
        success: true
      };
    } catch (error) {
      console.error('Error fetching student data:', error);
      throw error;
    }
  }

  // Method untuk mengambil daftar ujian
  async getExams(status?: string): Promise<ExamsResponse> {
    try {
      // Contoh implementasi dengan fetch API
      // let url = `${this.apiBaseUrl}/exams`;
      // const params = new URLSearchParams();
      // if (studentId) params.append('studentId', studentId.toString());
      // if (status) params.append('status', status);
      // if (params.toString()) url += `?${params.toString()}`;
      
      // const response = await fetch(url);
      // const data = await response.json();
      // return data;

      // Filter berdasarkan status jika diperlukan
      let filteredExams = mockExams;
      if (status) {
        filteredExams = mockExams.filter(exam => exam.status === status);
      }

      return {
        data: filteredExams,
        message: 'Exams retrieved successfully',
        success: true
      };
    } catch (error) {
      console.error('Error fetching exams:', error);
      throw error;
    }
  }

  // Method untuk memulai ujian
  async startExam(examId: number): Promise<{ success: boolean; message: string; redirectUrl?: string }> {
    try {
      // Contoh implementasi dengan fetch API
      // const response = await fetch(`${this.apiBaseUrl}/exams/${examId}/start`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ studentId: 1 }) // Ganti dengan student ID yang sesuai
      // });
      // const data = await response.json();
      // return data;

      // Mock response
      console.log(`Starting exam with ID: ${examId}`);
      
      // Simulasi delay network
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        success: true,
        message: 'Exam started successfully',
        redirectUrl: `/exam/${examId}`
      };
    } catch (error) {
      console.error('Error starting exam:', error);
      return {
        success: false,
        message: 'Failed to start exam'
      };
    }
  }

  // Method untuk mengambil ujian berdasarkan ID
  async getExamById(examId: number): Promise<Exam | null> {
    try {
      // Contoh implementasi dengan fetch API
      // const response = await fetch(`${this.apiBaseUrl}/exams/${examId}`);
      // const data = await response.json();
      // return data.data;

      const exam = mockExams.find(e => e.id === examId);
      return exam || null;
    } catch (error) {
      console.error('Error fetching exam by ID:', error);
      return null;
    }
  }
}

// Buat instance default untuk digunakan di komponen
export const examService = new ExamService();