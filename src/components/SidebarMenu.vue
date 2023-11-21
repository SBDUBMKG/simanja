<template>	
	<sidebar-menu 
		@update:collapsed="onToggleCollapse"
		:menu="menu" 
		:theme="theme" 
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
			menu: [
				{
					href: '/dashboard',
					title: 'Dashboard',
					icon: 'fa fa-bar-chart'
				},
				{
					title: 'Master',
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
							href: '/keterampilan-kerja',
							title: 'Keterampilan Kerja'
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

<style scoped>
.v-sidebar-menu {
	position: sticky;
	height: 100vh;
}

.org-logo {
	width: 100%;
	padding: 40px;
	margin-bottom: 20px;
}

.org-logo-collapsed {
	width: 100%;
	padding: 20px;
	margin-bottom: 20px;
}
</style>