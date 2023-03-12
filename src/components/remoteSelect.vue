<template>
  <el-select
    filterable
    remote
    reserve-keyword
    :placeholder="placeholder"
    remote-show-suffix
    :remote-method="remoteMethod"
    :loading="state.loading"
    :attrs="$attrs"
  >
    <el-option
      v-for="item in state.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup lang="ts">
import { reactive, withDefaults, } from "vue";
interface ListItem {
  value: string;
  label: string;
}
interface Props {
  remoteMethod: (query: string) => Promise<ListItem[]>;
  placeholder?: string;
}
const props = withDefaults(defineProps<Props>(), {
  remoteMethod: () => Promise.resolve([]),
});

const state: {
  loading: boolean;
  options: ListItem[];
} = reactive({
  loading: false,
  options: [],
});
const remoteMethod = async (query: string) => {
  if (query) {
    state.loading = true;
    state.options = await props.remoteMethod(query);
    state.loading = false;
  } else {
    state.options = [];
  }
};
remoteMethod('');
</script>

<style scoped lang="less"></style>
