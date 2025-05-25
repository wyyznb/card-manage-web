<template>
  <div class="my-table" :class="`my-table--${size}`" ref="tableWrap">
    <el-table
        ref="tableRef"
        :row-class-name="tableRowClassName"
        v-loading="loading"
        :data="tableData"
        :border="border"
        :height="tableHeight"
        :max-height="maxHeight"
        :empty-text="emptyText"
        :row-key="getRowKeys"
        :header-cell-style="{
          'fond-size': '14px',
          'height': '48px',
          'font-weight': 'bold',
          'color': 'rgba(0, 0, 0, 0.85)',
          'background-color': '#F6F8FA',
          'border': 'none'
        }"
        :cell-style="{ 'text-align': 'left', height: '48px' }"
        tooltip-effect="dark"
        @selection-change="selectionChange"
        @sort-change="sortChange"
    >
      <el-table-column v-if="selection" :reserve-selection="true" type="selection" width="45" fixed align="center" :selectable="checkSelect">
      </el-table-column>
      <el-table-column v-if="showIndex" label="序号" :width="indexWidth" type="index">
        <template #default="scope">
          <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <template v-for="(item, index) in columns" :key="index">
        <!-- solt 自定义列-->
        <!--
        自定义列的使用方法:
        在使用插槽时#后跟slotType
        <template #createTime="scope">
        <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
        -->
        <template v-if="item.type === 'slot'">
          <el-table-column
              :class-name="item.class"
              :key="index"
              :width="item.width"
              :min-width="item.minWidth"
              :prop="item.prop"
              :label="item.label"
              :align="item.align ? item.align : 'left'"
              :fixed="item.fixed ? item.fixed : false"
          >
            
            <template #default="scope" v-if="item.slotType == 'options'">
              <el-button type="primary" text v-for="(btn, ind) in item.buttons" :key="ind" @click="btn.fn(scope.row)" v-if="item?.buttons?.length">{{ btn.text }}</el-button>
              <slot name="operation" :row="scope.row" :index="scope.$index" :column="scope.column" v-else />
            </template>
            <template #default="scope" v-else>
              <slot :name="item.slotType" :row="scope.row" :index="scope.$index" :column="scope.column"/>
            </template>
          </el-table-column>
        </template>
        <!--普通表格-->
        <template v-else>
          <el-table-column
              :show-overflow-tooltip="item.showOverflowTooltip === undefined ? true : item.showOverflowTooltip"
              v-if="item.visible !== false"
              :key="index"
              :sortable="item.sortable"
              :prop="item.prop"
              :label="item.label"
              :formatter="item.formatter || ((row)=>formatEmpty(row,item))"
              :width="item.width"
              :min-width="item.minWidth || '80'"
              :align="item.align ? item.align : 'left'"
              :fixed="item.fixed ? item.fixed : false"
          ></el-table-column>
        </template>
      </template>
    </el-table>
    <el-pagination
        v-if="showPagination"
        :total="total"
        :autoScroll="autoScroll"
        :pagerCount="pagerCount"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="pageSizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup>
