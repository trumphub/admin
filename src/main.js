import Vue from 'vue'

// 样式重置
import 'normalize.css/normalize.css'

// element-ui
import ElementUI from 'element-ui'
import './styles/element-variables.scss'
import './styles/index.scss'

import App from './App'
import router from "./router"

import './icons'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
