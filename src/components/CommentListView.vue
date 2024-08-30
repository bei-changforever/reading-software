<template>
    <div class="comment-list">
        <div class="img">
            <img v-if="!itemInfo.avatar" src="../assets/images/RsyqfItTi1c4eJ3Nmm6a9A==_8796093023794550480.png" alt=""/>
            <img v-else :src="itemInfo.avatar" alt=""/>
        </div>
        <div class="user-comment">
            <div class="user-info">
                <van-cell center>
                    <template #title>
                        <span class="custom-title">{{ itemInfo.nickName }}</span>
                        &nbsp;
                        <van-tag plain type="danger">LV.{{ itemInfo.userLevel }}</van-tag>
                    </template>
                    <template #label>
                        <van-rate v-model="itemInfo.grade" :size="15" color="#ffd21e" void-icon="star" void-color="#eee" />
                        &nbsp;
                        <span>{{ timestampToTime(itemInfo.time) }}</span>
                    </template>
                    <template #right-icon>
                        <span style="font-size: 18px">{{ itemInfo.likes }}</span><van-icon size="18" name="good-job-o" />
                    </template>
                </van-cell>
            </div>
            <div class="comment-detail">
                {{ itemInfo.comment }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommentList',
    props:{
        itemInfo: Object
    },
    data() {
        return {
            value: 5
        }
    },
    methods:{
        timestampToTime(timestamp) {
                timestamp = timestamp ? timestamp : null;
                let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
                let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
                let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                return Y + M + D + h + m ;  
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/root.css';

.comment-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(237, 237, 237);
    padding-bottom: 10px;
    padding-top: 10px;

    .img {
        width: 34px;

        img {
            border-radius: 50%;
            width: 34px;
            height: 34px;
            display: block;
        }
    }

    .user-comment {
        padding-left: 5px;
        width: 310px;

        .van-cell {
            padding: 0px;
            background-color: white;

            .van-tag  {
                height: 17px;
            }

            .custom-title {
                color: var(--href-color);
            }
        }

        .comment-detail {
            margin-top: 5px;
            line-height: 18px;
        }

    }
}
</style>