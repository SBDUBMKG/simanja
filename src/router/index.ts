// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

// Import your Vue components here
import HomePage from '@/views/HomePage.vue';
import UserLoginPage from '@/views/login/UserLoginPage.vue';
import DashBoard from '@/views/DashBoard.vue';
import JabatanPage from '@/views/JabatanPage.vue';
import SatkerPage from '@/views/SatkerPage.vue';

// Master Menu Views
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

import BahanKerjaPage from '@/views/master/bahan_kerja/BahanKerjaPage.vue';
import BahanKerjaDetailPage from '@/views//master/bahan_kerja/BahanKerjaDetailPage.vue';
import AddBahanKerjaPage from '@/views//master/bahan_kerja/AddBahanKerjaPage.vue';
import EditBahanKerjaPage from '@/views//master/bahan_kerja/EditBahanKerjaPage.vue';

import PerangkatKerjaPage from '@/views/PerangkatKerjaPage.vue';
import TanggungJawabPage from '@/views/TanggungJawabPage.vue';
import WewenangPage from '@/views/WewenangPage.vue';


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

  // Master Tugas Path
  {
    path: '/tugaspokok',
    name: 'TugasPokok',
    component: TugasPokokPage,
  },
  {
    path: '/tugaspokok/detail/:fungsionalid',
    name: 'TugasPokokDetail',
    component: TugasPokokDetailPage,
  },
  {
    path: '/tugaspokok/add/:fungsionalid',
    name: 'AddTugasPokok',
    component: AddTugasPokokPage,
  },
  {
    path: '/tugaspokok/edit/:tugaspokokid',
    name: 'EditTugasPokok',
    component: EditTugasPokokPage,
  },

  // Master Pendidikan Formal Path
  {
    path: '/pendidikanformal',
    name: 'PendidikanFormal',
    component: PendidikanFormalPage,
  },
  {
    path: '/pendidikanformal/detail/:fungsionalid',
    name: 'PendidikanFormalDetail',
    component: PendidikanFormalDetailPage,
  },
  {
    path: '/pendidikanformal/add/:fungsionalid',
    name: 'AddPendidikanFormal',
    component: AddPendidikanFormalPage,
  },
  {
    path: '/pendidikanformal/edit/:pendidikanformalid',
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

  {
    path: '/bahankerja',
    name: 'BahanKerja',
    component: BahanKerjaPage,
  },
  {
    path: '/perangkatkerja',
    name: 'PerangkatKerja',
    component: PerangkatKerjaPage,
  },
  {
    path: '/tanggungjawab',
    name: 'TanggungJawab',
    component: TanggungJawabPage,
  },
  {
    path: '/wewenang',
    name: 'Wewenang',
    component: WewenangPage,
  },
  
  
  // Add more routes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
