// 通道数据
const passList = [
  {
    id: "1-1",
    passName: "C1",
    passDescribe: "通道1",
    factory: "莫迪康",
    factoryDescribe: "MODBUS RTU",
    factoryPath:
      "C:\\Users\\43577\\Desktop\\软件\\CESTC\\PluginIo\\IND_MODBUS_RTU",
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
  {
    id: "1-2",
    passName: "C2",
    passDescribe: "通道2",
    factory: "大数据",
    factoryDescribe: "仿真驱动(数据模拟器)",
    factoryPath: "C:Users\\43577Desktop软件CESTCPluginIoTN_SIMULATOR",
    passType: "虚拟端口",
    sata: null,
    baudRate: null,
    dataBits: null,
    checkBits: null,
    stopBits: null,
    ip: null,
    port: null,
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
  {
    id: "2-1",
    passName: "C3",
    passDescribe: "通道3",
    factory: "莫迪康",
    factoryDescribe: "MODBUS RTU",
    factoryPath:
      "C:\\Users\\43577\\Desktop\\软件\\CESTC\\PluginIo\\IND_MODBUS_RTU",
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
  }
];

// 设备数据
const equipmentList = [
  {
    id: "1-1-1",
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
  {
    id: "1-1-2",
    equipmentName: "D2",
    equipmentDescribe: "设备2",
    userParam: "",
    MODBUSAdd: "2",
    searchNum: 32,
    singleRegister: true,
    multiRegister: true,
    correspondingValue: "FF00",
    subCorrespondingValue: "0000",
    doubleByteCheck: true
  },
  {
    id: "1-2-1",
    equipmentName: "D3",
    equipmentDescribe: "设备3",
    userParam: "",
    MODBUSAdd: "3",
    searchNum: 32,
    singleRegister: true,
    multiRegister: true,
    correspondingValue: "FF00",
    subCorrespondingValue: "0000",
    doubleByteCheck: true
  },
  {
    id: "1-2-2",
    equipmentName: "D4",
    equipmentDescribe: "设备4",
    userParam: "",
    MODBUSAdd: "4",
    searchNum: 32,
    singleRegister: true,
    multiRegister: true,
    correspondingValue: "FF00",
    subCorrespondingValue: "0000",
    doubleByteCheck: true
  }
];

export { passList, equipmentList };
