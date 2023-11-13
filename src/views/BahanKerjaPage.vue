<template>
    <NavbarDashboard/>
    <SidebarMenu/>
    <div>
        <h2>Daftar Jabatan</h2>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Nama Jabatan</th>
                <th>Gaji</th>
                <!-- Tambah kolom sesuai kebutuhan -->
            </tr>
            </thead>
            <tbody>
            <!-- Gunakan v-for untuk menampilkan data jabatan -->
            <tr v-for="jabatan in daftarJabatan" :key="jabatan.id">
                <td>{{ jabatan.id }}</td>
                <td>{{ jabatan.nama }}</td>
                <td>{{ jabatan.gaji }}</td>
                <!-- Tambah sel sesuai kebutuhan -->
            </tr>
            </tbody>
        </table>
    
        <!-- Tombol "Add" di bagian bawah kiri tabel -->
        <button @click="tambahJabatan" class="add-button">Add</button>
    </div>
</template>

<script>
import NavbarDashboard from '@/components/NavbarDashboard.vue';
import SidebarMenu from '@/components/SidebarMenu.vue';

export default {
    components:{
		NavbarDashboard,
		SidebarMenu,
	},
    data() {
        return {
        daftarJabatan: [
            // Contoh data jabatan (sesuaikan dengan struktur data asli)
            { id: 1, nama: 'Manager', gaji: 8000000 },
            { id: 2, nama: 'Staff', gaji: 5000000 },
            // Tambah data jabatan sesuai kebutuhan
        ],
        };
    },
    methods: {
        tambahJabatan() {
        // Logika untuk menambah jabatan baru
        // Misalnya, tampilkan dialog tambah jabatan
        console.log('Menambah jabatan baru...');
        },
    },
};
</script>

<style scoped>
/* Gaya CSS khusus untuk komponen ini */
.add-button {
position: absolute;
bottom: 10px;
left: 10px;
padding: 10px;
}
</style>
  