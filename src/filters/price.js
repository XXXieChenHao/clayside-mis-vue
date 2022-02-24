// 处理金额
function fixedPrice(price) {
  var count = price || 0
  return Number(count).toFixed(2)
}

// 处理规格 花括号
function specFormate(spec) {
  return spec.replace(/\{|}/g, "")
}

export {
  fixedPrice,
  specFormate
}