<template>
    <div>
        <div class="container-edit-article">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Kelola Artikel</h2>
                    <h6 class="subtitle-content">Edit Artikel</h6>
                    <form v-if="articleLoaded">
                        <div class="form-group">
                            <label for="title">Judul Artikel</label>
                            <input type="text" v-model="articleData.title" class="form-control" id="title">
                        </div>
                        <div class="form-group">
                            <label>Konten</label>
                            <Editor
                                v-model="articleData.content"
                                :api-key="tinyemcKey"
                                :init="{
                                    plugins: 'lists link table code help wordcount'
                                }"
                            />
                        </div>
                        <div class="form-group">
                            <label for="article-img"> Ganti Gambar Artikel</label>
                            <input type="file" class="form-control-file" id="article-img" @change="handleFileChange">
                            <small>Abaikan jika tidak ada perubahan</small>
                        </div>
                        <div class="form-group">
                            <label for="creator">Penulis</label>
                            <input type="text" v-model="articleData.creator" class="form-control" id="creator">
                        </div>
                    </form>
                    <div class="d-flex justify-content-end">
                        <button @click="saveArticle" class="btn btn-success">Save</button>
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
import Editor from '@tinymce/tinymce-vue'

export default {
    components: {
        NavbarDashboard,
        SidebarMenu,
        Editor
    },
    data() {
        return {
            articleId: this.$route.params.articleid,
            tinyemcKey: '6j8az9fxa7uajq1uktgcg8a69sitayliynlx6prcy7ng4r34',
            articleData: {},
            articleLoaded: false,
            selectedImage: null
        }
    },
    mounted () {
        this.checkAuthentication()
        this.loadArticle()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadArticle() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/article/${this.articleId}`);
                
                this.articleData = response.data.data.article[0]
                this.articleLoaded = true
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

        handleFileChange(event) {
            const file = event.target.files[0]
            this.articleData.img = file.name
            this.selectedImage = event.target.files[0]
        },

        async uploadImage() {
            const formData = new FormData()
            formData.append('image', this.selectedImage)

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': `multipart/form-data`
                }
            }

            await axios.put(`${process.env.VUE_APP_BACKENDHOST}/article/img/${this.articleId}`, formData, config)   
        },

        async saveArticle () {
            try {
                if (this.articleData.title !== '' && this.articleData.content !== ''  && this.articleData.creator !== '' && this.articleData.content !== '') {
                    const token = localStorage.getItem('token');
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
    
                    const payload = {
                        title: this.articleData.title,
                        content: this.articleData.content,
                        creator: this.articleData.creator
                    }
                    if (this.selectedImage !== null) {
                        await this.uploadImage()
                    }
                    await axios.put(`${process.env.VUE_APP_BACKENDHOST}/article/${this.articleId}`, payload, config)
                    .then(
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Artikel Berhasil Diperbarui'
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
.container-edit-article{
    display: flex;
}

small {
    color: orangered;
}
</style>
  