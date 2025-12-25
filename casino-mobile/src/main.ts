import { createApp } from 'vue'
import App from '@/App'
import router from '@/router'
import '@/styles/tailwind.css'
import '@/styles/base.css'
import '@/styles/mobile.css'

createApp(App).use(router).mount('#app')
