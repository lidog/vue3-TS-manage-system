<template>
  <el-dropdown ref="dropdown" trigger="contextmenu" @command="command" class="input-select">
    <span class="el-dropdown-link">
      <el-input :placeholder="props.placeholder" v-model="inputValue" @input="inputChange"/>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in state.options" :key="item.value" :command="item.value">{{ item.value }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { reactive, withDefaults, ref, watch, nextTick } from "vue";
interface ListItem {
  value: string;
  label: string;
}
interface Props {
  remoteMethod: (query: string) => Promise<ListItem[]>;
  placeholder?: string;
  modelValue: string;
}
const props = withDefaults(defineProps<Props>(), {
  remoteMethod: () => Promise.resolve([]),
  modelValue: "",
});
const emit = defineEmits(["update:modelValue"]);
const inputValue = ref<string>("");
const dropdown = ref();
const selected = ref(false);
const state: {
  options: ListItem[];
} = reactive({
  options: [],
});
const remoteMethod = async (query: string) => {
  if (query && !selected.value) {
    state.options = await props.remoteMethod(query);
    if(state.options.length> 0) {
      dropdown.value.handleOpen();
    }
  } else {
    state.options = [];
    dropdown.value.handleClose();
  }
};
watch(() => props.modelValue, (val) => {
  console.log(val);
});
watch(inputValue, (val) => setTimeout(()=>remoteMethod(val), 200));

const command = (val:string) => {
  selected.value = true;
  inputValue.value = val;
  state.options = [];
  dropdown.value.handleClose();
  emit("update:modelValue", val);
}

const inputChange = () => selected.value = false;
</script>

<style scoped lang="less">
.input-select {
  display: block;
}
</style>
