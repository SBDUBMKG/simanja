<template>
  <div :class="['sidebar-menu', { 'sidebar-open': isSidebarOpen }]">
    <ul>
      <sidebar-menu-item
        v-for="item in menuItems"
        :key="item.id"
        :item="item"
      ></sidebar-menu-item>
    </ul>
  </div>
</template>

<script>
import SidebarMenuItem from "@/components/SidebarMenuItem.vue";

export default {
  components: {
    SidebarMenuItem
  },
  props: {
    isSidebarOpen: Boolean
  },
  data() {
    return {
      menuItems: [
        { id: 1, label: "Beranda", route: "/" },
        {
          id: 2,
          label: "Tentang Kami",
          route: "/about",
          children: [
            { id: 21, label: "Sejarah", route: "/about/history" },
            { id: 22, label: "Visi Misi", route: "/about/vision-mission" }
          ]
        },
        { id: 3, label: "Layanan", route: "/services" },
        { id: 4, label: "Kontak", route: "/contact" }
      ]
    };
  }
};
</script>

<style scoped>
/* Styles for the sidebar menu go here */
.sidebar-menu {
  height: 100vh;
  width: 250px;
  background-color: #777;
  color: #fff;
  padding: 10px;
  transition: transform 0.3s;
  transform: translateX(-100%);
}

.sidebar-menu.sidebar-open {
  transform: translateX(0);
}

.sidebar-menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  margin-bottom: 10px;
}

.sidebar-menu a {
  text-decoration: none;
  color: #fff;
}

.sidebar-menu a:hover {
  text-decoration: underline;
}
</style>
