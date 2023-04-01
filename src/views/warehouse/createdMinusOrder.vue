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
    <el-tab-pane label="添加出货记录" name="2">
      <el-header class="flex items-center justify-end">
        <el-button type="primary" @click="dialogTableVisible = true"
          >添加记录</el-button
        >
        <el-button type="primary" @click="save">保存入仓单</el-button>
      </el-header>
      <selfTable
        :column-config="columnConfig"
        :tableData="tableData"
        :editable="editable"
        :buttons="['删除', '修改']"
        @toolsHandle="toolsHandle"
      />
    </el-tab-pane>
  </el-tabs>
  <el-dialog v-model="dialogTableVisible" title="添加出货记录">
    <el-form class="w-2/5">
        <el-form-item label="产品名称">
          <el-input />
        </el-form-item>
        <el-form-item label="数量">
          <el-input />
        </el-form-item>
        <el-button @click="add">确定</el-button>
      </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, defineEmits } from "vue";
let step = ref("1");
const dialogTableVisible = ref(false);
let date = ref(new Date());
const columnConfig = reactive([
  "产品名称",
  "数量"
])
const tableData = reactive([])
const add = () => {
  tableData.push({
    1: `AM${Math.floor(Math.random() * 1000000)}`,
    2: Math.floor(Math.random() * 100000),
  })
  dialogTableVisible.value = false;
}
let editable = reactive([]);
const toolsHandle = type => {
  if (type === 0) {
    tableData.splice(0, 1);
  }
  if (type === 1) {
    editable.splice(0);
    editable.push(0,1);
  }
}
const emit = defineEmits(["save"]);
const save = () => emit("save");
</script>

<style lang="scss" scoped></style>
