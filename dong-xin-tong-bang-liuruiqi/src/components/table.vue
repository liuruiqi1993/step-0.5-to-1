<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="名称" prop="name" width="120"></el-table-column>
      <el-table-column label="内容" min-width="200">
        <template slot-scope="item">
          <media :media="item.row"></media>
        </template>
      </el-table-column>
      <el-table-column label="大小/时常" width="150">
        <template slot-scope="item">
          {{item.row.mslen | sizeFilter}}
          {{+item.row.mslen && +item.row.timelen ? "/" : ''}}
          {{item.row.timelen | timeFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="150">
        <template slot-scope="item">
          <el-row type="flex" align="middle" class="btns">
            <el-button type="text" @click="$emit('update', {item: item.row, index: item.$index})">编辑</el-button>
            <el-link
              :underline="false"
              type="primary"
              :href="item.row.http"
              target="_blank"
              download
            >下载</el-link>
            <el-button type="text" @click="$emit('delete', {item: item.row, index: item.$index})">删除</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Util from "../utils";
let { doubleDegital } = Util;
export default {
  name: "frame",
  inheritAttrs: false,
  components: {
    media: require("@/components/media").default
  },
  data() {
    return {
      multipleSelection: []
    };
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  filters: {
    sizeFilter: size => {
      size = +size;
      if (size % (1024 * 1024)) {
        return (size / 1024 / 1024).toFixed(2) + "M";
      } else if (size % 1024) {
        return (size / 1024 / 1024).toFixed(2) + "K";
      } else {
        return size + "B";
      }
    },
    timeFilter: time => {
      time = +time / 100;
      if (!time) return "";
      let h = Math.floor(time / 3600);
      let m = Math.floor((time % 3600) / 60);
      let s = Math.floor(time % 60);
      return `${doubleDegital(h)}:${doubleDegital(m)}:${doubleDegital(s)}`;
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.el-link {
  margin: 0 10px;
}
</style>