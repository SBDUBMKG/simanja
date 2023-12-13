<template>
    <div>
        <div class="container-add-master-wewenang">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Master Wewenang</h2>
                    <h6 class="subtitle-content">Tambah Master Wewenang</h6>
                    <div class="row-controller d-flex justify-content-start">
                        <button @click="addRow" class="btn btn-info btn-sm">Tambah Baris</button>
                        <button @click="deleteRow" class="btn btn-secondary btn-sm">Kurangi Baris</button>
                    </div>
                    <table class="table table-bordered table-sm table-hover table-responsive-xl">
                        <thead>
                            <tr class="table-head">
                                <th class="column-title" width="40%">WEWENANG</th>
                            </tr>
                        </thead>
                        <tbody id="list-table">
                            <tr class="row-list">
                                <td><textarea class="form-control form-control-sm wewenang" rows="1"></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-end">
                        <button @click="saveWewenang" class="btn btn-success">Save</button>
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

        };
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

        addRow () {
            const listWewenang = document.getElementById("list-table")

            const row = document.createElement('tr')
            let html = `<td><textarea class="form-control form-control-sm wewenang" rows="1"></textarea></td>`

            row.innerHTML = html            
            row.classList.add('row-list')

            listWewenang.appendChild(row)
        },

        deleteRow () {
            const listWewenang = document.getElementById("list-table")
            listWewenang.removeChild(listWewenang.lastElementChild)
        },

        async saveWewenang () {
            const listWewenang = document.getElementsByClassName('row-list')
            const wewenangList = []

            for (let i=0; i < listWewenang.length; i++) {
                let wewenang = listWewenang[i].childNodes[0].childNodes[0].value

                if (wewenang === '') {
                    return this.$swal.fire({
                        icon: 'info',
                        title: 'Warning!!',
                        text: 'Kolom tidak boleh kosong'
                    })
                }

                wewenangList.push(wewenang)
            }

            for (let i = 0; i < wewenangList.length; i++) {
                try {
                    const token = localStorage.getItem('token');

                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    };
                    const payload = {
                        wewenang: wewenangList[i]
                    }

                    await axios.post(`${process.env.VUE_APP_BACKENDHOST}/master/wewenang`, payload, config);

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

            this.$swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Wewenang Berhasil Ditambahkan'
            }).then(this.$router.push({ name: 'Wewenang' }))
        }
    },
};
</script>

<style scoped>
.container-add-master-wewenang {
    display: flex;
}
</style>
  