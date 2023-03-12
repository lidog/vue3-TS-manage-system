<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="number" label="产品编号" />
      <el-table-column prop="name" label="产品名称" />
      <el-table-column prop="type" label="产品类型" />
      <el-table-column prop="size" label="尺寸" />
      <el-table-column prop="color" label="颜色" />
    </el-table>
  </div>
</template>

<script setup>
const tableData = [
  {
    number: "56284/Do",
    name: "色粉",
    type: "零件",
    size: "100*100",
    color: "Do",
  },
  {
    number: "L56284/Do",
    name: "色母",
    type: "零件",
    size: "100*100",
    color: "Do",
  },
  {
    number: "AM81284APG",
    name: "胶件",
    type: "零件",
    size: "100*100",
    color: "APG",
  },
  {
    number: "AM78284JU",
    name: "胶件",
    type: "零件",
    size: "100*100",
    color: "JU",
  },
  {
    number: "AM78284JF",
    name: "胶件",
    type: "零件",
    size: "100*100",
    color: "JF",
  },
  {
    number: "AM72844",
    name: "胶件",
    type: "零件",
    size: "100*100",
    color: "AM72844",
  },
];
</script>

<style lang="less" scoped></style>
