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
                        <h1 class="h3 mb-0 text-gray-800">Admin User List</h1>

                        <router-link to="/addadminuser" class="btn btn-info btn-icon-split">
                            <span class="icon text-white-50">
                                <i class="fas fa-plus"></i>
                            </span>
                            <span class="text">Add New Admin User</span>
                        </router-link>
                       
                    </div>

                   



                

                    <hr class="sidebar-divider d-none d-md-block">
                    <!-----Tabel-->

                       
                        <table class="rwd-table shadow ">
                            <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Action</th>
                                
                            </tr>
                            <template v-for="cdata in clientData" >
                                <tr v-if="cdata.id">
                                    <td data-th="Supplier Code">
                                        {{cdata.id}}                                    
                                    </td>
                                    <td data-th="Supplier Name">
                                        {{cdata.fullname}}
                                    </td>
                                    <td data-th="Invoice Number">
                                        {{cdata.role_name}}
                                    </td>
                                    <td data-th="Invoice Date">
                                        {{cdata.email}}
                                    </td>
                                    <td data-th="Due Date">
                                        <router-link :to="'/editadminuser/'+cdata.id" class="btn btn-primary btn-icon-split">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-edit"></i>
                                            </span>
                                            <span class="text">Edit</span>
                                        </router-link>
                                        &nbsp;
                                        
                                        <button @click="deleteAdminUser(cdata.id)" class="btn btn-danger btn-icon-split ">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-trash"></i>
                                            </span>
                                            <span class="text">Delete</span>
                                        </button>
                                        
                                        

                                    </td>
                                
                                </tr>
                            </template>
                            
                           
                            </tbody>
                        </table>
                    <!---Tabel-->
                    <pagination class="mt-10" v-model="page2" :records="totalCount" :per-page="perPage" />
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
import Pagination from 'vue-pagination-2'

export default {
    components: {
        Header,
        Sidebar,
        Footer,
        Pagination,
    },
    // props: ["isHas"],
    data() {
        return {
            clientData:[],
            
            page2: 1,
            totalCount: 0,
            newAry: [],
            perPage: 5,
            newAry:[],

            user_token: localStorage.getItem("user_token"),
            user_token_name: localStorage.getItem("user_token_name"),
        };
    },
    mounted() {
        if(localStorage.getItem("user_token")=='' || !localStorage.getItem("user_token")>0){
            this.$router.push('/login')
        }
        this.getAllAdminUser();
         
    },
    watch: {
        page2: function (vl) {
            this.changePage()
        },
        clientData: function (vl) {
            this.clientData=vl;
        }
    },
    methods: {
       
        getAllAdminUser(){
            var ev=this;

                axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'getAllAdminUser', 
                    }
                }).then(function(response) {
                    var data = response.data;
                    console.log(data)
                    if(data.status=='success'){
                        ev.clientData=data.data;
                        ev.newAry=data.data;
                        ev.totalCount = data.count
                        ev.changePage()
                    }else{
                        //ev.$toasted.global.error({ message: data.msg });
                    }
                    
                })
        },    
        changePage() {
           
            this.clientData = []
            const preCount = (this.perPage * this.page2)
            const temp = this.perPage
            let newPP = (preCount) - temp
            for (let i = 0; i < temp; i++) {
                if (this.newAry[newPP]) {
                    this.clientData[i] = this.newAry[newPP]
                    newPP++
                }
            }
        }, 

        sendMail(cid){
            let ev=this;
            axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'sendpdf/client.php?cid='+cid,
                    data: {
                        cid: cid, 
                    }
                }).then(function(response) {
                    var data = response.data;
                    if(data.status=='success'){
                        ev.$toasted.global.success({ message: 'Mail sent successfully' });
                    }
                    console.log(data)
                })

        },

        deleteAdminUser(rid){
            var ev=this;
            axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'deleteADMIN_USER', 
                        rid: rid
                    }
                }).then(function(response) {
                    var data=response.data;
                    console.log(data)
                    if(data.status=='success'){
                        ev.clientData=[];
                        ev.$toasted.global.success({message:data.msg});
                        ev.getAllAdminUser();
                    }else{
                        ev.$toasted.global.error({message:data.msg});
                    }
                    
                })

        },
    },
};
</script>