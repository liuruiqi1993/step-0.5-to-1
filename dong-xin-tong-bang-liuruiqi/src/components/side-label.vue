<template>
  <div class="side-label" v-bind="$attrs">
    <el-button
      class="row readonly"
      :class="{active: $attrs.active===$attrs.index}"
      v-show="readonly"
      @click="$emit('change', $attrs.index)"
    >
      {{item.name}}
      <i v-if="item.media_type_id != 0" class="el-icon-edit-outline" @click="toggle"></i>
    </el-button>
    <el-input
      ref="input"
      class="row editable"
      v-show="!readonly"
      v-model.trim="value"
      placeholder="请输入标题"
    >
      <el-button-group slot="append">
        <el-button icon="el-icon-check" @click="submit"></el-button>
        <el-button icon="el-icon-close" @click="cancel"></el-button>
      </el-button-group>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "sideLabel",
  components: {},
  data() {
    return {
      readonly: true,
      value: ""
    };
  },
  props: {
    item: {
      type: Object,
      default() {
        return {
          media_type_id: null,
          name: "",
          note: ""
        };
      }
    }
  },
  watch: {
    item: function() {
      this.cancel();
    }
  },
  methods: {
    toggle() {
      if (this.item.media_type_id === 0) return;
      this.readonly = !this.readonly;
    },
    async submit() {
      this.$emit("update", {
        ...this.item,
        value: this.value,
        index: this.$attrs.index
      });
    },
    cancel() {
      this.value = this.item.name;
      this.item.media_type_id ? this.toggle() : this.$emit("pop");
      this.submitting = false;
    }
  },
  created() {
    this.value = this.item.name;
    this.readonly = parseInt(this.item.media_type_id) > -1;
  }
};
</script>

<style lang="less" scoped>
.side-label {
  /deep/ .row {
    width: 100%;
    margin-bottom: 10px;
    &.readonly {
      span {
        display: flex;
        justify-content: space-between;
      }
    }
    &.editable {
      .el-button-group {
        display: inline-flex;
      }
      .el-button {
        flex: 1;
        padding: 0 10px;
      }
    }
  }
}
</style>