<template>
    <div class="bookuserselect">
        <ul class="bookuserselect-ul">
            <li v-if="!chooseLike" class="bookuserselect-li" @click="joinBookShelf">加入书架</li>
            <li v-else class="bookuserselect-li active" @click="joinBookShelf">已在书架</li>
            <li class="bookuserselect-li">购买</li>
            <li class="bookuserselect-li activebg" @click="gotoRead">免费试读</li>
        </ul>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'BookUserSelect',
    props: {
        bookObj: {}
    },
    data() {
        return {
            isjoin: false
        }
    },
    methods: {
        ...mapMutations(['updatebookShelfList']),
        gotoRead() {
            this.$router.push({
                path: '/bookcontent',
                query: {
                    sourceId: this.bookinfo.id,
                }
            })
        },
        joinBookShelf() {
            let localBookShel = JSON.parse(localStorage.getItem('bookshelfSomeId'))
            if (this.isLogin) {
                if (!this.isjoin) {

                    let res = localBookShel.some(item => {

                        return item.id == this.bookObj.id
                    })


                    if (res) {
                        return
                    } else {
                        // this.bookObj = {
                        //     ...this.bookObj,
                        //     isJoinBookShelf: true
                        // }
                        this.bookObj.isJoinBookShelf = true
                        localBookShel.unshift(this.bookObj)
                        localStorage.setItem('bookshelfSomeId', JSON.stringify(localBookShel))
                    }

                    this.isjoin = true
                }
                else {
                    this.isjoin = false
                    localBookShel = localBookShel.filter(item => {
                        return item.id !== this.bookObj.id
                    })
                    localStorage.setItem('bookshelfSomeId', JSON.stringify(localBookShel))
                }

            }
            else {
                this.$toast({
                    message: '请先登录'
                })
            }


        }
    },
    computed: {
        chooseLike() {
            let join = JSON.parse(localStorage.getItem('bookshelfSomeId'))
            let res = join.some(val => {
                return val.id === this.bookObj.id
            })

            if (res) {
                this.isjoin = true
            }
            else {
                this.isjoin = false
            }

            return this.isjoin
        },
        ...mapState(['bookinfo', 'readConfig', 'bookShelfList', 'isLogin'])
    },
}
</script>

<style lang="scss" scoped>
.bookuserselect {
    width: 100%;
    height: 8vh;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;

    .bookuserselect-ul {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        background-color: white;

        .bookuserselect-li {
            width: 33%;
            height: 100%;
            font-size: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            &:nth-child(1)::after {
                content: '';
                width: 2px;
                height: 25px;
                background-color: var(--join-color);
                position: absolute;
                right: -1px;
            }

            &.activebg {
                background-color: var(--free-read);
                color: white;
            }

            &.active {
                text-decoration: line-through;
                color: rgb(235, 232, 230);
            }
        }
    }
}
</style>