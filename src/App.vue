<script setup lang="ts">
import { useRoute } from "vue-router"
import AppSidebar from "./components/AppSidebar.vue"
import AppNavbar from "@/components/AppNavbar.vue"
import SidebarProvider from "./components/ui/sidebar/SidebarProvider.vue"
import Toaster from "./components/ui/Toaster.vue"

const route = useRoute()
const mode = import.meta.env.VITE_MODE
</script>

<template>
  <SidebarProvider>
    <AppSidebar v-if="route.meta?.layout === 'app'" />
    
    <main class="flex-1 flex flex-col">
      <AppNavbar v-if="route.meta?.layout === 'app'" />
      <!-- <AppNavbar v-if="route.meta?.layout === 'app'" /> -->
      
      <div class="min-h-screen bg-background p-4">
        <RouterView />
        <Toaster />
      </div>
    </main>
  </SidebarProvider>

  <div
    v-if="mode === 'development'"
    class="fixed bottom-6 -left-9 z-50 pointer-events-none"
  >
    <div
      class="bg-red-600 text-white px-10 py-1.5 transform rotate-45 font-bold text-xs uppercase tracking-wider shadow-lg"
    >
      Development
    </div>
  </div>
</template>
