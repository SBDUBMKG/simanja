// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

// Import your Vue components here
import HomePage from '@/views/HomePage.vue';
import UserLoginPage from '@/views/login/UserLoginPage.vue';
import DashBoard from '@/views/DashBoard.vue';
import JabatanPage from '@/views/JabatanPage.vue';
import SatkerPage from '@/views/SatkerPage.vue';

// Master Menu Views
import IkhtisarJabatanPage from '@/views/master/ikhtisar_jabatan/IkhtisarJabatanPage.vue';
import IkhtisarJabatanDetailPage from '@/views//master/ikhtisar_jabatan/IkhtisarJabatanDetailPage.vue';
import AddIkhtisarJabatanPage from '@/views//master/ikhtisar_jabatan/AddIkhtisarJabatanPage.vue';
import EditIkhtisarJabatanPage from '@/views//master/ikhtisar_jabatan/EditIkhtisarJabatanPage.vue';

import TugasPokokPage from '@/views/master/tugas_pokok/TugasPokokPage.vue';
import TugasPokokDetailPage from '@/views//master/tugas_pokok/TugasPokokDetailPage.vue';
import AddTugasPokokPage from '@/views//master/tugas_pokok/AddTugasPokokPage.vue';
import EditTugasPokokPage from '@/views//master/tugas_pokok/EditTugasPokokPage.vue';

import PendidikanFormalPage from '@/views/master/pendidikan_formal/PendidikanFormalPage.vue';
import PendidikanFormalDetailPage from '@/views//master/pendidikan_formal/PendidikanFormalDetailPage.vue';
import AddPendidikanFormalPage from '@/views//master/pendidikan_formal/AddPendidikanFormalPage.vue';
import EditPendidikanFormalPage from '@/views//master/pendidikan_formal/EditPendidikanFormalPage.vue';

import DiklatPage from '@/views/master/diklat/DiklatPage.vue';
import DiklatDetailPage from '@/views//master/diklat/DiklatDetailPage.vue';
import AddDiklatPage from '@/views//master/diklat/AddDiklatPage.vue';
import EditDiklatPage from '@/views//master/diklat/EditDiklatPage.vue';

import PengalamanKerjaPage from '@/views/master/pengalaman_kerja/PengalamanKerjaPage.vue';
import PengalamanKerjaDetailPage from '@/views//master/pengalaman_kerja/PengalamanKerjaDetailPage.vue';
import AddPengalamanKerjaPage from '@/views//master/pengalaman_kerja/AddPengalamanKerjaPage.vue';
import EditPengalamanKerjaPage from '@/views//master/pengalaman_kerja/EditPengalamanKerjaPage.vue';

import BahanKerjaPage from '@/views/master/bahan_kerja/BahanKerjaPage.vue';
import BahanKerjaDetailPage from '@/views//master/bahan_kerja/BahanKerjaDetailPage.vue';
import AddBahanKerjaPage from '@/views//master/bahan_kerja/AddBahanKerjaPage.vue';
import EditBahanKerjaPage from '@/views//master/bahan_kerja/EditBahanKerjaPage.vue';

import PerangkatKerjaPage from '@/views/master/perangkat_kerja/PerangkatKerjaPage.vue';
import PerangkatKerjaDetailPage from '@/views//master/perangkat_kerja/PerangkatKerjaDetailPage.vue';
import AddPerangkatKerjaPage from '@/views//master/perangkat_kerja/AddPerangkatKerjaPage.vue';
import EditPerangkatKerjaPage from '@/views//master/perangkat_kerja/EditPerangkatKerjaPage.vue';

import TanggungJawabPage from '@/views/master/tanggung_jawab/TanggungJawabPage.vue';
import TanggungJawabDetailPage from '@/views//master/tanggung_jawab/TanggungJawabDetailPage.vue';
import AddTanggungJawabPage from '@/views//master/tanggung_jawab/AddTanggungJawabPage.vue';
import EditTanggungJawabPage from '@/views//master/tanggung_jawab/EditTanggungJawabPage.vue';

import WewenangPage from '@/views/master/wewenang/WewenangPage.vue';
import WewenangDetailPage from '@/views//master/wewenang/WewenangDetailPage.vue';
import AddWewenangPage from '@/views//master/wewenang/AddWewenangPage.vue';
import EditWewenangPage from '@/views//master/wewenang/EditWewenangPage.vue';

