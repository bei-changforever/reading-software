<template>
  <div class="guanggao" v-if="reflash">
    <img :src="src" alt="首屏广告">
    <span @click="blank">跳过{{ time }}</span>
  </div>
</template>
<script>
export default {
  name: 'Ad',
  props: {
    reflash: Boolean,
    src: String,
    time: Number
  },
  data() {
    return {
      timer: null
    }
  },
  mounted() {
    if (this.reflash) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = ''
    }
  },
  methods: {
    blank() {
      this.$emit('sonClick', false)
    }
  },
  watch: {
    reflash() {

      if (!this.reflash) {
        document.body.style.overflow = ''
        console.log('reflash==>', this.reflash)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.guanggao {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 888;
  touch-action: none;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    display: block;
    touch-action: none;
    overflow: hidden;
  }

  span {
    position: absolute;
    top: 10px;
    right: 5px;
    display: inline-block;
    margin-right: 2px;
    padding: 0 12px;
    height: 22px;
    line-height: 22px;
    font-size: 10px;
    color: #999;
    background-image: linear-gradient(3deg, #F9F9F9 0, #F0F0F0 100%);
    border-radius: 22px;
    z-index: 999;
  }
}
</style>