<template>
<div class="cart-list">
  <scroll class="content" :observe-dom="true" :observe-image="true" :probe-type="3" :pull-up-load="true" ref="scroll">
    <cart-list-item v-for="(item, index) in cartList" :item-info="item" :key="index"/>
  </scroll>
</div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import CartListItem from "./CartListItem";

import {mapGetters} from 'vuex'
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>