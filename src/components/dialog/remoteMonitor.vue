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
               :visible.sync="dialogVisibleMonitor">

      <el-container>

        <!--左 · 树-->
        <el-aside class="left-panel">
          <left-tree class="left-panel-tree"
                     :data="monitorTree"
                     :contextmenu="false"
                     :collapse="false">
            <!-- @item-click="pluginClick" -->
          </left-tree>
        </el-aside>

        <!--右 · 表-->
        <el-container class="right-panel is-vertical">

          <!-- <el-table :data="formPass.plugin.plugins"
                    tooltip-effect="dark">
            <el-table-column type="index"
                             label="序号"
                             width="55">
            </el-table-column>
            <el-table-column prop="name"
                             label="插件名称"
                             width="200">
            </el-table-column>
            <el-table-column prop="platform"
                             label="平台"
                             width="120">
            </el-table-column>
            <el-table-column prop="edition"
                             label="版本"
                             width="120">
            </el-table-column>
            <el-table-column prop="lastModifiedDate"
                             label="最后修改日期"
                             width="160">
            </el-table-column>
          </el-table> -->

        </el-container>

      </el-container>

    </el-dialog>
  </div>
</template>

<script>
import LeftTree from "@/components/Tree"; // 组件：左侧树

export default {
  components: { LeftTree },
  props: {
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
      monitorTable: [] // 监视数据 - 右侧表格
    };
  },
  methods: {
    // ip选择
    ipSelect () {
      this.dialogVisibleIP = true;
    },
    // 弹出监视框
    remoteMonitor (row) {
      console.log(row);
      this.dialogVisibleMonitor = true;
      const treeData = JSON.parse(JSON.stringify(this.treeData)); // 深拷贝
      treeData[0].selected = false;
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
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
