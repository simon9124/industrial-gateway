<template>
  <div class="header">
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
                 icon="el-icon-caret-right"
                 type="success">本地运行</el-button>
      <el-button size="small"
                 icon="el-icon-suitcase"
                 type="success">工程管理</el-button>
      <el-button size="small"
                 icon="el-icon-data-board"
                 type="success">远程监视</el-button>
      <el-button size="small"
                 icon="el-icon-download"
                 type="info">上传下载</el-button>
      <el-button size="small"
                 icon="el-icon-check"
                 type="primary">保存</el-button>
      <el-button size="small"
                 icon="el-icon-refresh"
                 type="warning">更新</el-button>
    </div>

    <!-- dialog - 配置 -->
    <el-dialog class="dispose-dialog"
               :title="dialogDisposeTitle"
               :visible.sync="dialogDisposeVisible">

      <!-- 采集通道配置 -->
      <el-form v-if="level===1"
               :model="formPass"
               label-position="left">

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label-width="95px"
                          label="名称(英文)："
                          prop="passName">
              <el-input v-model="formPass.passName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="55px"
                          label="描述："
                          prop="passDescribe">
              <el-input v-model="formPass.passDescribe"></el-input>
            </el-form-item>
          </el-col>
          <el-button style="margin:0 0 20px 5px"
                     @click="setParams">其他参数</el-button>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label-width="55px"
                          label="厂家："
                          prop="factory">
              <el-input disabled
                        v-model="formPass.factory"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="55px"
                          label="描述："
                          prop="factoryDescribe">
              <el-input disabled
                        v-model="formPass.factoryDescribe"></el-input>
            </el-form-item>
          </el-col>
          <el-button style="margin:0 0 20px 5px">选择插件</el-button>
          <el-button style="margin-bottom:20px">帮助</el-button>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label-width="55px"
                          label="路径：">
              <el-input disabled
                        v-model="formPass.factoryPath"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label-width="85px"
                          label="通道类型："
                          prop="passType">
              <el-select v-model="formPass.passType"
                         placeholder="请选择">
                <el-option v-for="item in passTypeList"
                           :key="item"
                           :label="item"
                           :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="formPass.passType==='串口'"
                :gutter="20">
          <el-col style="width:180px">
            <el-form-item label-width="55px"
                          label="串口："
                          prop="sata">
              <el-select v-model="formPass.sata"
                         placeholder="请选择">
                <el-option v-for="item in sataList"
                           :key="item"
                           :label="item"
                           :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col style="width:180px">
            <el-form-item label-width="75px"
                          label="波特率："
                          prop="baudRate">
              <el-select v-model="formPass.baudRate"
                         placeholder="请选择">
                <el-option v-for="item in baudList"
                           :key="item"
                           :label="item"
                           :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col style="width:160px">
            <el-form-item label-width="75px"
                          label="数据位："
                          prop="dataBits">
              <el-select v-model="formPass.dataBits"
                         placeholder="请选择">
                <el-option v-for="item in dataList"
                           :key="item"
                           :label="item"
                           :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col style="width:200px">
            <el-form-item label-width="75px"
                          label="校验位："
                          prop="checkBits">
              <el-select v-model="formPass.checkBits"
                         placeholder="请选择">
                <el-option v-for="item in checkList"
                           :key="item"
                           :label="item"
                           :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col style="width:180px">
            <el-form-item label-width="75px"
                          label="停止位："
                          prop="stopBits">
              <el-select v-model="formPass.stopBits"
                         placeholder="请选择">
                <el-option v-for="item in stopList"
                           :key="item"
                           :label="item"
                           :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row v-if="formPass.passType!=='串口' && formPass.passType!=='虚拟端口'"
                :gutter="20">
          <el-col style="width:300px">
            <el-form-item label-width="70px"
                          :label="formPass.passType==='TCP客户端'?'远程IP：':'本地IP：'"
                          prop="ip">
              <el-input v-model="formPass.ip"></el-input>
            </el-form-item>
          </el-col>
          <el-col style="width:300px">
            <el-form-item label-width="85px"
                          :label="formPass.passType==='TCP客户端'?'远程端口：':'本地端口：'"
                          prop="port">
              <el-input v-model="formPass.port"></el-input>
            </el-form-item>
          </el-col>
          <el-button v-if="formPass.passType==='TCP客户端'"
                     style="margin-left:20px">需要绑定本地IP</el-button>
        </el-row>

        <el-collapse v-if="id&&id.slice(0,1)==='2'"
                     v-model="disposeActiveNames">
          <el-collapse-item title="基本参数"
                            name="1">
            <div class="collapse-content">延迟回复（秒）：
              <el-input style="max-width:400px"
                        v-model="formPass.delayTime"></el-input>
            </div>
          </el-collapse-item>
        </el-collapse>

      </el-form>

      <!-- 采集设备配置 -->
      <el-form v-if="level===2"
               :model="formEquipment"
               label-position="left">

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label-width="95px"
                          label="名称(英文)："
                          prop="equipmentName">
              <el-input v-model="formEquipment.equipmentName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="55px"
                          label="描述："
                          prop="equipmentDescribe">
              <el-input v-model="formEquipment.equipmentDescribe"></el-input>
            </el-form-item>
          </el-col>
          <el-button style="margin:0 0 20px 5px">其他参数</el-button>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label-width="125px"
                          label="用户参数(如:型)："
                          prop="userParam">
              <el-input v-model="formEquipment.userParam"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-collapse v-model="activeNames">
          <el-collapse-item title="基本参数"
                            name="1">
            <div class="collapse-content">MODBUS设备地址：
              <el-input style="max-width:400px"
                        v-model="formEquipment.MODBUSAdd"></el-input>
            </div>
            <div>查询帧查询的最大字数：
              <el-input style="max-width:400px"
                        v-model="formEquipment.searchNum"></el-input>
            </div>
          </el-collapse-item>
          <el-collapse-item title="写寄存器"
                            name="2">
            <div class="collapse-content">单寄存器写是否按6号指令？
              <el-radio v-model="formEquipment.singleRegister"
                        :label="true">YES</el-radio>
              <el-radio v-model="formEquipment.singleRegister"
                        :label="false">NO</el-radio>
            </div>
            <div>多寄存器写是否按16号指令？
              <el-radio v-model="formEquipment.multiRegister"
                        :label="true">YES</el-radio>
              <el-radio v-model="formEquipment.multiRegister"
                        :label="false">NO</el-radio>
            </div>
          </el-collapse-item>
          <el-collapse-item title="高级参数"
                            name="3">
            <div class="collapse-content">合对应的值：
              <el-input style="max-width:400px"
                        v-model="formEquipment.correspondingValue"></el-input>
            </div>
            <div class="collapse-content">分对应的值：
              <el-input style="max-width:400px"
                        v-model="formEquipment.subCorrespondingValue"></el-input>
            </div>
            <div>双字节校验CRC传送顺序，先低后高？
              <el-radio v-model="formEquipment.doubleByteCheck"
                        :label="true">YES</el-radio>
              <el-radio v-model="formEquipment.doubleByteCheck"
                        :label="false">NO</el-radio>
            </div>
          </el-collapse-item>
        </el-collapse>

      </el-form>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogDisposeVisible = false">取 消</el-button>
        <el-button @click="itemAdd"
                   type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <!-- dialog - 其他参数 -->
    <el-dialog class="params-dialog"
               :title="dialogParamsTitle"
               :visible.sync="dialogParamsVisible">

      <el-row class="params-dialog-row">
        <el-checkbox v-model="formPass.otherParams.scanDelay">启用扫描间延迟</el-checkbox>
        <div class="params-dialog-row-div">
          延迟时间（毫秒）
          <el-input v-model="formPass.otherParams.delayTime"
                    style="width:100px"
                    :disabled="!formPass.otherParams.scanDelay"></el-input>
        </div>
      </el-row>

      <el-row v-if="id&&id.slice(0,1)==='1'"
              class="params-dialog-row">
        <el-checkbox v-model="formPass.otherParams.linkReset">启用链路复位机制</el-checkbox>
        <div class="params-dialog-row-div">
          端口无接收数据时间（秒）
          <el-input v-model="formPass.otherParams.delayTime"
                    style="width:100px"
                    :disabled="!formPass.otherParams.linkReset"></el-input>
          &nbsp;超过该时间，端口将重新关闭、打开（>=60）
        </div>
      </el-row>

      <el-row class="params-dialog-row">
        <el-checkbox v-model="formPass.otherParams.faultDiagnosis"
                     style="margin-bottom:10px">启用故障诊断</el-checkbox>
        <div class="params-dialog-row-div">
          端口无接收数据时间（秒）
          <el-input v-model="formPass.otherParams.faultNoDataTime"
                    style="width:100px"
                    :disabled="!formPass.otherParams.faultDiagnosis"></el-input>
          &nbsp;超过该时间，{{id&&id.slice(0,1)==='1'?'端口为':'进入'}}故障状态（设定值>={{id&&id.slice(0,1)==='1'?'5秒':'120秒'}}）
          <div v-if="id&&id.slice(0,1)==='2'"
               style="margin:10px 0">
            故障处理模式：
            <el-radio v-model="formPass.otherParams.faultShooting"
                      label="1"
                      :disabled="!formPass.otherParams.faultDiagnosis">端口将重新关闭、打开</el-radio>
            <el-radio v-model="formPass.otherParams.faultShooting"
                      label="2"
                      :disabled="!formPass.otherParams.faultDiagnosis">重启系统</el-radio>
          </div>
        </div>
      </el-row>

      <el-row v-if="id&&id.slice(0,1)==='1'"
              class="params-dialog-row">
        设备间数据包扫描方：
        <div class="params-dialog-row-div"
             style="margin-top:10px">
          <el-radio v-model="formPass.otherParams.packetScanning"
                    label="1"
                    disabled>扫面完一个包后，立刻进入下一个设备</el-radio>
          <el-radio v-model="formPass.otherParams.packetScanning"
                    label="2"
                    disabled>设备所有包扫描完后，再进入下一个设备</el-radio>
        </div>
      </el-row>

      <el-row v-if="id&&id.slice(0,1)==='1'"
              class="params-dialog-row">
        <el-checkbox v-model="formPass.otherParams.alternatePass">启用备用通道</el-checkbox>
      </el-row>

      <div v-if="id&&id.slice(0,1)==='1'&&formPass.otherParams.alternatePass">
        <el-row class="params-dialog-row">
          <el-col>
            通道类型：
            <el-select v-model="formPass.otherParams.passType"
                       placeholder="请选择">
              <el-option v-for="item in passTypeList"
                         :key="item"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row class="params-dialog-row"
                v-if="formPass.otherParams.passType==='串口'"
                :gutter="20">
          <el-col :span="8"
                  class="params-dialog-row-select">
            串口：
            <el-select v-model="formPass.otherParams.sata"
                       placeholder="请选择">
              <el-option v-for="item in sataList"
                         :key="item"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8"
                  class="params-dialog-row-select">
            波特率：
            <el-select v-model="formPass.otherParams.baudRate"
                       placeholder="请选择">
              <el-option v-for="item in baudList"
                         :key="item"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8"
                  class="params-dialog-row-select">
            数据位：
            <el-select v-model="formPass.otherParams.dataBits"
                       placeholder="请选择">
              <el-option v-for="item in dataList"
                         :key="item"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            校验位：
            <el-select v-model="formPass.otherParams.checkBits"
                       placeholder="请选择">
              <el-option v-for="item in checkList"
                         :key="item"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            停止位：
            <el-select v-model="formPass.otherParams.stopBits"
                       placeholder="请选择">
              <el-option v-for="item in stopList"
                         :key="item"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-col>

        </el-row>

        <el-row class="params-dialog-row"
                v-if="formPass.otherParams.passType!=='串口' && formPass.otherParams.passType!=='虚拟端口'"
                :gutter="20">
          <el-col>
            {{formPass.otherParams.passType==='TCP客户端'?'远程IP：':'本地IP：'}}
            <el-input v-model="formPass.otherParams.ip"
                      style="width:150px;margin-right:10px"></el-input>
            {{formPass.otherParams.passType==='TCP客户端'?'远程端口：':'本地端口：'}}
            <el-input v-model="formPass.otherParams.port"
                      style="width:100px;margin-right:10px"></el-input>
          </el-col>
        </el-row>
      </div>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogParamsVisible = false">取 消</el-button>
        <el-button @click="dialogParamsVisible = false"
                   type="primary">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  props: {
    // 树节点的操作方式：add / delete / up / down
    handleType: {
      type: String,
      default: ""
    },
    // 被选择的树的层级
    level: {
      type: Number,
      default: 3
    },
    id: {
      type: String
    }
  },
  data () {
    return {
      /* dialog */
      dialogDisposeVisible: false, // 配置 - 是否可见
      dialogDisposeTitle: "", // 配置 - 弹框名称
      dialogParamsVisible: false, // 其他参数 - 是否可见
      dialogParamsTitle: "", // 其他参数 - 弹框名称
      /* 通道 */
      formPass: { // 表单数据
        passName: "C1",
        passDescribe: "通道1",
        factory: "莫迪康",
        factoryDescribe: "MODBUS RTU",
        factoryPath: "C:\\Users\\43577\\Desktop\\软件\\CESTC\\PluginIo\\IND_MODBUS_RTU",
        passType: "串口",
        sata: "COM01",
        baudRate: "9600",
        dataBits: "8",
        checkBits: "无校验",
        stopBits: "1",
        ip: "192.168.0.253",
        port: "50001",
        otherParams: {
          scanDelay: false,
          delayTime: 100,
          linkReset: false,
          linkNoDataTime: 60,
          faultDiagnosis: false,
          faultNoDataTime: 60,
          faultShooting: "1",
          packetScanning: "1",
          alternatePass: false,
          passType: "串口",
          sata: "COM01",
          baudRate: "9600",
          dataBits: "8",
          checkBits: "无校验",
          stopBits: "1",
          ip: "192.168.0.253",
          port: "50001"
        },
        delayTime: 10
      },
      passTypeList: ["串口", "TCP客户端", "TCP服务端", "UDP", "虚拟端口"], // select - 通道类型
      sataList: ["COM01", "COM02", "COM03"], // 串口
      baudList: ["1200", "2400", "4800", "9600"], // 波特率
      dataList: ["4", "5", "6", "7", "8"], // 数据位
      checkList: ["无校验", "奇校验", "偶校验", "MARK校验", "SPACE校验"], // 校验位
      stopList: ["1", "1.5", "2"], // 停止位
      disposeActiveNames: ["1"], // 手风琴展开的标签
      /* 设备 */
      formEquipment: { // 表单数据
        equipmentName: "D1",
        equipmentDescribe: "设备1",
        userParam: "",
        MODBUSAdd: "1",
        searchNum: 32,
        singleRegister: true,
        multiRegister: true,
        correspondingValue: "FF00",
        subCorrespondingValue: "0000",
        doubleByteCheck: true
      },
      activeNames: ["1", "2", "3"] // 手风琴展开的标签
    };
  },
  watch: {
    handleType (val) {
      // console.log(val);
    }
  },
  methods: {
    // 新建
    newBuild () {
      this.dialogDisposeVisible = true;
      this.dialogDisposeTitle = `采集${this.level === 1 ? "通道" : "设备"}配置`;
    },
    // 回调：表单提交
    itemAdd () {
      this.$emit("item-add", this.level === 1 ? this.formPass : this.formEquipment);
      this.dialogDisposeVisible = false;
    },
    // 回调：删除 通道/设备
    itemDelete () {
      this.$emit("item-delete", this.formPass);
    },
    // 点击按钮 - 其他参数
    setParams () {
      this.dialogParamsVisible = true;
      this.dialogParamsTitle = `${this.id.slice(0, 1) === "1" ? "采集" : "数据服务"}通道 其他参数`;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header /deep/ {
  // 配置表单
  .dispose-dialog {
    .el-dialog {
      min-width: 1000px;
      .el-row:last-child {
        .el-form-item {
          margin-bottom: 0;
        }
      }
    }
    .el-collapse {
      .collapse-content {
        margin-bottom: 10px;
      }
    }
  }
  // 参数表单
  .params-dialog {
    .el-dialog {
      min-width: 660px;
    }
    .params-dialog-row:not(:last-child) {
      margin-bottom: 10px;
      .el-checkbox {
        margin-bottom: 10px;
      }
    }
    &-row {
      .el-select {
        width: 130px;
      }
      &-div {
        margin-left: 24px;
        input {
          // height: 30px;
        }
      }
      &-select {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
