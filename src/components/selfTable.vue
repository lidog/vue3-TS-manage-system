<template>
  <el-table
    :data="props.tableData"
    stripe
    :style="`width: 100%; height: ${heightAuto ? 'auto': '' || height || 500}px`"
    @selection-change="handleSelectionChange"
    v-bind="$attrs"
  >
    <el-table-column type="selection" width="55" v-if="selection" />
    <template v-for="(column, index) in columnConfig">
      <el-table-column
        v-if="editable && editable.includes(index)"
        :sortable="sortableIndex && sortableIndex.includes(index)"
        :label="column.label"
      >
        <template #default="scope">
          <el-input v-model="scope.row[column.key]"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!(editable && editable.includes(index))"
        :sortable="sortableIndex && sortableIndex.includes(index)"
        :prop="column.key.toString()"
        :label="column.label"
      />
    </template>
    <el-table-column label="操作" v-if="buttons && buttons.length > 0">
      <template #default="scope">
        <template v-for="(item, index) in buttons">
          <el-button
            v-if="props.buttonAuth ? props.buttonAuth(scope.row) : true"
            type="primary"
            link
            @click="toolsHandle(index)"
            size="small"
            >{{ item }}</el-button
          >
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
  editable: Array,
  height: Number,
  heightAuto: Boolean,
  buttonAuth: Function,
});
const columnConfig = props.columnConfig.map((item, index) => ({
  key: index + 1,
  label: item,
}));
const emit = defineEmits(["toolsHandle", "selected"]);
const toolsHandle = (index) => emit("toolsHandle", index);
const handleSelectionChange = (selection) => emit("selected", selection);
</script>

<style lang="scss" scoped></style>
