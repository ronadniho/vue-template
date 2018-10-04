import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DatePicker from '@/pages/DatePicker/DatePicker'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'datePicker',
      component: DatePicker
    },
  ]
})
