import Vue from 'vue'
import Vuex from 'vuex'
import {search} from './search/search'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    search
  }
})



export {store}