import { useDisabled } from 'element-plus';
import {nextTick} from 'vue'
const props = defineProps({
  // 表单数据
  tableData: {
    type: Array,
    default() {
      return []
    }
  },
  // 表单大小
  size: {
    type: String,
    default: 'normal'
  },
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  
  // 数据列表配置
  columns: {
    type: Array,
    default() {
      return []
    }
  },
  // 是否开启翻页时自动回到顶部
  autoScroll: {
    type: Boolean,
    default: true
  },
  // 序号的宽度
  indexWidth: {
    type: Number,
    default: 80
  },
  // 行样式
  tableRowClassName: {
    type: Function,
    default() {
      return () => {
      }
    }
  },
  // 移动端页码按钮的数量端默认值5
  pagerCount: {
    type: Number,
    default: document.body.clientWidth < 992 ? 5 : 7
  },
  // 分页
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 50]
    }
  },
  // 边框
  border: {type: Boolean, default: false},
  // 高度
  height: {type: [Number, String], default: null},
  // 最大高度
  maxHeight: {type: [Number, String], default:  null},
  // 加载状态
  loading: {type: Boolean, default: false},
  // 是否多选
  selection: {type: Boolean, default: false},
  // 单元格的 style 的回调方法
  cellStyle: {
    type: Function,
    default() {
      return () => {
      }
    }
  },
  // 是否展示翻页组件
  showPagination: {type: Boolean, default: true},
  // 是否展示序号
  showIndex: {type: Boolean, default: false},
  // 总数
  total: {
    type: Number,
    default: 0
  },
  // pagination的page
  page: {
    type: Number,
    default: 1
  },
  // pagination的limit
  size: {
    type: Number,
    default: 10
  },
  // 查询当前行是否能选中的数据
  checkData: {
    type: Array,
    default() {
      return []
    }
  },
  //多选表格是 绑定的row-key属性
  rowKey: {
      type: String,
      default: "",
  },
  minus:{
    type: Boolean,
    default: true,
  }
})
const emit = defineEmits();
const currentPage = computed({
  get() {
    return props.page
  },
  set(val) {
    emit('update:page', val)
  }
})
const pageSize = computed({
  get() {
    return props.size
  },
  set(val) {
    emit('update:size', val)
  }
})
const tableRef=ref();
const formatEmpty = (row, item) => {
  return row[item.prop] || row[item.prop] === 0 ? row[item.prop] : (item.emptyText || '')
}

function checkSelect(row) {
  let list = props.checkData
  let isSelect = true
  for (let i of list) {
    if (row.id === i.id) {
      isSelect = false
      return
    }
  }
  return isSelect
}
function getRowKeys(row) {
  return row[props.rowKey] || row.id;
}

// 选择项发生变化时触发
function selectionChange(selection) {
  emit('selectionChange', selection)
}
// 当表格的排序条件发生变化的时候会触发该事件
function sortChange(filters) {
  emit('sortChange', filters)
}

function handleSizeChange(val) {
  if (currentPage.value * val > props.total) {
    currentPage.value = 1;
  }
  emit("pagination", { page: currentPage.value, size: val });
}
function handleCurrentChange(val) {
  nextTick(()=>{
    if (tableRef.value) {
      if (tableRef.value.bodyWrapper) {
        tableRef.value.bodyWrapper.scrollTop = 0;
      } else {
        tableRef.value.$el.querySelector(
          ".el-table__body-wrapper"
        ).scrollTop = 0;
      }
    }
    emit("pagination", { page:val, size:pageSize.value });
  })
}
function  handlechange(val) {
  emit('change', val)
}
function  beforeChange(val) {
  emit('beforeChange', val)
}

const tableHeight = ref(null)
const tableWrap = ref(null)
onMounted(() => {
  if(props.minus){
    tableHeight.value = tableWrap.value.offsetHeight - 96
    window.addEventListener('resize', handleResize);
  }
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
const handleResize = () => {
  if(props.minus){
    tableHeight.value = tableWrap.value.offsetHeight - 96
  }
}
// 默认选中方法
const toggleRowSelection=(rows)=> {
  tableRef.value.toggleRowSelection(rows);
}

// 多选清空
const clearSelection=(rows)=> {
  tableRef.value.clearSelection();
}
//暴露该方法 供父组件调用
defineExpose({
  toggleRowSelection,
  clearSelection
})
</script>
<style lang="scss" scoped>
.my-table {
  height: 100%;
  display:flex;
  flex-direction: column;
  :deep(.el-table__inner-wrapper){
    height:100% !important;
  }

  :deep(.el-button) {
    padding: 8px 4px;
  }

  :deep(.el-table td.el-table__cell,
  .el-table th.el-table__cell.is-leaf){
    color: rgba(0, 0, 0, 0.85);;
    border-bottom-color: rgba(0, 0, 0, 0.10);
    font-weight: 400;
  }
  
  .el-pagination{
    margin-top:16px;
    display:flex;
    justify-content: flex-end;
  }
  // :deep(.cell) {
  //   text-align: center;
  // }
}
</style>
