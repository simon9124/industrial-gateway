<template>
  <div>
    <!-- dialog - 工程管理 -->
    <el-dialog class="factory-manage"
               title="工程管理"
               :visible.sync="dialogVisible">

      <div class="btns">
        <el-button size="small"
                   type="primary"
                   :disabled="level===3"
                   @click="newBuild">新建</el-button>
        <el-button size="small"
                   type="success"
                   :disabled="level===1"
                   @click="editFactory">修改</el-button>
        <el-button size="small"
                   type="danger"
                   :disabled="level===1"
                   @click="itemDelete">删除</el-button>
        <el-button size="small"
                   type="info">加载</el-button>
      </div>

      <left-tree class="left-panel-tree"
                 :data="factoryData"
                 :id="id"
                 :contextmenu="false"
                 @item-click="itemClick">
      </left-tree>

    </el-dialog>

    <!-- dialog - 增/改 -->
    <el-dialog class="factory-operate"
               :title="dialogManageTitle"
               :visible.sync="dialogManageVisible">

      <!-- 工程组 -->
      <el-form v-if="level===1||(level===2&&handleType==='edit')"
               ref="formGroup"
               :model="formGroup"
               label-width="100px"
               label-position="right">
        <el-form-item prop="text"
                      label="项目组名：">
          <el-input v-model="formGroup.text"></el-input>
        </el-form-item>
        <el-form-item prop="describe"
                      label="项目组描述：">
          <el-input v-model="formGroup.describe"></el-input>
        </el-form-item>
        <el-form-item prop="creatTime"
                      label="创建时间：">
          <el-input v-model="formGroup.creatTime"
                    disabled></el-input>
        </el-form-item>
      </el-form>

      <!-- 采集工程 -->
      <el-form v-if="level===3||(level===2&&handleType==='insert')"
               ref="formFactory"
               :model="formFactory">
        formFactory

      </el-form>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogManageVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
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
      dialogVisible: false, // 是否可见 - 工程管理
      dialogManageVisible: false, // 是否可见 - 新增/修改
      dialogManageTitle: "", // 新增/修改 - 弹框名称
      /* tree */
      level: 3, // 被选择的树的层级
      id: null, // 被选择内容的id
      handleType: "", // 树节点的操作方式
      /* 工程组 */
      formGroup: {
        text: "",
        describe: "",
        creatTime: ""
      }, // 表单数据
      formGroupOrg: {}, // 表单数据 - 原始
      /* 工程 */
      formFactory: {}, // 表单数据
      formFactoryOrg: {} // 表单数据 - 原始

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
      console.log(param);
      this.level = param.level;
      this.level === 2 && (this.formGroupOrg = param);
      this.level === 3 && (this.formFactoryOrg = param);
      this.$emit("factory-select", param);
    },
    // 新建
    newBuild () {
      this.dialogManageVisible = true;
      this.handleType = "insert";
      this.dialogManageTitle = `新建${this.level === 1 ? "项目组" : "采集工程"}`;
      this.$nextTick(() => {
        this.level === 1 && this.$refs.formGroup.resetFields();
        this.level === 2 && this.$refs.formFactory.resetFields();
      });
    },
    // 修改
    editFactory () {
      this.dialogManageVisible = true;
      this.handleType = "edit";
      this.dialogManageTitle = `修改${this.level === 2 ? "项目组" : "采集工程"}`;
      this.$nextTick(() => {
        this.level === 2 && (this.formGroup = JSON.parse(JSON.stringify(this.formGroupOrg)));
        this.level === 3 && (this.formFactory = JSON.parse(JSON.stringify(this.formFactoryOrg)));
      });
    },
    // 删除
    itemDelete () { }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
