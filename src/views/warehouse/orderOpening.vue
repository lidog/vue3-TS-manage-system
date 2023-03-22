<template>
  <div class="flex items-center justify-between mb-2">
    <div><el-tag class="mr-4">制表人：寿平</el-tag>
    <el-tag class="mr-4">签收人：玉君</el-tag>
    <el-tag class="mr-4">2023/06/13</el-tag></div>
    <el-button type="primary">去打印</el-button>
  </div>
  <selfTable
    :sortableIndex="sortableIndex"
    :column-config="columnConfig"
    :tableData="tableData"
  />
</template>

<script setup>
import selfTable from "@/components/selfTable.vue";
import { reactive, defineEmits, defineProps, computed } from "vue";
const props = defineProps({
  printNumber: Number,
});
const emit = defineEmits(["cancel", "minus"]);
const tableData2 = reactive(
  new Array(10).fill(null).map(() => {
    const count = Math.floor(Math.random() * 10000);
    const record = [500, 1000, 2000][Math.floor(Math.random() * 3)];
    return {
      1: `AM${Math.floor(Math.random() * 1000000)}`,
      2: `HHC${Math.floor(Math.random() * 100)}`,
      3: count, //总数
      4: record, // 每箱数
      5: count % record, //余数
    };
  })
);
const columnConfig = reactive(["日期", "所属成品", "数量", "库位", "箱号"]);
const tableData = computed(() => {
  const lists = tableData2.map((item) => {
    const children = [];
    const len = Math.floor(item[3] / item[4]);
    const yu = item[3] % item[4];
    let xNumber = Math.floor(Math.random() * 10000);
    let cu = xNumber;
    const date = "2023/03/15";
    for (let i = 0; i < len; i++) {
      children.push({
        1: date,
        2: item[1],
        3: item[4],
        4: cu,
        5: xNumber++,
      });
    }
    if (yu > 0) {
      children.push({
        1: date,
        2: item[1],
        3: yu,
        4: cu,
        5: xNumber++,
      });
    }
    return children;
  });
  return lists.flat(Infinity);
});
const sortableIndex = reactive([1]);
</script>

<style lang="less" scoped></style>
