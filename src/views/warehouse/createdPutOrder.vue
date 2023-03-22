<template>
  <el-tabs v-model="step">
    <el-tab-pane label="入仓单" name="1">
      <el-form class="w-2/5">
        <el-form-item label="入仓单编号">
          <el-input />
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="date" type="date" />
        </el-form-item>
        <el-form-item label="制表人">
          <el-input />
        </el-form-item>
        <el-form-item label="签收人">
          <el-input />
        </el-form-item>
        <el-button @click="step = '2'">确定</el-button>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="添加入仓记录" name="2">
      <el-header class="flex items-center justify-end">
        <el-button type="primary" @click="dialogTableVisible = true"
          >添加记录</el-button
        >
        <el-button type="primary">保存入仓单</el-button>
        <el-button type="success" @click="step = '3'">生成标签</el-button>
      </el-header>
      <selfTable
        :column-config="columnConfig"
        :tableData="tableData"
        :buttons="['删除', '修改']"
        @toolsHandle="toolsHandle"
      />
    </el-tab-pane>
    <!-- <el-tab-pane label="入仓单拆解" name="3">
      <el-header class="flex items-center justify-end">
        <el-button type="success" @click="step = '4'">生成标签</el-button>
      </el-header>
      <selfTable
        :column-config="columnConfig2"
        :tableData="tableData2"
        :editable="[5, 6]"
      />
    </el-tab-pane> -->
    <el-tab-pane label="标签" name="3">
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
              <el-button type="primary" @click="edit">{{ editText }}</el-button>
              <el-button type="primary" @click="toPrint">去打印</el-button>
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
    </el-tab-pane>
  </el-tabs>
  <el-dialog v-model="dialogTableVisible" title="添加入仓单记录">
    <el-form class="w-2/5">
      <el-form-item label="产品编号">
        <el-input />
      </el-form-item>
      <el-form-item label="成品归属">
        <el-input />
      </el-form-item>
      <el-form-item label="每箱几个">
        <el-input />
      </el-form-item>
      <el-form-item label="几箱">
        <el-input />
      </el-form-item>
      <el-form-item v-for="(_, index) in shareBox" label="拼箱">
        <el-input />
        <el-button type="text" @click="shareBox--">删除</el-button>
      </el-form-item>
      <el-button @click="ping">增加拼箱</el-button>
      <el-button @click="add" type="primary">确定</el-button>
    </el-form>
  </el-dialog>
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
// const columnConfig2 = reactive([
//   "产品编号",
//   "产品名称",
//   "入仓数量",
//   "个/箱",
//   "余数",
//   "余数是否拼箱",
//   "拼箱箱号",
// ]);
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

<style lang="scss" scoped></style>
