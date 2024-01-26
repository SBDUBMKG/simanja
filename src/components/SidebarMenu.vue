<template>	
	<sidebar-menu 
		@update:collapsed="onToggleCollapse"
		:menu="menu"
		:showOneChild="showOneChild"
		:width="width">
		<template #header>
            <img
                v-if="!sidebarCollapsed"
                src="@/assets/logo-simanja-white.svg"
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
							title: 'Unit Kerja'
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
				},
				{
					href: '/verifikasi',
					title: 'Verifikasi',
					icon: 'fa fa-check-square-o'
				},
				{
					title: 'Report',
					icon: 'fa fa-file-text',
					child: [
						{
							href: '/rekapitulasi-jabatan',
							title: 'Rekapitulasi Jabatan'
						},
						{
							href: '/cetak-laporan',
							title: 'Cetak Laporan'
						}
					]
				},
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

.v-sidebar-menu .vsm--scroll {
	padding-top: 0px;
}

.org-logo {
	width: 90%;
	padding: 30px 30px;
	margin-left: auto;
	margin-right: auto;
}

.org-logo-collapsed {
	width: 100%;
	padding: 20px;
}
</style>