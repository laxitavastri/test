<template>
    <div id="page-top">
        <!-- Page Wrapper -->
        <div id="wrapper">
            <!-- Sidebar -->
               <Sidebar navStatus="bank"/>
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
                        <h1 class="h3 mb-0 text-gray-800">Add Bank</h1>                       
                    </div>

                    <hr class="sidebar-divider d-none d-md-block">

                    <div class="">
                        <div class="form-card card shadow mb-4">
                            <div class="card-body">
                                
                                <div class="card-header py-3">
                                    <h3 class="m-0 font-weight-bold text-primary">Bank Information</h3>
                                </div>
                                <div class="row pt-5 pb-5">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Bank Name</label>
                                            <input type="text" v-model="name" class="form-control" placeholder="Enter Bank Name"/>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Bank Account Number</label>
                                            <input type="number" v-model="account_no" class="form-control" placeholder="Enter Bank Account Number"/>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>IFSC Code</label>
                                            <input type="text" v-model="ifsc" class="form-control" placeholder="Enter IFSC Code"/>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Branch</label>
                                            <input type="text" v-model="branch" class="form-control" placeholder="Enter Branch"/>
                                        </div>
                                    </div>

                                   

                                    <div class="col-md-6">
                                        <button type="submit" class="btn btn-info" @click="saveBank()">Save</button>
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

export default {
    components: {
        Header,
        Sidebar,
        Footer,
    },
    // props: ["isHas"],
    data() {
        return {
            name:'',
            account_no:'',
            ifsc:'',
            branch:'',
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
            if(this.checks.banks==0){
                this.$router.push('/login')
            }
        }
    },
    watch: {
        
    },
    methods: {
        saveBank(){
            var ev=this;

            if(this.name=='' || this.name==null){
                this.$toasted.global.error({
                    message: 'Please enter Bank Name'
                })
            }else if(this.account_no=='' || this.account_no==null ){
                this.$toasted.global.error({
                    message: 'Please enter Account No.'
                })
            }else if(this.ifsc=='' || this.ifsc==null){
                this.$toasted.global.error({
                    message: 'Please enter IFSC'
                })
            }else if(this.branch=='' || this.branch==null){
                this.$toasted.global.error({
                    message: 'Please enter Branch'
                })
            }else{
                axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'add_bank', 
                        name: this.name,
                        account_no: this.account_no,
                        ifsc: this.ifsc,
                        branch: this.branch,
                    }
                }).then(function(response) {
                    var data=response.data;
                    if(data.status=='success'){
                        ev.$toasted.global.success({
                            message: data.msg
                        })
                        ev.$router.push('/banks');
                    }else{
                        ev.$toasted.global.error({
                            message: data.msg
                        })
                    }
                })

            }

            
        }
    },
};
</script>