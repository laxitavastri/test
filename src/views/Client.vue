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
                        <h1 class="h3 mb-0 text-gray-800">Client List</h1>

                        <router-link to="/addclient" class="btn btn-info btn-icon-split">
                            <span class="icon text-white-50">
                                <i class="fas fa-plus"></i>
                            </span>
                            <span class="text">Add New Client</span>
                        </router-link>
                       
                    </div>

                   



                

                    <hr class="sidebar-divider d-none d-md-block">
                    <!-----Tabel-->

                       
                        <table class="rwd-table shadow ">
                            <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Action</th>
                                
                            </tr>
                            <template v-for="cdata in clientData" >
                                <tr v-if="cdata.id">
                                    <td data-th="Supplier Code">
                                        {{cdata.id}}                                    
                                    </td>
                                    <td data-th="Supplier Name">
                                        {{cdata.name}}
                                    </td>
                                    <td data-th="Invoice Number">
                                        {{cdata.mobile}}
                                    </td>
                                    <td data-th="Invoice Date">
                                        {{cdata.email}}
                                    </td>
                                    <td data-th="Due Date">
                                        <router-link :to="'/editclient/'+cdata.id" class="btn btn-primary btn-icon-split">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-edit"></i>
                                            </span>
                                            <span class="text">Edit</span>
                                        </router-link>
                                        &nbsp;
                                        <!-- <a href="#" class="btn btn-danger btn-icon-split">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-trash"></i>
                                            </span>
                                            <span class="text">Delete</span>
                                        </a> -->
                                        
                                        <a :href="$root.URL_ROOT + 'salesExport.php?filtter_by=client&cname='+cdata.name+'&cid='+cdata.id" class="btn btn-primary btn-icon-split">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-download"></i>
                                            </span>
                                            <span class="text">Download CSV</span>
                                        </a>

                                        <a :href="$root.URL_ROOT + 'sendpdf/client.php?cid='+cdata.id" class="btn btn-primary btn-icon-split">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-envelope"></i>
                                            </span>
                                            <span class="text">Send Mail</span>
                                        </a>

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
        this.getAllClient();
         
    },
    watch: {
        page2: function (vl) {
            this.changePage()
        },
    },
    methods: {
        doenloadCsv(cid){
            var ev=this;

            axios({
                method: 'POST',
                url: this.$root.URL_ROOT + 'salesExport.php',
                data: {
                    filtter_by: 'client', 
                    cid: cid,
                }
            }).then(function(response) {
                var data = response.data;
                console.log(data)
            })
            
            
        },
        getAllClient(){
            var ev=this;

                axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'getClient', 
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
                        ev.$toasted.global.error({ message: data.msg });
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

        }
    },
};
</script>