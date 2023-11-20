<template>
	<aside :class="`${is_expanded ? 'is-expanded' : ''}`">

		<div class="menu-toggle-wrap">
			<button class="menu-toggle" @click="ToggleMenu">
				<span class="fa fa-bars"></span>
			</button>
		</div>

		<h3>Menu</h3>
		<div class="menu">
			<router-link to="/jabatan" class="button">
				<span class="text">Jabatan Fungsional</span>
			</router-link>
			<router-link to="/satker" class="button">
				<span class="text">Satker / UPT</span>
			</router-link>
			<router-link to="/ikhtisar-jabatan" class="button">
				<span class="text">Ikhtisar Jabatan</span>
			</router-link>
			<router-link to="/tugas-pokok" class="button">
				<span class="text">Tugas Pokok</span>
			</router-link>
			<router-link to="/pendidikan-formal" class="button">
				<span class="text">Pendidikan Formal</span>
			</router-link>
			<router-link to="/diklat" class="button">
				<span class="text">Pendidikan dan Latihan</span>
			</router-link>
			<router-link to="/pengalaman-kerja" class="button">
				<span class="text">Pengalaman Kerja</span>
			</router-link>
			<router-link to="/bahan-kerja" class="button">
				<span class="text">Bahan Kerja</span>
			</router-link>
			<router-link to="/perangkat-kerja" class="button">
				<span class="text">Perangkat Kerja</span>
			</router-link>
			<router-link to="/tanggung-jawab" class="button">
				<span class="text">Tanggung Jawab</span>
			</router-link>
			<router-link to="/wewenang" class="button">
				<span class="text">Wewenang</span>
			</router-link>
			<router-link to="/keterampilan-kerja" class="button">
				<span class="text">Keterampilan Kerja</span>
			</router-link>
			<router-link to="/bakat-kerja" class="button">
				<span class="text">Bakat Kerja</span>
			</router-link>
      
		</div>

		<div class="flex"></div>
		
		<div class="menu">
			<router-link to="/settings" class="button">
				<span class="text">Settings</span>
			</router-link>
		</div>
	</aside>
</template>

<script setup>
import { ref } from 'vue'

const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
	localStorage.setItem("is_expanded", is_expanded.value)
}
</script>

<style lang="scss" scoped>
aside {
	display: flex;
	flex-direction: column;

	background-color: var(--dark-alt);
	color: var(--light);

	width: calc(2rem + 32px);
	overflow: hidden;
	min-height: 100vh;
	padding: 1rem;

	transition: 0.2s ease-in-out;

	.flex {
		flex: 1 1 0%;
	}

	.menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;

		position: relative;
		top: 0;
		transition: 0.2s ease-in-out;

		.menu-toggle {
			transition: 0.2s ease-in-out;
			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-out;
			}
			
			&:hover {
				.material-icons {
					color: var(--primary);
					transform: translateX(0.5rem);
				}
			}
		}
	}

	h3, .button .text {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	h3 {
		color: var(--grey);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}

	.menu {
		margin: 0 -1rem;

		.button {
			display: flex;
			align-items: center;
			text-decoration: none;

			transition: 0.2s ease-in-out;
			padding: 0.5rem 1rem;

			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-in-out;
			}
			.text {
				color: var(--light);
				transition: 0.2s ease-in-out;
			}

			&:hover {
				background-color: var(--dark-alt);

				.material-icons, .text {
					color: var(--primary);
				}
			}

			&.router-link-exact-active {
				background-color: var(--dark-alt);
				border-right: 5px solid var(--primary);

				.material-icons, .text {
					color: var(--grey);
				}
			}
		}
	}

	.footer {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;

		p {
			font-size: 0.875rem;
			color: var(--grey);
		}
	}

	&.is-expanded {
		width: var(--sidebar-width);

		.menu-toggle-wrap {
			top: 0rem;
		}

		h3, .button .text {
			opacity: 1;
		}

		.button {
			.material-icons {
				margin-right: 1rem;
			}
		}

		.footer {
			opacity: 0;
		}
	}

	@media (max-width: 1024px) {
		position: absolute;
		z-index: 99;
	}
}
</style>

<!-- <template>
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
</style> -->
