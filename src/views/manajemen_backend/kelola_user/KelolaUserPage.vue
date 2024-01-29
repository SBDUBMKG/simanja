<template>
    <div>
        <div class="container-analisis-jabatan">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <h2 class="title-content">Kelola User</h2>
                    <div class="d-flex justify-content-between subtitle-content">
                        <h6 id="subtitle-content">List User</h6>
                        <button @click="addUser" class="btn btn-success btn-sm btn-reset">Tambah User</button>
                    </div>
                    <div v-if="usersLoaded">
                        <DataTable class="table table-sm table-hover table-responsive-xl display">
                            <thead>
                                <tr class="table-head">
                                    <th width="3%" class="column-title">No.</th>
                                    <th class="column-title">Username</th>
                                    <th class="column-title">Satker</th>
                                    <th class="column-title">Role</th>
                                    <th width="10%" class="column-title">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(user, index) in users" :key="user.id_user">
                                    <td>{{ index+1 }}</td>
                                    <td>{{ user.username }}</td>
                                    <td>{{ user.satker }}</td>
                                    <td>{{ user.role }}</td>
                                    <td>
                                        <div class="d-flex justify-content-around">
                                            <button @click="editBtn(user.id_user)" class="btn btn-info btn-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
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
            usersLoaded: false,
            users: [],
        };
    },
    mounted () {
        this.checkAuthentication()
        this.loadUsers()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadUsers () {
            try {
                const token = localStorage.getItem('token')

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/users`, config);

                this.users = response.data.data.users
                this.usersLoaded = true
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

        addUser () {
            this.$router.push({ name: 'AddUser' })
        },

        editBtn (id_user) {
            this.$router.push({ name: 'EditUser', params: { userid: id_user } })    
        },
    },
};
</script>

<style scoped>
.container-analisis-jabatan {
    display: flex;
}

#subtitle-content {
    position: relative;
    top: 10px;
}

label {
    margin: 0 0 -5px 3px;
    font-size: small;
    color: rgb(112, 112, 112);
}

.query-container {
    margin-bottom: 20px;
}

.query-satker {
    width: 50%;
}

.total-selected {
    background-color: rgb(213, 213, 213);
    border-radius: 30px;
    margin: 0 0 20px 0;
    color: rgb(56, 56, 56);
    padding: 5px 20px;
}

.btn-export {
    border-radius: 30px;
    padding: 1px 10px;
    font-size: 13px;
}

.data-table {
    padding: 10px;
    background-color: rgb(244, 244, 244);
    border-radius: 10px;
}
</style>
  