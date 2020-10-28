<template>
  <div class="content">

    <!-- form -->
    <el-form :model="formGroup"
             label-position="right">

      <el-row>
        <el-col style="width:400px">
          <el-form-item label-width="80px"
                        label="所在组："
                        prop="groupName">
            <el-input disabled
                      v-model="formGroup.groupName"></el-input>
          </el-form-item>
        </el-col>
        <el-col style="width:440px">
          <el-form-item label-width="120px"
                        label="当前工程名称："
                        prop="projectName">
            <el-input disabled
                      v-model="formGroup.projectName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col style="width:400px">
          <el-form-item label-width="80px"
                        label="版本号："
                        prop="editionNum">
            <el-input disabled
                      v-model="formGroup.editionNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col style="width:440px">
          <el-form-item label-width="120px"
                        label="采集标签个数："
                        prop="collectTabNum">
            <el-input disabled
                      v-model="formGroup.collectTabNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <!-- table -->
    <el-table :data="tableGroup"
              row-key="id"
              border
              default-expand-all
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="number"
                       label="序号"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="名称(英文)"
                       width="180">
      </el-table-column>
      <el-table-column prop="describe"
                       label="描述(中文)"
                       width="180">
      </el-table-column>
      <el-table-column prop="params"
                       label="参数">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  data () {
    return {
      formGroup: { // 表单数据
        groupName: "工程组1",
        projectName: "采集器工程1",
        editionNum: "8",
        collectTabNum: "2"
      },
      tableGroup: [ // 表格数据
        {
          id: "1",
          number: "通道[01]",
          name: "C1",
          describe: "通道1",
          params: "IND_MODBUS_RTU;串口,0,7,4,0,0;",
          children: [
            {
              id: "1-1",
              number: "设备[01]",
              name: "D1",
              describe: "设备1",
              params: "temp=;address=1,max_len=32,write6=YES,write16=YES,he=FF00,,fen=0000,crc=YES"
            },
            {
              id: "1-2",
              number: "设备[02]",
              name: "D2",
              describe: "设备2",
              params: "temp=;address=1,max_len=32,write6=YES,write16=YES,he=FF00,,fen=0000,crc=YES"
            }
          ]
        },
        {
          id: "2",
          number: "通道[01]",
          name: "C1",
          describe: "通道1",
          params: "IND_MODBUS_TCP;UDP,192.168.0.253,50001,,,;delay=10"
        }
      ]
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/content.scss';
</style>
