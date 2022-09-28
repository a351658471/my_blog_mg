<template>
    <el-row :gutter="24" style="width:100%">
      <el-col :span="12" v-for="(item,index) in exList" :key="item">
        <el-card shadow="hover" style="margin-bottom:10px">
          <div class="card-header">
            <div>{{item.title}}</div>
            <div style="font-size: 20px">
              <!-- <View style="width: 1em; height: 1em; margin-right: 8px"  @click="handleView(item)"/> -->
              <Edit style="width: 1em; height: 1em; margin-right: 8px" @click="handleEdit(item,index)"/>
              <Delete style="width: 1em; height: 1em; margin-right: 8px" @click="handleDelete(type,index)" />
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-button type="primary" style="margin-top:10px" @click="openAddDialog">添加经历</el-button>
      </el-col>
       <el-dialog
          v-model="exForm.data.dialogVisible"
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
              <el-button @click="exForm.data.dialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="handleExConfirm(type, exForm)"
                >Confirm</el-button
              >
            </span>
          </template>
        </el-dialog>
  </el-row>
</template>

<script setup>
import {reactive, ref, inject} from 'vue'
const handleDelete = inject('handleDelete')
const handleExConfirm = inject('handleExConfirm')
const props = defineProps({
  exList:{
    type:Array,
    default:()=>([])
  },
  type:String
})
const exForm = reactive({
  data:{
    title:'',
    secondTitle:'',
    content:'',
    
  }
})
const openAddDialog= ()=> {
  exForm.data = {
    title:'',
    secondTitle:'',
    content:''
  }
  exForm.data.dialogVisible = true
}
const handleView= ()=>{
  exForm.data.dialogVisible = true
}
const handleEdit= (source,index) => {
  exForm.data = {...source}
  exForm.data.index = index
  exForm.data.dialogVisible = true
}
</script>

<style>

</style>