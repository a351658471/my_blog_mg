<template>
  <div>
    <div>
      <el-button type="primary" @click="openDialog">新增笔记</el-button>
    </div>
    <el-table
      :data="tableData.data"
      style="width: 100%; margin-top: 20px"
      class="table"
      border
      stripe
    >
      <el-table-column fixed type="selection" width="55" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="cover" label="封面" />
      <el-table-column prop="describe" label="描述" />
      <el-table-column prop="tag" label="标签" width="150" />
      <el-table-column prop="comment" label="评论数" width="150"/>
      <el-table-column prop="views" label="浏览量" width="150" />
      <el-table-column prop="createTime" label="创建时间" width="250" />
      <el-table-column align="center" label="操作"  width="250">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="paginatios"
      v-model:currentPage="tableData.page"
      v-model:page-size="tableData.pageSize"
      :background="background"
      layout="sizes, prev, pager, next"
      :total="tableData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog
      v-model="dialogVisible"
      :title="formData.obj.id?'编辑笔记':'新增笔记'"
      width="60%"
    >
      <el-form class="form" :model="formData.obj" :rules="formRules" ref="formRef" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input style="width: 450px" v-model="formData.obj.title"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tag">
          <el-input style="width: 450px" v-model="formData.obj.tag"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="describe">
          <el-input style="width: 450px" v-model="formData.obj.describe"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            action="/api/upload/uploadImg"
            class="avatar-uploader"
            :show-file-list="false"
            name="files"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formData.obj.cover" :src="formData.obj.cover" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <v-md-editor
            v-model="formData.obj.content"
            style="width:100%"
            height="400px"
            @save="mdSave"
          ></v-md-editor>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleSave(ruleFormRef)"
            >保 存</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { addNote, getNotes, editNote, deleteNote } from "@/api/notes";
import { uploadImg } from "@/api/upload";
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
const formRef = ref(null)
let formData = reactive({
  obj:{
    title:'',
    cover:'',
    tag:'',
    describe:'',
    content:''
  }
})
const formRules = reactive({
  title:[
    { required: true, message: '请输入', trigger: 'blur' },
  ],
  tag:[
    { required: true, message: '请输入', trigger: 'blur' },
  ],
  describe:[
    { required: true, message: '请输入', trigger: 'blur' },
  ],
  content:[
    { required: true, message: '请输入', trigger: 'blur' },
  ],
})
const dialogVisible = ref(false);
const tableData = reactive({
  data: [],
  page: 1,
  pageSize: 10,
  total: 0,
});
const small = ref(false);
const background = ref(true);
const disabled = ref(false);
const handleSizeChange = (val) => {
  tableData.page = 1
  getList()
};
const handleCurrentChange = (val) => {
  getList()
};
const openDialog = () => {
  formData.obj = {
      title:'',
      cover:'',
      tag:'',
      describe:'',
      content:''
    }
  dialogVisible.value = true;
};
const mdSave = (text, html) => {
  console.log("text", text);
  console.log("html", html);
};
const getList = async () => {
  const { page, pageSize } = tableData;
  const params = {
    page,
    pageSize,
  };
  const { code, result, total } = await getNotes(params);
  if (code === 0) {
    tableData.data = result;
    tableData.total = total;
  }
};
const handleAvatarSuccess = (res)=>{
  formData.obj.cover = res.url
}
const beforeAvatarUpload = (file)=>{
  console.log('111111111111');
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type ==='image/webp'
  const isLt2M = file.size / 1024 / 1024 < 10
  if (!isJPG) {
    ElMessage({
        type: 'error',
        message: '图片只能是 JPG/JPEG/PNG/GIF 等格式!',
      })
  }
  if (!isLt2M) {
    ElMessage({
        type: 'error',
        message: '图片大小不能超过 3MB!',
      })
  }
  
  return isJPG && isLt2M
}
const handleEdit = (val)=>{
  formData.obj = {...val}
  dialogVisible.value = true
}
const handleDelete = (id)=>{
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
      deleteConfirm(id)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
const handleSave = () =>{
  formRef.value.validate((valid) => {
    if(valid){
      saveNote()
    } 
  })
}
const deleteConfirm = async(id) =>{
  const {code, msg } =await deleteNote(id)
  let type = 'error'
  if(code == 0){
    type = 'success'
    getList()
  }
  ElMessage ({
    message: msg,
    type,
  })
}
const saveNote = async () => {
  let data = null
  if(formData.obj.id){
    data = await editNote(formData.obj)
  }else{
    data = await addNote (formData.obj)
  }
  const {code,msg} = data
  let type ='error'
  if(code ==0){
    type = 'success'
    dialogVisible.value = false
    getList()
  }
  ElMessage ({
    message: msg,
    type,
  })
}
onMounted(() => {
  getList();
});
</script>

<style>
.paginatios {
  display: flex;
  justify-content: flex-end;
}
.table {
  max-height: calc(100vh - 240px);
  margin-bottom: 20px;
  overflow: auto;
}
.form{
  max-height: 60vh;
  overflow: auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>