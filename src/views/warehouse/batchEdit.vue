<template>
  <div class="flex justify-end mb-2">
    <el-tag>共 {{ props.printNumber }} 条</el-tag>
  </div>
  <editTable
    selection
    :sortableIndex="sortableIndex"
    :column-config="columnConfig"
    :tableData="_tableData"
    :buttons="['取消编辑']"
    @toolsHandle="toolsHandle"
  />
  <el-footer class="flex items-center justify-end">
    <el-button @click="emit('cancel')">取消</el-button>
    <el-button type="primary" @click="sure">确认修改</el-button>
  </el-footer>
</template>

<script setup>
import editTable from "@/components/editTable.vue";
import { reactive, defineEmits, defineProps, watch } from "vue";
import { ElMessage } from "element-plus";
const props = defineProps({
  printNumber: Number,
});
const emit = defineEmits(["cancel", "minus"]);
const columnConfig = reactive([
  "条码编号",
  "产品编号",
  "库存状态",
  "更新日期",
  "生产日期",
  "颜色",
  "数量",
  "库位",
  "所属成品",
  "箱号",
  "操作人",
]);
const tableData = new Array(100).fill(null).map(() => ({
  1: `${Math.floor(Math.random() * 1000000)}`,
  2: `AM${Math.floor(Math.random() * 10000)}`,
  3: [`已入库`, `已出库`][Math.random() > 0.5 ? 1 : 0],
  4: `2022/06/${Math.floor(Math.random() * 30)}`,
  5: `2022/06/${Math.floor(Math.random() * 30)}`,
  6: "DO",
  7: Math.floor(Math.random() * 1000 + 1),
  8: Math.floor(Math.random() * 100 + 1),
  9: "S-F",
  10: Math.floor(Math.random() * 1000 + 1),
  11: "成生",
}));
let _tableData = reactive([...tableData.slice(0, props.printNumber)]);
watch(
  () => props.printNumber,
  (val) => {
    _tableData = reactive([...tableData.slice(0, val)]);
  }
);
const sortableIndex = reactive([0, 1, 2, 3, 4, 5, 6, 7]);
const sure = () => {
  ElMessage({ type: "success", message: "修改成功" });
  emit("cancel");
};
const toolsHandle = (type) => {
  if (type === 0) {
    ElMessage({ type: "success", message: "删除成功" });
    _tableData.splice(0, 1);
    emit("minus");
  }
};
</script>

<style lang="less" scoped></style>
