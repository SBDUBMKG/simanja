<template>
    <div>
        <NavbarDashboard/>
        <div class="container-add-master-temperamen-kerja">
            <SidebarMenu/>
            <div class="container-content">
                <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                    Back
                </button>
                <h2 id="title-content">Master Temperamen Kerja</h2>
                <h6 id="subtitle-content">Tambah Master Temperamen Kerja</h6>
                <div class="row-controller d-flex justify-content-start">
                    <button @click="addRow" class="btn btn-info btn-sm">Tambah Baris</button>
                    <button @click="deleteRow" class="btn btn-secondary btn-sm">Kurangi Baris</button>
                </div>
                <table class="table table-bordered table-sm table-hover table-responsive-xl">
                    <thead>
                        <tr class="table-head">
                            <th class="column-title" width="40%">TEMPERAMEN KERJA</th>
                            <th class="column-title" width="60%">URAIAN</th>
                        </tr>
                    </thead>
                    <tbody id="list-table">
                        <tr class="row-list">
                            <td><textarea class="form-control form-control-sm temperamen-kerja" rows="1"></textarea></td>
                            <td><textarea class="form-control form-control-sm uraian" rows="1"></textarea></td>
                        </tr>
                    </tbody>
                </table>
                <div class="d-flex justify-content-end">
                    <button @click="saveTemperamenKerja" class="btn btn-success">Save</button>
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
            const listTemperamenKerja = document.getElementById("list-table")

            const row = document.createElement('tr')
            let html = `<td><textarea class="form-control form-control-sm temperamen-kerja" rows="1"></textarea></td>`
            html += `<td><textarea class="form-control form-control-sm uraian" rows="1"></textarea></td>`

            row.innerHTML = html            
            row.classList.add('row-list')

            listTemperamenKerja.appendChild(row)
        },

        deleteRow () {
            const listTemperamenKerja = document.getElementById("list-table")
            listTemperamenKerja.removeChild(listTemperamenKerja.lastElementChild)
        },

        async saveTemperamenKerja () {
            const listTemperamenKerja = document.getElementsByClassName('row-list')
            const temperamenKerjaList = []
            const uraianList = []

            for (let i=0; i < listTemperamenKerja.length; i++) {
                let temperamenKerja = listTemperamenKerja[i].childNodes[0].childNodes[0].value
                let uraian = listTemperamenKerja[i].childNodes[1].childNodes[0].value

                if (temperamenKerja === '' || uraian === '') {
                    return this.$swal.fire({
                        icon: 'info',
                        title: 'Warning!!',
                        text: 'Kolom tidak boleh kosong'
                    })
                }

                temperamenKerjaList.push(temperamenKerja)
                uraianList.push(uraian)
            }

            for (let i = 0; i < temperamenKerjaList.length; i++) {
                try {
                    const token = localStorage.getItem('token');

                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    };
                    const payload = {
                        temperamenkerja: temperamenKerjaList[i],
                        uraian: uraianList[i]
                    }

                    await axios.post(`${process.env.VUE_APP_BACKENDHOST}/master/temperamen-kerja`, payload, config);

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
                text: 'Temperamen Kerja Berhasil Ditambahkan'
            }).then(this.$router.push({ name: 'TemperamenKerja' }))
        }
    },
};
</script>

<style scoped>
.container-add-master-temperamen-kerja {
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
</style>
  