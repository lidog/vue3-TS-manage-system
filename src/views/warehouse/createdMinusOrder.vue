<template>
  <el-tabs v-model="step">
    <el-tab-pane label="出货指令单信息" name="1">
      <el-form class="w-2/5">
        <el-form-item label="指令单编号">
          <el-input />
        </el-form-item>
        <el-form-item label="所属包包">
          <el-input />
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="date" type="date" />
        </el-form-item>
        <el-button @click="step = '2'">确定</el-button>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="添加出货需求" name="2">
      <pageHeader>
        <template #left>
          <el-form :inline="true">
            <el-form-item label="产品名称">
              <el-input />
            </el-form-item>
            <el-form-item label="数量">
              <el-input />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="add">添加需求</el-button>
            </el-form-item>
          </el-form>
        </template>
        <template #right>
          <el-button type="primary" @click="save">保存入仓单</el-button>
          <el-button type="primary" @click="step = '3'"
            >录入出货条形码</el-button
          >
        </template>
      </pageHeader>
      <selfTable
        :column-config="columnConfig"
        :tableData="tableData"
        :editable="editable"
        :buttons="['删除', '修改']"
        @toolsHandle="toolsHandle"
      />
    </el-tab-pane>
    <el-tab-pane label="录入出货条形码" name="3">
      <pageHeader>
        <template #left>
          <el-input
            style="width: 50%"
            class="mr-2"
            placeholder="扫码录入出库"
            clearable
          >
            <template #append>
              <el-button :icon="FullScreen" @click="record" />
            </template>
          </el-input>
        </template>
        <template #right>
          <el-button @click="step='4'" type="primary">比对录入数量</el-button>
        </template>
      </pageHeader>
      <selfTable
        :column-config="columnConfig2"
        :tableData="tableData2"
        :buttons="['删除']"
        @toolsHandle="toolsHandle2"
      />
    </el-tab-pane>
    <el-tab-pane label="出仓需求与录入数量比对" name="4">
      <el-tag type="danger">与出仓需求数量不相等</el-tag>
      <selfTable
        heightAuto
        :column-config="['产品名称', '需要数量', '实际录入数量']"
        :tableData="tableData3"
        :buttons="['录入']"
      />
      <el-tag class="mt-5" type="danger">缺少录入的出仓需求</el-tag>
      <selfTable
        heightAuto
        :column-config="['产品名称', '需要数量']"
        :tableData="tableData4"
        :buttons="['录入']"
      />
      <el-tag class="mt-5" type="danger">未找到出仓需求的录入</el-tag>
      <selfTable
        heightAuto
        :column-config="columnConfig3"
        :tableData="tableData5"
        :buttons="['删除']"
      />
     <div>
      <el-tag class="mt-5 mr-5" type="success">所有需求已正确录入</el-tag>
      <el-button type="primary" @click="toMinus">去出库</el-button>
     </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref, reactive, defineEmits } from "vue";
import { FullScreen } from "@element-plus/icons-vue";
let step = ref("1");
let date = ref(new Date());
const columnConfig = reactive(["产品名称", "数量"]);
const tableData = reactive([]);
const add = () => {
  tableData.push({
    1: `AM${Math.floor(Math.random() * 1000000)}`,
    2: Math.floor(Math.random() * 100000),
  });
};
let editable = reactive([]);
const toolsHandle = (type) => {
  if (type === 0) {
    tableData.splice(0, 1);
  }
  if (type === 1) {
    editable.splice(0);
    editable.push(0, 1);
  }
};
const emit = defineEmits(["save", "toMinus"]);
const save = () => emit("save");

const columnConfig2 = reactive([
  "条码编号",
  "生产日期",
  "颜色",
  "数量",
  "库位",
  "所属成品",
  "箱号",
  "操作人",
]);
const tableData2 = reactive([]);
const toolsHandle2 = () => {
  tableData2.splice(0, 1);
};
const record = () => {
  tableData2.push({
    1: `${Math.floor(Math.random() * 1000000)}`,
    2: `2022/06/${Math.floor(Math.random() * 30)}`,
    3: "DO",
    4: Math.floor(Math.random() * 1000 + 1),
    5: Math.floor(Math.random() * 100 + 1),
    6: "S-F",
    7: Math.floor(Math.random() * 1000 + 1),
    8: "成生",
  });
};
const columnConfig3 = reactive([
"条码编号",
  "生产日期",
  "颜色",
  "数量",
  "库位",
  "所属成品",
  "箱号",
])
const tableData3 = reactive([
{
    1: `AM${Math.floor(Math.random() * 1000000)}`,
    2: Math.floor(Math.random() * 100000),
    3: Math.floor(Math.random() * 100000),
  }
])
const tableData4 = reactive([
  {
    1: `AM${Math.floor(Math.random() * 1000000)}`,
    2: Math.floor(Math.random() * 100000),
  }
])
const tableData5 = reactive([{
    1: `${Math.floor(Math.random() * 1000000)}`,
    2: `2022/06/${Math.floor(Math.random() * 30)}`,
    3: "DO",
    4: Math.floor(Math.random() * 1000 + 1),
    5: Math.floor(Math.random() * 100 + 1),
    6: "S-F",
    7: Math.floor(Math.random() * 1000 + 1),
    8: "成生",
  }])

const toMinus = () => emit("toMinus")
</script>

<style lang="scss" scoped></style>
