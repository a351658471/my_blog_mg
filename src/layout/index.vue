<template>
  <div class="common-layout">
    <el-container>
       <Menu />
      <el-container>
        <el-header>
          <TopNav />
          <History />
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import Menu from './component/Menu.vue'
import TopNav from './component/TopNav.vue'
import History from './component/History.vue'
</script>
<style lang="scss" scoped>
:deep(.el-header){
 padding:0;
 height: 80px;
}
:deep(.el-main){
 overflow: hidden;
}

</style>