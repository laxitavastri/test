<template>
    <div id="page-top">
        <!-- Page Wrapper -->
        <div id="wrapper">
            <!-- Sidebar -->
               <Sidebar navStatus="sales"/>
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
                        <h1 class="h3 mb-0 text-gray-800">Sales List</h1>

                        <router-link to="/addsales" class="btn btn-info btn-icon-split">
                            <span class="icon text-white-50">
                                <i class="fas fa-plus"></i>
                            </span>
                            <span class="text">Add New Sales</span>
                        </router-link>

                        <router-link to="/addsalesdraft" class="btn btn-info btn-icon-split">
                            <span class="icon text-white-50">
                                <i class="fas fa-plus"></i>
                            </span>
                            <span class="text">Make Draft</span>
                        </router-link>

                        <a :href="$root.URL_ROOT + 'salesExport.php'" class="btn btn-primary btn-icon-split">
                            <span class="icon text-white-50">
                                <i class="fas fa-download"></i>
                            </span>
                            <span class="text">Download All Sales CSV</span>
                        </a>
                       
                    </div>

                   
                    <hr class="sidebar-divider d-none d-md-block">
                    <!-----Tabel-->

                       
                        <table class="rwd-table shadow ">
                            <tbody>
                            <tr>
                                <th>Invoice</th>
                                <th>Client Name</th>
                                <th>Payment Type</th>
                                <th>Non-Billing Amount</th>
                                <th>Billing Amount</th>
                                <th>Due Amount</th>
                                <th>Total Amount</th>
                                <th>Billing Date</th>
                                <th>Action</th>
                                
                            </tr>
                            <template v-for="ldata in listData">
                                <tr>
                                    <td data-th="invoice">
                                        {{ldata.invoice_no}}
                                    </td>
                                    <td data-th="Client Name">
                                        {{ldata.c_name}}
                                    </td>
                                    <td data-th="payment type">
                                       <template v-if="ldata.payment_type==1">Full Payment</template>
                                       <template v-if="ldata.payment_type==2">Partially Payment</template>
                                       <template v-if="ldata.payment_type==3">Without GST Payment</template>
                                    </td>
                                    <td data-th="non-biiling">
                                      {{ldata.non_billing_amount}}
                                    </td>
                                    <td data-th="billing">
                                        {{ldata.billing_amount}}
                                    </td>
                                    <td data-th="due-amount">
                                        {{ldata.due_amount}}
                                    </td>
                                    <td data-th="grand_total">
                                        {{ldata.grand_total}}
                                    </td>
                                    <td data-th="Invoice Date">
                                        {{ldata.billing_date}}
                                    </td>
                                    <td data-th="Due Date" v-if="ldata.status==1">
                                        <router-link :to="'/editsales/'+ldata.id" class="btn btn-primary btn-icon-split">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-edit"></i>
                                            </span>
                                            <span class="text">Edit</span>
                                        </router-link>
                                        <br /><br />

                                        <router-link :to="'/viewsales/'+ldata.id" class="btn btn-primary btn-icon-split">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-eye"></i>
                                            </span>
                                            <span class="text">View Report</span>
                                        </router-link> 
                                        <br /><br />
                                        <button @click="deleteSales(ldata.id)" class="btn btn-primary btn-icon-split">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-trash"></i>
                                            </span>
                                            <span class="text">Delete Sales</span>
                                        </button> 
                                        <br /><br />
                                        <a :href="$root.URL_ROOT + 'sendpdf/sales.php?sid='+ldata.id" class="btn btn-primary btn-icon-split">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-envelope"></i>
                                            </span>
                                            <span class="text">Send Mail</span>
                                        </a>

                                       
                                        
                                    </td>

                                    <td data-th="Due Date" v-else>
                                        <router-link :to="'/editsalesdraft/'+ldata.id+'/edit'" class="btn btn-primary btn-icon-split">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-edit"></i>
                                            </span>
                                            <span class="text">Edit Draft</span>
                                        </router-link>
                                        <br /><br />

                                        <router-link :to="'/editsalesdraft/'+ldata.id+'/payment'" class="btn btn-primary btn-icon-split">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-edit"></i>
                                            </span>
                                            <span class="text">Make Payment</span>
                                        </router-link>

                                        

                                        
                                        
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
        Pagination
    },
    // props: ["isHas"],
    data() {
        return {
            listData:[],
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
            if(this.checks.sales==0){
                this.$router.push('/login')
            }
        }

        this.getSalesList();
         
    },
    watch: {
        page2: function (vl) {
            this.changePage()
        },
    },
    methods: {
        getSalesList(){
            var ev=this;
            axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'getSales', 
                    }
                }).then(function(response) {
                    var data=response.data;
                    if(data.status=='success'){
                       ev.listData=data.data;
                        console.log(data)
                        ev.newAry=data.data;
                        ev.totalCount = data.count
                        ev.changePage()
                    }
                    
                })
        },
        deleteSales(sid){
            var ev=this;
            axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'deleteSales', 
                        sid: sid
                    }
                }).then(function(response) {
                    var data=response.data;
                    console.log(data)
                    if(data.status=='success'){
                        ev.$toasted.global.success({message:data.msg});
                        ev.getSalesList();
                    }else{
                        ev.$toasted.global.error({message:data.msg});
                    }
                    
                })

        },
        changePage() {
           
           this.listData = []
           const preCount = (this.perPage * this.page2)
           const temp = this.perPage
           let newPP = (preCount) - temp
           for (let i = 0; i < temp; i++) {
               if (this.newAry[newPP]) {
                   this.listData[i] = this.newAry[newPP]
                   newPP++
               }
           }
       }, 
    },
};
</script>