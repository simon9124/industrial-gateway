// 通道数据
const passList = [
  {
    id: "1-1",
    passName: "C1",
    passDescribe: "通道1",
    plugin: {
      name: "IND_MODBUS_TCP",
      describe: "MODBUS TCP",
      factory: "莫迪康",
      classification: "通用标准",
      path: "C:\\Users\\43577\\Desktop\\软件\\CESTC\\PluginIo\\IND_MODBUS_RTU",
      plugins: [
        {
          name: "BA_BACNET_IP.335x",
          platform: "335x",
          edition: "5.0.0.1",
          lastModifiedDate: "2017-11-08 07:55:30"
        },
        {
          name: "BA_BACNET_IP.dll",
          platform: "dll",
          edition: "5.0.0.1",
          lastModifiedDate: "2019-02-19 03:45:30"
        },
        {
          name: "BA_BACNET_IP.xt",
          platform: "xt",
          edition: "",
          lastModifiedDate: "2020-02-22 08:47:32"
        }
      ]
    },
    passType: "串口",
    sata: "COM01",
    baudRate: "9600",
    dataBits: "8",
    checkBits: "无校验",
    stopBits: "1",
    ip: "192.168.0.253",
    port: "50001",
    otherParams: {
      scanDelay: true,
      delayTime: 100,
      linkReset: true,
      linkNoDataTime: 60,
      faultDiagnosis: true,
      faultNoDataTime: 60,
      faultShooting: "1",
      packetScanning: "1",
      alternatePass: true,
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
    plugin: {
      name: "IND_CJT188_2004",
      describe: "T188 2004",
      factory: "城建",
      classification: "通用标准",
      path: "C:\\Users\\43577\\Desktop\\软件\\CESTC\\PluginIo\\IND_CJT188_2004",
      plugins: [
        {
          name: "IND_CJT188_2004.335x",
          platform: "335x",
          edition: "5.0.0.1",
          lastModifiedDate: "2017-11-08 07:55:30"
        },
        {
          name: "IND_CJT188_2004.dll",
          platform: "dll",
          edition: "5.0.0.1",
          lastModifiedDate: "2019-02-19 03:45:30"
        },
        {
          name: "IND_CJT188_2004.xt",
          platform: "xt",
          edition: "",
          lastModifiedDate: "2020-02-22 08:47:32"
        }
      ]
    },
    passType: "虚拟端口",
    sata: null,
    baudRate: null,
    dataBits: null,
    checkBits: null,
    stopBits: null,
    ip: null,
    port: null,
    otherParams: {
      scanDelay: true,
      delayTime: 100,
      linkReset: false,
      linkNoDataTime: 60,
      faultDiagnosis: true,
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
    plugin: {
      name: "PLC_AB_LOGIX_TCP",
      describe: "AB LOGIX 5000 TCP",
      factory: "AB",
      classification: "PLC",
      path:
        "C:\\Users\\43577\\Desktop\\软件\\CESTC\\PluginIo\\PLC_AB_LOGIX_TCP",
      plugins: [
        {
          name: "PLC_AB_LOGIX_TCP.335x",
          platform: "335x",
          edition: "5.0.0.1",
          lastModifiedDate: "2017-11-08 07:55:30"
        },
        {
          name: "PLC_AB_LOGIX_TCP.dll",
          platform: "dll",
          edition: "5.0.0.1",
          lastModifiedDate: "2019-02-19 03:45:30"
        },
        {
          name: "PLC_AB_LOGIX_TCP.xt",
          platform: "xt",
          edition: "",
          lastModifiedDate: "2020-02-22 08:47:32"
        }
      ]
    },
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
    doubleByteCheck: true,
    otherParams: {
      delayTime: 3000,
      failedTryAgain: true,
      failedTryTimes: 1,
      faultDiagnosis: true,
      continuousQueryFailed: 5,
      noReceivedLongTime: 120,
      faultDataProcess: "保持之前值，质量戳为GOOD",
      faultScanProcess: "正常扫描",
      queryPeriod: 30,
      equipmentFactor: true,
      factorR1: "1.000",
      factorR2: "1.000"
    }
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
    doubleByteCheck: true,
    otherParams: {
      delayTime: 3000,
      failedTryAgain: true,
      failedTryTimes: 1,
      faultDiagnosis: false,
      continuousQueryFailed: 5,
      noReceivedLongTime: 120,
      faultDataProcess: "保持之前值，质量戳为BAD",
      faultScanProcess: "正常扫描",
      queryPeriod: 30,
      equipmentFactor: true,
      factorR1: "1.000",
      factorR2: "1.000"
    }
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
    doubleByteCheck: true,
    otherParams: {
      delayTime: 3000,
      failedTryAgain: false,
      failedTryTimes: 1,
      faultDiagnosis: true,
      continuousQueryFailed: 5,
      noReceivedLongTime: 120,
      faultDataProcess: "保持之前值，质量戳为GOOD",
      faultScanProcess: "正常扫描",
      queryPeriod: 30,
      equipmentFactor: false,
      factorR1: "1.000",
      factorR2: "1.000"
    }
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
    doubleByteCheck: true,
    otherParams: {
      delayTime: 3000,
      failedTryAgain: false,
      failedTryTimes: 1,
      faultDiagnosis: false,
      continuousQueryFailed: 5,
      noReceivedLongTime: 120,
      faultDataProcess: "保持之前值，质量戳为GOOD",
      faultScanProcess: "正常扫描",
      queryPeriod: 30,
      equipmentFactor: false,
      factorR1: "1.000",
      factorR2: "1.000"
    }
  }
];

export { passList, equipmentList };
