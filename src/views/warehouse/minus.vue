<template>
  <pageHeader>
    <template #left>
      <el-input class="mr-2" placeholder="扫码出库" clearable>
        <template #append>
          <el-button :icon="FullScreen" @click="record" />
        </template>
      </el-input>
    </template>
    <template #right>
      <el-button type="primary" @click="drawerBoolean = true"
        >手动出库</el-button
      >
    </template>
  </pageHeader>
  <el-tag>待出库列表</el-tag>
  <selfTable
    selection
    :sortableIndex="sortableIndex"
    :column-config="columnConfig"
    :tableData="_tableData"
    :buttons="['取消']"
    @toolsHandle="toolsHandle"
  />
  <el-footer class="flex items-center justify-end">
    <el-button type="primary" @click="add">出库</el-button>
  </el-footer>
  <drawer
    title="添加出库记录"
    v-model="drawerBoolean"
    :formItem="formItem"
    @sure="record"
  />
</template>

<script setup>
import selfTable from "@/components/selfTable.vue";
import { reactive, defineEmits, defineProps, ref } from "vue";
import { ElMessage } from "element-plus";
import drawer from "@/components/drawer.vue";
import { FullScreen } from "@element-plus/icons-vue";
let drawerBoolean = ref(false);
const props = defineProps({});
const emit = defineEmits([]);
const columnConfig = reactive([
  "条码编号",
  "生产日期",
  "颜色",
  "数量",
  "库位",
  "所属成品",
  "箱号",
  "操作人",
]);
const formItem = reactive([...columnConfig]);
const tableData = new Array(100).fill(null).map(() => ({
  1: `${Math.floor(Math.random() * 1000000)}`,
  2: `2022/06/${Math.floor(Math.random() * 30)}`,
  3: "DO",
  4: Math.floor(Math.random() * 1000 + 1),
  5: Math.floor(Math.random() * 100 + 1),
  6: "S-F",
  7: Math.floor(Math.random() * 1000 + 1),
  8: "成生",
}));
let _tableData = reactive([]);
const sortableIndex = reactive([0, 1, 2, 3, 4, 5, 6]);
const toolsHandle = (type) => {
  if (type === 0) {
    let len = _tableData.length;
    _tableData.splice(0);
    _tableData.push(...tableData.slice(0, len - 1));
    ElMessage({type: "success", message:"取消成功"});
  }
  if (type === 1) {
  }
};
const record = () => {
  let len = _tableData.length;
  _tableData.splice(0);
  _tableData.push(...tableData.slice(0, len + 1));
};
const add = () => {
  _tableData.splice(0);
  ElMessage({type: "success", message:"出库成功"});
}
</script>

<style lang="less" scoped></style>
