<template>
  <div>

    <!-- ip -->
    <el-dialog class="ip-select"
               title="IP选择"
               :visible.sync="dialogVisibleIP">

      <el-table :data="IPTable"
                tooltip-effect="dark"
                @row-dblclick="remoteMonitor">
        <el-table-column type="index"
                         label="序号"
                         min-width="55">
        </el-table-column>
        <el-table-column prop="address"
                         label="IP地址"
                         min-width="100">
        </el-table-column>
        <el-table-column prop="system"
                         label="系统平台"
                         min-width="100">
        </el-table-column>
        <el-table-column prop="productName"
                         label="产品名称"
                         min-width="80">
        </el-table-column>
        <el-table-column prop="factoryDescribe"
                         label="工程描述"
                         min-width="120">
        </el-table-column>
        <el-table-column prop="kernelEdition"
                         label="内核版本"
                         min-width="80">
        </el-table-column>
        <el-table-column prop="faultTimes"
                         label="故障次数"
                         min-width="80">
        </el-table-column>
        <el-table-column prop="createTime"
                         label="工程创建时间"
                         min-width="140">
        </el-table-column>
        <el-table-column prop="status"
                         label="状态"
                         min-width="60">
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- monitor -->
    <el-dialog class="monitor-dialog"
               :title="dialogTitleMonitor"
               :visible.sync="dialogVisibleMonitor"
               top="10vh">

      <el-container>

        <!--左 · 树-->
        <el-aside class="left-panel">
          <left-tree class="left-panel-tree"
                     :data="monitorTree"
                     :contextmenu="false"
                     :collapse="false"
                     @item-click="itemClick">
          </left-tree>
        </el-aside>

        <!--右 · 表-->
        <el-container class="right-panel is-vertical">
          <el-form label-position="left">
            <el-table :data="monitorTable"
                      tooltip-effect="dark"
                      empty-text=" "
                      :max-height="tableMaxHeight">
              <el-table-column type="index"
                               label="序号"
                               width="40">
              </el-table-column>
              <el-table-column prop="name"
                               label="名称(英文)"
                               min-width="150">
              </el-table-column>
              <el-table-column prop="describe"
                               label="描述(中文)"
                               min-width="160">
              </el-table-column>
              <el-table-column prop="curValue"
                               label="当前值"
                               min-width="180">
              </el-table-column>
              <el-table-column prop="curTime"
                               label="时间"
                               min-width="160">
              </el-table-column>
              <el-table-column prop="qualityStamp"
                               label="质量戳"
                               min-width="80">
              </el-table-column>
              <el-table-column prop="changeTimes"
                               label="变化次数"
                               min-width="80">
              </el-table-column>
              <el-table-column prop="handle"
                               label="HANDLE"
                               min-width="80">
              </el-table-column>
              <el-table-column prop="dataType"
                               label="数据类型"
                               min-width="80">
              </el-table-column>
              <el-table-column prop="direction"
                               label="读写方向"
                               min-width="80">
              </el-table-column>
            </el-table>
          </el-form>
        </el-container>

      </el-container>

    </el-dialog>
  </div>
</template>

<script>
import LeftTree from "@/components/Tree"; // 组件：左侧树
import { systemDic, passDic, equipmentDic } from "@/mock/dictionary"; // mockData - 监视表格数据
import { parseTime } from "@/utils"; // function - 格式化时间

