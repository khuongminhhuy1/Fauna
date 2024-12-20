import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const options = {
  // Toastification default options
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
}

const app = createApp(App)

app.use(router)
app.use(Toast, options)
app.mount('#app')
app.component('font-awesome-icon', FontAwesomeIcon)
