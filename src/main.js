import { createApp } from 'vue';
import App from './App.vue';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { HiSolidSwitchHorizontal, MdArrowdropdownRound } from "oh-vue-icons/icons";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import './index.css';

addIcons(HiSolidSwitchHorizontal, MdArrowdropdownRound);

const app = createApp(App);
app.component('EasyDataTable', Vue3EasyDataTable);
app.component('v-icon', OhVueIcon);
app.mount('#app');