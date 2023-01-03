<template>
  <div id="nav">
    <router-view/>
  </div>
</template>
<script setup>
import{ onMounted } from 'vue'
import { useStore } from 'vuex';
const store = useStore()
onMounted(()=>{
  if (localStorage.getItem('token')) {
    store.commit('user/SET_TOKEN',localStorage.getItem('token'))
  }
})
</script>

<style lang="scss">

</style>
