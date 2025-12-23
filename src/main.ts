import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import './style.css'
import pinia from './stores'

createApp(App).use(router).use(pinia).mount('#app')
