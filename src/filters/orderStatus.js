function getOrderStatusChinese(status) {
  switch (status) {
    case -10:
      return "已删除"
    case 10:
      return "待审核"
    case 20:
      return "审核驳回"
    case 110:
      return "待支付"
    case 120:
      return "待发货"
    case 130:
      return "已确认"
    case 140:
      return "已发货"
    case 150:
      return "已妥投"
    case 160:
      return "已完成"
    case 170:
      return "申请售后"
    case 180:
      return "退款中"
    case 190:
      return "部分退款"
    case 210:
      return "已取消"
    case 220:
      return "取消未退款"
    case 230:
      return "取消并退款"
    case 240:
      return "拒收未退款"
    case 250:
      return "拒收已退款"
    case 260:
      return "全部退款"
    default:
      return "-"
  }
}
export {
  getOrderStatusChinese
}