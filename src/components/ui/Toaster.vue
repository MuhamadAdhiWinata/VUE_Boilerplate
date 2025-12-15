<template>
  <teleport to="body">
    <div class="fixed top-0 right-0 z-50 w-full max-w-md p-4 space-y-4 pointer-events-none">
      <transition-group name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto"
        >
          <div
            :class="[
              'flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all',
              toast.variant === 'destructive'
                ? 'border-destructive bg-destructive text-white'
                : 'border bg-background'
            ]"
          >
            <!-- Icon -->
            <div class="flex-shrink-0">
              <CheckCircle2 
                v-if="toast.variant === 'default'" 
                class="h-5 w-5 text-green-600" 
              />
              <AlertCircle 
                v-else 
                class="h-5 w-5" 
              />
            </div>

            <!-- Content -->
            <div class="flex-1 space-y-1">
              <div v-if="toast.title" class="font-semibold text-sm">
                {{ toast.title }}
              </div>
              <div v-if="toast.description" class="text-sm opacity-90">
                {{ toast.description }}
              </div>
            </div>

            <!-- Close Button -->
            <button
              @click="dismiss(toast.id)"
              class="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            >
              <X class="h-4 w-4" />
            </button>
          </div>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { useToast } from '@/hooks/use-toast'
import { CheckCircle2, AlertCircle, X } from 'lucide-vue-next'

const { toasts, dismiss } = useToast()
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.2s ease-in;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>