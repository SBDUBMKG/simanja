<template>
    <div>
        <div class="container-faqs">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <h2 class="title-content">Kelola FAQ</h2>
                    <div class="d-flex justify-content-between subtitle-content">
                        <h6 id="subtitle-content">List FAQ</h6>
                        <button @click="addFaq" class="btn btn-success btn-sm">Tambah FAQ</button>
                    </div>
                    <div v-if="faqsLoaded">
                        <DataTable class="table table-sm table-hover table-responsive-xl display">
                            <thead>
                                <tr class="table-head">
                                    <th width="3%" class="column-title">No.</th>
                                    <th class="column-title">Pertanyaan</th>
                                    <th class="column-title">Jawaban</th>
                                    <th width="10%" class="column-title">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(faq, index) in faqs" :key="faq.id_faq">
                                    <td>{{ index+1 }}</td>
                                    <td>{{ faq.faq_title }}</td>
                                    <td>{{ faq.faq_desc }}</td>
                                    <td>
                                        <div class="d-flex justify-content-around">
                                            <button @click="editBtn(faq.id_faq)" class="btn btn-info btn-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                            </button>
                                            <button @click="deleteBtn(faq.id_faq)" class="btn btn-danger btn-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import NavbarDashboard from '@/components/NavbarDashboard.vue';
import SidebarMenu from '@/components/SidebarMenu.vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';

DataTable.use(DataTablesCore)

export default {
    components: {
        NavbarDashboard,
        SidebarMenu,
        DataTable
    },
    data() {
        return {
            faqs: [],
            faqsLoaded: false
        };
    },
    mounted () {
        this.checkAuthentication()
        this.loadFaqs()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadFaqs () {
            try {
                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/faq`);

                this.faqs = response.data.data.faq
                this.faqsLoaded = true
            } catch (error) {
                if (error.response.status === 401) {
                    this.$router.push({ name: 'Home' })
                } else {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.message
                    })
                }
            }
        },

        addFaq () {
            this.$router.push({ name: 'AddFaq' })
        },

        editBtn (id_faq) {
            this.$router.push({ name: 'EditFaq', params: { faqid: id_faq } })    
        },

        deleteBtn (id_faq) {
            try {
                this.$swal.fire({
                    icon: 'warning',
                    title: 'Peringatan!!',
                    text: 'Yakin ingin menghapus FAQ?',
                    showCancelButton: true,
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const token = localStorage.getItem('token')
                        const config = {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        }
        
                        await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/faq/${id_faq}`, config)
                        this.faqs = null
                        this.faqsLoaded = false,
                        this.loadFaqs()
                    }
                })

            } catch (error) {
                if (error.status === 401) {
                    this.$router.push({ name: 'Home' })
                } else {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.message
                    })
                }
            }
        }
    },
};
</script>

<style scoped>
.container-faqs {
    display: flex;
}

#subtitle-content {
    position: relative;
    top: 10px;
}

.query-container {
    margin-bottom: 20px;
}

.data-table {
    padding: 10px;
    background-color: rgb(244, 244, 244);
    border-radius: 10px;
}
</style>
  