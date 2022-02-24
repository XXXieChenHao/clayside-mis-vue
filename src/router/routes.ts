import { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw [] = [  {
  path: '/redirect',
  component: Layout,
  meta: { hidden: true },
  children: [
    {
      path: '/redirect/:path(.*)*',
      component: () => import('@/views/Redirect/index.vue')
    }
  ]
}, {
  path: '/',
  component: Layout,
  redirect: '/userCenter',
  meta: { hidden: true },
},
{
  path: '/login',
  name: 'Login',
  component: () => import('@/views/Login/index.vue'),
  meta: { hidden: true },
},
{
  path: '/findPassWord',
  name: 'FindPwd',
  component: () => import('@/views/FindPwd/index.vue'),
  meta: { hidden: true },
},

{
  path: '/userCenter',
  component: Layout,
  redirect: '/userCenter/userInfo',
  meta: {
    title: '用户管理',
    icon: 'iconRectangleCopy'
  },
  children: [{
    path: 'userInfo',
    component: () => import('@/views/UserCenter/UserInfo/index.vue'),
    name: 'UserInfo',
    meta: { title: '用户信息', affix: false }
  }, {
    path: 'userSafe',
    component: () => import('@/views/UserCenter/UserSafe/index.vue'),
    name: 'UserSafe',
    meta: { title: '安全中心', affix: false }
  }]
},

// ------------- 店铺管理 -------------
{
  path: '/storeManage',
  component: Layout,
  redirect: '/storeMange/sortmanage',
  meta: {
    title: '店铺管理',
    icon: 'iconRectangleCopy'
  },
  children: [{
    path: 'sortManage',
    component: () => import('@/views/StoreManage/SortManage/index.vue'),
    name: 'SortManage',
    meta: { title: '分类管理', affix: false }
  }, {
    path: 'labelManage',
    component: () => import('@/views/StoreManage/LabelManage/index.vue'),
    name: 'LabelManage',
    meta: { title: '标签管理', affix: false }
  }]
},

// ------------- 商户管理 -------------
{
  path: '/merchantManage',
  component: Layout,
  redirect: '/merchantManage/merchantList',
  meta: {
    title: '商户管理',
    icon: 'iconRectangleCopy'
  },
  children: [{
    path: 'merchantList',
    component: () => import('@/views/MerchantManage/MerchantList/index.vue'),
    name: 'MerchantList',
    meta: { title: '商户列表', affix: false }
  }, {
    path: 'merchantConfig',
    component: () => import('@/views/MerchantManage/MerchantConfig/index.vue'),
    name: 'MerchantConfig',
    meta: { title: '商户配置', affix: false }
  }, {
    path: 'miniConfig',
    component: () => import('@/views/MerchantManage/MiniConfig/index.vue'),
    name: 'MiniConfig',
    meta: { title: '小程序配置', affix: false }
  }, {
    path: 'freightConfig',
    component: () => import('@/views/MerchantManage/FreightConfig/index.vue'),
    name: 'FreightConfig',
    meta: { title: '运费配置', affix: false }
  }]
},

{
  path: '/customeManage',
  component: Layout,
  redirect: '/customeManage/customeList',
  meta: {
    title: '商户中心',
    icon: 'iconRectangleCopy'
  },
  children: [{
    path: 'clerkList',
    component: () => import('@/views/CustomeManage/ClerkList/index.vue'),
    name: 'ClerkList',
    meta: { title: '店员管理', affix: false }
  }, {
    path: 'customeList',
    component: () => import('@/views/CustomeManage/CustomeList/index.vue'),
    name: 'CustomeList',
    meta: { title: '客户管理', affix: false }
  }, {
    path: 'memberRules',
    component: () => import('@/views/CustomeManage/MemberRules/index.vue'),
    name: 'MemberRules',
    meta: { title: '会员规则', affix: false }
  }, {
    path: 'depositRules',
    component: () => import('@/views/CustomeManage/DepositRules/index.vue'),
    name: 'DepositRules',
    meta: { title: '押金规则', affix: false }
  }]
}]

export default routes