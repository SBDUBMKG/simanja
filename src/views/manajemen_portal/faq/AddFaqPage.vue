<template>
    <div>
        <div class="container-add-faq">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Kelola FAQ</h2>
                    <h6 class="subtitle-content">Tambah FAQ</h6>
                    <form>
                        <div class="form-group">
                            <label for="question">Pertanyaan</label>
                            <textarea id="question" rows="3" class="form-control" v-model="faqData.faq_title"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="answer">Jawaban</label>
                            <textarea id="answer" rows="3" class="form-control" v-model="faqData.faq_desc"></textarea>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end">
                        <button @click="addFaq" class="btn btn-success">Save</button>
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

export default {
    components: {
        NavbarDashboard,
        SidebarMenu
    },
    data() {
        return {
            faqData: {
                faq_title: '',
                faq_desc: ''
            }
        }
    },
    mounted () {
        this.checkAuthentication()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        goToPreviousPage () {
            this.$router.go(-1)
        },

        async addFaq () {
            try {
                if (this.faqData.faq_title !== '' && this.faqData.faq_desc !== '') {
                    const token = localStorage.getItem('token');
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
    
                    const payload = {
                        faqtitle: this.faqData.faq_title,
                        faqdesc: this.faqData.faq_desc
                    }
                    await axios.post(`${process.env.VUE_APP_BACKENDHOST}/faq`, payload, config)
                    .then(
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Berhasil Menambah FAQ'
                        })
                    )
                    .then(this.$router.push({ name: 'Faq' }))
                } else {
                    this.badRequestException('Semua kolom wajib diisi')
                }
                
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
        },

        badRequestException (message) {
            const exception = new Error();
            exception.name = "Bad Request";
            exception.response = {
                status: 400,
                data: {
                    message: message
                }
            }
            throw exception
        }
    },
};
</script>

<style scoped>
.container-add-faq {
    display: flex;
}

small {
    color: orangered;
}
</style>
  