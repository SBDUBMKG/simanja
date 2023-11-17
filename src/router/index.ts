// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

// Import your Vue components here
import HomePage from '@/views/HomePage.vue'; // Adjust the path accordingly
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
import PendidikanLatihanPage from '@/views/PendidikanLatihanPage.vue';
import BahanKerjaPage from '@/views/BahanKerjaPage.vue';
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
  {
    path: '/pendidikanlatihan',
    name: 'PendidikanLatihan',
    component: PendidikanLatihanPage,
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
