// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

// Import your Vue components here
import HomePage from '@/views/portal/HomePage.vue';
import ArticlesListPage from '@/views/portal/ArticlesListPage.vue';
import ArticleDetailPage from '@/views/portal/ArticleDetailPage.vue';
import FaqListPage from '@/views/portal/FaqPage.vue';
import Redirect from '@/views/portal/RedirectPage.vue';
import UserLoginPage from '@/views/login/UserLoginPage.vue';
import DashBoard from '@/views/dashboard/DashBoard.vue';

// Manajemen Frontend Views
// Artikel
import ArticlePage from '@/views/manajemen_portal/artikel/ArticlePage.vue';
import AddArticlePage from '@/views/manajemen_portal/artikel/AddArticlePage.vue';
import EditArticlePage from '@/views/manajemen_portal/artikel/EditArticlePage.vue';

// Tautan
import LinkPage from '@/views/manajemen_portal/tautan/LinkPage.vue';
import AddLinkPage from '@/views/manajemen_portal/tautan/AddLinkPage.vue';
import EditLinkPage from '@/views/manajemen_portal/tautan/EditLinkPage.vue';

// FAQ
import FaqPage from '@/views/manajemen_portal/faq/FaqPage.vue';
import AddFaqPage from '@/views/manajemen_portal/faq/AddFaqPage.vue';
import EditFaqPage from '@/views/manajemen_portal/faq/EditFaqPage.vue';

// Master Menu Views
import JabatanPage from '@/views/master/jabatan/JabatanPage.vue';
import AddJabatanPage from '@/views/master/jabatan/AddJabatanPage.vue';
import EditJabatanPage from '@/views/master/jabatan/EditJabatanPage.vue';

import SatkerPage from '@/views/master/satker/SatkerPage.vue';
import AddSatkerPage from '@/views/master/satker/AddSatkerPage.vue';
import EditSatkerPage from '@/views/master/satker/EditSatkerPage.vue';

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
import AddDiklatPage from '@/views//master/diklat/AddDiklatPage.vue';
import EditDiklatPage from '@/views//master/diklat/EditDiklatPage.vue';

import PengalamanKerjaPage from '@/views/master/pengalaman_kerja/PengalamanKerjaPage.vue';
import AddPengalamanKerjaPage from '@/views//master/pengalaman_kerja/AddPengalamanKerjaPage.vue';
import EditPengalamanKerjaPage from '@/views//master/pengalaman_kerja/EditPengalamanKerjaPage.vue';

import BahanKerjaPage from '@/views/master/bahan_kerja/BahanKerjaPage.vue';
import AddBahanKerjaPage from '@/views//master/bahan_kerja/AddBahanKerjaPage.vue';
import EditBahanKerjaPage from '@/views//master/bahan_kerja/EditBahanKerjaPage.vue';

import PerangkatKerjaPage from '@/views/master/perangkat_kerja/PerangkatKerjaPage.vue';
import AddPerangkatKerjaPage from '@/views//master/perangkat_kerja/AddPerangkatKerjaPage.vue';
import EditPerangkatKerjaPage from '@/views//master/perangkat_kerja/EditPerangkatKerjaPage.vue';

import TanggungJawabPage from '@/views/master/tanggung_jawab/TanggungJawabPage.vue';
import AddTanggungJawabPage from '@/views//master/tanggung_jawab/AddTanggungJawabPage.vue';
import EditTanggungJawabPage from '@/views//master/tanggung_jawab/EditTanggungJawabPage.vue';

import WewenangPage from '@/views/master/wewenang/WewenangPage.vue';
import AddWewenangPage from '@/views//master/wewenang/AddWewenangPage.vue';
import EditWewenangPage from '@/views//master/wewenang/EditWewenangPage.vue';

import BakatKerjaPage from '@/views/master/bakat_kerja/BakatKerjaPage.vue';
import AddBakatKerjaPage from '@/views//master/bakat_kerja/AddBakatKerjaPage.vue';
import EditBakatKerjaPage from '@/views//master/bakat_kerja/EditBakatKerjaPage.vue';

import TemperamenKerjaPage from '@/views/master/temperamen_kerja/TemperamenKerjaPage.vue';
import AddTemperamenKerjaPage from '@/views//master/temperamen_kerja/AddTemperamenKerjaPage.vue';
import EditTemperamenKerjaPage from '@/views//master/temperamen_kerja/EditTemperamenKerjaPage.vue';

import MinatKerjaPage from '@/views/master/minat_kerja/MinatKerjaPage.vue';
import AddMinatKerjaPage from '@/views//master/minat_kerja/AddMinatKerjaPage.vue';
import EditMinatKerjaPage from '@/views//master/minat_kerja/EditMinatKerjaPage.vue';

