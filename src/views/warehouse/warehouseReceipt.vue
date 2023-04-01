<!-- 拆单详情 -->
<template>
  <div class="flex justify-end mb-2">
    <el-tag class="mr-4">制表人：寿平</el-tag>
    <el-tag class="mr-4">签收人：玉君</el-tag>
    <el-tag class="mr-4">2023/06/13</el-tag>
  </div>
  <selfTable
    :sortableIndex="sortableIndex"
    :column-config="columnConfig"
    :tableData="_tableData"
  />
  <el-footer class="flex items-center justify-end">
    <el-button @click="emit('cancel')">取消</el-button>
  </el-footer>
</template>

<script setup>
import selfTable from "@/components/selfTable.vue";
import { reactive, defineEmits, defineProps, watch } from "vue";
import { ElMessage } from "element-plus";
const props = defineProps({
  printNumber: Number,
});
const emit = defineEmits(["cancel", "minus"]);
const columnConfig = reactive([
  "产品编号",
  "产品名称",
  "入仓数量",
  "备注",
]);
const tableData = new Array(20).fill(null).map(() => ({
  1: `AM${Math.floor(Math.random() * 1000000)}`,
  2: "S-F",
  3: Math.floor(Math.random() * 10000),
  4: "--",
}));
let _tableData = tableData.slice(0);
const sortableIndex = reactive([0]);
</script>

<style lang="less" scoped></style>
