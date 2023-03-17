<template>
    <div class="filter flex flex-row items-center justify-between pb-5">
      <div class="w-2/3 flex flex-row items-center">
        <el-input
          class="mr-2"
          v-model="input"
          placeholder="扫码出库"
          clearable
        >
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
        <el-button type="primary" @click="drawer = true">出库</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      stripe
      height="630"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="kuType" label="出入库类型"  width="150" sortable :filters="filterMap.kuType" :filter-method="filterHandler"/>
      <el-table-column prop="codeNumber" label="条码编号" width="150"  sortable :filters="filterMap.codeNumber"/>
      <el-table-column prop="number" label="产品编号" width="150" sortable :filters="filterMap.number"/>
      <el-table-column prop="color" label="颜色" sortable :filters="filterMap.color"/>
      <el-table-column prop="count" label="数量" sortable :filters="filterMap.count"/>
      <el-table-column prop="kuNumber" label="库位" sortable :filters="filterMap.kuNumber"/>
      <el-table-column prop="belongTo" label="所属成品" sortable :filters="filterMap.belongTo"/>
      <el-table-column prop="boxNumber" label="箱号" sortable :filters="filterMap.boxNumber"/>
      <el-table-column prop="operator" label="操作人" sortable :filters="filterMap.operator"/>
    </el-table>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref, watch, computed } from "vue";
  import { ElMessage } from "element-plus";
  import { Search } from "@element-plus/icons-vue";
  import type { TableColumnCtx } from 'element-plus'
  const drawer = ref(false);
  const input = ref("");
  type option = {
      kuType: string;
      codeNumber: string;
      number: string;
      color: string;
      count: number;
      kuNumber: string;
      belongTo: string;
      boxNumber: string;
      operator: string;
  };
  let data: option[] = (new Array(100).fill(1)).map((_, index) => ({
      kuType: index % 2 ? '出库' : '入库',
      codeNumber: 'AMS235667',
      number: 'AM78284JU',
      color: 'JU',
      count: Math.floor(Math.random() * 1000),
      kuNumber: '1',
      belongTo: 'abc',
      boxNumber: '20',
      operator: '成生',
    }));
  let tableData: option[] = reactive(data);
  let filterMap:any = computed(()=> {
      return tableData.reduce((t,p)=> {
      let key: keyof option;
      for( key in p) {
          if(!t[key]) t[key] = [];
          let arr = t[key];
          let value = p[key]
          if (arr.findIndex((item: {value: string, text: string}) => item.value === value) === -1) {
              arr.push({
                  value,
                  text: value,
              })
          }
      }
      return t;
  }, {} as any)
  })
  const filterHandler = (
    value: string,
    row: option,
    column: TableColumnCtx<option>
  ) => {
    return value === row.kuType;
  }
  
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
  });
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
  