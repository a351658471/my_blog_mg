<template>
    <el-row :gutter="24" style="width:100%">
      <el-col :span="12" v-for="item in exList" :key="item">
        <el-card shadow="hover">
          <div class="card-header">
            <div>{{item.title}}</div>
            <div style="font-size: 20px">
              <View style="width: 1em; height: 1em; margin-right: 8px"  @click="handleView"/>
              <Edit style="width: 1em; height: 1em; margin-right: 8px" @click="handleEdit"/>
              <Delete style="width: 1em; height: 1em; margin-right: 8px" @click="handleDelete" />
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-button type="primary" style="margin-top:10px" @click="openAddDialog">添加经历</el-button>
      </el-col>
       <el-dialog
          v-model="dialogVisible"
          title="经历"
          width="40%"
        >
          <el-form :model="exForm.data" label-width="80px">
            <el-form-item label="标题" prop="" >
              <el-input style="width:90%;margin-bottom:10px" v-model="exForm.data.title"></el-input>
            </el-form-item>
            <el-form-item label="二级标题">
              <el-input style="width:90%;margin-bottom:10px" v-model="exForm.data.secondTitle"></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <el-input style="width:90%;margin-bottom:10px" v-model="exForm.data.content" type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="dialogVisible = false"
                >Confirm</el-button
              >
            </span>
          </template>
        </el-dialog>
  </el-row>
</template>

<script setup>
import {reactive, ref} from 'vue'
const props = defineProps({
  exList:{
    type:Array,
    default:()=>([])
  }
})
const dialogVisible = ref(false)
const exForm = reactive({
  data:{
    title:'',
    secondTitle:'',
    content:''
  }
})
const openAddDialog= ()=> {
  dialogVisible.value = true
}
const handleView= ()=>{
  dialogVisible.value = true
}
const handleDelete= () => {
  console.log('handleDelete');
}
const handleEdit= () => {
  dialogVisible.value = true
}
</script>

<style>

</style>