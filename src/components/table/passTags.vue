<template>
  <div class="table-component">

    <!-- btns -->
    <el-row style="margin-bottom:20px">
      <el-select v-model="dataTypeSelect"
                 placeholder="请选择"
                 style="width:150px;margin-right:10px">
        <el-option v-for="item in dataTypeList"
                   :key="item"
                   :label="item"
                   :value="item">
        </el-option>
      </el-select>
      <el-button type="primary"
                 size="small"
                 plain
                 @click="insertTag">新增</el-button>
      <el-button type="danger"
                 size="small"
                 plain
                 @click="deleteTags">删除</el-button>
      <el-button type="info"
                 size="small"
                 plain
                 :loading="downloadLoading"
                 @click="downloadTable">导出</el-button>
      <el-button type="info"
                 size="small"
                 plain>加载</el-button>
    </el-row>

    <!-- table -->
    <el-table :data="dataTags"
              border
              current-row-key
              empty-text="暂无标签"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="30">
      </el-table-column>
      <el-table-column prop="index"
                       label="序号"
                       width="40">
      </el-table-column>
      <el-table-column prop="name"
                       label="名称（英文）"
                       min-width="110">
      </el-table-column>
      <el-table-column prop="discribe"
                       label="描述（中文）"
                       min-width="140">
      </el-table-column>
      <el-table-column prop="dataType"
                       label="数据类型"
                       min-width="70">
      </el-table-column>
      <el-table-column prop="direction"
                       label="读写方向"
                       min-width="70">
      </el-table-column>
      <el-table-column prop="acquisitionCycle"
                       label="采集周期"
                       min-width="70">
      </el-table-column>
      <el-table-column prop="IOTag"
                       label="IO标签链接"
                       min-width="140">
      </el-table-column>
      <el-table-column prop="slaveStationID"
                       label="从站ID"
                       min-width="55">
      </el-table-column>
      <el-table-column prop="registerType"
                       label="寄存器类型"
                       min-width="85">
      </el-table-column>
      <el-table-column prop="registerAddr"
                       label="寄存器地址"
                       min-width="85">
      </el-table-column>
      <el-table-column prop="dataFormat"
                       label="数据格式"
                       min-width="70">
      </el-table-column>
      <el-table-column label="操作"
                       min-width="160">
        <template slot-scope="scope">
          <el-button type="primary"
                     size="mini"
                     plain
                     icon="el-icon-edit"
                     @click="editTag(scope.row)"></el-button>
          <el-button type="danger"
                     size="mini"
                     plain
                     icon="el-icon-delete"
                     style="margin-left:3px"
                     @click="deleteTag(scope.row.id)"></el-button>
          <el-button type="success"
                     size="mini"
                     plain
                     icon="el-icon-top"
                     style="margin-left:3px"
                     :disabled="scope.row.index===1"
                     @click="tagToggle(scope.row.index-1,'up')"></el-button>
          <el-button type="success"
                     size="mini"
                     plain
                     icon="el-icon-bottom"
                     style="margin-left:3px"
                     :disabled="scope.row.index===dataTags.length"
                     @click="tagToggle(scope.row.index-1,'down')"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- dialog · 新增/修改 -->
    <el-dialog class="tag-dialog"
               :title="dialogTitle"
               :visible.sync="dialogVisible">

      <el-form ref="dialogForm"
               :model="formData"
               label-position="left">

        <el-row :gutter="0">
          <el-col :span="9">
            <el-form-item label-width="55px"
                          label="名称："
                          prop="name">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label-width="55px"
                          label="描述："
                          prop="discribe">
              <el-input v-model="formData.discribe"></el-input>
            </el-form-item>
          </el-col>
          <el-button style="margin:0 0 20px 10px">其他参数</el-button>
        </el-row>

        <el-row :gutter="0">
          <el-col :span="10">
            <el-form-item label="数据类型："
                          prop="dataType">
              <el-select v-model="formData.dataType"
                         placeholder="请选择">
                <el-option v-for="item in dataTypeList"
                           :key="item"
                           :label="item"
                           :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="读写方向："
                          prop="direction">
              <el-select v-model="formData.direction"
                         placeholder="请选择">
                <el-option v-for="item in directionList"
                           :key="item"
                           :label="item"
                           :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="0">
          <el-col :span="9">
            <el-form-item label-width="145px"
                          label="采集周期（毫秒）："
                          prop="acquisitionCycle">
              <el-input v-model="formData.acquisitionCycle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label-width="100px"
                          label="IO标签链接："
                          prop="IOTag">
              <el-input v-model="formData.IOTag"></el-input>
            </el-form-item>
          </el-col>
          <el-button style="margin:0 0 20px 10px">选择标签</el-button>
        </el-row>

        <el-row :gutter="0">
          <el-col :span="9">
            <el-form-item label-width="70px"
                          label="从站ID："
                          prop="slaveStationID">
              <el-input v-model="formData.slaveStationID"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="100px"
                          label="寄存器类型："
                          prop="registerType">
              <el-select v-model="formData.registerType"
                         placeholder="请选择">
                <el-option v-for="item in registerTypeList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="0">
          <el-col :span="9">
            <el-form-item label-width="100px"
                          label="寄存器地址："
                          prop="registerAddr">
              <el-input v-model="formData.registerAddr"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="90px"
                          label="数据格式："
                          prop="dataFormat">
              <el-select v-model="formData.dataFormat"
                         placeholder="请选择">
                <el-option v-for="item in dataFormatList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false;formData = formDataOrg">取 消</el-button>
        <el-button @click="tagSubmit"
                   type="primary"
                   :loading="submitLoading">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { parseTime } from "@/utils";

