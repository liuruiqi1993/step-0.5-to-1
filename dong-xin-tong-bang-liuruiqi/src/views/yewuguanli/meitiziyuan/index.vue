<template>
  <el-container class="container m-10">
    <el-aside class="bg-fff br-4" width="250px">
      <side
        :active="active"
        title="资源类别"
        :list="mediaType"
        v-on="$listeners"
        @change="change"
        @update="update"
        @add="add"
        @pop="pop"
      ></side>
    </el-aside>
    <el-main class="bg-fff br-4">
      <h5 class="title">{{current.name}}</h5>
      <el-row class="extra m-10" type="flex" align="middle">
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="uploadVisible = true">添加资源</el-button>
        <el-pagination
          @size-change="handleSizeChange"
          :page-sizes="tableSize"
          :page-size="limit"
          layout="sizes"
        ></el-pagination>
      </el-row>
      <myTable :list="tableList" v-on="$listeners" @update="updateMedia" @delete="deleteMedia"></myTable>
      <el-pagination
        class="page"
        @current-change="getTableList"
        :current-page.sync="currentPage"
        :page-size="limit"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-main>
    <!-- 添加和更新 -->
    <el-dialog
      title="添加资源"
      class="upload-dialog"
      :visible.sync="uploadVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-input placeholder="请输入内容" v-model="media_name" clearable></el-input>
      <el-upload
        class="upload"
        drag
        :auto-upload="false"
        action="https://jsonplaceholder.typicode.com/posts/"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
      <el-select v-model="media_type_ids" filterable placeholder="请选择">
        <el-option
          v-for="item in mediaType"
          :key="item.media_type_id"
          :label="item.name"
          :value="item.media_type_id"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadVisible = false">添加</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "frame",
  inheritAttrs: false,
  components: {
    side: require("@/components/side").default,
    myTable: require("@/components/table").default
  },
  data() {
    return {
      active: 0,
      currentPage: 0,
      total: 0,
      tableList: [],
      limit: 1,
      tableSize: [1, 5, 10, 100],
      // dialog 更新编辑
      uploadVisible: false,
      media_type_ids: "",
      media_name: ""
    };
  },
  computed: {
    ...mapGetters(["mediaType"]),
    list() {
      return this.mediaType || [];
    },
    current() {
      return this.list.length ? this.list[this.active] : {};
    }
  },
  methods: {
    ...mapMutations(["setState"]),
    ...mapActions([
      "updateMediaTypeInfo",
      "getMediaTypeList",
      "addMediaType",
      "updateMediaInfoDeleteStatus",
      "getMediaInfoList"
    ]),
    // 资源类别
    change(e) {
      this.active = e;
      this.currentPage = 0;
      this.getTableList();
    },
    async update(e) {
      // 有media_type_id就是更新，没有就是添加
      let { media_type_id, note, value, name, index } = e;
      if (!value) return;
      if (media_type_id) {
        let result = await this.updateMediaTypeInfo({
          media_type_id,
          note,
          type_name: name
        });
        if (result === true) {
          this.$set(this.list, index, { ...this.list[index], name: value });
        } else {
          this.$message.error(result);
        }
      } else {
        let result = await this.addMediaType({
          dist_id: 1,
          school_id: 1,
          type_name: name,
          note
        });
        if (result.error === "OK") {
          let item = {
            media_type_id: result.value,
            name: value,
            note,
            media_count: 0
          };
          this.$set(this.list, index, item);
          this.setState({
            key: ["mediaType", index],
            value: item
          });
        } else {
          this.$message.error(result);
        }
      }
    },
    add() {
      this.list[this.list.length - 1].media_type_id &&
        this.list.push({
          media_type_id: null,
          name: "",
          note: "",
          media_count: 0
        });
    },
    pop() {
      this.list.pop();
    },
    handleSizeChange(e) {
      this.limit = e;
      this.currentPage = 0;
      this.getTableList();
    },
    handleClose() {
      // 不要的东西清掉
      this.uploadVisible = false;
      this.media_name = "";
      this.media_type_ids = "";
    },
    updateMedia(e) {
      console.log(e);
      this.uploadVisible = true;
      this.media_name = e.item.name;
      this.media_type_ids = e.item.media_type_ids;
    },
    deleteMedia(e) {
      console.log(e);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let value = await this.updateMediaInfoDeleteStatus({
          media_ids: e.item.media_id
        });
        if (value === true) {
          // 重新请求这一页
          this.tableList.splice(e.index, 1);
        }
      });
    },
    async getTableList() {
      let { currentPage: page, limit, active } = this.$data;
      let params = {
        page,
        limit
      };
      if (active) {
        params.media_type_ids = this.current.media_type_id;
      }
      let { list, total } = await this.getMediaInfoList(params);
      this.tableList = list;
      this.total = +total;
    }
  },
  created() {
    this.getMediaTypeList();
    this.getTableList();
  }
};
</script>

<style lang="less" scoped>
@import url("../../../assets/config.less");
.container {
  margin-top: 0px;
  /deep/.el-aside {
    margin-right: 3px;
  }
  /deep/.el-main {
    .title {
      margin: 0 -20px;
      padding: 0 20px 15px;
      border-bottom: 1px solid #eee;
    }
    .extra {
      margin: 20px 0;
      .el-pagination {
        display: inline-block;
        padding: 0;
      }
    }
    .page {
      margin: 20px 0 0;
      text-align: center;
    }
  }
  /deep/.upload-dialog {
    .el-select,
    .el-upload,
    .el-upload-dragger {
      width: 100%;
    }
    .upload {
      margin: 20px 0;
    }
  }
  .side {
    margin: 20px;
  }
}
</style>