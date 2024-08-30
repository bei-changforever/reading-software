<template>
    <div class="login-view">
        <van-nav-bar title="登录" left-arrow @click-left="$router.go(-1)" />
        <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
            新用户免费看5天
        </van-notice-bar>
        <van-form @submit="onSubmit">
            <van-field v-model="username" name="手机号" placeholder="手机号" :rules="[{ required: true, message: '请填写手机号' }]" />
            <van-field v-model="password" type="password" name="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
            <div style="margin: 16px;">
                <van-button color="rgb(229,167,152)" round block type="info" native-type="submit" @click="getUser">登录</van-button>
            </div>
        </van-form>
        <div class="regist">
            <span>忘记密码</span>
            <span style="color: rgb(229,167,152)">手机号注册</span>
        </div>
        <div class="center-box">
            <van-checkbox v-model="checked">您已同意<span style="color: rgb(67,112,187)">“服务条款”</span>、<span
                    style="color: rgb(67,112,187)">“隐私政策”</span>。</van-checkbox>
        </div>

    </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    name: 'LoginView',
    data() {
        return {
            username: '',
            password: '',
            checked: false
        };
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        ...mapMutations(['updateLogin']),
        onSubmit(values) {
            console.log('submit', values);
        },
        getUser() {
            let info = {
                username: this.username,
                password: this.password,
            }
            if (this.checked) {
             
                    localStorage.setItem('phoneNumber', JSON.stringify(info))
                    this.updateLogin(true)
                    this.$router.push({
                        path: '/my'
                    })
            }
            else {
                this.$toast({
                    message:'请先勾选'
                })
            }




        }
    },
}
</script>

<style lang="scss" scoped>
.login-view {
    width: 100%;
    height: 100%;
    background-color: rgb(250, 250, 250);

    .van-form {
        margin-top: 100px;
    }

    .regist {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        box-sizing: border-box;
        font-size: 16px;
    }

    .center-box {
        margin-top: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .van-checkbox {
            font-size: 16px;
        }
    }

}
</style>