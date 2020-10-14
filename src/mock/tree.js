// 树数据
const treeData = [
  {
    text: "采集服务",
    icon: "fa fa-folder",
    id: "1",
    level: 1,
    selected: true,
    children: [
      {
        text: "C1[通道1]",
        icon: "fa fa-laptop",
        id: "1-1",
        level: 2,
        children: [
          {
            text: "D1[设备1]",
            icon: "fa fa-edit",
            id: "1-1-1",
            level: 3
          },
          {
            text: "D2[设备2]",
            icon: "fa fa-edit",
            id: "1-1-2",
            level: 3
          }
        ]
      },
      {
        text: "C2[通道2]",
        icon: "fa fa-laptop",
        id: "1-2",
        level: 2,
        children: [
          {
            text: "D3[设备3]",
            icon: "fa fa-edit",
            id: "1-2-1",
            level: 3
          },
          {
            text: "D4[设备4]",
            icon: "fa fa-edit",
            id: "1-2-2",
            level: 3
          }
        ]
      }
    ]
  },
  {
    text: "数据服务",
    icon: "fa fa-database",
    id: "2",
    level: 1,
    children: [
      {
        text: "C3[通道3]",
        icon: "fa fa-laptop",
        id: "2-1",
        level: 2
      }
    ]
  }
];

export { treeData };
