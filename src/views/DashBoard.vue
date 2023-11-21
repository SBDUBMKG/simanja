<template>
    <div>
        <div class="container-master-wewenang">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
					
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavbarDashboard from '@/components/NavbarDashboard.vue';
import SidebarMenu from '@/components/SidebarMenu.vue';

export default {
    components: {
        NavbarDashboard,
        SidebarMenu,
    }
};
</script>

<style scoped>
/* Gaya CSS khusus untuk komponen ini */
@import 'datatables.net-bs5';

.container-master-wewenang {
    display: flex;
}
</style>
  