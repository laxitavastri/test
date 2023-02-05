<template>
    <div id="page-top">
        <!-- Page Wrapper -->
        <div id="wrapper">
            <!-- Sidebar -->
               <Sidebar navStatus="item"/>
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
                        <h1 class="h3 mb-0 text-gray-800">Add Items</h1>                       
                    </div>

                    <hr class="sidebar-divider d-none d-md-block">

                    <div class="">
                        <div class="form-card card shadow mb-4">
                            <div class="card-body">
                               
                                <div class="row pt-5 pb-5">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Product Name</label>
                                            <input type="text" class="form-control" v-model="name" placeholder="Enter Product Name"/>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Size</label>
                                            <input type="text" class="form-control" v-model="size" placeholder="Enter Product Size"/>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Tickness</label>
                                            <input type="text" class="form-control" v-model="thickness" placeholder="Enter Product Thickness"/>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Stock</label>
                                            <input type="number" v-model="stock" class="form-control" placeholder="Enter Stock"/>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label style="display:inherit;">Status</label>
                                            
                                            <switches v-model="status" theme="bootstrap" color="success" type-bold="true"></switches>
                                        </div>
                                    </div>

                                   

                                    <div class="col-md-6">
                                        <button type="submit"  class="btn btn-info" @click="saveItem">Save</button>
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
            name:'',
            size:'',
            thickness:'',
            stock:'',
            status: false,
            user_token: localStorage.getItem("user_token"),
            user_token_name: localStorage.getItem("user_token_name"),

            checks: JSON.parse(localStorage.getItem("checks")),
            role: localStorage.getItem("role"),
            
        };
    },
    mounted() {
        
        if(localStorage.getItem("user_token")=='' || !localStorage.getItem("user_token")>0){
            this.$router.push('/login')
        }

        if(this.role!='Admin'){
            if(this.checks.item==0){
                this.$router.push('/login')
            }
        }
    },
    watch: {
        
    },
    methods: {
        saveItem(){
            var ev=this;

            if(this.name=='' || this.name==null){
                this.$toasted.global.error({
                    message: 'Please enter product name'
                })
            }else if(this.size=='' || this.size==null ){
                this.$toasted.global.error({
                    message: 'Please enter size '
                })
            }else if(this.thickness=='' || this.thickness==null ){
                this.$toasted.global.error({
                    message: 'Please enter thickness '
                })
            }else if(this.stock=='' || this.stock==null){
                this.$toasted.global.error({
                    message: 'Please enter stock'
                })
            }else{
                axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'add_item', 
                        name: this.name,
                        size: this.size,
                        thickness: this.thickness,
                        stock: this.stock,
                        status:this.status,
                    }
                }).then(function(response) {
                    var data=response.data;
                    console.log(data)
                    if(data.status=='success'){
                        ev.$toasted.global.success({
                            message: data.msg
                        })
                        ev.$router.push('/item');
                    }else{
                        ev.$toasted.global.error({
                            message: data.msg
                        })
                    }
                })

            }

            
        },
       
    },
};
</script>