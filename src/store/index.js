import Vue from 'vue'
import Vuex from 'vuex'

import getters from "./getters"

Vue.use(Vuex)

const context = require.context('./modules', false, /\.js$/)

const modules = context.keys().reduce((preVal, item) => {
    const moduleName = item.replace(/^\.\/(.*)\.\w+$/, '$1')
    preVal[moduleName] = context(item).default
    return preVal
}, {})

export default new Vuex.Store({
    modules,
    getters
})