export default {
  components: { LeftTree },
  props: {
    // 工程数据
    factoryData: {
      type: Array,
      default: () => []
    },
    // 被选择的id - 工程
    idFactory: {
      type: String
    },
    // 树数据
    treeData: {
      type: Array
    }
  },
  data () {
    return {
      /* ip */
      dialogVisibleIP: false, // 是否可见 - ip选择
      IPTable: [
        {
          address: "172.15.19.109",
          system: "windows",
          productName: "本地运行",
          factoryDescribe: "",
          kernelEdition: 5,
          faultTimes: 0,
          createTime: "",
          status: "在线"
        }
      ], // ip列表
      /* monitor */
      dialogVisibleMonitor: false, // 是否可见 - 监视左数右表
      dialogTitleMonitor: "", // 弹框名称 - 监视左数右表
      monitorTree: [], // 监视数据 - 左侧树
      monitorTable: [], // 监视数据 - 右侧表格
      handle: 0, // 需要递增的handle列项
      /* 动态高度 */
      tableMaxHeight: 0 // 流体表格最大高度
    };
  },
  created () {
    this.getTreeData();
  },
  methods: {
    // 渲染左侧树
    getTreeData () {
      const treeData = JSON.parse(JSON.stringify(this.treeData)); // 深拷贝
      this.monitorTree = [
        {
          text: "系统",
          icon: "fa fa-folder",
          id: "root",
          level: 0,
          selected: true,
          opened: true,
          children: treeData
        }
      ];
      this.handleRecursion(this.monitorTree); // 左侧树数据递归处理
    },
    // ip选择
    ipSelect () {
      this.dialogVisibleIP = true;
    },
    // 弹出监视框
    remoteMonitor (row) {
      // console.log(row);
      this.handle = 0;
      this.dialogTitleMonitor = row.address;
      this.dialogVisibleMonitor = true;
      this.getTableMaxHeight(); // 表格最大高度
      this.handleRecursion(this.monitorTree); // 左侧树数据递归处理
      this.monitorTable = this.monitorTree[0].tableData; // 渲染表格
      this.refreshTableData(); // 表格数据处理
    },
    // 表格最大高度
    getTableMaxHeight () {
      const screenHeight = document.documentElement.clientHeight;
      this.tableMaxHeight = screenHeight - 54 - 10 * 2 - 10 * 2 - screenHeight * 0.20;
    },
    // 点击左侧树节点
    itemClick (param) {
      console.log(param);
      this.monitorTable = param.tableData || [];
      this.refreshTableData();
    },
    // 左侧树数据处理 - 递归函数
    handleRecursion (recursionData) {
      recursionData.forEach(item => {
        const params = {
          opened: true,
          selected: item.level === 0,
          tableData:
            item.level === 0 ? JSON.parse(JSON.stringify(systemDic))
              : item.level === 1 ? []
                : item.level === 3 ? JSON.parse(JSON.stringify(equipmentDic))
                  : item.id.slice(0, 1) === "1"
                    ? JSON.parse(JSON.stringify(passDic.filter(pass => pass.type.indexOf("collect") > -1)))
                    : JSON.parse(JSON.stringify(passDic.filter(pass => pass.type.indexOf("data") > -1)))
        };
        this.dataPackage(item, params);
        item.children && this.handleRecursion(item.children);
      });
    },
    // 封装：左侧树每层数据处理
    dataPackage (item, params) {
      Object.keys(params).forEach(key => {
        this.$set(item, key, params[key]); // 遍历对象：①选中与否 ②展开 ③设置tableData
      });
      item.tableData.forEach(_item => { // handle列项
        this.$set(_item, "handle", this.handle);
        this.handle++;
      });
    },
    // 表格数据处理
    refreshTableData () {
      this.monitorTable.forEach((item, i) => {
        this.$set(item, "curTime", parseTime(new Date()));
        this.$set(item, "qualityStamp", "good");
        this.$set(item, "changeTimes", Math.floor(Math.random() * (1 - 101) + 101));
        this.$set(item, "direction", "只读");
        item.name === "_project_name" && this.factoryData[0].children.forEach(group => {
          group.children.forEach(factory => {
            factory.id === this.idFactory && this.$set(item, "curValue", factory.text);
          });
        });
        item.name === "_project_create_time" && this.factoryData[0].children.forEach(group => {
          group.children.forEach(factory => {
            factory.id === this.idFactory && this.$set(item, "curValue", group.creatTime);
          });
        });
      });
    }
  },
  watch: {
    idFactory () {
      this.getTreeData();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
