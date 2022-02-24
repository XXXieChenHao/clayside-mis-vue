/*
 * @Author: xie chenhao
 * @Date: 2022-02-14 20:19:38
 * @LastEditTime: 2022-02-24 21:54:16
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\libs\http.ts
 * 生命不息，代码不止
 */
import axios, { AxiosRequestConfig, Method } from "axios";
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus'
import { sStorage } from '@/hooks/storage/index'
import store from '../store'


const $router = useRouter();

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
 const toLogin = () => {
  $router.replace({
    name: 'Login',
  });
}

const errorHandle = (status: number, other: string) => {
  // 状态码判断
  switch (status) {
    case -10000:
      ElMessage.error('登录过期，请重新登录');
      toLogin()
      break;
    case 500:
      ElMessage.error(other || '服务异常');
      break;
    case 0:
      ElMessage.error(other || '服务异常');
      break;
    case 401:
      ElMessage.error(other || '登录过期，请重新登录');
      break;
    case 403:
      ElMessage.error(other || '无权限访问');
      break;
    case 404:
      ElMessage.error('网络请求不存在');
      break;
    default:
      ElMessage.error(other)
  }
}

interface PendingType {
  url?: string;
  method?: Method;
  params: any;
  data: any;
  cancel: any;
}

// 取消重复请求
const pending: Array<PendingType> = [];
const CancelToken = axios.CancelToken;

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key;
    const list: PendingType = pending[key];
    // 当前请求在数组中存在时执行函数体
    if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试');
      // 从数组中移除记录
      pending.splice(item, 1);
    }
  }
};

const instance = axios.create({
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin-Type": '*'
  },
  // 请求时长
  timeout: 1000 * 30,
  baseURL: '/api/',
  withCredentials: false,
})

instance.interceptors.request.use(config => {
  console.log(config, '---')
  removePending(config);
  config.cancelToken = new CancelToken((c) => {
    pending.push({ url: config.url, method: config.method, params: config.params, data: config.data, cancel: c });
  });

  (config as any).headers.common['User-Token'] = store.getters.token && store.getters.token != 'null' ? store.getters.token : sStorage.get('token') ;
  (config as any).headers.common['Cache-Control'] = 'no-cache';
  (config as any).headers.common['source'] = 2;

  return config
},
error => {
  ElMessage.error(error.data.error.message);
  return Promise.reject(error.data.error.message);
})

instance.interceptors.response.use(function (config) {
  removePending(config.config);
  if (config.status === 200 ) {
    return Promise.resolve(config.data);
  } else {
    return Promise.reject(config.data);
  }
}, function(error) {
  const { response } = error;
  if (response) {
    errorHandle(response.status, response.data.message);

    // 超时重新请求
    const config = error.config;
    // 全局的请求次数,请求的间隙
    const [RETRY_COUNT, RETRY_DELAY] = [0
      , 1000];

    if (config && RETRY_COUNT) {
      // 设置用于跟踪重试计数的变量
      config.__retryCount = config.__retryCount || 0;
      // 检查是否已经把重试的总数用完
      if (config.__retryCount >= RETRY_COUNT) {
        return Promise.reject(response || { message: error.message });
      }
      // 增加重试计数
      config.__retryCount++;
      // 创造新的Promise来处理指数后退
      const backoff = new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, RETRY_DELAY || 1);
      });
      // instance重试请求的Promise
      return backoff.then(() => {
        return instance(config);
      });
    }

    return Promise.reject(response);
  }
})

export default instance
