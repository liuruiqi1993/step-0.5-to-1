<template>
  <div class="side">
    <h5 class="title" v-if="title">{{title}}</h5>
    <sideLabel
      v-on="$listeners"
      v-for="(item,index) in list"
      :active="active"
      :key="index"
      :item="item"
      :index="index"
    ></sideLabel>
    <el-button class="row" @click="$emit('add')">+增加类型</el-button>
  </div>
</template>

<script>
import sideLabel from "./side-label";
export default {
  name: "side",
  components: {
    sideLabel
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    active: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/config.less");
.side {
  .title {
    margin-bottom: 10px;
  }
  .add {
    width: 100%;
  }
  /deep/.row {
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
    .el-icon-edit-outline {
      display: none;
    }
    &:hover,
    &.active {
      background-color: @primary;
      color: #fff;
    }
    &:hover {
      .el-icon-edit-outline {
        display: inline-block;
      }
    }
  }
}
</style>