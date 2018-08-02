
<!-- confirm 组件 -->
<template>
  <el-dialog :title="title" :visible="visible" :width="w" center @close="closeDialog" class="my-confirm">
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="confirmFunc">确 定</el-button>
      <el-button size="small" @click="closeDialog">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: '',

  data(){
    return {
      visible: true,
      title: '',
      w: '260px'
    }
  },

  props: {
    
  },
  
  methods: {
    confirmFunc(){
      this.visible = false
      this.$emit('confirm')
    },

    closeDialog(){
      this.visible = false
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.my-confirm{
  .el-dialog__headerbtn{
    top: 10px;
    right: 10px;
  }

  .dialog-footer{
    display: flex;
    justify-content: space-evenly;
  }
}

</style>