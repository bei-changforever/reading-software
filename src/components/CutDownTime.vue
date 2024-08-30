<template>
    <div class="cutdown" v-if="hours || mins || seconds">
        <div class="clock">
            <van-icon name="underway-o" />
            <span>{{ hours }}</span> :
            <span>{{ mins }}</span> :
            <span>{{ seconds }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "CutDown",
    props: ['end'],
    data() {
        return {
            days: '0',
            hours: '00',
            mins: '00',
            seconds: '00',
            timer: null,
            curTime: '0'
        }
    },
    methods: {
        getTime() {
            this.timer && clearTimeout(this.timer)
            if (this.end < 0) {
                return
            }

            this.timer = setTimeout(() => {
                //时间戳就是1970年到现在的总毫秒数
                let currentTime = Date.now()
                //(futureTime-currentTime)剩余时间总的毫秒数
                let times = (this.end - currentTime) / 1000
                //times 剩余时间总的秒数
                let s = parseInt(times % 60)     //%60换算具体秒
                let m = parseInt(times / 60 % 60)    //%60换算具体分钟
                let h = parseInt(times / 60 / 60 % 24) //%24换算具体小时
                let d = parseInt(times / 60 / 60 / 24) //day不变

                this.seconds = s = s < 10 ? '0' + s : s
                this.mins = m = m < 10 ? '0' + m : m
                this.hours = h = h < 10 ? '0' + h : h
                
                this.getTime()
            }, 1000);


        }
    },
    mounted() {
        this.getTime(this.end)
    }

}
</script>

<style lang="scss" scoped>
.clock {
    width: 100px;
    height: 15px;
    background-color: rgb(241, 171, 102);
    border-radius: 15px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 15px;

    span {
        display: block;
        width: 20px;
        text-align: center;
        height: 15px;
        line-height: 15px;
        background-color: white;
        color: rgb(193, 151, 129);

        &:last-child {
            margin-right: 5px;
        }
    }
}
</style>