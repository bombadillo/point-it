import { createApp } from 'vue'
import App from './NewApp.vue'
import router from './router';

const app = createApp(App)
app.use(router);
app.mount('#app')
