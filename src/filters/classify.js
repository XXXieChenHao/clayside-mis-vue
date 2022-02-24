export const distanceFatherLevel = (level) => {
  switch ( Number(level) ) {
    case -1:
      return  '总分类'
    case 0:
      return  '一级'
    case 1:
      return  '二级'
    case 2:
      return  '三级'
  }
}

export const distanceSonLevel = (level) => {
  switch ( Number(level) ) {
    case -1:
      return  '一级'
    case 0:
      return  '二级'
    case 1:
      return  '三级'
  }
}