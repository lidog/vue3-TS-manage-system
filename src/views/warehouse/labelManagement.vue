<template>
  <pageHeader>
    <template #left>
      <el-input class="mr-2" placeholder="查找入仓指令单" clearable>
        <template #append>
          <el-button :icon="Search" />
        </template>
      </el-input>
      <el-button type="primary" @click="dialogTableVisible3=true">创建入仓指令单</el-button>
      <el-button @click="dialogTableVisible5 = true">手动添加标签</el-button>
    </template>
    <template #right>
      <el-badge>
        <el-button type="primary" @click="dialogTableVisible4 = true">查看待打印列表</el-button>
      </el-badge>
    </template>
  </pageHeader>
  <el-tag type="success">历史入仓单</el-tag>
  <selfTable
    selection
    :sortableIndex="sortableIndex"
    :column-config="columnConfig"
    :tableData="tableData"
    :buttons="['产品详情', '拆单详情']"
    @toolsHandle="toolsHandle"
  />
  <el-dialog v-model="dialogTableVisible3" title="创建入仓单"  fullscreen>
    <createdPutOrder @sure="toPrint"/>
  </el-dialog>
  <el-dialog v-model="dialogTableVisible" title="入仓单——产品详情"  width="80%">
    <warehouseReceipt @cancel="dialogTableVisible=false" />
  </el-dialog>
  <el-dialog v-model="dialogTableVisible2" title="入仓单——拆单详情"  width="80%">
    <orderOpening @cancel="dialogTableVisible2=false" />
  </el-dialog>
  <el-dialog v-model="dialogTableVisible4" title="待打印列表"  width="80%">
    <prePrint @cancel="dialogTableVisible4=false" />
  </el-dialog>
  <drawer
    title="手动添加标签"
    v-model="dialogTableVisible5"
    :formItem="formItem"
  />
</template>

<script setup>
import pageHeader from "@/components/pageHeader.vue";
import drawer from "@/components/drawer.vue";
import warehouseReceipt from "./warehouseReceipt.vue";
import orderOpening from "./orderOpening.vue";
import createdPutOrder from "./createdPutOrder.vue";
import prePrint from "./prePrint.vue";
import { Search } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
const columnConfig = reactive(["创建日期", "制表人", "签收人"]);
const tableData = reactive(
  new Array(100).fill(null).map(() => ({
    1: `2022/06/${Math.floor(Math.random() * 30)}`,
    2: `寿平`,
    3: "玉君",
  }))
);
const sortableIndex = reactive([0]);
const dialogTableVisible = ref(false);
const dialogTableVisible2 = ref(false);
const dialogTableVisible3 = ref(false);
const dialogTableVisible4 = ref(false);
const dialogTableVisible5 = ref(false);
const toolsHandle = (type) => {
    if (type === 0) {
        dialogTableVisible.value = true;
    }
    if (type === 1) {
        dialogTableVisible2.value = true;
    }
}
const toPrint = () => {
  dialogTableVisible3.value = false;
  dialogTableVisible4.value = true;
}

const formItem = reactive(["日期", "所属成品", "数量", "库位", "箱号", "打印张数"]);
</script>

<style lang="less" scoped></style>
