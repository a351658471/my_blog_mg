<template>
  <div class="out-box">
    <div class="profile">
      <el-form :model="infoObj" label-width="100px" @submit.prevent>
        <el-form-item label="个人简介">
          <el-input type="textarea" v-model="infoObj.intor"/>
        </el-form-item>
        <el-form-item label="教育经历">
            <ExCard :ex-list="infoObj.exList" type="exList"/>
        </el-form-item>
        <el-form-item label="工作经历">
            <ExCard :ex-list="infoObj.workList" type="workList"/>
        </el-form-item>
        <el-form-item label="标签">
            <el-tag
              v-for="tag in infoObj.tagList"
              :key="tag"
              class="tag"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="InputRef"
              v-model="inputValue"
              class="tag-input"
              size="small"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
              + New Tag
            </el-button>
        </el-form-item>
    </el-form>
    </div>
    <div class="save-box">
      <el-button @click="apiGetProfile">重置</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
  </div>
  </div>
  
  
</template>

<script setup>
import {getProfile, saveProfile} from '@/api/profile'
import {ref, nextTick, reactive, provide, onMounted} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import ExCard from './components/ExCard.vue'
const openAddDialog = () => {}
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref()
const infoObj = reactive({
  id:0,
  intor:'',
  exList:[],
  workList:[],
  tagList:[]
})
const handleClose = (tag) => {
  infoObj.tagList.splice(infoObj.tagList.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.input.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    infoObj.tagList.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
const handleDelete = (key,index) => {
   ElMessageBox.confirm(
    '确认删除此数据?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      infoObj[key].splice(index,1)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
  
}
provide('handleDelete',handleDelete)
const handleExConfirm = (key,exForm)=>{
  const {data:{ title, secondTitle, content, index}}  = exForm
  if(index != undefined){
    infoObj[key][index] = {title, secondTitle, content}
  }else{
    const obj = {title, secondTitle, content}
    infoObj[key].push(obj)
  }
  exForm.data.dialogVisible = false
}
provide('handleExConfirm',handleExConfirm)
const handleSave= ()=> {
  const { exList, intor, tagList, workList, id} = infoObj
  const data = {
    id,
    exList:JSON.stringify(exList),
    workList:JSON.stringify(workList),
    tagList:JSON.stringify(tagList),
    intor,
    
  }
  apiSaveProfile(data)

}
const apiSaveProfile = async(data) =>{
  const {code, msg} = await saveProfile(data)
  let type = code ===0?'success':'error'
  ElMessage ({
    message: msg,
    type,
  })
}

const apiGetProfile = async() => {
  const data = await getProfile()
  if(data?.code === 0 && data.result.length!=0){
    const { id, intor, tagList, exList, workList} = data.result[0]
    infoObj.id = id
    infoObj.intor = intor
    infoObj.exList = JSON.parse(exList)
    infoObj.tagList = JSON.parse(tagList)
    infoObj.workList = JSON.parse(workList)
  }
}

onMounted(()=> {
  apiGetProfile()
})
</script>

<style>
.out-box{
  width: 100%;
}
.profile{
  /* width: 55%; */
}
.skill{
  width: 40%;
}
.tag{
  margin-right: 10px;
}
.tag-input{
  width: 100px;
}
.card-header{
  display: flex;
  justify-content: space-between;
}
.save-box{
  display: flex;
  justify-content: center;
}
</style>