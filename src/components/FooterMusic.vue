<template>
    <div class="footer-music" v-if="pl && AudioBookInfo">
        <audio ref="audio" v-if="pl[playListIndex].downloadUrl" controls preload :src="pl[playListIndex].downloadUrl"
            @canplay="renderTotalTime" @timeupdate="renderCurrentTime"></audio>
        <div :class="['disc', $store.state.isBtnShow ? 'stop' : '']">
            <img class="sss-img" :src="AudioBookInfo.imgSrc" alt="" @click="toggleShow">
        </div>
        <van-popup lazy-render v-model="$store.state.toggleAudioShow" position="right"
            :style="{ height: '100%', width: '100%' }">
            <Bookaudio :play="play" :book-info="$store.state.tinbookInfo" :ting-list="$store.state.tinglist"></Bookaudio>
        </van-popup>
    </div>
</template>

<script>
import Bookaudio from '@/components/Bookaudio.vue';
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'FooterMusic',
    data() {
        return {
            pl: '',
        }
    },
    components: {
        Bookaudio
    },
    computed: {
        ...mapState(['AudioBookInfo', 'playList', 'playListIndex', 'tinbookInfo', 'tinglist', 'toggleAudioShow', 'currentTime', 'TotalTime', 'isBtnShow'])
    },
    methods: {
        toggleShow() {
            this.updateToggleAudioShow(true)
        },
        play() {
            if (this.$refs.audio.paused) {
                this.$refs.audio.play()
                this.updateisBtnShow(false)
            }
            else {
                this.$refs.audio.pause()
                this.updateisBtnShow(true)
            }
        },
        renderTotalTime() {
            this.updateTotalTime(this.$refs.audio.duration)
        },
        renderCurrentTime() {
            if (!this.$store.state.isDrag) {
                this.updateCurrentTime(this.$refs.audio.currentTime)
            }
        },
        ...mapMutations(['updateToggleAudioShow', 'updateSetAudio', 'updateisBtnShow', 'updateCurrentTime', 'updateTotalTime', 'updateIndex']),
    },
    created() {
        this.$nextTick(() => {
            this.updateSetAudio(this.$refs.audio)
        })
    },
    watch: {
        playList: {
            deep: true,
            handler(newVal) {
                this.pl = newVal
                this.$nextTick(() => {
                    this.updateSetAudio(this.$refs.audio)
                })
            }
        },
        "$store.state.tinbookInfo"(newVal) {
            if (newVal) {
                if (this.$refs.audio) {
                    this.$refs.audio.pause()
                    this.$refs.audio.currentTime = 0
                    this.updateisBtnShow(true)
                }

            }

        },
        "$store.state.playListIndex"() {
            this.$refs.audio.autoplay = true;
            if (this.$refs.audio.paused) {
                this.updateisBtnShow(false)
            }
        },
        "$store.state.currentTime"(newVal) {
            // console.log(newVal)
            // console.log(this.TotalTime)
            if (newVal >= this.$store.state.TotalTime) {
                if (this.playListIndex == this.playList.length - 1) {
                    this.updateIndex(0)
                    this.play()
                }
                else {
                    this.updateIndex(this.playListIndex + 1)
                    this.play()
                }
            }
        }
    }
}
</script>

<style lang="scss" >
.footer-music {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    z-index: 99;
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

    .disc {
        width: 60px;
        height: 60px;
        animation: run 15s infinite linear ;
        // animation-play-state: paused;

        &.stop {
            animation-play-state: paused;
        }
    }

    .sss-img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
    }

}



audio {
    display: none;
}

@keyframes run {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>