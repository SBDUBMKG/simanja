<template>
    <div>
        <div class="container-edit-faq">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Kelola FAQ</h2>
                    <h6 class="subtitle-content">Edit FAQ</h6>
                    <form v-if="faqLoaded">
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
                        <button @click="saveFaq" class="btn btn-success">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import NavbarDashboard from '@/components/NavbarDashboard.vue'
import SidebarMenu from '@/components/SidebarMenu.vue'

export default {
    components: {
        NavbarDashboard,
        SidebarMenu,
    },
    data() {
        return {
            faqId: this.$route.params.faqid,
            faqData: {},
            faqLoaded: false,
        }
    },
    mounted () {
        this.checkAuthentication()
        this.loadFaq()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadFaq() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/faq/${this.faqId}`);
                
                this.faqData = response.data.data.faq
                this.faqLoaded = true
                console.log(this.faqData)
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

        goToPreviousPage () {
            this.$router.go(-1)
        },

        async saveFaq () {
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

                    await axios.put(`${process.env.VUE_APP_BACKENDHOST}/faq/${this.faqId}`, payload, config)
                    .then(
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'FAQ Berhasil Diperbarui'
                        })
                    )                
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
.container-edit-faq{
    display: flex;
}

small {
    color: orangered;
}
</style>
  