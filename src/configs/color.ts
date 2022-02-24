/*
 * @Author: xie chenhao
 * @Date: 2022-02-13 22:31:13
 * @LastEditTime: 2022-02-13 22:34:04
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\configs\color.ts
 * 生命不息，代码不止
 */

interface Color {
  [proppName:string]:any;
}

const Color: Color  = {
  menuText: '#fff',
  menuActiveText: '#fff',
  subMenuActiveText: '#fff',
  menuBg: '#333333',
  menuHover: '#1890FF',
  $subMenuBg: '#333',
  $subMenuHover: '#1890FF',
  $sideBarWidth: '210px',
  $blue: '#1890FF',
  $fz: '16px',
  // dialog
  $w800: '800px',
  $w500: '500px',
  $w300: '300px',
}

export default Color