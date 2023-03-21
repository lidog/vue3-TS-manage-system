<template>
  <pageHeader>
    <template #left>
      <el-input class="mr-2" placeholder="扫码精准查看库存" clearable>
        <template #append>
          <el-button :icon="FullScreen" />
        </template>
      </el-input>
    </template>
    <template #right>
      <el-button type="primary">excel导出</el-button>
    </template>
  </pageHeader>
  <div class="flex items-start justify-between pb-5">
    <div
      class="flex items-start justify-between left"
      :class="[more ? 'show' : 'close']"
    >
      <div class="filters flex-1">
        <div class="mr-1 mb-1" v-for="item in columnConfig">
          <el-input :placeholder="item" />
        </div>
      </div>
      <el-button-group style="width: 125px;">
        <el-button type="primary" @click="more = !more">
          <el-icon :class="[more ? 'up' : 'down']"><ArrowDown /></el-icon>
        </el-button>
        <el-button type="primary" :icon="Search">查询</el-button>
      </el-button-group>
    </div>
    <div class="right"></div>
  </div>
  <el-tag>库存列表</el-tag>
  <selfTable
    selection
    :sortableIndex="sortableIndex"
    :column-config="columnConfig"
    :tableData="_tableData"
    :buttons="['编辑']"
    @toolsHandle="toolsHandle"
    @selected="selected"
  />
  <el-footer class="flex items-center justify-end pr-0">
    <el-badge :value="printNumber">
      <el-button type="primary" @click="dialogTableVisible = true"
        >批量编辑</el-button
      >
    </el-badge>
  </el-footer>
  <drawer
    title="编辑库存"
    v-model="drawerBoolean"
    :formItem="formItem"
    @sure="sure"
  />
  <el-dialog
    v-model="dialogTableVisible"
    title="批量编辑库存"
    width="95%"
    height="90%"
  >
    <batchEdit
      :printNumber="printNumber"
      @cancel="dialogTableVisible = false"
    />
  </el-dialog>
</template>

<script setup>
import selfTable from "@/components/selfTable.vue";
import batchEdit from "./batchEdit.vue";
import { reactive, defineEmits, defineProps, ref } from "vue";
import { ElMessage } from "element-plus";
import drawer from "@/components/drawer.vue";
import { FullScreen, Search, ArrowDown } from "@element-plus/icons-vue";
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
let _tableData = reactive([...tableData]);
const sortableIndex = reactive([0, 1, 2]);
let drawerBoolean = ref(false);
const formItem = reactive([...columnConfig]);
const sure = () => ElMessage({ type: "success", message: "修改成功" });
const toolsHandle = () => (drawerBoolean.value = true);
let dialogTableVisible = ref(false);
const printNumber = ref(0);
const selected = (selection) => (printNumber.value = selection.length);
const more = ref(false);
</script>

<style lang="less" scoped>
.left {
  overflow: hidden;
  height: 35px;
  transition: all 0.3s;
  &.show {
    height: 108px;
  }
  &.close {
    height: 35px;
  }
}
.down {
  transition: all 0.3s;
  transform: rotate(0deg);
}
.up {
  transition: all 0.3s;
  transform: rotate(-180deg);
}
.filters {
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);
  display: flex;
  flex-wrap: wrap;
}
</style>
