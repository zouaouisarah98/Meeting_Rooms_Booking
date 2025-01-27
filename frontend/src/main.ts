import { createApp } from 'vue'
import {createPinia} from "pinia";
import './style.css'

import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css';
import "bootstrap/dist/css/bootstrap.min.css"

import "bootstrap"
import 'vxe-table'
import 'xe-utils'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'vxe-table/lib/style.css'
import VXETable from 'vxe-table';
import axios from 'axios'

const app = createApp(App)

// const pinia = createPinia()
app.use(createPinia())
app.use(axios)
app.use(VXETable)
app.use(ElementPlus)
// app.use(VueScheduler)

app.mount('#app')
