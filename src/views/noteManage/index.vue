<template>
  <div>
    <div>
      <el-button type="primary" @click="openDialog">新增笔记</el-button>
    </div>
     <el-table :data="tableData" style="width: 100%;margin-top:20px;" class="table" border stripe>
      <el-table-column fixed type="selection" width="55" />
      <!-- <el-table-column  type="index" :index="indexMethod" /> -->
      <el-table-column prop="title" label="标题" width="250" />
      <el-table-column prop="cover" label="封面" width="150" />
      <el-table-column prop="describe" label="描述" width="120" />
      <el-table-column prop="tag" label="标签" width="320" />
      <el-table-column prop="comment" label="评论数" />
      <el-table-column prop="views" label="浏览量" />
      <el-table-column align="center" label="操作">
      <template  #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      class="paginatios"
      v-model:currentPage="currentPage2"
      v-model:page-size="pageSize2"
      :background="background"
      layout="sizes, prev, pager, next"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog
      v-model="dialogVisible"
      title="笔记"
      width="70%"
      :before-close="handleClose"
    >
      <v-md-editor v-model="text" height="400px" @save="mdSave"></v-md-editor>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { addNote, getNotes } from '@/api/notes'
import {ref, onMounted, reactive } from 'vue'
const tableOption  = reactive({
  page:1,
  pageSize:10,
  total:0
})
const text = ref('')
const dialogVisible = ref(false)
let tableData = reactive([])
const currentPage2 = ref(5)
const pageSize2 = ref(30)
const small = ref(false)
const background = ref(true)
const disabled = ref(false)
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
const openDialog = ()=>{
  dialogVisible.value = true
}
const handleClose = ()=>{}
const mdSave = (text, html) => {
  console.log('text',text);
  console.log('html',html);
}
const  getList =async ()=>{
  const {page, pageSize} = tableOption
  const params = {
    page,
    pageSize,
  }
  const {code, result, total} =await getNotes(params)
  if(code ===0){
    tableData = reactive(result)
    console.log(tableData);
    tableOption.total = total
  }
}

onMounted(() => {
  getList()
})

</script>

<style>
.paginatios{
  display: flex;
  justify-content: flex-end;
}
.table{
  max-height:calc(100vh - 240px);
  margin-bottom: 20px;
  overflow: auto;
}
</style>