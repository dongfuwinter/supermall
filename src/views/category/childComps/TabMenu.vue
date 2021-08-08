<template>
  <scroll id="tab-menu" :observe-dom="true" :observe-image="true" :pull-up-load="true" :probe-type="3" ref="scroll">
    <div class="menu">
    <div v-for="(item,index) in childcategories"
         class="menu-item"
         :key="index"
         :class="{active:index === currentIndex}"
         @click="menuClick(index)">{{item.title}}</div>
    </div>
    </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "TabMenu",
  components: {
    Scroll
  },
  data(){
    return{
      currentIndex: 0
    }
  },
  props: {
    childcategories:{
      type: Array,
      default(){
        return[]
      }
    }
  },
  activated() {
    this.$refs.scroll.scroll.refresh()
  },
  methods: {
    menuClick(index){
      this.currentIndex = index
      this.$emit('selectItem', index)
    },
  }
}
</script>

<style scoped>
.menu{
}
#tab-menu{
  height: 100%;
  width: 100px;
  box-sizing: border-box;
  background-color: #ffffff;
  overflow: hidden;

}

.menu-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 17px;

}
.active{
  background-color: #ffff;
  color: #ff8198;
  font-weight: bold;
}
</style>
