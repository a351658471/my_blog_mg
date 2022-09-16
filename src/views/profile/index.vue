<template>
  <div class="out-box">
    <div class="profile">
      <el-form :model="form" label-width="100px">
        <el-form-item label="个人简介">
          <el-input type="textarea"/>
        </el-form-item>
        <el-form-item label="经历">
            <el-row :gutter="24" style="width:100%">
              <el-col :span="8">
                <el-card shadow="hover"> Always </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover"> Hover </el-card>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="openAddDialog">添加经历</el-button>
              </el-col>
            </el-row>
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
    <div class="skill">
      <div>技能1</div>
    </div>
  </div>
</template>

<script setup>
import {ref, nextTick} from 'vue'
const openAddDialog = () => {

}
const inputValue = ref('')
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
const InputRef = ref()

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
  display: flex;
  justify-content: space-between;
}
.profile{
  width: 55%;
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
</style>