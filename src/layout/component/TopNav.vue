<template>
  <div class="nav-bar">
    <div>
      <el-icon class="is-open-icon" @click="open = !open"
        ><Expand v-show="open" /><Fold v-show="!open"
      /></el-icon>
    </div>
    <div>
      <img class="pic" src="../../assets/logo.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Expand, Fold } from "@element-plus/icons-vue";
const open = ref(true);
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
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