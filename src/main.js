import { createApp } from 'vue'
import App from './App.vue'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import './index.css'

const app = createApp(App)
app.mount('#app')
app.component('EasyDataTable', Vue3EasyDataTable);
