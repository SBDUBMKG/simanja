<template>
  <div id="app">
    <button @click="toggleSidebar">Toggle Sidebar</button>
    <sidebar-menu :isSidebarOpen="isSidebarOpen" />
    <router-view />
  </div>
</template>

<script>
import SidebarMenu from "@/components/SidebarMenu.vue";

export default {
  components: {
    SidebarMenu
  },
  data() {
    return {
      isSidebarOpen: true
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
};
</script>

<style>
/* Styles for the main app container and button go here */
</style>
