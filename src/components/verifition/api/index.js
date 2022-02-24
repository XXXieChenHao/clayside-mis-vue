/*
 * @Author: xie chenhao
 * @Date: 2022-02-14 22:40:11
 * @LastEditTime: 2022-02-17 21:07:27
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\components\verifition\api\index.js
 * 生命不息，代码不止
 */
/**
 * 此处可直接引用自己项目封装好的 axios 配合后端联调
 */


// import request from "./../utils/axios"  //组件内部封装的axios
// import request from "@/api/axios.js"       //调用项目封装的axios
import { Request } from '@/libs/request.ts'

//获取验证图片  以及token
export function reqGet(data) {
	return Request.post( '/captcha/get',data)
}

//滑动或者点选验证
export function reqCheck(data) {
	return Request.post( '/captcha/check',data)
}


