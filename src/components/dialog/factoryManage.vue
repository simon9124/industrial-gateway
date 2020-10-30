<template>
  <el-dialog class="factory-manage"
             title="工程管理"
             :visible.sync="dialogVisible">

    <div class="btns">
      <el-button size="small"
                 icon="el-icon-plus"
                 type="primary"
                 :disabled="level===3"
                 @click="newBuild">新建</el-button>
      <el-button size="small"
                 icon="el-icon-close"
                 type="danger"
                 :disabled="level===1"
                 @click="itemDelete">删除</el-button>
      <el-button size="small"
                 icon="el-icon-upload2"
                 type="info">加载</el-button>
    </div>

    <left-tree class="left-panel-tree"
               :data="factoryData"
               :id="id"
               :contextmenu="false"
               @item-click="itemClick">
    </left-tree>

  </el-dialog>
</template>

<script>
import LeftTree from "@/components/Tree"; // 组件：左侧树

export default {
  components: { LeftTree },
  props: {
    // 工程数据
    factoryData: {
      type: Array,
      default: () => []
    },
    // 当前通道数据
    formPass: {
      type: Object
    }
  },
  data () {
    return {
      dialogVisible: false, // 是否可见
      /* tree */
      level: 1, // 被选择的树的层级
      id: null, // 被选择内容的id
      handleType: "" // 树节点的操作方式
    };
  },
  methods: {
    // 工程管理
    factoryManage () {
      this.dialogVisible = true;
      // this.paramsOrg = JSON.parse(JSON.stringify(this.formPass.otherParams)); // 深拷贝，取消时还原数据用
    },
    // 点击树节点
    itemClick (param) {
      // console.log(param);
      const { level, id } = param;
      this.level = level;
      this.id = id;
      this.level === 3 && this.$emit("factory-select", param.treeData);
    },
    // 新建
    newBuild () { },
    // 删除
    itemDelete () { }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