import FungsiPekerjaanPage from '@/views/master/fungsi_pekerjaan/FungsiPekerjaanPage.vue';
import AddFungsiPekerjaanPage from '@/views//master/fungsi_pekerjaan/AddFungsiPekerjaanPage.vue';
import EditFungsiPekerjaanPage from '@/views//master/fungsi_pekerjaan/EditFungsiPekerjaanPage.vue';

// Analisis Jabatan Menu Views
import DataJabatanPage from '@/views/analisis_jabatan/data_jabatan/DataJabatanPage.vue';
import AddDataJabatanPage from '@/views/analisis_jabatan/data_jabatan/AddDataJabatanPage.vue';
import EditDataJabatanPage from '@/views/analisis_jabatan/data_jabatan/EditDataJabatanPage.vue';

import AnalisisJabatanPage from '@/views/analisis_jabatan/analisis_jabatan/AnalisisJabatanPage.vue';
import AnalisisBiodataPage from '@/views/analisis_jabatan/analisis_jabatan/AnalisisBiodataPage.vue';
import AnalisisTugasPage from '@/views/analisis_jabatan/analisis_jabatan/AnalisisTugasPage.vue';
import AnalisisTanggungJawabPage from '@/views/analisis_jabatan/analisis_jabatan/AnalisisTanggungJawabPage.vue';
import AnalisisSyaratJabatanPage from '@/views/analisis_jabatan/analisis_jabatan/AnalisisSyaratJabatanPage.vue';
import PreviewPage from '@/views/analisis_jabatan/analisis_jabatan/PreviewPage.vue';
import LogPage from '@/views/analisis_jabatan/analisis_jabatan/LogPage.vue';

// Verifikasi Menu Views
import VerifikasiJabatanPage from '@/views/verifikasi/VerifikasiJabatanPage.vue';
import VerifikasiBiodataPage from '@/views/verifikasi/VerifikasiBiodataPage.vue';
import VerifikasiTugasPage from '@/views/verifikasi/VerifikasiTugasPage.vue';
import VerifikasiTanggungJawabPage from '@/views/verifikasi/VerifikasiTanggungJawabPage.vue';
import VerifikasiSyaratJabatanPage from '@/views/verifikasi/VerifikasiSyaratJabatanPage.vue';

// Report Menu Views
import RekapitulasiJabatanPage from '@/views/report/RekapitulasiJabatanPage.vue';
import CetakLaporanPage from '@/views/report/CetakLaporanPage.vue';

// Manajemen backend Menu Views
import KelolaUserPage from '@/views/manajemen_backend/kelola_user/KelolaUserPage.vue';
import EditUserPage from '@/views/manajemen_backend/kelola_user/EditUserPage.vue';
import AddUserPage from '@/views/manajemen_backend/kelola_user/AddUserPage.vue';

