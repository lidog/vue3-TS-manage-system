<template>
  <!-- <el-row :gutter="20">
    <el-col :span="6">
      <remoteSelect
        v-model="state.number"
        :remoteMethod="(query:string) => remoteMethod(query, 'number', tableData)"
      />
    </el-col>
    <el-col :span="6"> </el-col>
    <el-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </el-col>
    <el-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </el-col>
  </el-row> -->
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="number" label="产品编号" width="180" />
      <el-table-column prop="name" label="产品名称" width="180" />
      <el-table-column prop="type" label="产品类型" />
      <el-table-column prop="size" label="尺寸" />
      <el-table-column prop="color" label="颜色" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
// import { reactive } from "vue";
// import remoteSelect from "../../components/remoteSelect.vue";
type option = {
  number: string;
  name: string;
  type: string;
  size: string;
  color: string;
};
const tableData: option[] = [
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
// interface ListItem {
//   value: string;
//   label: string;
// }
// const state: {
//   number: string;
//   options: ListItem[];
// } = reactive({
//   number: "",
//   options: tableData.map((item) => ({
//     value: item.number,
//     label: item.number,
//   })),
// });

// const remoteMethod = (query: string, key: keyof option, Data: option[]) => {
//   return new Promise<ListItem[]>((resolve) => {
//     if (query) {
//       setTimeout(() => {
//         const options = Data.filter((item) =>
//           item[key].toLowerCase().includes(query.toLowerCase())
//         ).map((item) => {
//           return {
//             value: item[key],
//             label: item[key],
//           };
//         });
//         resolve(options);
//       }, 200);
//     }
//     resolve(
//       Data.map((item) => {
//         return {
//           value: item[key],
//           label: item[key],
//         };
//       })
//     );
//   });
// };
</script>

<style lang="less" scoped></style>
