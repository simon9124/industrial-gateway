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
               :model="formFactory"
               label-width="90px"
               label-position="right">
        <el-form-item prop="text"
                      label="工程名：">
          <el-input v-model="formFactory.text"></el-input>
        </el-form-item>
        <el-form-item prop="describe"
                      label="工程描述：">
          <el-input v-model="formFactory.describe"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogManageVisible = false">取 消</el-button>
        <el-button @click="submit"
                   type="primary"
                   :loading="submitLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from "@/utils"; // function - 格式化时间
import { treeTempleteData } from "@/mock/tree";
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
      id: null, // 被选择的树的id
      dialogType: "", // dialog的种类 group/factory
      handleType: "", // dialog的提交方式 insert/edit
      /* 工程组 */
      formGroup: {
        text: "",
        describe: "",
        creatTime: ""
      }, // 表单数据
      formGroupOrg: {}, // 表单数据 - 原始
      /* 工程 */
      formFactory: { // 表单数据
        text: "",
        describe: ""
      },
      formFactoryOrg: {}, // 表单数据 - 原始
      /* loading */
      submitLoading: false
    };
  },
  methods: {
    // 工程管理
    factoryManage () {
      this.dialogVisible = true;
    },
    // 获取被选择的工程
    getSelectedFactory () { },
    // 点击树节点
    itemClick (param) {
      // console.log(param);
      const { id, level } = param;
      this.id = id;
      this.level = level;
      this.level === 2 && (this.formGroupOrg = param);
      this.level === 3 && (this.formFactoryOrg = param);
      this.$emit("factory-select", param);
    },
    // 新建
    newBuild () {
      this.dialogManageVisible = true;
      this.handleType = "insert";
      this.dialogManageTitle = `新建${this.level === 1 ? "项目组" : "采集工程"}`;
      this.dialogType = this.level === 1 ? "group" : "factory";
      this.$nextTick(() => {
        this.level === 1 && this.$refs.formGroup.resetFields();
        this.level === 2 && this.$refs.formFactory.resetFields();
        this.formGroup.creatTime = parseTime(new Date());
      });
    },
    // 修改
    editFactory () {
      this.dialogManageVisible = true;
      this.handleType = "edit";
      this.dialogManageTitle = `修改${this.level === 2 ? "项目组" : "采集工程"}`;
      this.dialogType = this.level === 2 ? "group" : "factory";
      this.$nextTick(() => {
        this.level === 2 && (this.formGroup = JSON.parse(JSON.stringify(this.formGroupOrg)));
        this.level === 3 && (this.formFactory = JSON.parse(JSON.stringify(this.formFactoryOrg)));
      });
    },
    // 表单提交：增/改
    submit () {
      const formData = this.dialogType === "group"
        ? JSON.parse(JSON.stringify(this.formGroup)) : JSON.parse(JSON.stringify(this.formFactory));
      this.submitLoading = true;
      // console.log(formData);
      switch (this.handleType) {
        case "insert":
          /* 1.完善数据 */
          formData.id = Math.random().toString(36).substr(-10);// 随机生成id
          formData.icon = this.dialogType === "group" ? "fa fa-laptop" : "fa fa-edit";
          formData.level = this.dialogType === "group" ? 2 : 3;
          formData.selected = false; // 未被选中的父节点需设置selected为false，否则该节点切换时会有bug
          formData.opened = true; // 父节点须设置opened为true，否则子节点首次新增时打不开
          /* 2.塞入数据 */
          if (this.dialogType === "group") { // 新增工程组
            formData.children = [];
            this.factoryData[0].children.push(formData);
          } else { // 新增工程
            formData.treeData = JSON.parse(JSON.stringify(treeTempleteData));
            this.factoryData[0].children.forEach((group, i) => {
              this.id === group.id && group.children.push(formData);
            });
          }
          /* 3.重新选中当前的工程 */

          this.submitLoading = false;
          this.dialogManageVisible = false;
          break;
        case "edit":
          this.factoryData[0].children.forEach((group, i) => {
            // 工程组修改
            this.dialogType === "group" && formData.id === group.id &&
              this.$set(this.factoryData[0].children, i, JSON.parse(JSON.stringify(formData)));
            // 工程修改
            this.dialogType === "factory" && group.children.forEach((factory, _i) => {
              formData.id === factory.id &&
                this.$set(group.children, _i, JSON.parse(JSON.stringify(formData)));
            });
          });
          this.submitLoading = false;
          this.dialogManageVisible = false;
          break;
      }
    },
    // 删除
    itemDelete () { }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
