import type { ExamSession, Question, SubmitExamPayload } from '@/types/IExam'

// Mock data
const mockExams: Record<number, ExamSession> = {
  1: {
    id: 1,
    title: 'UAS Semester Ganjil 2024',
    totalQuestions: 10,
    answeredCount: 0,
    timeRemaining: 0,
    studentName: '',
    studentNis: '',
    isAutoSaving: false,
    submitted: false,
    questions: [
      {
        id: 1,
        number: 1,
        text: 'Ibukota Indonesia adalah?',
        options: [
          { id: 'A', text: 'Jakarta' },
          { id: 'B', text: 'Bandung' },
          { id: 'C', text: 'Surabaya' },
          { id: 'D', text: 'Medan' }
        ],
        isAnswered: false
      },
      {
        id: 2,
        number: 2,
        text: 'Siapa presiden pertama Indonesia?',
        options: [
          { id: 'A', text: 'Soekarno' },
          { id: 'B', text: 'Soeharto' },
          { id: 'C', text: 'B.J. Habibie' },
          { id: 'D', text: 'Abdurrahman Wahid' }
        ],
        isAnswered: false
      },
      // Tambahkan lebih banyak soal
    ]
  },
  2: {
    id: 2,
    title: 'Try Out UTBK 2025',
    totalQuestions: 10,
    answeredCount: 0,
    timeRemaining: 0,
    studentName: '',
    studentNis: '',
    isAutoSaving: false,
    submitted: false,
    questions: [
      {
        id: 1,
        number: 1,
        text: '1 + 1 = ?',
        options: [
          { id: 'A', text: '1' },
          { id: 'B', text: '2' },
          { id: 'C', text: '3' },
          { id: 'D', text: '4' }
        ],
        isAnswered: false
      }
    ]
  }
}

export const examService = {
  // Get exam data by ID
  async getExamById(examId: number): Promise<Omit<ExamSession, 'submitted' | 'answeredCount' | 'timeRemaining' | 'isAutoSaving'>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const exam = mockExams[examId]
        if (!exam) {
          throw new Error('Exam not found')
        }
        
        resolve({
          id: exam.id,
          title: exam.title,
          totalQuestions: exam.totalQuestions,
          questions: exam.questions,
          studentName: 'Ahmad Rizki Pratama',
          studentNis: '2024001'
        })
      }, 300)
    })
  },

  // Submit exam answers
  async submitExam(payload: SubmitExamPayload): Promise<{ success: boolean; score?: number }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Exam submitted:', payload)
        
        // Simulasi scoring (dummy logic)
        const score = Math.floor(Math.random() * 100)
        
        resolve({
          success: true,
          score
        })
      }, 1000)
    })
  },

  // Get exam results
  async getExamResults(examId: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          examId,
          score: 85,
          totalQuestions: 10,
          correctAnswers: 8,
          timeSpent: '01:25:30',
          submittedAt: new Date().toISOString()
        })
      }, 500)
    })
  }
}