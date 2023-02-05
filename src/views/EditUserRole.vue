<template>
    <div id="page-top">
        <!-- Page Wrapper -->
        <div id="wrapper">
            <!-- Sidebar -->
               <Sidebar navStatus="userrole"/>
            <!-- End of Sidebar -->

             <!-- Content Wrapper -->
            <div id="content-wrapper" class="d-flex flex-column">

                <!-- Main Content -->
                <div id="content">

                    <!-- Topbar -->
                    <Header />
                    <!-- End of Topbar -->

                    <!-- Begin Page Content -->
                    <div class="container-fluid">

                         <!-- Page Heading -->
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">Add User Role</h1>                       
                    </div>

                    <hr class="sidebar-divider d-none d-md-block">

                    <div class="">
                        <div class="form-card card shadow mb-4">
                            <div class="card-body">
                                
                                <div class="card-header py-3">
                                    <h3 class="m-0 font-weight-bold text-primary">Create Role</h3>
                                </div>
                                <div class="row pt-5 pb-5">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Role Name</label>
                                            <input type="text" class="form-control" v-model="role_name" placeholder="Enter Role Name"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6"></div>

                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label style="display:inherit;" class="mb-30">Sales</label>
                                            
                                            <switches v-model="sales" theme="bootstrap" color="success" type-bold="true"></switches>
                                            
                                        </div>
                                    </div>

                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label style="display:inherit;" class="mb-30">Baks</label>
                                            
                                            <switches v-model="banks" theme="bootstrap" color="success" type-bold="true"></switches>
                                            
                                        </div>
                                    </div>

                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label style="display:inherit;" class="mb-30">Clients</label>
                                            
                                            <switches v-model="clients" theme="bootstrap" color="success" type-bold="true"></switches>
                                            
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label style="display:inherit;" class="mb-30">Purchase Stock</label>
                                            
                                            <switches v-model="purchase_stock" theme="bootstrap" color="success" type-bold="true"></switches>
                                            
                                        </div>
                                    </div>

                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label style="display:inherit;" class="mb-30">Items</label>
                                            
                                            <switches v-model="item" theme="bootstrap" color="success" type-bold="true"></switches>
                                            
                                        </div>
                                    </div>

                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label style="display:inherit;" class="mb-30">Stock</label>
                                            
                                            <switches v-model="stock" theme="bootstrap" color="success" type-bold="true"></switches>
                                            
                                        </div>
                                    </div>

                                    <div class="col-md-3 mb-30 mt-30">
                                        <div class="form-group">
                                            <label style="display:inherit;">Status (Role Active/Inactive)</label>
                                            
                                        </div>
                                    </div>

                                    <div class="col-md-4 mb-30 mt-30">
                                        <div class="form-group">
                                            
                                            <switches v-model="status" theme="bootstrap" color="success" type-bold="true"></switches>
                                            
                                        </div>
                                    </div>

                                    


                                    <div class="col-md-6">
                                        <button type="submit"  class="btn btn-info w-50" @click="saveClient">Save</button>
                                    </div>

                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <hr class="sidebar-divider d-none d-md-block">


                    </div>
                    <!-- /.container-fluid -->

                </div>
                <!-- End of Main Content -->

                <!-- Footer -->
                <Footer />
                <!-- End of Footer -->
            </div>
            <!-- End of Content Wrapper -->
        </div>
        <!-- End of Page Wrapper -->

    </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import Footer from '../components/Footer.vue'
import Switches from 'vue-switches';

export default {
    components: {
        Header,
        Sidebar,
        Footer,
        Switches
    },
    // props: ["isHas"],
    data() {
        return {
            role_name:'',
            sales:false,
            banks:false,
            clients: false,
            purchase_stock: false,
            stock: false,
            item: false,
            status: false,

            id: this.$route.params.id,

            user_token: localStorage.getItem("user_token"),
            user_token_name: localStorage.getItem("user_token_name"),
        };
    },
    mounted() {
        if(localStorage.getItem("user_token")=='' || !localStorage.getItem("user_token")>0){
            this.$router.push('/login')
        }
        this.getRoleDetails();
         
    },
    watch: {
        
    },
    methods: {
        saveClient(){
            var ev=this;

            if(this.role_name=='' || this.role_name==null){
                this.$toasted.global.error({
                    message: 'Please enter Role Name'
                })
            }else{
                axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'editRole', 
                        role_name: this.role_name,
                        sales: this.sales?1:0,
                        banks: this.banks?1:0,
                        clients: this.clients?1:0,
                        item: this.item?1:0,
                        purchase_stock: this.purchase_stock?1:0,
                        stock: this.stock?1:0,
                        status: this.status?1:0,
                        id:this.id,

                    }
                }).then(function(response) {
                    var data=response.data;
                    //console.log(data)
                    if(data.status=='success'){
                        ev.$toasted.global.success({
                            message: data.msg
                        })
                        ev.$router.push('/userrole');
                    }else{
                        ev.$toasted.global.error({
                            message: data.msg
                        })
                    }
                })

            }

            
        },
        getRoleDetails(){
            var ev=this;
            axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'singleRole', 
                        id:this.id,
                    }
                }).then(function(response) {
                    var data=response.data;
                    console.log(data);
                    if(data.status=='success'){
                        ev.role_name=data.data.role_name;
                        ev.sales=data.data.sales;
                        ev.clients=data.data.clients;
                        ev.banks=data.data.banks;
                        ev.purchase_stock=data.data.purchase_stock;
                        ev.stock=data.data.stock;
                        ev.item=data.data.item;
                        ev.status=data.data.status;
                    }
                   
                })
        },
    },
};
</script>