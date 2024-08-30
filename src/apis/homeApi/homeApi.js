import service from "../index";
export function getnovice(sex) {
    return service({
        method: 'GET',
        url: `store/navi.json?gender=${sex}`,
    })
}

export function getAd() {
    return service({
        method: 'GET',
        url: 'madr.json'
    })
}

// /store/show.json?type=female_recommend&uuid=b229b022871941fea
// /store/show.json?type=recommend&uuid=f2cb32ff209f4010911a77a617add8c4
export function getHomeRecommend(url) {
    return service({
        method: 'GET',
        url: url
    })
}

export function getHomeBoys() { 
    return service({
        method:'GET',
        url:'/store/show.json?type=male&uuid=ca03da7b64ca443ab25ec3b662fa91e2'
    })
 }

export function getHomeGirls() {
    return service({
        method: 'GET',
        url: '/store/show.json?type=femail&uuid=017de2274aa5400e9dabe30f173e98d9'
    })
}

export function getAudioBook() { 
    return service({
        method:'GET',
        url:'/store/show.json?type=audio&uuid=b67282bb443845fabe5b543795a27618'
    })
 }

 export function getPublushHome() {
    return service({
        method:'GET',
        url:'/store/show.json?type=publish&uuid=b5648dd3c4f24d9796f590cd81ca076e'
    })
 }

export function getMoreRank(options) {
    return service({
        method: 'GET',
        url: `/rank/original/list/data.json?gender=${options.gender}&sortType=${options.sortType}&type=${options.type}&page=${options.page}&nextPageLink`,
    })
}

export const getStro = options => `/column/1002/data.json?page=${options.page}&nextPageLink`

export const getCity = () => '/column/3001/data.json?page=1&nextPageLink'

export const getAct = options => `/column/2002/data.json?page=${options.page}&nextPageLink`

export const getBoys = () => `/rank/original/list/data.json?gender=male&sortType=day&type=sell`

export const getGirls  = () => `/rank/original/list/data.json?gender=female&sortType=day&type=sell`

export const getPublish = () => `/rank/publish/list/data.json?sortType=day&type=sell`

export function getSub(options)  {
    return service({
        method:'GET',
        url:`/book/getsub.json?id=${options.id}&title=${options.title}&page=2&nextPageLink`,
       
    })
}

export function getNewDirectory(id) {
    return service({
        method:'GET',
        url:`/book/simpleInfo.json?id=${id}`
    })
}

export function getBookComments(id) { 
    return service({
        method:"GET",
        url:`/comment/getComments.json?bookId=${id}`
    })
 }

 export function getFree() {
    return service({
        method:'GET',
        url:'/store/show.json?type=free&uuid=ea81f0be96a74d4fa7c674b9252a9ef4'
    })
 }

 export function getBookRead(sid) {
    return service({
        method:'GET',
        url:`reader/book/info.json?source_uuid=${sid}`
    })
   }

 export function getBookContentJson(options){
    return service({
        method:'GET',
        url:`/reader/book/content.json?source_uuid=${options.sourceId}&content_uuid=${options.contentId}`
    })
 }

 export function getHotSearch() {
    return service({
        method:'GET',
        url:'search/getHotWords'
    })
 }
 
 export function getSuggest(kw) {
    return service({
        method:'GET',
        url:`search/searchHint?search=${kw}`
    })
   }

   export function getBookSearchRes(kw) {
    return service({
        method:'GET',
        url:`search/book.json?keyword=${kw}`
    })
   }

   export function getCate(){
    return service({
        method:'GET',
        url: 'mergedCategroy.json'
    })
   }

   export function getCat() {
    return service ({
        method:'GET',
        url: 'source/v2/cat.json'
    })
   }

   export function getCateBookDetail(options) {
    console.log(options)
    return service({
        method:'GET',
        url:`/source/v2/searchBook.json?catId=${options.catId}&wordCount=${options.wordCount}&pay=${options.pay}&bookStatus=${options.bookStatus}&sort=${options.sort}`
    })
   }

   export function getBookSourceJson(options) {
    return service({
        method:'GET',
        url:`ting/source.json?sourceUuid=${options.id}`
    })
   }

   export function getBookTingList(id) {
    return service({
        method:'GET',
        url:`ting/catalog.json?sourceUuid=${id}`
    })
   }

   export function getTingDownload() {
    return service({
        method:'GET',
        url:'ting/download.json'
    })
   }

//  book/info.json?sourceUuid=13c58cc086f74e36978b4a7881b82517_4

export function getBookShelf(id) {
  return service({
    method:'GET',
    url: `book/info.json?sourceUuid=${id}`
  })
}

export function getMergedRank() {
    return service({
        method:"GET",
        url:'store/merged/rankNavi.json'
    })
}