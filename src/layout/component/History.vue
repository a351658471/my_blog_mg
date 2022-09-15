<template>
  <div class="history">
    <el-tag
      v-for="item in history"
      :key="item.name"
      type="success"
      class="mx-1"
      closable
      @close="handleClose(item)"
      :effect="current===item.path?'dark':'plain'"
    >
      {{ item.name }}
    </el-tag>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
const current = ref('1')
const arr = [{name:'页面1',path:'1'},{name:'页面2',path:'2'},{name:'页面3',path:'3'}]
const history = reactive(arr)
const handleClose = (item)=> {
  const index = history.indexOf(item)
  history.splice(index,1)
}
</script>

<style lang="scss" scoped>
.history{
  height: 30px;
  line-height: 30px;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba($color: #000000, $alpha: 0.3);
}
.mx-1{
  margin-right: 10px;
}
</style>