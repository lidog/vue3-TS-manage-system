<template>
  <el-row :gutter="10" class="py-4">
    <el-col :span="4">
      <remoteSelect
        v-model="state.number"
        :remoteMethod="(query:string) => remoteMethod(query, 'number')"
        placeholder="请输入产品编号"
      />
    </el-col>
    <el-col :span="4">
      <remoteSelect
        placeholder="请输入产品名称"
        v-model="state.name"
        :remoteMethod="(query:string) => remoteMethod(query, 'name')"
      />
    </el-col>
    <el-col :span="4">
      <remoteSelect
        placeholder="请输入产品类型"
        v-model="state.type"
        :remoteMethod="(query:string) => remoteMethod(query, 'type')"
      />
    </el-col>
    <el-col :span="4">
      <remoteSelect
        placeholder="请输入尺寸"
        v-model="state.size"
        :remoteMethod="(query:string) => remoteMethod(query, 'size')"
      />
    </el-col>
    <el-col :span="4">
      <remoteSelect
        placeholder="请输入颜色"
        v-model="state.color"
        :remoteMethod="(query:string) => remoteMethod(query, 'color')"
      />
    </el-col>
    <el-col :span="4">
      <el-button type="primary">添加产品</el-button>
    </el-col>
  </el-row>
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
import { reactive } from "vue";
import remoteSelect from "../../components/remoteSelect.vue";
type option = {
  number: string;
  name: string;
  type: string;
  size: string;
  color: string;
};
const tableData: option[] = reactive([
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
]);
interface ListItem {
  value: string;
  label: string;
}
let state: {
  number: string;
  name: string;
  type: string;
  size: string;
  color: string;
} = reactive({
  number: "",
  name: "",
  type: "",
  size: "",
  color: "",
});

const remoteMethod = (query: string, key: keyof option) => {
  return new Promise<ListItem[]>((resolve) => {
    let valueMap: {
      [key: string]: boolean;
    } = {};
    if (query) {
      setTimeout(() => {
        const options = tableData
          .filter((item) => {
            if (
              item[key].toLowerCase().includes(query.toLowerCase()) &&
              !valueMap[item[key]]
            ) {
              valueMap[item[key]] = true;
              return true;
            }
          })
          .map((item) => {
            return {
              value: item[key],
              label: item[key],
            };
          });
        resolve(options);
      }, 200);
    } else {
      resolve(
        tableData
          .filter((item) => {
            if (!valueMap[item[key]]) {
              valueMap[item[key]] = true;
              return true;
            }
          })
          .map((item) => {
            return {
              value: item[key],
              label: item[key],
            };
          })
      );
    }
  });
};

const addProduce = () => {
  const { number, name, type, size, color } = state;
  tableData.push({
    number,
    name,
    type,
    size,
    color,
  });
  state = reactive({
    number: "",
    name: "",
    type: "",
    size: "",
    color: "",
  });
};
</script>

<style lang="less" scoped></style>
