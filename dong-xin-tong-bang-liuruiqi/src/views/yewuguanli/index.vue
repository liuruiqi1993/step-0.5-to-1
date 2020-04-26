<template>
  <el-container>
    <el-header class="header bg-fff m-10 br-4" height="auto">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="(item, index) in $route.matched"
          :key="index"
          :to="{ path: item.regex.test($route.path) ? '' : item.path }"
        >{{item.meta.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <h3 class="title">{{$route.meta.name}}</h3>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>
<script>
export default {
  name: "frame",
  components: {},
  computed: {},
  methods: {}
};
</script>

<style lang="less" scoped>
@import url("../../assets/config.less");
.header {
  padding: 20px;
  .title {
    margin-top: 15px;
  }
}
</style>