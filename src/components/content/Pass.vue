<template>
  <div class="content">

    <!-- 采集服务 -->
    <el-form v-if="id.slice(0,1)==='1'"
             :model="formPass"
             label-position="left">

      <el-row>
        <el-col style="width:420px">
          <el-form-item label-width="95px"
                        label="名称(英文)："
                        prop="passName">
            <el-input v-model="formPass.passName"></el-input>
          </el-form-item>
        </el-col>
        <el-col style="width:380px">
          <el-form-item label-width="55px"
                        label="描述："
                        prop="passDescribe">
            <el-input v-model="formPass.passDescribe"></el-input>
          </el-form-item>
        </el-col>
        <el-button style="margin:0 0 20px 20px"
                   @click="setParams">其他参数</el-button>
      </el-row>

      <el-row>
        <el-col style="width:358px">
          <el-form-item label-width="55px"
                        label="厂家："
                        prop="factory">
            <el-input disabled
                      v-model="formPass.factory"></el-input>
          </el-form-item>
        </el-col>
        <el-col style="width:358px">
          <el-form-item label-width="55px"
                        label="描述："
                        prop="factoryDescribe">
            <el-input disabled
                      v-model="formPass.factoryDescribe"></el-input>
          </el-form-item>
        </el-col>
        <el-button style="margin:0 0 20px 20px">选择插件</el-button>
        <el-button style="margin-bottom:20px">帮助</el-button>
      </el-row>

      <el-row>
        <el-col style="width:940px">
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

      <el-row v-if="formPass.passType==='串口'">
        <el-col style="width:160px">
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
        <el-col style="width:180px">
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

      <el-row v-if="formPass.passType!=='串口' && formPass.passType!=='虚拟端口'">
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

    </el-form>

    <!-- 数据服务 -->
    <el-tabs v-else
             v-model="activeName">

      <!-- 配置参数 -->
      <el-tab-pane name="first">
        <span slot="label">
          <i class="el-icon-setting"></i> 配置参数
        </span>
        <el-form :model="formPass"
                 label-position="left">

          <el-row>
            <el-col style="width:420px">
              <el-form-item label-width="95px"
                            label="名称(英文)："
                            prop="passName">
                <el-input v-model="formPass.passName"></el-input>
              </el-form-item>
            </el-col>
            <el-col style="width:380px">
              <el-form-item label-width="55px"
                            label="描述："
                            prop="passDescribe">
                <el-input v-model="formPass.passDescribe"></el-input>
              </el-form-item>
            </el-col>
            <el-button style="margin:0 0 20px 20px"
                       @click="setParams">其他参数</el-button>
          </el-row>

          <el-row>
            <el-col style="width:358px">
              <el-form-item label-width="55px"
                            label="厂家："
                            prop="factory">
                <el-input disabled
                          v-model="formPass.factory"></el-input>
              </el-form-item>
            </el-col>
            <el-col style="width:358px">
              <el-form-item label-width="55px"
                            label="描述："
                            prop="factoryDescribe">
                <el-input disabled
                          v-model="formPass.factoryDescribe"></el-input>
              </el-form-item>
            </el-col>
            <el-button style="margin:0 0 20px 20px">选择插件</el-button>
            <el-button style="margin-bottom:20px">帮助</el-button>
          </el-row>

          <el-row>
            <el-col style="width:940px">
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

          <el-row v-if="formPass.passType==='串口'">
            <el-col style="width:160px">
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
            <el-col style="width:180px">
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

          <el-row v-if="formPass.passType!=='串口' && formPass.passType!=='虚拟端口'">
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
            <el-button v-if="formPass.passType==='TCP服务端'"
                       style="margin-left:20px">允许客户端接入列表</el-button>
          </el-row>

          <el-collapse v-model="activeNames">
            <el-collapse-item title="基本参数"
                              name="1">
              <div>延迟回复：10</div>
            </el-collapse-item>
          </el-collapse>

        </el-form>
      </el-tab-pane>

      <!-- 数据标签 -->
      <el-tab-pane name="second">
        <span slot="label">
          <i class="el-icon-edit-outline"></i> 数据标签
        </span>
        <el-table :data="tableEquipment"
                  style="width:1421px"
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
          <el-table-column prop="IOTag"
                           label="IO标签链接"
                           width="180">
          </el-table-column>
          <el-table-column prop="slaveStationID"
                           label="从站ID"
                           width="120">
          </el-table-column>
          <el-table-column prop="registerType"
                           label="寄存器类型"
                           width="120">
          </el-table-column>
          <el-table-column prop="registerAddr"
                           label="寄存器地址"
                           width="120">
          </el-table-column>
          <el-table-column prop="dataFormat"
                           label="数据格式"
                           width="120">
          </el-table-column>
        </el-table>
      </el-tab-pane>

    </el-tabs>

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
import { passList } from "@/mock/content.js"; // mockData

export default {
  props: {
    id: {
      type: String
    }
  },
  data () {
    return {
      formPass: {}, // 表单数据
      dialogParamsVisible: false, // 其他参数 - 是否可见
      dialogParamsTitle: "", // 其他参数 - 弹框名称
      passTypeList: ["串口", "TCP客户端", "TCP服务端", "UDP", "虚拟端口"], // select - 通道类型
      sataList: ["COM01", "COM02", "COM03"], // 串口
      baudList: ["1200", "2400", "4800", "9600"], // 波特率
      dataList: ["4", "5", "6", "7", "8"], // 数据位
      checkList: ["无校验", "奇校验", "偶校验", "MARK校验", "SPACE校验"], // 校验位
      stopList: ["1", "1.5", "2"], // 停止位
      activeName: "first", // tabs选中的标签
      activeNames: ["1"], // 手风琴展开的标签
      tableEquipment: [ // 表格数据
        {
          id: "1",
          name: "C1.D1.Tag1",
          discribe: "标签1",
          dataType: "浮点",
          direction: "只读",
          acquisitionCycle: "1000",
          IOTag: "io.C1.D1.Tag1",
          slaveStationID: "1",
          registerType: "2",
          registerAddr: "0",
          dataFormat: "0"
        }
      ]
    };
  },
  created () {
    this.getData();
  },
  methods: {
    // 获取数据
    getData () {
      passList.forEach((pass, i) => {
        pass.id === this.id && (this.formPass = passList[i]);
      });
    },
    // 点击按钮 - 其他参数
    setParams () {
      this.dialogParamsVisible = true;
      this.dialogParamsTitle = `${this.id.slice(0, 1) === "1" ? "采集" : "数据服务"}通道 其他参数`;
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
