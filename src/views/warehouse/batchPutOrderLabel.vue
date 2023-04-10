<template>
    <el-tabs tab-position="left">
        <el-tab-pane label="整箱标签">
          <pageHeader>
            <template #left>
              <el-input
                v-model="produce"
                class="mr-2"
                style="width: 50%"
                placeholder="输入成品归属搜索"
                clearable
              >
                <template #append>
                  <el-button :icon="Search" />
                </template>
              </el-input>
              <el-input
                v-if="produce"
                class="mr-2"
                v-model="kuWei"
                style="width: 20%"
                placeholder="修改库位"
              />
              <el-button v-if="produce" type="primary" @click="setKuWei"
                >确定</el-button
              >
            </template>
            <template #right>
              <el-button type="primary" @click="toPrint">打印</el-button>
            </template>
          </pageHeader>
          <selfTable
            selection
            :column-config="columnConfig3"
            :tableData="_tableData3"
            :editable="editable3"
            :sortableIndex="sortableIndex"
            default-expand-all
          />
        </el-tab-pane>
        <el-tab-pane label="拼箱标签">
          <pageHeader>
            <template #left>
              <el-input
                v-model="produce"
                class="mr-2"
                style="width: 50%"
                placeholder="输入成品归属搜索"
                clearable
              >
                <template #append>
                  <el-button :icon="Search" />
                </template>
              </el-input>
            </template>
            <template #right>
              <el-input
                class="mr-2"
                v-model="kuWei"
                style="width: 40%"
                placeholder="修改库位"
              />
              <el-button v-if="kuWei" type="primary" @click="setKuWei"
                >确定</el-button
              >
              <el-button type="success">导出excel</el-button>
              <el-button type="primary" @click="toPrint">打印</el-button>
            </template>
          </pageHeader>
          <selfTable
            selection
            :column-config="columnConfig3"
            :tableData="_tableData4"
            :editable="[3, 4]"
            :sortableIndex="sortableIndex"
            default-expand-all
          />
        </el-tab-pane>
      </el-tabs>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import selfTable from "@/components/selfTable.vue";
import { Search } from "@element-plus/icons-vue";
import pageHeader from "@/components/pageHeader.vue";

let step = ref("1");
let date = ref(new Date());
const columnConfig = reactive([
  "产品编号",
  "成品归属",
  "每箱数量",
  "箱数",
  "拼箱记录",
]);
const tableData = reactive([]);
const dialogTableVisible = ref(false);
const shareBox = ref(0);
const ping = () => {
  shareBox.value++;
};
const add = () => {
  dialogTableVisible.value = false;
  tableData.push({
    1: `AM${Math.floor(Math.random() * 1000000)}`,
    2: `HHC${Math.floor(Math.random() * 100)}`,
    3: [10, 100, 1000, 2000][Math.floor(Math.random() * 3)],
    4: Math.floor(Math.random() * 10 + 1),
    5: [[9600, 2300], [1100], [2200], [1000, 1100]][
      Math.floor(Math.random() * 3)
    ],
  });
};
const toolsHandle = (type) => {
  if (type === 0) {
    tableData.splice(0, 1);
  }
  if (type === 1) {
    dialogTableVisible.value = true;
  }
};
const tableData2 = reactive(
  new Array(10).fill(null).map(() => {
    const count = Math.floor(Math.random() * 10000);
    const record = [500, 1000, 2000][Math.floor(Math.random() * 3)];
    return {
      1: `AM${Math.floor(Math.random() * 1000000)}`,
      2: `HHC${Math.floor(Math.random() * 100)}`,
      3: count, //总数
      4: record, // 每箱数
      5: count % record, //余数
    };
  })
);
const columnConfig3 = reactive(["日期", "所属成品", "数量", "库位", "箱号"]);
let tableData3 = computed(() => {
  const lists = tableData2.map((item) => {
    const children = [];
    const len = Math.floor(item[3] / item[4]);
    const yu = item[3] % item[4];
    let xNumber = Math.floor(Math.random() * 10000);
    let cu = xNumber;
    const date = "2023/03/15";
    for (let i = 0; i < len; i++) {
      children.push({
        1: date,
        2: item[1],
        3: item[4],
        4: cu,
        5: xNumber++,
      });
    }
    if (yu > 0) {
      children.push({
        1: date,
        2: item[1],
        3: yu,
        4: cu,
        5: '',
        6: yu,
      });
    }
    return children;
  });
  return lists.flat(Infinity);
});
let produce = ref("");
let kuWei = ref("");
let _kuWei = ref("");
let editText = ref("编辑库位");
let editable3 = reactive([]);
const edit = () => {
  if (editable3.length === 0) {
    editable3.push(3);
    editText.value = "保存编辑";
  } else {
    editable3.splice(0);
    editText.value = "批量编辑库位";
  }
};
const setKuWei = () => {
  _kuWei.value = kuWei.value;
};
let _tableData3 = computed(() => {
  const data = tableData3.value
    .filter((item) => item[2].includes(produce.value)  && !item[6])
    .map((item) => {
      if (_kuWei.value) {
        item[4] = _kuWei.value;
      }
      return item;
    });
  return data;
});
let _tableData4 = computed(() => {
  const data = tableData3.value
    .filter((item) => item[2].includes(produce.value) && item[6])
    .map((item) => {
      if (_kuWei.value) {
        item[4] = _kuWei.value;
      }
      return item;
    });
  return data;
});
const sortableIndex = reactive([1]);
const emit = defineEmits(["sure"]);
const toPrint = () => {
  emit("sure");
};
</script>

<style lang="less" scoped>

</style>