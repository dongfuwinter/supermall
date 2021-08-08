<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabcontrol1" v-show="isTabFixed"/>
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore" :observe-dom="true" :observe-image="true">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <recommend-view :recommends="recommends"/>
        <feaure-view/>
        <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabcontrol2"/>
        <goods-list :goods="showGoods"/>
      </scroll>
    <back-top @click="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeaureView from "./childComps/FeatureView";

import {getHomeMultidata, getHomeGoods} from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeaureView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res)
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        console.log(res)
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    },
    // 事件监听相关的方法
    tabClick(index) {
      console.log(index)
      switch (index) {
        case 0:
          this.currentType = 'pop'
              break
        case 1:
          this.currentType = 'new'
              break
        case 2:
          this.currentType = 'sell'
              break
      }
      this.$refs.tabcontrol1.currentIndex = index
      this.$refs.tabcontrol2.currentIndex = index
    },
    backClick() {
      console.log('backClick');
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      console.log(position)
      // 1. 判断Backtop是否显示
      this.isShowBackTop = (-position.y) > 1000
      // 2.决定taboffsetyop是否吸顶(position: fixed)
       this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      console.log(this.$refs.tabcontrol2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop
    }
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
.home-nav {
  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  background-color: var(--color-tint);
  color: #fff;
  /*z-index: 1;*/
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 1;
}
/*.content {*/
/*  height: calc(100% - 93px);*/
/*  overflow: hidden;*/
/*  margin-top: 51px;*/
/*}*/
</style>
