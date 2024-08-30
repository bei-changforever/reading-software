<template>
    <div class="directory">
        <van-skeleton title  :row="3" :loading="loading">
        <div class="tag">
            <van-tag type="success">最新</van-tag><span>{{ title }}</span>
        </div>
        <p class="time">{{ intervaltime(time)}}</p>
    </van-skeleton>
    </div>
</template>

<script>
import { intervaltime } from '@/utils/IntervalTime'
export default {
    name: 'Directory',
    props: {
        title: String,
        time: {
            type: Number || String
        }
    },
    data(){
        return {
            intervaltime:intervaltime,
            loading: true
        }
    },
    mounted(){
        if(this.title) {
            this.loading = false
        }
    },
    methods: {
     
            // 时间戳：1637244864707
            /* 时间戳转换为时间 */
            timestampToTime(timestamp) {
                timestamp = timestamp ? timestamp : null;
                let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
                let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                return Y + M + D + h + m + s;
            
        },

    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/root.css';

.directory {
    font-size: 12px;
    color: #333;
    font-family: "Arial", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    background-color: var(--directory);
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: var(--di-text);

    .tag {
        width: 100%;
        height: 100%;
        margin-bottom: 10px;

        color: var(--href-color);

        .van-tag {
            margin-right: 10px;
        }
    }
}
</style>