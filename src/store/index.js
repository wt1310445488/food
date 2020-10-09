import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import waiters from './waiters/index'
import customer from './customer/index'
import products from './products/index'
import category from './category/index'
import order from './order/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    waiters,
    customer,
    products,
    category,
    order
  },
  getters
})

export default store
