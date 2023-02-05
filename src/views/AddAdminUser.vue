<template>
    <div id="page-top">
        <!-- Page Wrapper -->
        <div id="wrapper">
            <!-- Sidebar -->
               <Sidebar navStatus="adminusers"/>
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
                        <h1 class="h3 mb-0 text-gray-800">Add Admin User</h1>                       
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
                                            <input type="text" class="form-control" v-model="fullname" placeholder="Enter Full Name"/>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Role</label>
                                            <select class="form-control" v-model="rid">
                                                <option value="">Select Role</option>
                                                <template v-for="rdata in roleList">
                                                    <option :value="rdata.id" :key="rdata.id">{{rdata.role_name}}</option>
                                                </template>
                                            </select>
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
                                            <label>Password</label>
                                            <input type="password" v-model="password" class="form-control" placeholder="Enter Password"/>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label style="display:inherit;">Status</label>
                                            <switches v-model="status" theme="bootstrap" color="success" type-bold="true"></switches>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <button type="submit"  class="btn btn-info w-50" @click="saveAdminUser">Save</button>
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
        Switches,
    },
    // props: ["isHas"],
    data() {
        return {
            fullname:'',
            rid:'',
            email:'',
            password:'',
            status:false,

            roleList:[],

            user_token: localStorage.getItem("user_token"),
            user_token_name: localStorage.getItem("user_token_name"),
        };
    },
    mounted() {
        if(localStorage.getItem("user_token")=='' || !localStorage.getItem("user_token")>0){
            this.$router.push('/login')
        }
        this.getAllRole();
         
    },
    watch: {
        
    },
    methods: {
        saveAdminUser(){
            var ev=this;

            if(this.fullname=='' || this.fullname==null){
                this.$toasted.global.error({
                    message: 'Please enter Full Name'
                })
            }else if(this.rid=='' || this.rid==null ){
                this.$toasted.global.error({
                    message: 'Please select role '
                })
            }else if(this.email=='' || this.email==null){
                this.$toasted.global.error({
                    message: 'Please enter Email'
                })
            }else if(this.password=='' || this.password==null){
                this.$toasted.global.error({
                    message: 'Please enter Password'
                })
            }else{
                axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'saveAdminUser', 
                        fullname: this.fullname,
                        rid: this.rid,
                        email: this.email,
                        password: this.password,
                        status: this.status?1:0,
                    }
                }).then(function(response) {
                    var data=response.data;
                    //console.log(data)
                    if(data.status=='success'){
                        ev.$toasted.global.success({
                            message: data.msg
                        })
                        ev.$router.push('/adminuser');
                    }else{
                        ev.$toasted.global.error({
                            message: data.msg
                        })
                    }
                })

            }

            
        },
        getAllRole(){
            let ev=this;

            axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'activeRole', 
                    }
                }).then(function(response) {

                    let data=response.data;
                    ev.roleList=data.data;
                })

        }
    },
};
</script>