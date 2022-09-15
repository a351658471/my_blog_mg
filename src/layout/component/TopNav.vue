<template>
  <div class="nav-bar">
    <div>
      <el-icon class="is-open-icon" @click="handleOpen"
        ><Expand v-show="isCollapse" /><Fold v-show="!isCollapse"
      /></el-icon>
    </div>
    <div>
      <img class="pic" src="../../assets/logo.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useStore } from 'vuex';
import { Expand, Fold } from "@element-plus/icons-vue";
const store = useStore()
let isCollapse =  computed(()=> {
  return store.state.common.isCollapse
})
const handleOpen = ()=>{
  store.commit('common/SET_ISCOLLAPSE',!isCollapse.value)
}
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  box-shadow: 0 0 1px rgba($color: #000000, $alpha: 0.2);
  padding: 0 20px;
  .is-open-icon {
    font-size: 20px;
  }
  .pic {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
}
</style>