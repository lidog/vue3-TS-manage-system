<template>
  <div class="my-drawer">
    <el-drawer
      :modelValue="modelValue"
      @update:modelValue="sure"
      :title="props.title"
    >
      <el-main class="main flex-col">
        <el-form
          label-position="left"
          label-width="100px"
          style="max-width: 460px"
          v-if="formItem"
        >
          <el-form-item v-for="item in formItem" :label="item">
            <el-input />
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer class="footer flex items-center justify-end">
        <el-button @click="sure">取消</el-button>
        <el-button type="primary" @click="sure(1)">确定</el-button>
      </el-footer>
    </el-drawer>
  </div>
</template>

<script setup>
import { defineEmits, ref, defineProps } from "vue";
const emit = defineEmits(["sure", "update:modelValue"]);
const props = defineProps({
  title: String,
  modelValue: Boolean,
  formItem: Array,
});
const sure = (type) => {
  emit("update:modelValue", false)
  if (type === 1) {
    emit("sure", false)
  }
};
</script>

<style lang="less" scoped>
.my-drawer {
  :deep(.el-drawer__body) {
    display: flex;
    flex-direction: column;
  }
  .main {
    flex: 1;
    display: flex;
  }
  .footer {
    height: 60;
  }
}
</style>
