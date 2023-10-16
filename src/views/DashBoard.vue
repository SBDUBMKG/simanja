<template>
    <div class="dashboard">
        <!-- Toggle menu button -->
        <button @click="toggleMenu">Toggle Menu</button>
    
        <!-- Collapsible menu (conditional) -->
        <transition name="menu-fade" mode="out-in">
            <div class="menu" v-if="showMenu">
            <!-- Menu items go here -->
            </div>
        </transition>
    
        <!-- Main content area -->
        <div class="content">
            <!-- Content goes here -->
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: true,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: row;
}

.menu {
  width: 250px;
  background-color: #333;
  color: #fff;
  transition: width 0.3s ease-in-out;
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.5s;
}

.menu-fade-enter, .menu-fade-leave-to /* .menu-fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.content {
  flex-grow: 1;
  padding: 20px;
}

/* Add more styling as needed */
</style>
