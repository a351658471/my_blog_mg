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
    <el-button type="primary" @click="handleSave">保存</el-button>
  </div>
  </div>
  
  
</template>

<script setup>
import {getProfile, saveProfile} from '@/api/profile'
import {ref, nextTick, reactive, provide} from 'vue'
import ExCard from './components/ExCard.vue'
const openAddDialog = () => {}
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref()
const infoObj = reactive({
  intor:'',
  exList:[
    {
      title:'厦门工学院-本科1',
      secondTitle:'2015.09 - 2019.06',
      content:'hahahahh'
    },
    {
      title:'厦门工学院-本科2',
      secondTitle:'2015.09 - 2019.06',
      content:'xixixixi'
    }
  ],
  workList:[
    {
      title:'xx世纪科技有限公司',
      secondTitle:'前端开发',
      content:'xxxxxxxxxxxxxx'
    }
  ],
  tagList:['vue.js','node.js','react.js'],
  skillList:[]
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
  infoObj[key].splice(index,1)
}
provide('handleDelete',handleDelete)
const handleExConfirm = (key,exForm)=>{
  const {data:{ title, secondTitle, content, index}}  = exForm
  console.log('index',index);
  if(index != undefined){
    infoObj[key][index] = {title, secondTitle, content}
  }else{
    const obj = {title, secondTitle, content}
    infoObj[key].push(obj)
  }
}
provide('handleExConfirm',handleExConfirm)
const handleSave= ()=> {
  console.log(infoObj);
}
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