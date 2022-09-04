<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <Menu/>
      </el-aside>
      <el-container>
        <el-header>
          <TopNav/>
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
</script>