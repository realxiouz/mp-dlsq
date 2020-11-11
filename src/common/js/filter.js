import Vue from 'vue'
import { ORDER_STATUS } from '@/common/js/const'
import dayjs from 'dayjs'

Vue.filter('time', function(val, fmt="YYYY-MM-DD HH:mm") {
  return dayjs(val ? val * 1000 : new Date()).format(fmt)
})

Vue.filter('orderStatus', function(val) {
  if (val) {
    return ORDER_STATUS[val] || '状态异常'
  } else {
    return 'err'
  }
})