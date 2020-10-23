<template>
  <el-dialog :title="dialogTitle"
             :visible.sync="dialogVisible">

    <!-- <el-checkbox v-model="formData.ratioCalculation"
                 style="margin-right:20px">系数计算</el-checkbox>
    <div class="params-dialog-row-div">
      &nbsp;倍率（a）
      <el-input v-model="formData.magnification"
                style="width:100px"
                :disabled="!formData.ratioCalculation"></el-input>
      &nbsp;基数（b）
      <el-input v-model="formData.base"
                style="width:100px;margin-right:20px"
                :disabled="!formData.ratioCalculation"></el-input>
      形如：y = ax + b
    </div> -->

    <div slot="footer"
         class="dialog-footer">
      <el-button @click="dialogVisible = false;formData.otherParams = paramsOrg">取 消</el-button>
      <el-button @click="dialogVisible = false"
                 type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  props: {
    // 当前标签数据
    formData: {
      type: Object
    }
  },
  data () {
    return {
      dialogVisible: false, // 是否可见
      dialogTitle: "" // 弹框名称
    };
  },
  methods: {
    // 其他参数
    setParams () {
      this.dialogVisible = true;
      console.log(this.formData);
      this.dialogTitle = `数据标签其他参数 ${this.formData.dataType}`;
      this.paramsOrg = JSON.parse(JSON.stringify(this.formData.otherParams)); // 深拷贝，取消时还原数据用
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
