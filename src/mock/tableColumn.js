// 表格列项 - 通道
const passTagColumn = [
  {
    prop: "name",
    label: "名称（英文）",
    minWidth: 110
  },
  {
    prop: "discribe",
    label: "描述（中文）",
    minWidth: 140
  },
  {
    prop: "dataType",
    label: "数据类型",
    minWidth: 70
  },
  {
    prop: "direction",
    label: "读写方向",
    minWidth: 70
  },
  {
    prop: "acquisitionCycle",
    label: "采集周期",
    minWidth: 70
  },
  {
    prop: "IOTag",
    label: "IO标签链接",
    minWidth: 140
  },
  {
    prop: "slaveStationID",
    label: "从站ID",
    minWidth: 55
  },
  {
    prop: "registerType",
    label: "寄存器类型",
    minWidth: 85
  },
  {
    prop: "registerAddr",
    label: "寄存器地址",
    minWidth: 85
  },
  {
    prop: "dataFormat",
    label: "数据格式",
    minWidth: 70
  }
];

// 表头中英文对照 - 通道
const passTagTranslation = {
  index: "序号",
  name: "名称（英文）",
  discribe: "描述（中文）",
  dataType: "数据类型",
  direction: "读写方向",
  acquisitionCycle: "采集周期",
  IOTag: "IO标签链接",
  slaveStationID: "从站ID",
  registerType: "寄存器类型",
  registerAddr: "寄存器地址",
  dataFormat: "数据格式"
};

export { passTagColumn, passTagTranslation };
