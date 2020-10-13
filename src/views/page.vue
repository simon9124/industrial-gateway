<template>
  <div class="table-tree-container">
    <el-container>

      <!-- 顶 · 头 -->
      <el-header>
        <Header ref="header"
                :handleType="handleType"
                :level="level"
                :id="id"
                @item-add="itemAdd"
                @item-delete="itemHandle('del')"></Header>
      </el-header>

      <!-- 中 · 内容 -->
      <el-container>

        <!--左 · 树-->
        <el-aside class="left-panel"
                  :style="{height:contentHeight}">
          <div class="left-panel-title">服务导航</div>
          <left-tree class="left-panel-tree"
                     :data="data"
                     @item-click="itemClick"
                     @item-handle="itemHandle">
          </left-tree>
        </el-aside>

        <!--右 · 表-->
        <el-container class="right-panel is-vertical">
          <Group v-if="level===1"></Group>
          <Pass v-if="level===2"
                :id="id"></Pass>
          <Equipment v-if="level===3"
                     :id="id"></Equipment>
        </el-container>

      </el-container>

    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header"; // 组件：头部
import LeftTree from "@/components/Tree"; // 组件：左侧树
import Group from "@/components/content/Group"; // 组件：右侧内容 - 组
import Pass from "@/components/content/Pass"; // 组件：右侧内容 - 通道
import Equipment from "@/components/content/Equipment"; // 组件：右侧内容 - 通道
// mockData
import { treeData } from "@/mock/tree.js";
import { passList, equipmentList } from "@/mock/content.js";

export default {
  components: { Header, LeftTree, Group, Pass, Equipment },
  data () {
    return {
      data: [], // 树数据
      level: 1, // 被选择的树的层级
      id: null, // 被选择内容的id
      handleType: "", // 树节点的操作方式
      /* 动态高度 */
      contentHeight: "0px" // 中部内容
    };
  },
  created () {
    const screenHeight = document.documentElement.clientHeight;
    // console.log(screenHeight);
    this.contentHeight = (screenHeight - 8 * 2 - 73) + "px";
    this.getTreeData();
  },
  methods: {
    getTreeData () {
      this.data = treeData;
    },
    // 点击树节点
    itemClick (param) {
      console.log(param);
      const { level, id } = param;
      this.level = level;
      this.id = id;
    },
    // 树节点操作 - 增删改查
    itemHandle (type) {
      this.handleType = type;
      if (this.handleType === "up" || this.handleType === "down") { // 上移 / 下移
        treeData.forEach((service, i) => {
          if (this.handleType === "up") { // 上移 -> 循环service.children
            service.children.forEach((pass, _i) => {
              if (this.level === 2 && pass.id === this.id) { // 通道
                if (!service.children[_i - 1]) {
                  this.moveEnd("已经到最顶层");
                  return false;
                }
                this.toggleExchange(service.children, _i, "up");
              }
              if (this.level === 3) { // 设备 -> 循环pass.children
                pass.children.forEach((equipment, __i) => {
                  if (equipment.id === this.id) {
                    if (!pass.children[__i - 1]) {
                      this.moveEnd("已经到最顶层");
                      return false;
                    }
                    this.toggleExchange(pass.children, __i, "up");
                  }
                });
              }
            });
          }
          if (this.handleType === "down") { // 下移 -> 逆循环service.children
            for (let _i = service.children.length - 1; _i >= 0; _i--) {
              if (this.level === 2 && service.children[_i].id === this.id) { // 通道
                if (!service.children[_i + 1]) {
                  this.moveEnd("已经到最底层");
                  return false;
                }
                this.toggleExchange(service.children, _i, "down");
              }
              if (this.level === 3) { // 设备 -> 逆循环service.children[_i].children
                for (let __i = service.children[_i].children.length - 1; __i >= 0; __i--) {
                  if (service.children[_i].children[__i].id === this.id) {
                    if (!service.children[_i].children[__i + 1]) {
                      this.moveEnd("已经到最底层");
                      return false;
                    }
                    this.toggleExchange(service.children[_i].children, __i, "down");
                  }
                }
              }
            }
          }
        });
      }
      if (this.handleType === "del") { // 删除
        this.$confirm(`将删除采集${this.level === 2 ? "通道" : "设备"}, 是否继续?`, "提示", {
          type: "warning"
        }).then(() => {
          treeData.forEach(service => {
            service.children.forEach((pass, i) => {
              this.level === 2 && this.id === pass.id && service.children.splice(i, 1);
              this.level === 3 && pass.children.forEach((equipment, _i) => {
                this.id === equipment.id && pass.children.splice(_i, 1);
              });
            });
          });
        }).catch(() => { });
      }
      if (this.handleType === "add") { // 新增
        this.$refs.header.newBuild();
      }
    },
    // 封装：上移/下移，已经到最底层的message错误提示信息
    moveEnd (msg) {
      this.$message({
        message: msg,
        type: "error",
        duration: 1000
      });
    },
    // 封装：上移/下移，数据arr中下标为index的对象，与前一项(type:up)/后一项(type:down)交换位置
    toggleExchange (arr, index, type) {
      const toExchange = type === "up" ? arr[index - 1] : arr[index + 1]; // copy要交换的对象
      this.$set(
        arr,
        type === "up" ? index - 1 : index + 1,
        arr[index]
      ); // 将当前对象交换到copy对象的位置
      this.$set(arr, index, toExchange); // 将copy的对象交换到原
    },
    // 新增
    itemAdd (formData) {
      console.log(formData);
      treeData.forEach(service => {
        if (this.level === 1 && service.id === this.id) { // 新增通道
          formData.id = this.id + Math.random().toString(36).substr(-10); // 随机生成id
          const obj = {
            text: `${formData.passName}[${formData.passDescribe}]`,
            icon: "fa fa-laptop",
            id: formData.id,
            level: 2,
            children: [],
            selected: false,
            opened: true // 父节点须设置opened为true，否则子节点首次新增时打不开
          };
          service.children.push(obj); // 新增到树
          passList.push(formData); // 新增到设备列表
        }
        this.level === 2 && service.children.forEach(pass => { // 新增设备
          if (pass.id === this.id) {
            formData.id = Math.random().toString(36).substr(-10); // 随机生成id
            const obj = {
              text: `${formData.equipmentName}[${formData.equipmentDescribe}]`,
              icon: "fa fa-edit",
              id: formData.id,
              level: 3,
              selected: false
            };
            pass.children.push(obj); // 新增到树
            equipmentList.push(formData); // 新增到设备列表
          }
        });
      });
      // console.log(treeData);
      console.log(passList);
      // console.log(equipmentList);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-plan.scss';
</style>
