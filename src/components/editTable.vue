<template>
  <el-table :data="props.tableData" stripe style="width: 100%; height: 500px">
    <el-table-column type="selection" width="55" v-if="selection" />
    <el-table-column
      v-for="(column, index) in columnConfig"
      :sortable="sortableIndex && sortableIndex.includes(index)"
      :label="column.label"
    >
    <template #default="scope">
      <el-input v-model="scope.row[column.key]" ></el-input>
    </template>
    </el-table-column>
    <el-table-column label="操作" v-if="buttons && buttons.length>0"> 
      <template #default>
        <template v-for="(item, index) in buttons">
          <el-button type="primary" link @click="toolsHandle(index)" size="small">{{ item }}</el-button>
        </template>
      </template>  
    </el-table-column>
  </el-table>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  columnConfig: Array,
  tableData: Array,
  buttons: Array,
  selection: Boolean,
  sortableIndex: Array,
});
const columnConfig = props.columnConfig.map((item, index) => ({
  key: index + 1,
  label: item,
}));
const emit = defineEmits(['toolsHandle']);
const toolsHandle = index => emit('toolsHandle', index);
</script>

<style lang="scss" scoped></style>
