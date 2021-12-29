<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" alt />
    <div class="wrapper__input">
      <input
        type="text"
        class="wrapper__input__content"
        placeholder="请输入用户名 "
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input 
      type="password"
      class="wrapper__input__content"
      placeholder="请输入密码"
      v-model="password"
      />
    </div>
    <div class="wrapper__input">
      <input
      type="password"
      class="wrapper__input__content"
      placeholder="确认密码"
      v-model="ensurement"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登陆</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>
<script>
import { reactive , toRefs} from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast,{ useToastEffect } from '../../components/Toast.vue'

const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ 
    username: '',
    password: '',
    ensurement: ''
  })

  // 注册相关逻辑
  const handleRegister = async () => {
        try {
          const result = await post('/api/user/register', {
            username: data.username,
            password: data.password
          })
          // result?.data?.errno === 0
          if (result?.errno === 0) {
            router.push({ name: 'Login' })
          } else {
            showToast('注册失败')
          }
        } catch (e) {
          showToast('请求失败')
        }
      }
      const { username,password, ensurement} = toRefs(data)
      return{ username,password, ensurement, handleRegister}
}

export default {
  name: 'Register',
  components:{ Toast },
  setup () {
    const router = useRouter()
    const { show, toastMessage, showToast } = useToastEffect(); 
    const { username,password, ensurement, handleRegister } = useRegisterEffect(showToast)
    const handleLoginClick = () => {
      router.push({ name: 'Login' })// 点击已有账号登录跳转到登录页面
    }
    return { 
      username,password, ensurement, show, toastMessage,
      handleRegister,handleLoginClick }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    box-sizing: border-box;
    background: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    // padding: .12rem 0 .12rem .16rem;
    padding: 0 0.16rem;
    // padding: .12rem .16rem .20rem;
    border-radius: 0.06rem;
    height: 0.48rem;
    margin: 0rem 0.48rem 0.16rem 0.48rem;
    &__content {
      width: 100%;
      // height: 100%;
      border: none;
      outline: none;
      line-height: 0.48rem;
      background: none;
      font-size: 0.16rem;
      color: $content-notice-fontcolor;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &__register-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    background: $btn-bgColor;
    box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
    border-radius: 4px;
    color: $bgColor;
    font-size: 0.16rem;
    text-align: center;
  }
  &__register-link {
    // margin: .16rem .12rem 0 1.18rem;
    text-align: center;
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
  }
}
</style>