export default {
  data () {
    return {
      /* table */
      dataTags: [ // 表格数据
        {
          id: "1",
          name: "C1.D1.Tag1",
          discribe: "通道1 设备1 标签1",
          dataType: "浮点",
          direction: "只读",
          acquisitionCycle: "1000",
          IOTag: "io.C1.D1.Tag1",
          slaveStationID: "1",
          registerType: "2",
          registerAddr: "0",
          dataFormat: "0"
        },
        {
          id: "2",
          name: "C1.D1.Tag2",
          discribe: "通道1 设备1 标签1",
          dataType: "浮点",
          direction: "只读",
          acquisitionCycle: "1000",
          IOTag: "io.C1.D1.Tag1",
          slaveStationID: "1",
          registerType: "2",
          registerAddr: "0",
          dataFormat: "0"
        },
        {
          id: "3",
          name: "C1.D1.Tag3",
          discribe: "通道1 设备1 标签1",
          dataType: "浮点",
          direction: "只读",
          acquisitionCycle: "1000",
          IOTag: "io.C1.D1.Tag1",
          slaveStationID: "1",
          registerType: "2",
          registerAddr: "0",
          dataFormat: "0"
        },
        {
          id: "4",
          name: "C1.D1.Tag4",
          discribe: "通道1 设备1 标签1",
          dataType: "浮点",
          direction: "只读",
          acquisitionCycle: "1000",
          IOTag: "io.C1.D1.Tag1",
          slaveStationID: "1",
          registerType: "2",
          registerAddr: "0",
          dataFormat: "0"
        }
      ],
      dataTypeList: ["全部", "浮点", "整型", "布尔", "字符串", "二进制"], // select - 数据类型
      directionList: ["只读", "只写", "读写"], // select - 读写方向
      dataTypeSelect: "全部", // 筛选 - 选中的数据类型
      multipleSelection: [], // 选中的数据
      /* dialog */
      dialogVisible: false, // 是否显示
      dialogTitle: "", // dialog标题
      formData: { // 表单数据
        name: "",
        discribe: "",
        ratioCalculation: false,
        magnification: "1.0000",
        base: "0.0000",
        dataType: "整型",
        direction: "只读",
        acquisitionCycle: "1000",
        IOTag: "io.C1.D1.Tag1",
        slaveStationID: "1",
        registerType: "2",
        registerAddr: "0",
        dataFormat: "0"
      },
      registerTypeList: [ // select列表 - 寄存器类型
        {
          label: "1号命令：读、写开关量",
          value: 0
        },
        {
          label: "2号命令：读开关量状态",
          value: 1
        },
        {
          label: "3号命令：读、写保持寄存器",
          value: 2
        },
        {
          label: "4号命令：读输入寄存器",
          value: 3
        }
      ],
      dataFormatList: [ // select列表 - 数据格式
        {
          label: "2字节整型 先高后低 顺序21",
          value: 0
        },
        {
          label: "2字节整型 先高后低 顺序12",
          value: 1
        },
        {
          label: "2字节整型 第1位",
          value: 2
        },
        {
          label: "2字节整型 第2位",
          value: 3
        },
        {
          label: "4字节整型 顺序4321",
          value: 4
        },
        {
          label: "8字节浮点 顺序87654321",
          value: 5
        }
      ],
      dialogType: "", // 类型：insert/edit
      /* loading */
      submitLoading: false, // loading - 提交按钮
      downloadLoading: false // loading - 导出
    };
  },
  created () {
    this.getData();
  },
  methods: {
    // 获取数据
    getData () {
      this.refreshData();
    },
    // 数据处理
    refreshData () {
      this.dataTags.map((tag, i) => {
        this.$set(tag, "index", i + 1); // 追加序列号，从1开始
      });
      console.log(this.dataTags);
    },
    // 新增
    insertTag () {
      this.dialogVisible = true;
      this.dialogType = "insert";
      this.$nextTick(() => {
        this.$refs.dialogForm.resetFields();
        this.dialogTitle = `数据服务标签-${this.dialogType === "insert" ? "新建" : "修改"}`;
      });
    },
    // 编辑
    editTag (row) {
      this.dialogVisible = true;
      this.dialogType = "edit";
      this.$nextTick(() => {
        this.dialogTitle = `数据服务标签-${this.dialogType === "insert" ? "新建" : "修改"}`;
        this.formDataOrg = row;
        this.formData = JSON.parse(JSON.stringify(row)); // 深拷贝，取消时还原数据用
      });
    },
    // 表单提交
    tagSubmit () {
      const formData = JSON.parse(JSON.stringify(this.formData));
      this.submitLoading = true;
      switch (this.dialogType) {
        case "insert":
          if (
            this.dataTags.some(
              tag => tag.name === this.formData.name
            )
          ) {
            // 判断重复
            this.$message.error("该标签已存在！");
            this.submitLoading = false;
          } else {
            // 随机生成id
            formData.id = Math.random()
              .toString(36)
              .substr(-10);
            this.dataTags.push(JSON.parse(JSON.stringify(formData)));
            this.getData();
            this.submitLoading = false;
            this.dialogVisible = false;
          }
          break;
        case "edit":
          if (
            this.dataTags.some(
              tag => tag.name === this.formData.name
            ) &&
            this.formData.name !== this.formDataOrg.name
          ) {
            // 判断重复
            this.$message.error("该标签已存在！");
            this.submitLoading = false;
          } else {
            this.$set(
              this.dataTags,
              this.formData.index - 1,
              JSON.parse(JSON.stringify(formData))
            );
            this.submitLoading = false;
            this.dialogVisible = false;
          }
          break;
      }
    },
    // 删除单个标签
    deleteTag (id) {
      this.$confirm("将删除标签, 是否继续?", "提示", {
        type: "warning"
      }).then(() => {
        this.dataTags.forEach((tag, i) => {
          tag.id === id && this.dataTags.splice(i, 1);
        });
      }).catch(() => { });
    },
    // 获取选中的数据
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 删除多个标签
    deleteTags () {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "未选择标签",
          type: "warning",
          duration: 1000
        });
        return false;
      }
      this.$confirm("将删除标签, 是否继续?", "提示", {
        type: "warning"
      }).then(() => {
        for (let i = 0; i < this.dataTags.length; i++) {
          this.multipleSelection.forEach(select => {
            this.dataTags[i].id === select.id && this.dataTags.splice(i, 1);
          });
        }
      }).catch(() => { });
    },
    // 工序重新排序
    tagToggle (index, handle) {
      if (handle === "up") {
        // 上移
        if (index !== 0) {
          const toExchange = this.dataTags[index - 1];
          this.$set(
            this.dataTags,
            index - 1,
            this.dataTags[index]
          );
          this.$set(this.dataTags, index, toExchange);
          this.refreshData();
        }
      } else {
        // 下移
        if (index !== this.dataTags.length - 1) {
          const toExchange = this.dataTags[index + 1];
          this.$set(
            this.dataTags,
            index + 1,
            this.dataTags[index]
          );
          this.$set(this.dataTags, index, toExchange);
          this.refreshData();
        }
      }
    },
    // 导出
    downloadTable () {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "序号",
          "名称（英文）",
          "描述（中文）",
          "数据类型",
          "读写方向",
          "采集周期",
          "IO标签链接",
          "从站ID",
          "寄存器类型",
          "寄存器地址",
          "数据格式"
        ];
        const filterVal = [
          "index",
          "name",
          "discribe",
          "dataType",
          "direction",
          "acquisitionCycle",
          "IOTag",
          "slaveStationID",
          "registerType",
          "registerAddr",
          "dataFormat"
        ];
        const list = this.dataTags;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "数据标签",
          autoWidth: true,
          bookType: "xlsx"
        });
        this.downloadLoading = false;
      });
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === "timestamp") {
          return parseTime(v[j]);
        } else {
          return v[j];
        }
      }));
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
