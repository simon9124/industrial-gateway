<template>
  <div class="content">

    <!-- form -->
    <el-form v-if="serviceData.id!==null"
             :model="formGroup"
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
    <el-table v-if="serviceData.id!==null"
              :data="tableGroup"
              row-key="id"
              border
              default-expand-all
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              :max-height="tableMaxHeight">
      <el-table-column label="序号"
                       min-width="140">
        <template slot-scope="scope">
          {{scope.row.isPass?'通道':'设备'}}[{{scope.row.index}}]
        </template>
      </el-table-column>
      <el-table-column prop="name"
                       label="名称(英文)"
                       min-width="140">
      </el-table-column>
      <el-table-column prop="describe"
                       label="描述(中文)"
                       min-width="180">
      </el-table-column>
      <el-table-column prop="params"
                       label="参数"
                       min-width="480">
      </el-table-column>
    </el-table>

    <!-- empty -->
    <div v-else>未选中工程</div>

  </div>
</template>

<script>
export default {
  props: {
    // 工程数据
    factoryData: {
      type: Array,
      default: () => []
    },
    // 当前服务数据
    serviceData: {
      type: Object,
      default: () => { }
    },
    // 通道列表
    passList: {
      type: Array,
      default: () => []
    },
    // 设备列表
    equipmentList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      formGroup: { // 表单数据
        groupName: "",
        projectName: "",
        editionNum: "",
        collectTabNum: 0
      },
      tableGroup: [ // 表格数据
        // {
        //   id: "1",
        //   number: "通道[01]",
        //   name: "C1",
        //   describe: "通道1",
        //   params: "IND_MODBUS_RTU;串口,0,7,4,0,0;",
        //   children: [
        //     {
        //       id: "1-1",
        //       number: "设备[01]",
        //       name: "D1",
        //       describe: "设备1",
        //       params: "temp=;address=1,max_len=32,write6=YES,write16=YES,he=FF00,,fen=0000,crc=YES"
        //     },
        //     {
        //       id: "1-2",
        //       number: "设备[02]",
        //       name: "D2",
        //       describe: "设备2",
        //       params: "temp=;address=1,max_len=32,write6=YES,write16=YES,he=FF00,,fen=0000,crc=YES"
        //     }
        //   ]
        // },
        // {
        //   id: "2",
        //   number: "通道[01]",
        //   name: "C1",
        //   describe: "通道1",
        //   params: "IND_MODBUS_TCP;UDP,192.168.0.253,50001,,,;delay=10"
        // }
      ],
      /* 动态高度 */
      tableMaxHeight: 0 // 流体表格最大高度
    };
  },
  created () {
    const screenHeight = document.documentElement.clientHeight;
    this.tableMaxHeight = screenHeight - 73 - 20 * 2 - (40 + 15) - (40 + 20) - 40;
    this.getServiceData();
  },
  methods: {
    // 获取服务数据
    getServiceData () {
      this.factoryData[0].children.forEach(group => {
        if (group.id === this.serviceData.parentId) {
          this.formGroup.groupName = group.text; // 所在组
          group.children.forEach(factory => {
            if (factory.id === this.serviceData.id) {
              /* 顶部form */
              this.formGroup.projectName = factory.text; // 当前工程
              this.formGroup.editionNum = factory.id; // 版本号
              var collectTabNum = 0; // 采集标签个数
              factory.treeData[0].children.forEach(pass => {
                pass.children.forEach(equipment => {
                  this.equipmentList.forEach(_equipment => {
                    equipment.id === _equipment.id && (collectTabNum += _equipment.dataTags.length);
                  });
                });
              });
              this.formGroup.collectTabNum = collectTabNum;
              /* 底部table */
              const factoryCopy = JSON.parse(JSON.stringify(factory));
              factoryCopy.treeData.forEach(service => {
                var passNum = 0;
                service.children.forEach(pass => {
                  /* pass */
                  this.passList.forEach(_pass => {
                    if (pass.id === _pass.id) {
                      pass.name = _pass.passName;
                      pass.describe = _pass.passDescribe;
                    }
                  });
                  pass.index = (++passNum).toString();
                  pass.index.length === 1 && (pass.index = "0" + pass.index);
                  pass.isPass = true;
                  /* equipment */
                  var equipmentNum = 0;
                  pass.children.forEach(equipment => {
                    this.equipmentList.forEach(_equipment => {
                      if (equipment.id === _equipment.id) {
                        equipment.name = _equipment.equipmentName;
                        equipment.describe = _equipment.equipmentDescribe;
                      }
                    });
                    equipment.index = (++equipmentNum).toString();
                    equipment.index.length === 1 && (equipment.index = "0" + equipment.index);
                  });
                });
              });
              this.tableGroup = factoryCopy.treeData[0].children.concat(factoryCopy.treeData[1].children);
              console.log(this.tableGroup);
            }
          });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/content.scss';
</style>
