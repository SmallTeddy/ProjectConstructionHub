<script setup lang="ts" name="ZTable">
import { ref, computed, watch, nextTick, defineExpose } from 'vue'
import { ElTable } from 'element-plus'
import { ZTableOptions } from './types'

const props = withDefaults(
  defineProps<{
    // 表格配置选项
    propList: ZTableOptions[]
    // 表格数据
    data: any[]
    // 表格高度
    height?: string | number
    maxHeight?: string | number
    // 显示复选框
    showSelectColumn?: boolean
    // 显示复选框
    showExpand?: boolean
    // 显示序号
    showIndexColumn?: boolean
    // 显示操作column
    operation?: boolean
    // 操作column 宽度
    operationWidth?: string
    moreOperationsPopoverWidth?: string
    // 加载状态
    loading?: boolean
    // 加载文案
    loadingText?: string
    // 加载图标名
    elementLoadingSpinner?: string
    // 是否显示分页
    pagination?: boolean
    // 显示分页的对齐方式
    paginationAlign?: 'left' | 'center' | 'right'
    pageInfo?: any
    // 显示分页数据多少条的选项
    pageSizes?: number[]
    // 数据总条数
    total?: number
    emptyImg?: boolean
  }>(),
  {
    propList: () => [],
    height: '100%',
    operation: true,
    operationWidth: '240px',
    moreOperationsPopoverWidth: '160px',
    paginationAlign: 'right',
    pageInfo: () => ({ page: 1, size: 10 }),
    pageSizes: () => [10, 15, 20, 30],
    total: 0,
    emptyImg: true
  }
)

const ZTableRef = ref<InstanceType<typeof ElTable>>()
const tablePropList: any = ref([])

watch(
  () => props.propList,
  (list) => {
    tablePropList.value = []
    nextTick(() => {
      tablePropList.value = JSON.parse(JSON.stringify(list))
    })
  },
  {
    immediate: true
  }
)

// 表格分页的排列方式
const justifyContent = computed(() => {
  if (props.paginationAlign === 'left') return 'flex-start'
  else if (props.paginationAlign === 'right') return 'flex-end'
  else return 'center'
})

const emits = defineEmits([
  'row-click',
  'select-rows',
  'page-change',
  'sort-change',
  'operation-click'
])

const handleOperationClick = (row: any, code: string, index: number) => {
  emits('operation-click', code, row, index)
}
const selectable = (row: any, index: any) => {
  return !row.noSelectable
}
const handleRowClick = (row: any, column: any) => {
  if (column?.label == '操作') return
  emits('row-click', row, column)
}
const handleSelectionChange = (list: any) => {
  emits('select-rows', list)
}
const handleSizeChange = (size: number) => {
  emits('page-change', { page: 1, size })
}
const handleCurrentChange = (page: number) => {
  emits('page-change', { ...props.pageInfo, page })
}
const changeTableSort = (value: any) => {
  emits('sort-change', value)
}
const toggleSelection = (rows?: any) => {
  if (rows) {
    rows.forEach((row: any) => {
      ZTableRef.value!.toggleRowSelection(row, true)
    })
  } else {
    ZTableRef.value!.clearSelection()
  }
}

defineExpose({
  toggleSelection
})
</script>

<template>
  <div class="z-table">
    <el-table :data="data" :height="height" :max-height="maxHeight" ref="ZTableRef" v-loading="loading"
      :element-loading-text="loadingText" :element-loading-spinner="elementLoadingSpinner" stripe
      @sort-change="changeTableSort" @row-click="handleRowClick" @selection-change="handleSelectionChange"
      v-bind="$attrs">
      <template #empty v-if="emptyImg">
        <div class="empty-box">
          <el-empty></el-empty>
        </div>
      </template>
      <el-table-column type="expand" v-if="showExpand">
        <template #default="scope">
          <slot name="baseExpandSlot" :row="scope.row"></slot>
        </template>
      </el-table-column>
      <el-table-column v-if="showSelectColumn" type="selection" :selectable="selectable" fixed="left" align="center"
        width="55"></el-table-column>
      <el-table-column v-if="showIndexColumn" fixed="left" type="index" label="序号" align="center"
        width="55"></el-table-column>
      <template v-for="propItem in tablePropList" :key="propItem.prop">
        <template v-if="propItem.visible !== false">
          <template v-if="!propItem.slotName">
            <el-table-column v-bind="propItem"></el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="propItem">
              <template #default="scope">
                <slot :name="propItem.slotName" :format="propItem.dateFormat" :row="scope.row" :prop="propItem.prop"
                  :index="scope.$index">
                </slot>
              </template>
            </el-table-column>
          </template>
        </template>
      </template>
      <el-table-column v-if="operation" label="操作" :width="operationWidth" fixed="right">
        <template #default="scope">
          <template v-if="scope.row.operations">
            <div class="operations-wrap">
              <template v-for="(o, i) in scope.row.operations" :key="o.code">
                <el-button v-if="i < 3" text type="primary" size="small" :disabled="o.disabled"
                  @click="handleOperationClick(scope.row, o.code, scope.$index)">
                  {{ o.name }}
                </el-button>
              </template>
              <el-popover placement="bottom-end" :width="moreOperationsPopoverWidth"
                v-if="scope.row.operations.length > 3">
                <template #reference>
                  <el-icon color="#26A5FF" class="more-dot">
                    <MoreFilled />
                  </el-icon>
                </template>
                <div class="more-operations">
                  <template v-for="(o, i) in scope.row.operations" :key="o.code">
                    <el-button v-if="i > 2" text type="primary" size="small" :disabled="o.disabled" @click="
                      handleOperationClick(scope.row, o.code, scope.$index)
                      ">
                      {{ o.name }}
                    </el-button>
                  </template>
                </div>
              </el-popover>
            </div>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="pagination" class="pagination" :style="{ justifyContent }">
      <el-pagination small :current-page="pageInfo.page" :page-sizes="pageSizes" :page-size="pageInfo.size"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange"></el-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.operations-wrap {
  .el-button+.el-button {
    margin-left: 25px;
  }

  .more-dot {
    position: relative;
    top: 0.3em;
    margin-left: 25px;
    font-size: 20px;
    cursor: pointer;
  }
}

.more-operations {
  display: flex;
  flex-wrap: wrap;

  .el-button {
    overflow: hidden;
    margin-left: 10px;
    height: 32px;
    border-radius: 8px;
    line-height: 32px;
  }
}

.el-loading-mask {
  z-index: 1;
}

.pagination {
  display: flex;
  margin-top: 16px;
}

.el-table__expand-column .cell {
  width: 55px;
}

.is-dark {
  max-width: 40%;
}
</style>
