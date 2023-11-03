<template>
  <li>
    <div class="menu-item">
      <button @click="toggleSubmenu">
        {{ item.label }}
        <i v-if="isSubmenuOpen" class="fa fa-caret-up"></i>
        <i v-else class="fa fa-caret-down"></i>
      </button>
    </div>
    <ul v-if="isSubmenuOpen" class="submenu">
      <sidebar-menu-item
        v-for="childItem in item.children"
        :key="childItem.id"
        :item="childItem"
      ></sidebar-menu-item>
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {
      isSubmenuOpen: false
    };
  },
  methods: {
    toggleSubmenu() {
      this.isSubmenuOpen = !this.isSubmenuOpen;
    }
  }
};
</script>

<style scoped>
/* Styles for sidebar menu items go here */
.menu-item {
  display: flex;
  align-items: center;
}

.menu-item button {
  background: none;
  border: none;
  cursor: pointer;
}

.submenu {
  display: none;
}

.submenu a {
  color: #fff;
  text-decoration: none;
  padding: 5px 10px;
  display: block;
}

.submenu a:hover {
  background-color: #000;
}
</style>
