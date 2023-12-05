<template>	
	<sidebar-menu 
		@update:collapsed="onToggleCollapse"
		:menu="menu" 
		:theme="theme"
		:showOneChild="showOneChild"
		:width="width"
		class="shadow">
		<template #header>
            <img
                v-if="!sidebarCollapsed"
                src="@/assets/logo-simanja.svg"
                class="d-block org-logo"
            >
            <img
                v-if="sidebarCollapsed"
                src="@/assets/logo-BMKG.png"
                class="d-block org-logo-collapsed"
            >
        </template>
	</sidebar-menu>
</template>


<script>
import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
export default {
	components: {
		SidebarMenu
	},
	data() {
		return {
			theme: 'white-theme',
			relative: true,
			sidebarCollapsed: false,
			showOneChild: true,
			width: '260px',
			menu: [
				{
					href: '/dashboard',
					title: 'Dashboard',
					icon: 'fa fa-bar-chart'
				},
				{
					title: 'Data Master',
					icon: 'fa fa-book',
					child: [
						{
							href: '/jabatan',
							title: 'Jabatan'
						},
						{
							href: '/satker',
							title: 'Satker / UPT'
						},
						{
							href: '/ikhtisar-jabatan',
							title: 'Ikhtisar Jabatan'
						},
						{
							href: '/tugas-pokok',
							title: 'Tugas Pokok'
						},
						{
							href: '/pendidikan-formal',
							title: 'Pendidikan Formal'
						},
						{
							href: '/diklat',
							title: 'Pendidikan dan Pelatihan'
						},
						{
							href: '/pengalaman-kerja',
							title: 'Pengalaman Kerja'
						},
						{
							href: '/bahan-kerja',
							title: 'Bahan kerja'
						},
						{
							href: '/perangkat-kerja',
							title: 'Perangkat Kerja'
						},
						{
							href: '/tanggung-jawab',
							title: 'Tanggung Jawab'
						},
						{
							href: '/wewenang',
							title: 'Wewenang'
						},
						{
							href: '/bakat-kerja',
							title: 'Bakat Kerja'
						},
						{
							href: '/temperamen-kerja',
							title: 'Temperamen Kerja'
						},
						{
							href: '/minat-kerja',
							title: 'Minat Kerja'
						},
						{
							href: '/fungsi-pekerjaan',
							title: 'Fungsi Pekerjaan'
						},
					]
				},
				{
					title: 'Analisis Jabatan',
					icon: 'fa fa-pencil-square-o',
					child: [
						{
							href: '/data-jabatan',
							title: 'Data Jabatan'
						},
						{
							href: '/analisis-jabatan',
							title: 'Analisis Jabatan'
						},
					]
				}
			]
		}
    },
	methods: {
		onToggleCollapse(collapsed) {
			this.sidebarCollapsed = collapsed
		}
	}
}
</script>

<style>
.v-sidebar-menu {
	position: sticky;
	height: 100vh;
}

.vsm--link.vsm--link_level-1, .vsm--link.vsm--link_level-2 {
	padding: 7px 10px;
}

.vsm--icon.fa {
	margin: 0 10px 0 0;
}

.v-sidebar-menu.vsm_white-theme .vsm--dropdown {
	background-color: rgb(239, 239, 239);
}

.v-sidebar-menu .vsm--scroll {
	padding-top: 20px;
}

.org-logo {
	width: 100%;
	padding: 30px 20px;
	background-color: rgb(239, 239, 239);
}

.org-logo-collapsed {
	width: 100%;
	padding: 20px;
}
</style>