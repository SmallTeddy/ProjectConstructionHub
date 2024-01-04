<script lang="ts" setup>
import ZTable from '@/components/Table/index'
import { ref } from 'vue'
import { ZTableOptions } from '@/components/Table/types'

const tableData: any = ref([
  {
    fileName: '测试文件01',
    fileType: 'pdf',
    submitterName: '张三',
    submitTime: '2024-01-04 09:34:18'
  },
  {
    fileName: '测试文件02',
    fileType: 'png',
    submitterName: '李四',
    submitTime: '2024-01-04 11:26:57'
  }
])

const propList: ZTableOptions[] = [
  {
    showOverflowTooltip: true,
    label: '文件名称',
    prop: 'fileName',
    minWidth: 130,
    align: 'left'
  },
  {
    showOverflowTooltip: true,
    label: '文件类型',
    prop: 'fileType',
    minWidth: 130,
    align: 'left'
  },
  {
    label: '上传人',
    prop: 'submitterName',
    minWidth: 150,
    showOverflowTooltip: true
  },
  {
    label: '上传时间',
    prop: 'submitTime',
    minWidth: 160
  }
]
</script>

<template>
  <div>
    <z-table :propList="propList" :data="tableData" :operation="false"></z-table>
  </div>
</template>

<style scoped lang="scss">
</style>
