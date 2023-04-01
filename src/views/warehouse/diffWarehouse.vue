<template>
  <el-tabs v-model="step">
    <el-tab-pane label="上传excel" name="1">
      <el-form-item label="想到库位库位" class="w-1/3">
        <el-input placeholder="不填库位表示全局对比" />
      </el-form-item>
      <el-upload :show-file-list="false" :on-success="handleAvatarSuccess">
        <el-icon style="width: 100px; height: 100px; font-size: 30px"
          ><Plus
        /></el-icon>
      </el-upload>
      <el-button type="primary" @click="step = '2'">开始比对</el-button>
    </el-tab-pane>
    <el-tab-pane label="对比结果" name="2">
      <selfTable
        :column-config="columnConfig"
        :tableData="tableData"
        heightAuto
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { reactive, defineEmits, defineProps, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
let step = ref("1");
const handleAvatarSuccess = () => {
  ElMessage.success("上传成功");
};
const columnConfig = reactive([
  "标签ID",
  "产品名称",
  "错误信息",
]);
const tableData = reactive([
  {
    1: "243635745",
    2: "AM29582",
    3: "已出库；不一致【excel: 200, 库存: 100】；库位不正确；",
  },
]);
</script>

<style lang="scss" scoped></style>
