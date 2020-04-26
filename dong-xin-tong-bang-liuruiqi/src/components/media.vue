<template>
  <div class="media">
    <div class="center-v" v-if="type === 'a'">
      <i class="el-icon-headset"></i>
      <audio :src="media.http" controls="controls">{{notSupport}}</audio>
    </div>
    <div class="center-v" v-if="type === 'v'">
      <i class="el-icon-video-camera"></i>
      <el-button size="mini" type="primary" round @click="preview(media.http)">预览</el-button>
    </div>
    <div class="center-v" v-if="type === 't'">
      <i class="el-icon-document"></i>
      <el-button size="mini" type="primary" round @click="preview(media.text)">预览</el-button>
    </div>
    <div class="center-v" v-if="type === 'i'">
      <i class="el-icon-picture-outline"></i>
      <div class="image-wrapper">
        <el-button size="mini" type="primary" round>预览</el-button>
        <el-image
          style="width: 100px; height: 100px"
          :src="media.http"
          :preview-src-list="[ media.http]"
        ></el-image>
      </div>
    </div>
    <el-dialog title="预览" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <video v-if="type === 'v'" :src="src" controls="controls">{{notSupport}}</video>
      <div v-if="type === 't'" v-html="src"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "media",
  components: {},
  data() {
    return {
      dialogVisible: false,
      notSupport: "此浏览器不支持播放",
      src: ""
    };
  },
  props: {
    media: {
      type: Object,
      default() {
        return {
          media_id: "",
          name: "",
          url: "",
          mime: "",
          created: "",
          media_type_ids: "",
          media_type_name: "",
          deleted: "",
          user_id: "",
          played: "",
          last_play: "",
          timelen: "",
          http: "",
          mslen: "",
          bitrate: ""
        };
      }
    }
  },
  computed: {
    type() {
      let type = {
        a: ["mp3"], //音频
        v: ["mp4"], //视频
        t: ["text"], //文本
        i: ["jpeg", "png"] // 图
      };
      for (let i in type) {
        if (
          type[i].some(item => {
            if (this.media.mime.toLowerCase().indexOf(item) > -1) {
              return true;
            }
          })
        ) {
          return i;
        }
      }
      return "";
    }
  },
  methods: {
    preview(e) {
      this.src = e;
      this.dialogVisible = true;
    },
    handleClose() {
      this.src = "";
      this.dialogVisible = false;
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="less" scoped>
.media {
  .el-icon-headset,
  .el-icon-video-camera,
  .el-icon-document,
  .el-icon-picture-outline {
    margin-right: 15px;
  }
  video {
    width: 100%;
  }
  audio {
    height: 30px;
    min-width: 230px;
    max-width: 460px;
  }
  .image-wrapper {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    /deep/.el-image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      > img,
      .el-image__error,
      .el-image__placeholder {
        opacity: 0;
      }
    }
  }
}
</style>