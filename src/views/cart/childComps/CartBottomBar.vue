<template>
<div class="bottom-bar">
  <div class="check-content">
    <check-button class="check-button" :is-active="isSelectAll" @click="checkClick"/>
    <span>全款</span>
  </div>
  <div class="price">合计: {{totalPrice}}</div>
  <div class="calculate" @click="calcClick">去计算: [{{checkLength}}]</div>
</div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import {mapGetters} from 'vuex'
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => item.active).reduce((preValue, item) => preValue + item.lowNowPrice * item.count, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.active).length
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false
      return this.cartList.find(item => !item.active) === undefined
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) { // 全部选中
        this.cartList.forEach(item => item.active = false)
      } else {  // 部分或全部不选中
        this.cartList.forEach(item => item.active = true)
      }
      // this.cartList.forEach(item => item.active = !this.isSelectAll)
    },
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  font-size: 14px;

}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  text-align: center;
  background-color: red;
  color: #fff;
}
</style>