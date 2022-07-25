import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

const pinia = createPinia()

const app = createApp(App)

// app.http.options.root('https://christinaneal.me/wp-json')

app.config.globalProperties.apiURL = 'https://christinaneal.me/wp-json'

app.use(pinia)
app.mount('#app')
