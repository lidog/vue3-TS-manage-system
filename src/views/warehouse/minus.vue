<template>
  <pageHeader>
    <template #left>
      <el-input
        style="width: 50%"
        class="mr-2"
        placeholder="扫码出库"
        clearable
      >
        <template #append>
          <el-button :icon="FullScreen" @click="record" />
        </template>
      </el-input>
      <el-button @click="drawerBoolean = true">手动出库</el-button>
      <el-button type="primary" @click="drawerBoolean2 = true"
        >创建出货指令单</el-button
      >
    </template>
    <template #right>
    </template>
  </pageHeader>
  <el-tabs v-model="step">
    <el-tab-pane label="待出货指令单" name="1">
      <pageHeader>
        <template #left>
          <el-button type="primary" @click="drawerBoolean3 = true"
            >批量出库</el-button
          >
        </template>
      </pageHeader>
      <selfTable
        selection
        :column-config="columnConfig2"
        :tableData="tableData2"
        :buttons="['删除', '详情']"
        @toolsHandle="toolsHandle2"
      />
    </el-tab-pane>
    <el-tab-pane label="历史出货指令单" name="2">
      <selfTable
        selection
        :column-config="columnConfig2"
        :tableData="tableData3"
        :buttons="['详情']"
        @toolsHandle="toolsHandle3"
      />
    </el-tab-pane>
  </el-tabs>
  <el-dialog v-model="drawerBoolean3" :title="title" width="80%">
    <pageHeader>
      <template #right>
        <el-button
          v-if="title === '待出货详情'"
          type="primary"
          @click="minusAll"
          >全部出库</el-button
        >
      </template>
    </pageHeader>
    <selfTable
      selection
      :column-config="columnConfig"
      :sortableIndex="sortableIndex"
      :tableData="tableData"
      :buttons="['删除']"
    />
  </el-dialog>
  <el-dialog v-model="drawerBoolean2" title="创建出货指令单" fullscreen>
    <createdMinusOrder @save="addMinusOrder" @toMinus="addMinusOrder" />
  </el-dialog>
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
import createdMinusOrder from "./createdMinusOrder.vue";
import { FullScreen } from "@element-plus/icons-vue";
let drawerBoolean = ref(false);
let drawerBoolean2 = ref(false);
let drawerBoolean3 = ref(false);
let title = ref("待出货详情");
let step = ref("1");
const props = defineProps({});
const emit = defineEmits([]);
const columnConfig2 = reactive(["指令单号", "所属包包", "日期", "核对状态"]);
const tableData2 = reactive(new Array(10).fill(0).map(()=> {
  return {
    1: `XT-FG-2023-02-${Math.floor(Math.random() * 30)}`,
    2: `S-HMW${Math.floor(Math.random() * 10)}-SQ-${Math.floor(
      Math.random() * 10
    )}`,
    3: `2022/06/${Math.floor(Math.random() * 30)}`,
    4: ['核对一致', '数目不对'][Math.floor(Math.random() * 10)%2]
  }
}));
const addMinusOrder = () => {
  drawerBoolean2.value = false;
  tableData2.push({
    1: `XT-FG-2023-02-${Math.floor(Math.random() * 30)}`,
    2: `S-HMW${Math.floor(Math.random() * 10)}-SQ-${Math.floor(
      Math.random() * 10
    )}`,
    3: `2022/06/${Math.floor(Math.random() * 30)}`,
    4: ['核对一致', '数目不对'][Math.floor(Math.random() * 10)%2]
  });
};
const toolsHandle2 = (type) => {
  if (type === 0) {
    tableData2.splice(0, 1);
  }
  if (type === 1) {
    // title.value = "待出货详情";
    // drawerBoolean3.value = true;
    drawerBoolean2.value = true;
  }
};
const toolsHandle3 = () => {
  title.value = "已出货详情";
  drawerBoolean2.value = true;
};
const tableData3 = reactive(
  new Array(20).fill(0).map(() => ({
    1: `XT-FG-2023-02-${Math.floor(Math.random() * 30)}`,
    2: `S-HMW${Math.floor(Math.random() * 10)}-SQ-${Math.floor(
      Math.random() * 10
    )}`,
    3: `2022/06/${Math.floor(Math.random() * 30)}`,
  }))
);
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

// 待出库列表
const sortableIndex = reactive([0, 1, 2, 3, 4, 5, 6]);
const tableData = reactive(
  new Array(100).fill(null).map(() => ({
    1: `${Math.floor(Math.random() * 1000000)}`,
    2: `2022/06/${Math.floor(Math.random() * 30)}`,
    3: "DO",
    4: Math.floor(Math.random() * 1000 + 1),
    5: Math.floor(Math.random() * 100 + 1),
    6: "S-F",
    7: Math.floor(Math.random() * 1000 + 1),
    8: "成生",
  }))
);
const minusAll = () => {
  tableData.splice(0);
  ElMessage.success("出库成功");
};

// 录入单条出库
const record = () => {
  tableData.splice(0);
  tableData.push({
    1: `${Math.floor(Math.random() * 1000000)}`,
    2: `2022/06/${Math.floor(Math.random() * 30)}`,
    3: "DO",
    4: Math.floor(Math.random() * 1000 + 1),
    5: Math.floor(Math.random() * 100 + 1),
    6: "S-F",
    7: Math.floor(Math.random() * 1000 + 1),
    8: "成生",
  });
  drawerBoolean3.value = true;
};
</script>

<style lang="less" scoped></style>
