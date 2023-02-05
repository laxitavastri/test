<template>
    
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <router-link to="/" class="sidebar-brand d-flex align-items-center justify-content-center logo-bg" >
                <!-- <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div> -->

                <img src="../assets/img/logo_calibreply.webp" class="img-logo-width" >
            </router-link>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li :class="navStatus=='dashboard'?'nav-item active':'nav-item'">
                <router-link class="nav-link" to="/">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </router-link>
            </li>

            <!-- Divider -->
            <!-- <hr class="sidebar-divider"> -->

            <li v-if="accessSales" :class="navStatus=='sales'?'nav-item active':'nav-item'">
                <router-link class="nav-link collapsed" to="/sales">
                    <i class="fas fa-fw fa-rupee-sign"></i>
                    <span>Sales</span>
                </router-link>
            </li>

           


            <li v-if="accessBanks" :class="navStatus=='banks'?'nav-item active':'nav-item'">
                <router-link class="nav-link collapsed" to="/banks">
                    <i class="fas fa-fw fa-piggy-bank"></i>
                    <span>Banks</span>
                </router-link>
            </li>

            


            <li v-if="accessClients" :class="navStatus=='clients'?'nav-item active':'nav-item'">
                <router-link class="nav-link collapsed" to="/clients">
                    <i class="fas fa-fw fa-user-alt"></i>
                    <span>Clients</span>
                </router-link>
            </li>

            

            <li v-if="accessItem" :class="navStatus=='item'?'nav-item active':'nav-item'">
                <router-link class="nav-link collapsed" to="/item">
                    <i class="fas fa-fw fa-boxes"></i>
                    <span>Item</span>
                </router-link>
            </li>

            

            <li v-if="accessPurchaseStock" :class="navStatus=='purchase'?'nav-item active':'nav-item'">
                <router-link class="nav-link collapsed" to="/purchase">
                    <i class="fas fa-fw fa-cash-register"></i>
                    <span>Purchase (Stock In)</span>
                </router-link>
            </li>


            <li v-if="accessStock" :class="navStatus=='stock'?'nav-item active':'nav-item'">
                <router-link class="nav-link collapsed" to="/stock">
                    <i class="fas fa-fw fa-cog"></i>
                    <span>Stock</span>
                </router-link>
            </li>

            <li v-if="role=='Admin'" :class="navStatus=='adminusers'?'nav-item active':'nav-item'">
                <router-link class="nav-link collapsed" to="/adminuser">
                    <i class="fas fa-fw fa-users"></i>
                    <span>Admin Users</span>
                </router-link>
            </li>

            <li v-if="role=='Admin'" :class="navStatus=='userrole'?'nav-item active':'nav-item'">
                <router-link class="nav-link collapsed" to="/userrole">
                    <i class="fas fa-fw fa-person-booth"></i>
                    <span>User Roles</span>
                </router-link>
            </li>

            <li  class="nav-item">
                <a @click="logout" class="nav-link collapsed" style="cursor:pointer;">
                    <i class="fas fa-fw fa-sign-out-alt"></i>
                    <span>Logout</span>
                </a>
            </li>





           

           

            <!-- Divider -->
            <hr class="sidebar-divider d-none d-md-block">

           
          

        </ul>
    
</template>

<script>
import axios from "axios";
import $ from "jquery";

export default {
    components: {},
    props: ["navStatus"],
    data() {
        return {
            role: localStorage.getItem('role'),
            accessSales:false,
            accessBanks:false,
            accessClients:false,
            accessPurchaseStock:false,
            accessStock:false,
            accessItem:false,

            checks: JSON.parse(localStorage.getItem("checks"))
        };
    },
    mounted() {
        if(this.role=='Admin'){
            this.accessSales=true;
            this.accessBanks=true;
            this.accessClients=true;
            this.accessPurchaseStock=true;
            this.accessItem=true;
            this.accessStock=true;

            
        }else{
            this.setUpRole();
            console.log(this.checks)
        }
         
    },
    watch: {
        
    },
    methods: {
        logout() {
            console.log('test data')
            localStorage.removeItem("user_token");
            localStorage.removeItem("user_token_name");
            localStorage.removeItem("checks");
            localStorage.removeItem("role");
          
            localStorage.removeItem("token");
            // localStorage.removeItem("ip_address");
            localStorage.removeItem("coupon");
            localStorage.removeItem("oid");
            this.$router.push({ name: 'Home' });
            window.location.reload()

         

        },
        setUpRole(){
            this.accessSales=this.checks.sales?true:false;
            this.accessBanks=this.checks.banks?true:false;
            this.accessClients=this.checks.clients?true:false;
            this.accessPurchaseStock=this.checks.purchase_stock?true:false;
            this.accessItem=this.checks.item?true:false;
            this.accessStock=this.checks.stock?true:false;
        }
    },
};
</script>