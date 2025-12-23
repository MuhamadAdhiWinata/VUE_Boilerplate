<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="bg-card border-b border-border">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileCheckIcon class="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 class="font-bold text-xl text-card-foreground">Hasil Ujian</h1>
              <p class="text-sm text-muted-foreground">{{ results?.examTitle }}</p>
            </div>
          </div>
          
          <Button variant="outline" @click="goHome" class="gap-2">
            <HomeIcon class="w-4 h-4" />
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto px-4 py-12">
      <div class="text-center">
        <div class="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <p class="mt-4 text-muted-foreground">Memuat hasil ujian...</p>
      </div>
    </div>

    <!-- Results Content -->
    <main v-else-if="results" class="container mx-auto px-4 py-8">
      <!-- Score Summary Card -->
      <div class="bg-card rounded-xl p-8 shadow-sm border border-border mb-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Score -->
          <div class="lg:col-span-1 flex flex-col items-center justify-center text-center">
            <div class="relative w-40 h-40 mb-4">
              <!-- Circular Progress -->
              <svg class="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  class="text-muted"
                  stroke-width="8"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  :class="getScoreColorClass(results.score)"
                  stroke-width="8"
                  fill="none"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="progressOffset"
                  stroke-linecap="round"
                  class="transition-all duration-1000 ease-out"
                />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-4xl font-bold text-card-foreground">{{ results.score }}</span>
                <span class="text-sm text-muted-foreground">dari 100</span>
              </div>
            </div>
            
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              :class="results.score >= 75 
                ? 'bg-success/10 text-success' 
                : 'bg-destructive/10 text-destructive'">
              <component :is="results.score >= 75 ? CheckCircleIcon : XCircleIcon" class="w-5 h-5" />
              <span class="font-semibold">
                {{ results.score >= 75 ? 'LULUS' : 'TIDAK LULUS' }}
              </span>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="lg:col-span-2 grid grid-cols-2 gap-4">
            <!-- Correct Answers -->
            <div class="bg-success/5 border border-success/20 rounded-lg p-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckIcon class="w-6 h-6 text-success" />
                </div>
                <div>
                  <p class="text-sm text-muted-foreground">Jawaban Benar</p>
                  <p class="text-2xl font-bold text-card-foreground">{{ results.correctAnswers }}</p>
                </div>
              </div>
            </div>

            <!-- Wrong Answers -->
            <div class="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <XIcon class="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p class="text-sm text-muted-foreground">Jawaban Salah</p>
                  <p class="text-2xl font-bold text-card-foreground">{{ results.wrongAnswers }}</p>
                </div>
              </div>
            </div>

            <!-- Time Spent -->
            <div class="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ClockIcon class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p class="text-sm text-muted-foreground">Waktu Digunakan</p>
                  <p class="text-2xl font-bold text-card-foreground">{{ results.timeSpent }}</p>
                </div>
              </div>
            </div>

            <!-- Unanswered -->
            <div class="bg-muted/50 border border-border rounded-lg p-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  <AlertCircleIcon class="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p class="text-sm text-muted-foreground">Tidak Dijawab</p>
                  <p class="text-2xl font-bold text-card-foreground">{{ results.unansweredCount }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Student Info & Submission Time -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h3 class="font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <UserIcon class="w-5 h-5 text-primary" />
            Informasi Peserta
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Nama</span>
              <span class="font-medium text-card-foreground">{{ results.studentName }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">NIS</span>
              <span class="font-medium text-card-foreground">{{ results.studentNis }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Kelas</span>
              <span class="font-medium text-card-foreground">{{ results.studentClass || 'XII IPA 1' }}</span>
            </div>
          </div>
        </div>

        <div class="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h3 class="font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <CalendarIcon class="w-5 h-5 text-primary" />
            Waktu Pengumpulan
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Tanggal</span>
              <span class="font-medium text-card-foreground">{{ formatDate(results.submittedAt) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Waktu</span>
              <span class="font-medium text-card-foreground">{{ formatTime(results.submittedAt) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Durasi</span>
              <span class="font-medium text-card-foreground">{{ results.timeSpent }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Question Review -->
      <div class="bg-card rounded-xl p-6 shadow-sm border border-border mb-6">
        <h3 class="font-semibold text-lg text-card-foreground mb-4 flex items-center gap-2">
          <ListChecksIcon class="w-5 h-5 text-primary" />
          Review Jawaban
        </h3>

        <div class="grid grid-cols-1 gap-4">
          <div 
            v-for="question in results.questions" 
            :key="question.number"
            class="border border-border rounded-lg p-4 transition-colors"
            :class="getQuestionBgClass(question)"
          >
            <div class="flex items-start gap-4">
              <!-- Question Number -->
              <div class="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                :class="getQuestionNumberClass(question)">
                {{ question.number }}
              </div>

              <!-- Question Content -->
              <div class="flex-1 space-y-3">
                <p class="font-medium text-card-foreground">{{ question.text }}</p>

                <!-- Single Choice Display -->
                <div v-if="question.type === 'single'" class="space-y-2">
                  <div 
                    v-for="option in question.options" 
                    :key="option.id"
                    class="flex items-center gap-3 p-3 rounded-lg border"
                    :class="getOptionDisplayClass(option, question)"
                  >
                    <span class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
                      :class="getOptionLabelDisplayClass(option, question)">
                      {{ option.id }}
                    </span>
                    <span class="flex-1">{{ option.text }}</span>
                    <component 
                      v-if="option.id === question.correctAnswer"
                      :is="CheckCircleIcon" 
                      class="w-5 h-5 text-success flex-shrink-0" 
                    />
                    <component 
                      v-else-if="option.id === question.userAnswer"
                      :is="XCircleIcon" 
                      class="w-5 h-5 text-destructive flex-shrink-0" 
                    />
                  </div>
                </div>

                <!-- Multiple Choice Display -->
                <div v-else class="space-y-2">
                  <div 
                    v-for="option in question.options" 
                    :key="option.id"
                    class="flex items-center gap-3 p-3 rounded-lg border"
                    :class="getOptionMultipleDisplayClass(option, question)"
                  >
                    <span class="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold"
                      :class="getOptionMultipleLabelDisplayClass(option, question)">
                      {{ option.id }}
                    </span>
                    <span class="flex-1">{{ option.text }}</span>
                    <component 
                      v-if="question.correctAnswers?.includes(option.id) && question.userAnswers?.includes(option.id)"
                      :is="CheckCircleIcon" 
                      class="w-5 h-5 text-success flex-shrink-0" 
                    />
                    <component 
                      v-else-if="question.correctAnswers?.includes(option.id)"
                      :is="AlertCircleIcon" 
                      class="w-5 h-5 text-muted-foreground flex-shrink-0" 
                    />
                    <component 
                      v-else-if="question.userAnswers?.includes(option.id)"
                      :is="XCircleIcon" 
                      class="w-5 h-5 text-destructive flex-shrink-0" 
                    />
                  </div>
                </div>

                <!-- Answer Summary -->
                <div class="flex items-center gap-4 text-sm pt-2 border-t border-border">
                  <div class="flex items-center gap-1.5">
                    <span class="text-muted-foreground">Jawaban Anda:</span>
                    <span class="font-medium text-card-foreground">
                      {{ question.type === 'single' 
                        ? (question.userAnswer || 'Tidak dijawab') 
                        : (question.userAnswers?.join(', ') || 'Tidak dijawab') 
                      }}
                    </span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="text-muted-foreground">Kunci Jawaban:</span>
                    <span class="font-medium text-success">
                      {{ question.type === 'single' 
                        ? question.correctAnswer 
                        : question.correctAnswers?.join(', ') 
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button @click="printResults" variant="outline" class="gap-2">
          <PrinterIcon class="w-4 h-4" />
          Cetak Hasil
        </Button>
        <Button @click="goHome" class="gap-2">
          <HomeIcon class="w-4 h-4" />
          Kembali ke Beranda
        </Button>
      </div>
    </main>

    <!-- Error State -->
    <div v-else class="container mx-auto px-4 py-12">
      <div class="text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircleIcon class="w-8 h-8 text-destructive" />
        </div>
        <h2 class="text-xl font-semibold text-card-foreground mb-2">Hasil Tidak Ditemukan</h2>
        <p class="text-muted-foreground mb-6">Tidak ada hasil ujian yang tersedia</p>
        <Button @click="goHome">Kembali ke Beranda</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  FileCheckIcon,
  HomeIcon,
  CheckCircleIcon,
  XCircleIcon,
  CheckIcon,
  XIcon,
  ClockIcon,
  AlertCircleIcon,
  UserIcon,
  CalendarIcon,
  ListChecksIcon,
  PrinterIcon
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const router = useRouter()
const loading = ref(true)
const results = ref<any>(null)

// Circular progress calculations
const circumference = 2 * Math.PI * 70
const progressOffset = computed(() => {
  if (!results.value) return circumference
  const progress = results.value.score / 100
  return circumference - (progress * circumference)
})

// Mock data - replace with actual API call
onMounted(async () => {
  setTimeout(() => {
    results.value = {
      examId: 1,
      examTitle: 'UAS Semester Ganjil 2024',
      score: 87,
      totalQuestions: 15,
      correctAnswers: 13,
      wrongAnswers: 1,
      unansweredCount: 1,
      timeSpent: '01:15:23',
      studentName: 'Ahmad Rizki Pratama',
      studentNis: '2024001',
      studentClass: 'XII IPA 1',
      submittedAt: new Date().toISOString(),
      questions: [
        {
          number: 1,
          type: 'single',
          text: 'Ibukota Indonesia adalah?',
          options: [
            { id: 'A', text: 'Jakarta' },
            { id: 'B', text: 'Bandung' },
            { id: 'C', text: 'Surabaya' },
            { id: 'D', text: 'Medan' }
          ],
          userAnswer: 'A',
          correctAnswer: 'A',
          isCorrect: true
        },
        {
          number: 2,
          type: 'single',
          text: 'Siapa presiden pertama Indonesia?',
          options: [
            { id: 'A', text: 'Soekarno' },
            { id: 'B', text: 'Soeharto' },
            { id: 'C', text: 'B.J. Habibie' },
            { id: 'D', text: 'Abdurrahman Wahid' }
          ],
          userAnswer: 'B',
          correctAnswer: 'A',
          isCorrect: false
        },
        {
          number: 3,
          type: 'single',
          text: 'Pancasila terdiri dari berapa sila?',
          options: [
            { id: 'A', text: '3' },
            { id: 'B', text: '4' },
            { id: 'C', text: '5' },
            { id: 'D', text: '6' }
          ],
          userAnswer: 'C',
          correctAnswer: 'C',
          isCorrect: true
        },
        {
          number: 4,
          type: 'multiple',
          text: 'Pilih provinsi yang berada di Pulau Jawa!',
          options: [
            { id: 'A', text: 'DKI Jakarta' },
            { id: 'B', text: 'Bali' },
            { id: 'C', text: 'Jawa Barat' },
            { id: 'D', text: 'Jawa Tengah' },
            { id: 'E', text: 'Sumatera Utara' }
          ],
          userAnswers: ['A', 'C', 'D'],
          correctAnswers: ['A', 'C', 'D'],
          isCorrect: true
        },
        {
          number: 5,
          type: 'multiple',
          text: 'Manakah yang termasuk bahasa pemrograman?',
          options: [
            { id: 'A', text: 'Python' },
            { id: 'B', text: 'HTML' },
            { id: 'C', text: 'JavaScript' },
            { id: 'D', text: 'CSS' },
            { id: 'E', text: 'TypeScript' }
          ],
          userAnswers: null,
          correctAnswers: ['A', 'C', 'E'],
          isCorrect: false
        }
      ]
    }
    loading.value = false
  }, 800)
})

// Helper functions
const getScoreColorClass = (score: number) => {
  if (score >= 85) return 'text-success'
  if (score >= 75) return 'text-primary'
  return 'text-destructive'
}

const getQuestionBgClass = (question: any) => {
  if (question.isCorrect) return 'bg-success/5'
  if (!question.userAnswer && !question.userAnswers) return 'bg-muted/30'
  return 'bg-destructive/5'
}

const getQuestionNumberClass = (question: any) => {
  if (question.isCorrect) return 'bg-success/20 text-success'
  if (!question.userAnswer && !question.userAnswers) return 'bg-muted text-muted-foreground'
  return 'bg-destructive/20 text-destructive'
}

const getOptionDisplayClass = (option: any, question: any) => {
  if (option.id === question.correctAnswer) {
    return 'border-success bg-success/5'
  }
  if (option.id === question.userAnswer && option.id !== question.correctAnswer) {
    return 'border-destructive bg-destructive/5'
  }
  return 'border-border bg-background'
}

const getOptionLabelDisplayClass = (option: any, question: any) => {
  if (option.id === question.correctAnswer) {
    return 'bg-success text-success-foreground'
  }
  if (option.id === question.userAnswer && option.id !== question.correctAnswer) {
    return 'bg-destructive text-white'
  }
  return 'bg-muted text-muted-foreground'
}

const getOptionMultipleDisplayClass = (option: any, question: any) => {
  const isCorrect = question.correctAnswers?.includes(option.id)
  const isUserSelected = question.userAnswers?.includes(option.id)
  
  if (isCorrect && isUserSelected) {
    return 'border-success bg-success/5'
  }
  if (isCorrect && !isUserSelected) {
    return 'border-success/50 bg-success/5'
  }
  if (!isCorrect && isUserSelected) {
    return 'border-destructive bg-destructive/5'
  }
  return 'border-border bg-background'
}

const getOptionMultipleLabelDisplayClass = (option: any, question: any) => {
  const isCorrect = question.correctAnswers?.includes(option.id)
  const isUserSelected = question.userAnswers?.includes(option.id)
  
  if (isCorrect && isUserSelected) {
    return 'bg-success text-success-foreground'
  }
  if (isCorrect) {
    return 'bg-success/20 text-success'
  }
  if (isUserSelected) {
    return 'bg-destructive text-white'
  }
  return 'bg-muted text-muted-foreground'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })
}

const printResults = () => {
  window.print()
}

const goHome = () => {
  router.push('/dashboard')
}
</script>

<style scoped>
@media print {
  header button,
  main > div:last-child {
    display: none;
  }
}
</style>