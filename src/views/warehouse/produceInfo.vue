<template>
  <pageHeader>
    <template #left>
      <el-input class="mr-2" placeholder="输入产品编号搜索" clearable>
        <template #append>
          <el-button :icon="Search" />
        </template>
      </el-input>
    </template>
    <template #right>
      <el-button type="primary" @click="record">录入产品</el-button>
    </template>
  </pageHeader>
  <el-tag type="success">产品列表</el-tag>
  <selfTable
    :column-config="columnConfig"
    :tableData="tableData"
    :buttons="buttons"
    @toolsHandle="record"
   />
  <drawer
    title="添加产品"
    v-model="drawerBoolean"
    :formItem="formItem"
    @sure="sure"
  />
</template>

<script setup>
import pageHeader from "@/components/pageHeader.vue";
import selfTable from "@/components/selfTable.vue";
import drawer from "@/components/drawer.vue";
import { Search } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";

const columnConfig = reactive([
  "产品编号",
  "产品名称",
  "产品类型",
  "尺寸",
  "颜色",
]);
const tableData = reactive(
  new Array(100).fill(null).map(() => ({
    1: "56284/Do",
    2: "色粉",
    3: "零件",
    4: "100*100",
    5: "Do",
  }))
);
const buttons = reactive(["复制录入", "删除"]);
const drawerBoolean = ref(false);
const record = () => {
  drawerBoolean.value = true;
};
const formItem = reactive([...columnConfig]);
const sure = () => ElMessage({ type: "success", message: "添加成功" });
</script>

<style lang="scss" scoped></style>
