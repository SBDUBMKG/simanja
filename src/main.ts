import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './assets/styles/main.scss'
import './assets/styles/main.css'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);
app.use(store).use(router).use(VueSweetalert2).mount('#app');
