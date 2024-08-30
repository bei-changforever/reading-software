<template>
    <div class="bookshelf">
        <div class="book-shelf-header">
            <van-popover placement="right-start" v-model="showPopover" trigger="click" :actions="actions"
                @select="onSelect">
                <template #reference>
                    <p class="title">书架<van-icon name="arrow-down" /></p>
                </template>
            </van-popover>
            <ul>
                <li><van-icon name="edit" @click="delSomeBook" /></li>
                <li><van-icon name="clock-o" /></li>
                <li><van-icon name="wap-home-o" /></li>
            </ul>
        </div>
        <div class="bookshelf-container" v-if="booklist.length == 0">
            <div class="empty">
                <div class="img">
                    <img src="../assets/images/969ac18c5d47a9f1b5ff49645e34d0d.png" alt="">
                </div>
                <p>书架空空如也</p>
            </div>

        </div>
        <div class="bookshelf-container" v-else>
            <ul>
                <li v-for="item in booklist" :key="item.entry.id">
                    <div class="xsbook">

                        <div class="img" @click="bookHandler(item.entry)" v-if="item.entry.link[1]">
                            <img :src="item.entry.link[1].href" alt="">
                        </div>
                        <div class="desc">
                            <p class="title">
                                {{ item.entry.title }}
                            </p>
                        </div>
                    </div>
                </li>
                <li></li>
            </ul>
        </div>
        <van-popup v-model="editShow" position="right" :style="{ height: '100%', width: '100%' }">
            <div class="edit-box">
                <div class="edit-header">
                    <span @click="chooseAll">全选({{ isAll }})</span>
                    <span>批量管理</span>
                    <span>完成</span>
                </div>
                <div class="edit-container">
                    <ul>
                        <li v-for="item in booklist" :key="item.entry.id">
                            <div class="fk-box">
                                <div class="img" v-if="item.entry.link[1]">
                                    <img :src="item.entry.link[1].href" alt="">
                                </div>
                                <div class="desc">
                                    <p class="title"> {{ item.entry.title }}</p>
                                    <p class="summ" v-html="item.entry.summary"></p>
                                </div>
                                <div class="toggleCheck">
                                    <input type="checkbox" :checked="!item.isJoinBookShelf" :data-id="item.entry.id"
                                        @change="toggle($event)">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="edit-footer">
                    <van-button type="primary" @click="del">删除</van-button>
                    <van-button :hairline="false" type="default" @click="editShow = false">返回</van-button>
                    <van-button type="info">分组</van-button>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: 'BookShelf',
    data() {
        return {
            showPopover: false,
            // 通过 actions 属性来定义菜单选项
            actions: [{ text: '书架' }, { text: '本地书' }],
            booklist: '',
            checked: false,
            editShow: false
        };
    },
    computed: {
        isAll: {
            get() {
                this.booklist = JSON.parse(localStorage.getItem('bookshelfSomeId'))
                return this.booklist.reduce((pre, current) => {
                    return pre + (current.isJoinBookShelf ? 0 : 1)
                }, 0)
            },
            set(value) {
                console.log(value)
            }
        }
    },
    mounted() {
        this.booklist = JSON.parse(localStorage.getItem('bookshelfSomeId')) ? JSON.parse(localStorage.getItem('bookshelfSomeId')) : []
    },
    methods: {
        onSelect(action) {
            this.$toast(action.text);
        },
        bookHandler(item) {
            this.updateBookInfo({
                id: item.id,
                title: item.title
            })
            this.$router.push({
                path: '/booksub',
                query: {
                    book_id: item.id
                }
            })
        },
        chooseAll() {
            let joinBook = JSON.parse(localStorage.getItem('bookshelfSomeId'))
            joinBook.forEach(item => {
                item.isJoinBookShelf = !item.isJoinBookShelf
            })
            this.booklist = joinBook
            localStorage.setItem('bookshelfSomeId', JSON.stringify(this.booklist))
        },
        toggle(e) {
            let joinBook = JSON.parse(localStorage.getItem('bookshelfSomeId'))
            // let checked = e.target.checked
            // let bookid = e.target.dataset.id
            joinBook.forEach(item => {
                if (item.entry.id == e.target.dataset.id) {
                    console.log('相同了')
                    item.isJoinBookShelf = !item.isJoinBookShelf
                }
            })
            this.booklist = joinBook
            console.log(this.booklist)
            localStorage.setItem('bookshelfSomeId', JSON.stringify(this.booklist))
        },
        delSomeBook() {
            this.editShow = !this.editShow
        },
        del() {
            let joinBook = JSON.parse(localStorage.getItem('bookshelfSomeId'))
            this.booklist = joinBook.filter(item => {
                return item.isJoinBookShelf
            })
            localStorage.setItem('bookshelfSomeId', JSON.stringify(this.booklist))
        },
        ...mapMutations(['updateBookInfo', 'updatebookShelfList'])
    },
}
</script>

<style lang="scss" scoped>
.bookshelf {
    width: 100%;

    .book-shelf-header {
        padding: 10px;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            font-size: 20px;
        }

        ul {
            width: 100px;
            display: flex;
            justify-content: space-between;
            height: 40px;

            li {
                font-size: 25px;
                text-align: center;
                line-height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

    .bookshelf-container {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        display: flex;

        .empty {
            margin-top: 50px;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;


            p {
                font-size: 18px;
            }
        }

        ul {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            li {
                width: 32%;

                .xsbook {
                    width: 100%;

                    .img {
                        width: 100%;
                        height: 145px;

                        img {
                            width: 100%;
                            height: 100%;
                            display: block;
                        }
                    }

                    .desc {
                        width: 100%;
                        font-size: 16px;

                        .title {
                            padding: 5px 0;
                        }

                        .checkbox {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                }

            }


        }
    }

    .van-popup {
        width: 100%;

        .edit-box {
            width: 100%;
            height: 100%;

            .edit-header {
                display: flex;
                justify-content: space-between;
                background-color: white;

                span {
                    width: 100px;
                    display: block;
                    line-height: 50px;
                    text-align: center;
                    font-size: 18px;
                }
            }

            .edit-container {
                width: 100%;
                height: 550px;
                overflow: auto;

                ul {
                    width: 100%;


                    li {
                        width: 100%;
                        padding: 10px;
                        box-sizing: border-box;

                        .fk-box {
                            width: 100%;
                            display: flex;
                            justify-content: space-between;

                            .img {
                                width: 120px;
                                height: 170px;

                                img {
                                    width: 120px;
                                    height: 170px;
                                }
                            }

                            .desc {
                                width: 200px;

                                .title {
                                    font-size: 16px;
                                    font-weight: bold;
                                }

                                .summ {
                                    margin-top: 5px;
                                    font-size: 14px;
                                    line-height: 15px;
                                }
                            }

                            .toggleCheck {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }

                        }

                    }
                }
            }

            .edit-footer {
                position: fixed;
                bottom: 0;
                left: 0;
                z-index: 2;
                width: 100%;
                display: flex;
                justify-content: space-between;
                padding: 10px;
                box-sizing: border-box;
                background-color: white;

            }
        }
    }


}
</style>