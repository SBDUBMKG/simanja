<template>
    <div>
        <NavbarDashboard/>
        <div class="container-add-master-diklat">
            <SidebarMenu/>
            <div class="container-content">
                <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                    Back
                </button>
                <h2 id="title-content">Master Pendidikan dan Pelatihan</h2>
                <h6 id="subtitle-content" v-if="dataLoaded">Tambah Master Pendidikan dan Pelatihan {{ fungsionalData.fungsional }}</h6>
                <div class="row-controller d-flex justify-content-start">
                    <button @click="addRow" class="btn btn-info btn-sm">Tambah Baris</button>
                    <button @click="deleteRow" class="btn btn-secondary btn-sm">Kurangi Baris</button>
                </div>
                <table class="table table-bordered table-sm table-hover table-responsive-xl">
                    <thead>
                        <tr class="table-head">
                            <th class="column-title" width="40%">PENDIDIKAN DAN PELATIHAN</th>
                        </tr>
                    </thead>
                    <tbody id="list-table">
                        <tr class="row-list">
                            <td><textarea class="form-control form-control-sm diklat" rows="2"></textarea></td>
                        </tr>
                    </tbody>
                </table>
                <div class="d-flex justify-content-end">
                    <button @click="saveDiklat" class="btn btn-success">Save</button>
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
            fungsionalId: this.$route.params.fungsionalid,
            fungsionalData: null,
            dataLoaded: false
        };
    },
    mounted () {
        this.checkAuthentication()
        this.loadFungsionalData()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadFungsionalData() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`http://localhost:5000/master/fungsional/id/${this.fungsionalId}`, config);

                this.fungsionalData = response.data.data.fungsional[0]
                this.dataLoaded = true
            } catch (error) {
                if (error.response.status === 404) {
                    this.dataLoaded = true
                } else if (error.response.status === 401) {
                    this.$router.push({ name: 'Home' })
                } else {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.message
                    })

                }
            }
        },

        goToPreviousPage () {
            this.$router.go(-1)
        },

        addRow () {
            const listDiklat = document.getElementById("list-table")

            const row = document.createElement('tr')
            let html = `<td><textarea class="form-control form-control-sm diklat" rows="2"></textarea></td>`

            row.innerHTML = html            
            row.classList.add('row-list')

            listDiklat.appendChild(row)
        },

        deleteRow () {
            const listDiklat = document.getElementById("list-table")
            listDiklat.removeChild(listDiklat.lastElementChild)
        },

        async saveDiklat () {
            const listDiklat = document.getElementsByClassName('row-list')
            const diklatList = []

            for (let i=0; i < listDiklat.length; i++) {
                let diklat = listDiklat[i].childNodes[0].childNodes[0].value

                if (diklat === '') {
                    return this.$swal.fire({
                        icon: 'info',
                        title: 'Warning!!',
                        text: 'Kolom tidak boleh kosong'
                    })
                }

                diklatList.push(diklat)
            }

            for (let i = 0; i < diklatList.length; i++) {
                try {
                    const token = localStorage.getItem('token');

                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                    const payload = {
                        idfungsional: this.fungsionalData.id_fungsional,
                        diklat: diklatList[i]
                    }

                    await axios.post(`http://localhost:5000/master/diklat`, payload, config);
                } catch (error) {
                    if (error.status === 401) {
                        this.$router.push({ name: 'Home' })
                    } else {
                        this.$swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error.message
                        })
                    }
                }
            }
            this.$swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Diklat Berhasil Ditambahkan'
            }).then(this.$router.push({ name: 'DiklatDetail', params: { fungsionalid: this.fungsionalData.id_fungsional } }))
        }
    },
};
</script>

<style scoped>
.container-add-master-diklat{
    display: flex;
}

.container-content{
    flex: auto;
    padding: 20px;
}

.back-button {
    display: inline-flex;
    align-items: center; 
    padding-right: 15px;  
    border-radius: 30px;
}

#title-content {
    font-weight: bold;
    color: #0077b6;
    margin-top: 30px;
    margin-bottom: 30px;
}

#subtitle-content {
    color: #0096c7;
    padding-bottom: 5px;
    border-bottom-style: solid;
    border-bottom-width: 1.5px;
    border-bottom-color: #0096c7;
}

.row-controller .btn {
    margin: 10px 5px 20px 0;
}

.table-head {
    background-color: #0077b6;
    color: #FAFAFA;
    font-size: 12px;
    text-align: center;
}

.column-title {
    vertical-align: middle;
}

.form-control {
    font-size: 12px;
}
</style>
  