/*
 * @Author: xie chenhao
 * @Date: 2022-02-24 21:27:23
 * @LastEditTime: 2022-02-24 21:47:14
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\store\index.ts
 * 生命不息，代码不止
 */
import { createStore } from "vuex";

let modules = {}
const modulesFiles = import.meta.globEager('./modules/*.ts')
// console.log(modulesFiles,"过滤出多少个")
for (const path in modulesFiles) {
    const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
    // console.log(moduleName,"模块名字")
    // modules = { ...modules, ...modulesFiles[path] }
    modules = {...modules,[moduleName]:modulesFiles[path].default}
}

export default createStore ({
    modules: modules,
})