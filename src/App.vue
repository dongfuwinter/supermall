<template>
  <div id="app">
        <router-view v-slot="{Component}">
          <transition name="router-fade" mode="out-in">
            <keep-alive exclude="Detail">
              <component :is="Component"/>
            </keep-alive>
          </transition>
        </router-view>
    <main-tab-bar/>
  </div>

</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
