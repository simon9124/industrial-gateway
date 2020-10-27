<template>
  <el-dialog class="tag-select-dialog"
             v-if="dialogVisible"
             title="标签变量字典"
             :visible.sync="dialogVisible">

    <el-container>

      <!--左 · 树-->
      <el-aside class="left-panel">
        <left-tree class="left-panel-tree"
                   :data="tagTreeData"
                   :contextmenu="false"
                   :collapse="false"
                   @item-click="itemClick">
        </left-tree>
      </el-aside>

      <!--右 · 表-->
      <el-container class="right-panel is-vertical">
        <el-form label-position="left">

          <el-form-item label-width="55px"
                        label="名称：">
            <el-input v-model="formData.IOTag"></el-input>
          </el-form-item>
          <el-form-item label-width="55px"
                        label="描述：">
            {{formData.discribe}}
          </el-form-item>

          <el-table :data="tableData"
                    empty-text=""
                    tooltip-effect="dark"
                    highlight-current-row
                    @current-change="tagClick">
            <el-table-column type="index"
                             label="序号"
                             width="40">
            </el-table-column>
            <el-table-column prop="name"
                             label="名称"
                             width="110">
            </el-table-column>
            <el-table-column prop="describe"
                             label="描述"
                             width="140">
            </el-table-column>
            <el-table-column prop="dataType"
                             label="类型"
                             width="70">
            </el-table-column>
            <el-table-column prop="direction"
                             label="方向"
                             width="60">
            </el-table-column>
            <el-table-column prop="source"
                             label="来源"
                             width="70">
            </el-table-column>
          </el-table>

        </el-form>
      </el-container>

    </el-container>

    <div slot="footer"
         class="dialog-footer">
      <el-button @click="dialogVisible = false;formData.IOTag = IOTagOrg;">取 消</el-button>
      <el-button type="primary"
                 @click="dialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import LeftTree from "@/components/Tree"; // 组件：左侧树

export default {
  components: { LeftTree },
  props: {
    // 服务导航中被选择的id
    id: {
      type: String
    },
    // 当前标签数据
    formData: {
      type: Object,
      default: () => { }
    },
    // 左侧树 - 原始数据
    treeData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      dialogVisible: false, // 是否可见
      tableData: [] // 表格内容
    };
  },
  methods: {
    // 选择标签
    tagSelect () {
      this.dialogVisible = true;
      // console.log(this.formData);
      this.getTagTreeData();
      this.IOTagOrg = JSON.parse(JSON.stringify(this.formData.IOTag)); // 深拷贝，取消时还原数据用
    },
    // 处理原树数据，刷新左侧树和其对应内容
    getTagTreeData () {
      this.tagTreeData = JSON.parse(JSON.stringify(this.treeData));
      console.log(this.tagTreeData);
      /* group */
      this.tagTreeData.forEach(group => {
        if (group.id === "1") {
          group.text = "IO标签";
          group.tagSelectList = [
            {
              name: "_kernal_version",
              describe: "应用程序内核版本",
              dataType: "整型",
              direction: "读写",
              source: "IO属性"
            },
            {
              name: "_cpu",
              describe: "CPU负荷",
              dataType: "整型",
              direction: "只读",
              source: "IO属性"
            },
            {
              name: "_mem_total",
              describe: "内存总数(k)",
              dataType: "整型",
              direction: "只读",
              source: "IO属性"
            }
          ];
        } else if (group.id === "2") {
          group.text = "系统变量标签";
          group.children = [];
        };
        /* pass */
        group.children.forEach(pass => {
          pass.tagSelectList = [
            {
              name: "_send_byte",
              describe: "发送字节数(BYTE)",
              dataType: "整型",
              direction: "只读",
              source: "IO属性"
            },
            {
              name: "_rev_byte",
              describe: "接收字节数(BYTE)",
              dataType: "整型",
              direction: "只读",
              source: "IO属性"
            },
            {
              name: "_io_status",
              describe: "通道状态",
              dataType: "整型",
              direction: "只读",
              source: "IO属性"
            }
          ];
          pass.children.forEach(equpiment => {
            equpiment.tagSelectList = [
              {
                name: "_send_package",
                describe: "发送帧个数",
                dataType: "整型",
                direction: "只读",
                source: "IO属性"
              },
              {
                name: "_rev_package",
                describe: "接收帧个数",
                dataType: "整型",
                direction: "只读",
                source: "IO属性"
              },
              {
                name: "_success_rate",
                describe: "通信成功率",
                dataType: "浮点",
                direction: "只读",
                source: "IO属性"
              },
              {
                name: "_io_status",
                describe: "设备状态",
                dataType: "布尔",
                direction: "只读",
                source: "IO属性"
              }
            ];
          });
        });
      });
    },
    // 点击树节点
    itemClick (param) {
      this.tableData = param.tagSelectList;
    },
    // 点击表格
    tagClick (val) {
      this.$emit("tag-click", val);
    }
  },
  watch: {
    dialogVisible (val) {
      val === true && this.tagTreeData.forEach(classification => {
        /* 1.控制展开 */
        // classification.opened = false; // 全部展开关闭
        // this.formData.plugin.classification === classification.text &&
        //   (classification.opened = true); // 展开与当前通道关联的
        /* 2.控制选中 */
        // classification.children.forEach(plugin => {
        //   plugin.selected = false; // 全部取消选中
        //   this.formData.plugin.name === plugin.name &&
        //     (plugin.selected = true); // 选中与当前通道关联
        // });
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