// Profile Menu View
import ProfilePage from '@/views/profile/ProfilePage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/redirect-article/:articleid',
    name: 'RedirectArticle',
    component: Redirect,
  },
  {
    path: '/articles',
    name: 'ArticlesList',
    component: ArticlesListPage,
  },
  {
    path: '/articles/:articleid',
    name: 'ArticleDetail',
    component: ArticleDetailPage,
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FaqListPage,
  },

  // Login
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

  // Manajemen Frontend
  // Artikel
  {
    path: '/backend-artikel',
    name: 'Article',
    component: ArticlePage,
  },
  {
    path: '/backend-artikel/add',
    name: 'AddArticle',
    component: AddArticlePage,
  },
  {
    path: '/backend-artikel/edit/:articleid',
    name: 'EditArticle',
    component: EditArticlePage,
  },

  // Tautan
  {
    path: '/backend-tautan',
    name: 'Link',
    component: LinkPage,
  },
  {
    path: '/backend-tautan/add',
    name: 'AddLink',
    component: AddLinkPage,
  },
  {
    path: '/backend-tautan/edit/:linkid',
    name: 'EditLink',
    component: EditLinkPage,
  },

  // FAQ
  {
    path: '/backend-faq',
    name: 'Faq',
    component: FaqPage,
  },
  {
    path: '/backend-faq/add',
    name: 'AddFaq',
    component: AddFaqPage,
  },
  {
    path: '/backend-faq/edit/:faqid',
    name: 'EditFaq',
    component: EditFaqPage,
  },

  // Master Menu Path

  // Master Jabatan
  {
    path: '/jabatan',
    name: 'Jabatan',
    component: JabatanPage,
  },
  {
    path: '/jabatan/add',
    name: 'AddJabatan',
    component: AddJabatanPage,
  },
  {
    path: '/jabatan/edit/:fungsionalid',
    name: 'EditJabatan',
    component: EditJabatanPage,
  },

  // Master Satker
  {
    path: '/satker',
    name: 'Satker',
    component: SatkerPage,
  },
  {
    path: '/satker/add',
    name: 'AddSatker',
    component: AddSatkerPage,
  },
  {
    path: '/satker/edit/:satkerid',
    name: 'EditSatker',
    component: EditSatkerPage,
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
    path: '/diklat/add',
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
    path: '/pengalaman-kerja/add',
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
    path: '/bahan-kerja/add',
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
    path: '/perangkat-kerja/add',
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
    path: '/tanggung-jawab/add',
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
    path: '/wewenang/add',
    name: 'AddWewenang',
    component: AddWewenangPage,
  },
  {
    path: '/wewenang/edit/:wewenangid',
    name: 'EditWewenang',
    component: EditWewenangPage,
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

  // Master Minat Kerja Path
  {
    path: '/minat-kerja',
    name: 'MinatKerja',
    component: MinatKerjaPage,
  },
  {
    path: '/minat-kerja/add',
    name: 'AddMinatKerja',
    component: AddMinatKerjaPage,
  },
  {
    path: '/minat-kerja/edit/:minatkerjaid',
    name: 'EditMinatKerja',
    component: EditMinatKerjaPage,
  },

  // Master Fungsi Pekerjaan Path
  {
    path: '/fungsi-pekerjaan',
    name: 'FungsiPekerjaan',
    component: FungsiPekerjaanPage,
  },
  {
    path: '/fungsi-pekerjaan/add',
    name: 'AddFungsiPekerjaan',
    component: AddFungsiPekerjaanPage,
  },
  {
    path: '/fungsi-pekerjaan/edit/:fungsipekerjaanid',
    name: 'EditFungsiPekerjaan',
    component: EditFungsiPekerjaanPage,
  },
  
  // Analisis Jabatan Menu
  {
    path: '/data-jabatan',
    name: 'DataJabatan',
    component: DataJabatanPage,
  },
  {
    path: '/data-jabatan/add',
    name: 'AddDataJabatan',
    component: AddDataJabatanPage,
  },
  {
    path: '/data-jabatan/edit/:jabatanid',
    name: 'EditDataJabatan',
    component: EditDataJabatanPage,
  },
  {
    path: '/analisis-jabatan',
    name: 'AnalisisJabatan',
    component: AnalisisJabatanPage,
  },
  {
    path: '/analisis-jabatan/biodata/:jabatanid',
    name: 'AnalisisBiodata',
    component: AnalisisBiodataPage,
  },
  {
    path: '/analisis-jabatan/tugas/:jabatanid',
    name: 'AnalisisTugas',
    component: AnalisisTugasPage,
  },
  {
    path: '/analisis-jabatan/tanggung-jawab/:jabatanid',
    name: 'AnalisisTanggungJawab',
    component: AnalisisTanggungJawabPage,
  },
  {
    path: '/analisis-jabatan/syarat-jabatan/:jabatanid',
    name: 'AnalisisSyaratJabatan',
    component: AnalisisSyaratJabatanPage,
  },
  {
    path: '/analisis-jabatan/preview/:jabatanid',
    name: 'PreviewAnalisis',
    component: PreviewPage,
  },
  {
    path: '/analisis-jabatan/log/:jabatanid',
    name: 'LogAnalisis',
    component: LogPage,
  },

  // Verifikasi Menu
  {
    path: '/verifikasi',
    name: 'VerifikasiJabatan',
    component: VerifikasiJabatanPage,
  },
  {
    path: '/verifikasi/biodata/:jabatanid',
    name: 'VerifikasiBiodata',
    component: VerifikasiBiodataPage,
  },
  {
    path: '/verifikasi/tugas/:jabatanid',
    name: 'VerifikasiTugas',
    component: VerifikasiTugasPage,
  },
  {
    path: '/verifikasi/tanggung-jawab/:jabatanid',
    name: 'VerifikasiTanggungJawab',
    component: VerifikasiTanggungJawabPage,
  },
  {
    path: '/verifikasi/syarat-jabatan/:jabatanid',
    name: 'VerifikasiSyaratJabatan',
    component: VerifikasiSyaratJabatanPage,
  },

  // Report Menu
  {
    path: '/rekapitulasi-jabatan',
    name: 'RekapitulasiJabatan',
    component: RekapitulasiJabatanPage,
  },
  {
    path: '/cetak-laporan',
    name: 'CetakLaporan',
    component: CetakLaporanPage,
  },

  // Manajemen Backend Menu
  {
    path: '/kelola-user',
    name: 'KelolaUser',
    component: KelolaUserPage,
  },
  {
    path: '/kelola-user/edit/:userid',
    name: 'EditUser',
    component: EditUserPage,
  },
  {
    path: '/kelola-user/add',
    name: 'AddUser',
    component: AddUserPage,
  },

  // Profile Menu
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
