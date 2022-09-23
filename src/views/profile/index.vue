<template>
  <div class="out-box">
    <div class="profile">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="个人简介">
          <el-input type="textarea" v-model="formData.obj.intor"/>
        </el-form-item>
        <el-form-item label="教育经历">
            <ExCard :ex-list="infoObj.exList"/>
        </el-form-item>
        <el-form-item label="工作经历">
            <ExCard :ex-list="infoObj.workList"/>
        </el-form-item>
        <el-form-item label="标签">
            <el-tag
              v-for="tag in dynamicTags"
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
    <el-button type="primary">保存</el-button>
  </div>
  </div>
  
  
</template>

<script setup>
import {ref, nextTick, reactive} from 'vue'
import ExCard from './components/ExCard.vue'
const formData = reactive({
  obj:{
    intor:''
  }
})
const openAddDialog = () => {}
const inputValue = ref('')
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
const InputRef = ref()
const infoObj = reactive({
  intor:'',
  exList:[
    {
      title:'厦门工学院-本科',
      secondTitle:'2015.09 - 2019.06',

    },
    {
      title:'厦门工学院-本科',
      secondTitle:'2015.09 - 2019.06',

    }
  ],
  workList:[
    {
      title:'xx世纪科技有限公司',
      secondTitle:'前端开发',
    }
  ],
  tagList:[],
  skillList:[]
})
const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.input.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
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