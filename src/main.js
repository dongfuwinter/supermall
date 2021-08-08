import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Fastclick from 'fastclick'
// import VueLazyLoad from "vue-lazyload";

// 安装插件
// createApp(App).
// 解决移动端300ms延迟
Fastclick.attach(document.body)

createApp(App).use(store).use(router).mount('#app')
