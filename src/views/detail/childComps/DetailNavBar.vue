<template>
  <nav-bar>
    <template #left>
      <div class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
    </template>
    <template #center>
      <div class="title">
        <div v-for="(item, index) in titles" :key="item" class="title-item" :class="{active: currentIndex === index}" @click="titleClick(index)">{{item}}</div>
      </div>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin: 12px 0 0 12px;
  width: 18px;
  height: 18px;
}
</style>