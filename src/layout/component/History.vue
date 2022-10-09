<template>
  <div class="history">
    <el-tag
      v-for="item in historyRoutes"
      :key="item.name"
      type="success"
      class="mx-1 tag"
      closable
      @click="tagClick(item)"
      @close="handleClose(item)"
      :effect="current===item.path?'dark':'plain'"
    >
      {{ item.name }}
    </el-tag>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const historyRoutes = computed(()=> {
  return store.getters.historyRoutes
})
const current = computed(()=> {
  return router.currentRoute.value.fullPath
})
const handleClose = (route)=> {
  if(route.path === '/dashboard')return
  const params = {
    type:1,
    route
  }
  store.commit('routes/SET_HROUTES',params)
  if(route.path === current.value){
    router.push(historyRoutes.value[historyRoutes.value.length-1].path)
  }
}
const tagClick = (route)=>{
  router.push(route.path)
}
watch(router.currentRoute,(nValue,lValue)=>{
    const route = {
      path:nValue.fullPath,
      name:nValue.meta.title
    }
    const params = {
      type:0,
      route
    }
    store.commit('routes/SET_HROUTES',params)
  
},{immediate:true})
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
.tag{
  cursor: pointer;
}
</style>