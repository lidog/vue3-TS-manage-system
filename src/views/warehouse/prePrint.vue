<template>
  <pageHeader>
    <template #left>
      <el-input
        v-model="produce"
        class="mr-2"
        placeholder="输入产品编号搜索"
        clearable
      >
        <template #append>
          <el-button :icon="Search" />
        </template>
      </el-input>
    </template>
    <template #right>
      <el-button type="primary">打印</el-button>
    </template>
  </pageHeader>
  <selfTable
    selection
    :sortableIndex="sortableIndex"
    :column-config="columnConfig"
    :tableData="tableData"
    :buttons="['删除']"
    @toolsHandle="toolsHandle"
  />
</template>

<script setup>
import selfTable from "@/components/selfTable.vue";
import { reactive, defineEmits, defineProps, computed, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import pageHeader from "@/components/pageHeader.vue";
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
const toolsHandle = () => {
  tableData.value.splice(0, 1);
};
const produce = ref("");
</script>

<style lang="less" scoped></style>
