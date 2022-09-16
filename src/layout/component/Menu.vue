<template>
  <div>
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">expand</el-radio-button>
      <el-radio-button :label="true">collapse</el-radio-button>
    </el-radio-group> -->
    <el-menu
      active-text-color="#ffd04b"
      background-color="#304156"
      default-active="/dashboard"
      text-color="#fff"
      router
      class="el-menu-vertical"
      :collapse="isCollapse"
    >
    <template v-for="item in menuList" :key="item">
      <template v-if="item.children">
        <el-sub-menu :index="item.path">
          <template #title><el-icon><component :is="item.meta.icon" /></el-icon><span>{{item.meta.title}}</span></template>
          <el-menu-item v-for="itemChildren in item.children" :key="itemChildren.path" :index="itemChildren.path">
            <el-icon><component :is="itemChildren.meta.icon" /></el-icon>
            <span>{{itemChildren.meta.title}}</span>
            </el-menu-item>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="item.path">
        <el-icon><component :is="item.meta.icon" /></el-icon>
        <template #title>{{item.meta.title}}</template>
      </el-menu-item>
      </template>
    </template>
    </el-menu>
  </div>
</template>

<script setup name="demo">
import { ref, computed  } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const isCollapse =  computed(()=> {
  return store.state.common.isCollapse
})
const menuList = computed(()=> {
  const routes = store.state.routes.menuRoutes.children
  return routes
})
const handleSelect = (key, keyPath) => {
  let path = ''
  if(keyPath.length == 1){
    path = key
  }else{
    path = keyPath.join('/')
  }
  router.push(path)
};
</script>

<style>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
  overflow: auto;
}
.el-menu-vertical{
  height: 100vh;
}
</style>