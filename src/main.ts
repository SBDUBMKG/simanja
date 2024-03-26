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
import { createHead } from '@unhead/vue'
import { VueRecaptchaPlugin } from 'vue-recaptcha'

const head = createHead()
const app = createApp(App);
app.use(store)
    .use(router)
    .use(VueSweetalert2)
    .use(head)
    .use(VueRecaptchaPlugin, {
        v2SiteKey: '6LcKtKQpAAAAAFVTzUAzVyrwx_EPsW1QDaJDoIPQ'
    })
    .mount('#app');
