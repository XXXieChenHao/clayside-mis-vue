/*
 * @Author: xie chenhao
 * @Date: 2022-02-24 21:27:56
 * @LastEditTime: 2022-02-24 21:47:39
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\permission.ts
 * 生命不息，代码不止
 */
import router from './router'
import store from './store'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from './utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/findPassWord'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  // next()


  if (whiteList.indexOf(to.path) === -1 || false) {
    // 测试打开
    // next()
    // NProgress.done()
    store.dispatch('user/getToken').then((res) => {
      next()
      NProgress.done()
    }).catch(() => {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    })
  } else {
    next()
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})
