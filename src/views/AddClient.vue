<template>
    <div id="page-top">
        <!-- Page Wrapper -->
        <div id="wrapper">
            <!-- Sidebar -->
               <Sidebar navStatus="clients"/>
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
                        <h1 class="h3 mb-0 text-gray-800">Add Client</h1>                       
                    </div>

                    <hr class="sidebar-divider d-none d-md-block">

                    <div class="">
                        <div class="form-card card shadow mb-4">
                            <div class="card-body">
                                
                                <div class="card-header py-3">
                                    <h3 class="m-0 font-weight-bold text-primary">General Information</h3>
                                </div>
                                <div class="row pt-5 pb-5">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Full Name</label>
                                            <input type="text" class="form-control" v-model="name" placeholder="Enter Full Name"/>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Display Name</label>
                                            <input type="text" class="form-control" v-model="dname" placeholder="Enter Display Name"/>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="email" v-model="email" class="form-control" placeholder="Enter Email"/>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Mobile</label>
                                            <input type="number" v-model="mobile" class="form-control" placeholder="Enter Mobile"/>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Address</label>
                                            <textarea  class="form-control" v-model="address" rows="4" placeholder="Enter Address"></textarea>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <button type="submit"  class="btn btn-info" @click="saveClient">Save</button>
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
            dname:'',
            email:'',
            mobile:'',
            address:'',
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
            if(this.checks.clients==0){
                this.$router.push('/login')
            }
        }
    },
    watch: {
        
    },
    methods: {
        saveClient(){
            var ev=this;

            if(this.name=='' || this.name==null){
                this.$toasted.global.error({
                    message: 'Please enter Full Name'
                })
            }else if(this.dname=='' || this.dname==null ){
                this.$toasted.global.error({
                    message: 'Please enter Display Name'
                })
            }else if(this.email=='' || this.email==null){
                this.$toasted.global.error({
                    message: 'Please enter Email'
                })
            }else if(this.mobile=='' || this.mobile==null){
                this.$toasted.global.error({
                    message: 'Please enter Mobile no.'
                })
            }else if(this.address=='' || this.address==null){
                this.$toasted.global.error({
                    message: 'Please enter Address'
                })
            }else{
                axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'add_client', 
                        name: this.name,
                        dname: this.dname,
                        email: this.email,
                        mobile: this.mobile,
                        address: this.address,
                    }
                }).then(function(response) {
                    var data=response.data;
                    //console.log(data)
                    if(data.status=='success'){
                        ev.$toasted.global.success({
                            message: data.msg
                        })
                        ev.$router.push('/clients');
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