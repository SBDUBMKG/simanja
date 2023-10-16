<template>
  <div id="app">
    <HomePage/>
    <UserLoginPage/>
    <DashBoard/>
  </div>
</template>

<script>
import HomePage from './views/HomePage.vue';
import UserLoginPage from './views/UserLoginPage.vue';
import DashBoard from './views/DashBoard.vue';

export default {
  components: {
    HomePage,
    UserLoginPage,
    DashBoard,
  },
};
</script>

<style>
  /*style*/
</style>
