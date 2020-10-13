<template>
  <div class="content">
    <el-tabs v-model="activeName">

      <!-- 配置参数 -->
      <el-tab-pane name="first">
        <span slot="label">
          <i class="el-icon-setting"></i> 配置参数
        </span>
        <el-form :model="formEquipment"
                 label-position="left">

          <el-row>
            <el-col style="width:420px">
              <el-form-item label-width="95px"
                            label="名称(英文)："
                            prop="equipmentName">
                <el-input v-model="formEquipment.equipmentName"></el-input>
              </el-form-item>
            </el-col>
            <el-col style="width:380px">
              <el-form-item label-width="55px"
                            label="描述："
                            prop="equipmentDescribe">
                <el-input v-model="formEquipment.equipmentDescribe"></el-input>
              </el-form-item>
            </el-col>
            <el-button style="margin:0 0 20px 20px">其他参数</el-button>
          </el-row>

          <el-row>
            <el-col style="width:450px">
              <el-form-item label-width="125px"
                            label="用户参数(如:型)："
                            prop="userParam">
                <el-input v-model="formEquipment.userParam"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="基本参数"
                            name="1">
            <div>MODBUS设备地址：{{formEquipment.MODBUSAdd}}</div>
            <div>查询帧查询的最大字数：{{formEquipment.searchNum}}</div>
          </el-collapse-item>
          <el-collapse-item title="写寄存器"
                            name="2">
            <div>单寄存器写是否按6号指令？{{formEquipment.singleRegister?'YES':"NO"}}</div>
            <div>多寄存器写是否按16号指令？{{formEquipment.multiRegister?'YES':"NO"}}</div>
          </el-collapse-item>
          <el-collapse-item title="高级参数"
                            name="3">
            <div>合对应的值：{{formEquipment.correspondingValue}}</div>
            <div>分对应的值：{{formEquipment.subCorrespondingValue}}</div>
            <div>双字节校验CRC传送顺序，先低后高？{{formEquipment.doubleByteCheck?'YES':"NO"}}</div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>

      <!-- 数据标签 -->
      <el-tab-pane name="second">
        <span slot="label">
          <i class="el-icon-edit-outline"></i> 数据标签
        </span>
        <el-table :data="tableEquipment"
                  style="width:1361px"
                  border>
          <el-table-column prop="id"
                           label="序号"
                           width="100">
          </el-table-column>
          <el-table-column prop="name"
                           label="名称(英文)"
                           width="120">
          </el-table-column>
          <el-table-column prop="discribe"
                           label="描述(中文)"
                           width="180">
          </el-table-column>
          <el-table-column prop="dataType"
                           label="数据类型"
                           width="120">
          </el-table-column>
          <el-table-column prop="direction"
                           label="读写方向"
                           width="120">
          </el-table-column>
          <el-table-column prop="acquisitionCycle"
                           label="采集周期(毫秒)"
                           width="120">
          </el-table-column>
          <el-table-column prop="registerType"
                           label="寄存器类型序号"
                           width="120">
          </el-table-column>
          <el-table-column prop="registerAddr"
                           label="寄存器地址"
                           width="120">
          </el-table-column>
          <el-table-column prop="analytical"
                           label="解析方式"
                           width="120">
          </el-table-column>
          <el-table-column prop="deviation"
                           label="位偏移量"
                           width="120">
          </el-table-column>
          <el-table-column prop="BCD"
                           label="按BCD解析"
                           width="120">
          </el-table-column>
        </el-table>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import { equipmentList } from "@/mock/content.js"; // mockData

export default {
  props: {
    id: {
      type: String
    }
  },
  data () {
    return {
      activeName: "first", // tabs选中的标签
      activeNames: ["1", "2", "3"], // 手风琴展开的标签
      formEquipment: {}, // 表单数据
      tableEquipment: [ // 表格数据
        {
          id: "1",
          name: "Tag1",
          discribe: "标签1",
          dataType: "浮点",
          direction: "只读",
          acquisitionCycle: "1000",
          registerType: "0",
          registerAddr: "0",
          analytical: "-1",
          deviation: "0",
          BCD: "0"
        }
      ]
    };
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      equipmentList.forEach((equipment, i) => {
        equipment.id === this.id && (this.formEquipment = equipmentList[i]);
      });
      this.activeName = "first"; // tab重置
    }
  },
  watch: {
    id (val) {
      this.getData();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/content.scss';
</style>
