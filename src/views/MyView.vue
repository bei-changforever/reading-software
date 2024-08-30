<template>
    <div class="my-view">
        <van-nav-bar :border="false">
            <template #right>
                <van-icon name="envelop-o" color="rgb(103,103,103)" size="25" />
            </template>
        </van-nav-bar>
        <div class="click-login" @click="gotoLogin" v-if="!$store.state.isLogin">
            <div class="img">
                <img src="../assets/images/book-login.png" alt="">
            </div>

            <div class="desc" >
                <h1>点击登录</h1>
                <p>新用户登录即可全场免费读<span style="color: rgb(198,95,89)">5天</span></p>
            </div>
        </div>
        <div class="click-login" v-else>
            <div class="img">
                <img class="auto-img" src="../assets/images/c471430552c542c36d252e488f49fe8.png" alt="">
            </div>

            <div class="desc" >
                <h1>菜徐坤</h1>
            </div>
        </div>
        <div class="yuer">
            <div class="left">
                <h1>余额</h1>
                <p>充值送红包</p>
                <van-button color="rgb(222,87,81)" round type="info">充值</van-button>
            </div>
            <div class="right">
                <h1>签到</h1>
                <p>做任务领红包</p>
                <van-button color="rgb(222,87,81)" plain round type="info">签到</van-button>
            </div>
        </div>
        <div class="sfg">
            <van-cell is-link>
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <van-icon name="orders-o" />&nbsp;
                    <span class="custom-title">笔记</span>
                </template>
            </van-cell>
            <van-cell is-link>
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <van-icon name="certificate" />&nbsp;
                    <span class="custom-title">已购和上传</span>
                </template>
            </van-cell>
            <van-cell is-link>
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <van-icon name="service-o" />&nbsp;
                    <span class="custom-title">在线客服</span>
                </template>
            </van-cell>
            <van-cell is-link>
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <van-icon name="closed-eye" />&nbsp;
                    <span class="custom-title">夜间模式</span>
                </template>
                <template #right-icon>
                    <van-switch active-color="rgb(222,87,81)" inactive-color="#dcdee0"  v-model="checked" size="24px" />
                </template>
            </van-cell>
            <van-cell is-link>
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <van-icon name="gem-o" />&nbsp;
                    <span class="custom-title">积分商城</span>
                </template>
            </van-cell>
            <van-cell is-link>
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <van-icon name="setting-o" />&nbsp;
                    <span class="custom-title">设置</span>
                </template>
            </van-cell>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyView',
    data() {
        return {
            checked: false
        }
    },
    methods:{
        gotoLogin(){
            this.$router.push({
                name:'Login'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.my-view {
    width: 100%;

    .click-login {
        padding: 10px;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        justify-content: space-between;

        .img {
            width: 100px;
            height: 100px;
            background-color: rgb(240, 240, 240);
            border-radius: 50%;
            border: 1px solid rgb(252, 252, 252);
            box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 50px;
                display: block;
            }


            .auto-img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                display: block;
            }
        }

        .desc {
            width: 220px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            h1 {
                font-size: 25px;
                font-weight: bold;
            }

            p {
                color: rgb(103, 103, 103);
                font-size: 15px;
            }
        }

    }

    .yuer {
        width: 100%;
        display: flex;
        justify-content: space-around;
        padding: 10px;
        box-sizing: border-box;


        .left,
        .right {
            width: 45%;
            height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            box-sizing: border-box;
            border-radius: 10px;
            box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;

            h1 {
                font-size: 18px;
                font-weight: bold;
            }

            p {
                font-size: 15px;
                color: rgb(106, 106, 106);
            }

            .van-button {
                width: 100px;
            }
        }
    }

    .van-cell {
        font-size: 16px;
        color: rgb(103, 103, 103);
    }
}
</style>