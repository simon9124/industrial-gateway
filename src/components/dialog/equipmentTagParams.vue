<template>
  <el-dialog :title="dialogTitle"
             :visible.sync="dialogVisible">

    <el-row class="params-dialog-row">
      <el-checkbox v-model="formData.otherParams.takeAbsoluteValue"
                   style="margin-right:20px">取绝对值</el-checkbox>
      &nbsp;单位&nbsp;
      <el-input v-model="formData.otherParams.absoluteValue"
                style="width:100px;margin-right:20px"></el-input>
      &nbsp;设备系数计算&nbsp;
      <el-select v-model="formData.otherParams.calculation"
                 placeholder="请选择"
                 style="width:200px;margin-right:20px">
        <el-option v-for="item in calculationList"
                   :key="item"
                   :label="item"
                   :value="item">
        </el-option>
      </el-select>
    </el-row>

    <el-row class="params-dialog-row">
      <el-checkbox v-model="formData.otherParams.ratioCalculation"
                   style="margin-right:20px">系数计算</el-checkbox>
      <div class="params-dialog-row-div">
        &nbsp;倍率（a）
        <el-input v-model="formData.otherParams.magnification"
                  style="width:100px"
                  :disabled="!formData.otherParams.ratioCalculation"></el-input>
        &nbsp;基数（b）
        <el-input v-model="formData.otherParams.base"
                  style="width:100px;margin-right:20px"
                  :disabled="!formData.otherParams.ratioCalculation"></el-input>
        形如：y = ax + b
      </div>
    </el-row>

    <div slot="footer"
         class="dialog-footer">
      <el-button @click="dialogVisible = false;formData.otherParams = paramsOrg;">
        取 消</el-button>
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
      dialogTitle: "", // 弹框名称
      calculationList: ["不参与计算", "乘设备系数R1", "乘设备系数R2", "乘设备系数R1*R2"] // 设备系数列表
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

<style rel="stylesheet/scss" lang="scss" scoped></style>
