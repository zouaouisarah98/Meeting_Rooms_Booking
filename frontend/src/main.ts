import { createApp } from 'vue'
import {createPinia} from "pinia";
import './style.css'

import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import axios from 'axios'

const app = createApp(App)

// const pinia = createPinia()
app.use(createPinia())
app.use(axios)

app.mount('#app')