import KeterampilanKerjaPage from '@/views/master/keterampilan_kerja/KeterampilanKerjaPage.vue';
import KeterampilanKerjaDetailPage from '@/views//master/keterampilan_kerja/KeterampilanKerjaDetailPage.vue';
import AddKeterampilanKerjaPage from '@/views//master/keterampilan_kerja/AddKeterampilanKerjaPage.vue';
import EditKeterampilanKerjaPage from '@/views//master/keterampilan_kerja/EditKeterampilanKerjaPage.vue';

import BakatKerjaPage from '@/views/master/bakat_kerja/BakatKerjaPage.vue';
import AddBakatKerjaPage from '@/views//master/bakat_kerja/AddBakatKerjaPage.vue';
import EditBakatKerjaPage from '@/views//master/bakat_kerja/EditBakatKerjaPage.vue';

import TemperamenKerjaPage from '@/views/master/temperamen_kerja/TemperamenKerjaPage.vue';
import AddTemperamenKerjaPage from '@/views//master/temperamen_kerja/AddTemperamenKerjaPage.vue';
import EditTemperamenKerjaPage from '@/views//master/temperamen_kerja/EditTemperamenKerjaPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLoginPage,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashBoard,
  },

  // Master Menu Path
  {
    path: '/jabatan',
    name: 'Jabatan',
    component: JabatanPage,
  },
  {
    path: '/satker',
    name: 'Satker',
    component: SatkerPage,
  },

  // Master Ikhtisar Jabatan Path
  {
    path: '/ikhtisar-jabatan',
    name: 'IkhtisarJabatan',
    component: IkhtisarJabatanPage,
  },
  {
    path: '/ikhtisar-jabatan/detail/:fungsionalid',
    name: 'IkhtisarJabatanDetail',
    component: IkhtisarJabatanDetailPage,
  },
  {
    path: '/ikhtisar-jabatan/add/:fungsionalid',
    name: 'AddIkhtisarJabatan',
    component: AddIkhtisarJabatanPage,
  },
  {
    path: '/ikhtisar-jabatan/edit/:ikhtisarjabatanid',
    name: 'EditIkhtisarJabatan',
    component: EditIkhtisarJabatanPage,
  },

  // Master Tugas Path
  {
    path: '/tugas-pokok',
    name: 'TugasPokok',
    component: TugasPokokPage,
  },
  {
    path: '/tugas-pokok/detail/:fungsionalid',
    name: 'TugasPokokDetail',
    component: TugasPokokDetailPage,
  },
  {
    path: '/tugas-pokok/add/:fungsionalid',
    name: 'AddTugasPokok',
    component: AddTugasPokokPage,
  },
  {
    path: '/tugas-pokok/edit/:tugaspokokid',
    name: 'EditTugasPokok',
    component: EditTugasPokokPage,
  },

  // Master Pendidikan Formal Path
  {
    path: '/pendidikan-formal',
    name: 'PendidikanFormal',
    component: PendidikanFormalPage,
  },
  {
    path: '/pendidikan-formal/detail/:fungsionalid',
    name: 'PendidikanFormalDetail',
    component: PendidikanFormalDetailPage,
  },
  {
    path: '/pendidikan-formal/add/:fungsionalid',
    name: 'AddPendidikanFormal',
    component: AddPendidikanFormalPage,
  },
  {
    path: '/pendidikan-formal/edit/:pendidikanformalid',
    name: 'EditPendidikanFormal',
    component: EditPendidikanFormalPage,
  },

  // Master Diklat Path
  {
    path: '/diklat',
    name: 'Diklat',
    component: DiklatPage,
  },
  {
    path: '/diklat/detail/:fungsionalid',
    name: 'DiklatDetail',
    component: DiklatDetailPage,
  },
  {
    path: '/diklat/add/:fungsionalid',
    name: 'AddDiklat',
    component: AddDiklatPage,
  },
  {
    path: '/diklat/edit/:diklatid',
    name: 'EditDiklat',
    component: EditDiklatPage,
  },

  // Master Pengalaman Kerja Path
  {
    path: '/pengalaman-kerja',
    name: 'PengalamanKerja',
    component: PengalamanKerjaPage,
  },
  {
    path: '/pengalaman-kerja/detail/:fungsionalid',
    name: 'PengalamanKerjaDetail',
    component: PengalamanKerjaDetailPage,
  },
  {
    path: '/pengalaman-kerja/add/:fungsionalid',
    name: 'AddPengalamanKerja',
    component: AddPengalamanKerjaPage,
  },
  {
    path: '/pengalaman-kerja/edit/:pengalamankerjaid',
    name: 'EditPengalamanKerja',
    component: EditPengalamanKerjaPage,
  },

  // Master Bahan Kerja Path
  {
    path: '/bahan-kerja',
    name: 'BahanKerja',
    component: BahanKerjaPage,
  },
  {
    path: '/bahan-kerja/detail/:fungsionalid',
    name: 'BahanKerjaDetail',
    component: BahanKerjaDetailPage,
  },
  {
    path: '/bahan-kerja/add/:fungsionalid',
    name: 'AddBahanKerja',
    component: AddBahanKerjaPage,
  },
  {
    path: '/bahan-kerja/edit/:bahankerjaid',
    name: 'EditBahanKerja',
    component: EditBahanKerjaPage,
  },

  // Master Perangkat Kerja Path
  {
    path: '/perangkat-kerja',
    name: 'PerangkatKerja',
    component: PerangkatKerjaPage,
  },
  {
    path: '/perangkat-kerja/detail/:fungsionalid',
    name: 'PerangkatKerjaDetail',
    component: PerangkatKerjaDetailPage,
  },
  {
    path: '/perangkat-kerja/add/:fungsionalid',
    name: 'AddPerangkatKerja',
    component: AddPerangkatKerjaPage,
  },
  {
    path: '/perangkat-kerja/edit/:perangkatkerjaid',
    name: 'EditPerangkatKerja',
    component: EditPerangkatKerjaPage,
  },

  // Master Tanggung Jawab Path
  {
    path: '/tanggung-jawab',
    name: 'TanggungJawab',
    component: TanggungJawabPage,
  },
  {
    path: '/tanggung-jawab/detail/:fungsionalid',
    name: 'TanggungJawabDetail',
    component: TanggungJawabDetailPage,
  },
  {
    path: '/tanggung-jawab/add/:fungsionalid',
    name: 'AddTanggungJawab',
    component: AddTanggungJawabPage,
  },
  {
    path: '/tanggung-jawab/edit/:tanggungjawabid',
    name: 'EditTanggungJawab',
    component: EditTanggungJawabPage,
  },

  // Master Wewenang Path
  {
    path: '/wewenang',
    name: 'Wewenang',
    component: WewenangPage,
  },
  {
    path: '/wewenang/detail/:fungsionalid',
    name: 'WewenangDetail',
    component: WewenangDetailPage,
  },
  {
    path: '/wewenang/add/:fungsionalid',
    name: 'AddWewenang',
    component: AddWewenangPage,
  },
  {
    path: '/wewenang/edit/:wewenangid',
    name: 'EditWewenang',
    component: EditWewenangPage,
  },
  
  // Master Keterampilan Kerja Path
  {
    path: '/keterampilan-kerja',
    name: 'KeterampilanKerja',
    component: KeterampilanKerjaPage,
  },
  {
    path: '/keterampilan-kerja/detail/:fungsionalid',
    name: 'KeterampilanKerjaDetail',
    component: KeterampilanKerjaDetailPage,
  },
  {
    path: '/keterampilan-kerja/add/:fungsionalid',
    name: 'AddKeterampilanKerja',
    component: AddKeterampilanKerjaPage,
  },
  {
    path: '/keterampilan-kerja/edit/:keterampilankerjaid',
    name: 'EditKeterampilanKerja',
    component: EditKeterampilanKerjaPage,
  },

  // Master Bakat Kerja Path
  {
    path: '/bakat-kerja',
    name: 'BakatKerja',
    component: BakatKerjaPage,
  },
  {
    path: '/bakat-kerja/add',
    name: 'AddBakatKerja',
    component: AddBakatKerjaPage,
  },
  {
    path: '/bakat-kerja/edit/:bakatkerjaid',
    name: 'EditBakatKerja',
    component: EditBakatKerjaPage,
  },

  // Master Temperamen Kerja Path
  {
    path: '/temperamen-kerja',
    name: 'TemperamenKerja',
    component: TemperamenKerjaPage,
  },
  {
    path: '/temperamen-kerja/add',
    name: 'AddTemperamenKerja',
    component: AddTemperamenKerjaPage,
  },
  {
    path: '/temperamen-kerja/edit/:temperamenkerjaid',
    name: 'EditTemperamenKerja',
    component: EditTemperamenKerjaPage,
  },
  
  // Add more routes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
