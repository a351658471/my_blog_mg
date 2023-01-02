<template>
  <div class="login-container">
    <el-form 
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      status-icon
      ref="ruleFormRef"
    >
      <el-form-item>
        <div class="title">Login Form</div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input clearable :prefix-icon="UserFilled" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input clearable show-password :prefix-icon="Lock" type="password" v-model="loginForm.password "></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="large" class="submit" type="primary" @click="submitForm(ruleFormRef)"
            >login</el-button
          >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex';
import { useRouter} from 'vue-router'
const store = useStore()
const router = useRouter()
const loginForm = reactive({
  username:'',
  password:'',
})
const ruleFormRef = ref('')
const loginRules = reactive({
  username:[
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password:[
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
})
const submitForm = (ruleFormRef)=>{
  ruleFormRef.validate(val => {
    if(val){
      //success
      const params = {
        username:loginForm.username,
        password:loginForm.password
      }
      store.dispatch('user/login', params).then(res => {
        ElMessage({
          type: 'success',
          message: '登陆成功',
        })
        setTimeout(() => {
          router.replace('/')
        }, 1000);
      }).catch(err => {
        ElMessage({
          type: 'error',
          message: err.message,
        })
      })
    }else{
      //faild
    }
  })
}
</script>

<style lang="scss">
.login-container{
  min-height: 100vh;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
  .login-form{
    box-sizing: border-box;
    width: 520px;
    padding:  160px 35px  0 35px;
    margin: auto;
    .title{
      width: 100%;
      font-size: 26px;
      color: #eee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .el-input{
      height: 50px;
      background: rgba(0, 0, 0, 0.1);
      .el-input__wrapper{
        background: transparent;
        box-shadow:none;
        border: 1px solid rgba(255, 255, 255, 0.1);
        .el-input__inner{
          color: #fff;
        }
      }
    }
    .submit{
      width: 100%;
    }
  }
}
</style>
