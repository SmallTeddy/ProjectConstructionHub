export interface ZTableOptions {
  // 是否可见
  visible?: boolean
  // 自定义列模板的插槽名
  slotName?: string
  // 日期格式化
  dateFormat?: string
  // 表头
  label: string
  // 字段名称
  prop?: string
  // 对应列的宽度
  width?: string | number
  minWidth?: string | number
  // 对齐方式
  align?: 'left' | 'center' | 'right'
  fixed?: true | 'left' | 'right'
  showOverflowTooltip?: boolean
  sortable?: boolean | 'custom'
}
