/*
 * @Author: xie chenhao
 * @Date: 2022-02-14 20:28:15
 * @LastEditTime: 2022-02-14 20:34:46
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\hooks\storage\index.ts
 * 生命不息，代码不止
 */

/**
 * 关于本地存储
 */
 const useStorage = ($storage: any) => {
  /**
   * 根据 key 值获取储存在 storage 中的值
   * @param key storage key
   */
  const get = (key: string) => {
    let value = $storage.getItem(key);
    try {
      value = JSON.parse(value);
      return value;
    } catch {
      return value;
    }
  }

  /**
   * 根据 key 值向 storage 中储存值
   * @param key storage key
   * @param value 需要储存在 storage 中的值
   */
  const set = (key: string, value: any) => {
    return $storage.setItem(key, value ? JSON.stringify(value) : value);
  }

  /**
   * 根据 key 值移除储存在 storage 中的值
   * @param key storage key
   */
  const remove = (key: string) => {
    return $storage.removeItem(key);
  }

  /**
   * 移除除了 key 之外的所有储存在 storage 中的值
   * @param key storage key
   */
  const clearExcept = (key: string) => {
    for (let i = 0; i < $storage.length; i++) {
      const itemKey: string | undefined = $storage.key(i);
      if (itemKey && itemKey !== key) {
        $storage.removeItem(itemKey);
      }
    }
  }

  /**
   * 移除所有储存在 storage 中的值
   */
  const clearAll = () => {
    for (const itemKey in $storage) {
      if (itemKey) {
        $storage.removeItem(itemKey);
      }
    }
  }

  return {
    get,
    set,
    remove,
    clearExcept,
    clearAll,
  }
}

const sStorage = useStorage(window.sessionStorage || sessionStorage)
const lStorage = useStorage(window.localStorage || localStorage)

export {
  sStorage,
  lStorage,
}