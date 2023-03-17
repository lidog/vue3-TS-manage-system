<template>
  <div class="filter flex flex-row items-center justify-between pb-5">
    <div class="w-2/3 flex flex-row items-center">
      <el-input
        class="mr-2"
        v-model="input"
        placeholder="输入产品编号搜索"
        clearable
      >
        <template #append>
          <el-button :icon="Search" />
        </template>
      </el-input>
      <el-button type="primary" @click="drawer = true">添加产品信息</el-button>
    </div>
    <div class="tools">
      <el-button
        type="primary"
        @click="exportExcel"
        :disabled="selected.length > 0 ? false : true"
        >导出excel</el-button
      >
      <el-button type="primary" @click="drawer2 = true">打印标签</el-button>
    </div>
  </div>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column prop="number" label="产品编号" width="180" />
    <el-table-column prop="name" label="产品名称" width="180" />
    <el-table-column prop="type" label="产品类型" />
    <el-table-column prop="size" label="尺寸" />
    <el-table-column prop="color" label="颜色" />
  </el-table>
  <div class="my-drawer">
    <el-drawer v-model="drawer" title="添加产品">
      <el-main class="main flex-col justify-around">
        <remoteSelect
          v-model="state.number"
          :remoteMethod="(query:string) => remoteMethod(query, 'number')"
          placeholder="请输入产品编号"
        />
        <remoteSelect
          placeholder="请输入产品名称"
          v-model="state.name"
          :remoteMethod="(query:string) => remoteMethod(query, 'name')"
        />
        <remoteSelect
          placeholder="请输入产品类型"
          v-model="state.type"
          :remoteMethod="(query:string) => remoteMethod(query, 'type')"
        />
        <remoteSelect
          placeholder="请输入尺寸"
          v-model="state.size"
          :remoteMethod="(query:string) => remoteMethod(query, 'size')"
        />
        <remoteSelect
          placeholder="请输入颜色"
          v-model="state.color"
          :remoteMethod="(query:string) => remoteMethod(query, 'color')"
        />
      </el-main>
      <el-footer class="footer flex items-center justify-end">
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="addProduce">确定</el-button>
      </el-footer>
    </el-drawer>
    <el-drawer v-model="drawer2" title="打印标签">
      <el-main class="main flex-col justify-around">
        <el-form :model="form" label-width="100px" class="pt-5">
          <el-form-item label="所属成品">
            <remoteSelect
              v-model="form.number"
              :remoteMethod="(query:string) => remoteMethod(query, 'number')"
              placeholder="请输入产品编号"
            />
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="form.amount" type="number" />
          </el-form-item>
          <el-form-item label="每箱多少个">
            <el-input v-model="form.eachNumber" type="number" />
          </el-form-item>
          <el-form-item label="打印张数">
            <p>{{ pieceNumber }}</p>
          </el-form-item>
          <el-form-item label="库位">
            <el-input v-model="form.ku" type="number" />
          </el-form-item>
          <el-form-item label="整型/拼箱">
            <el-select v-model="form.ping">
              <el-option label="整型" value="整型" />
              <el-option label="拼箱" value="拼箱" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer class="footer flex items-center justify-end">
        <el-button @click="drawer2 = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-footer>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed } from "vue";
import remoteSelect from "../../components/remoteSelect.vue";
import { ElMessage } from "element-plus";
import { Search } from "@element-plus/icons-vue";
const drawer = ref(false);
const input = ref("");
type option = {
  number: string;
  name: string;
  type: string;
  size: string;
  color: string;
};
let data: option[] = [
  {
    number: "56284/Do",
    name: "色粉",
    type: "零件",
    size: "100*100",
    color: "Do",
  },
  {
    number: "L56284/Do",
    name: "色母",
    type: "零件",
    size: "100*100",
    color: "Do",
  },
  {
    number: "AM81284APG",
    name: "胶件",
    type: "零件",
    size: "100*100",
    color: "APG",
  },
  {
    number: "AM78284JU",
    name: "胶件",
    type: "零件",
    size: "100*100",
    color: "JU",
  },
  {
    number: "AM78284JF",
    name: "胶件",
    type: "零件",
    size: "100*100",
    color: "JF",
  },
  {
    number: "AM72844",
    name: "胶件",
    type: "零件",
    size: "100*100",
    color: "AM72844",
  },
];
let tableData: option[] = reactive(data);
interface ListItem {
  value: string;
  label: string;
}
let state: {
  number: string;
  name: string;
  type: string;
  size: string;
  color: string;
} = reactive({
  number: "",
  name: "",
  type: "",
  size: "",
  color: "",
});

const remoteMethod = (query: string, key: keyof option) => {
  return new Promise<ListItem[]>((resolve) => {
    let valueMap: {
      [key: string]: boolean;
    } = {};
    if (query) {
      setTimeout(() => {
        const options = tableData
          .filter((item) => {
            if (
              item[key].toLowerCase().includes(query.toLowerCase()) &&
              !valueMap[item[key]]
            ) {
              valueMap[item[key]] = true;
              return true;
            }
          })
          .map((item) => {
            return {
              value: item[key],
              label: item[key],
            };
          });
        resolve(options);
      }, 200);
    } else {
      resolve(
        tableData
          .filter((item) => {
            if (!valueMap[item[key]]) {
              valueMap[item[key]] = true;
              return true;
            }
          })
          .map((item) => {
            return {
              value: item[key],
              label: item[key],
            };
          })
      );
    }
  });
};

const addProduce = () => {
  const { number, name, type, size, color } = state;
  tableData.push({
    number,
    name,
    type,
    size,
    color,
  });
  state = reactive({
    number: "",
    name: "",
    type: "",
    size: "",
    color: "",
  });
};

watch(input, (val: string) => {
  tableData = data.filter((item) =>
    item.number.toLocaleLowerCase().includes(val)
  );
});

let selected: option[] = reactive([]);
const handleSelectionChange = (val: option[]) => {
  selected.splice(0);
  selected.push(...val);
};
const exportExcel = () => {
  ElMessage({
    message: "导出excel成功！",
    type: "success",
  });
};

let drawer2 = ref(false);
const form = reactive({
  number: "",
  date: "",
  amount: 0,
  eachNumber: 0,
  ku: "",
  ping: "",
});

const onSubmit = () => {
  ElMessage({
    message: "打印成功！",
    type: "success",
  });
};

let pieceNumber = computed(() => {
  if (form.eachNumber) {
    return Math.ceil(form.amount / form.eachNumber);
  } else {
    return 0;
  }
})
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
