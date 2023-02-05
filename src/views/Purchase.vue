<template>
    <div id="page-top">
        <!-- Page Wrapper -->
        <div id="wrapper">
            <!-- Sidebar -->
               <Sidebar navStatus="purchase"/>
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
                        <h1 class="h3 mb-0 text-gray-800">Purchase List</h1>

                        <router-link :to="'/addpurchase'" class="btn btn-info btn-icon-split">
                            <span class="icon text-white-50">
                                <i class="fas fa-plus"></i>
                            </span>
                            <span class="text">Add New Stock</span>
                        </router-link>
                       
                    </div>

                    <hr class="sidebar-divider d-none d-md-block">
                    <!-----Tabel-->

                       
                        <table class="rwd-table shadow ">
                            <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Vandor Name</th>
                                <th>Billing Amount</th>
                                <th>Non-Billing Amount</th>
                                <th>Grand Total</th>
                                <th>Due Amount</th>
                                <th>Update Date</th>
                                <th>Action</th>
                                
                            </tr>
                            <template v-for="ldata in listData">
                                <tr>
                                    <td data-th="Supplier Code">
                                        {{ldata.id}}
                                    </td>
                                    <td data-th="Supplier Name">
                                        {{ldata.name}}
                                    </td>
                                    <td data-th="Invoice Number">
                                        {{ldata.billing_amount}}
                                    </td>
                                    <td data-th="Invoice Date">
                                       {{ldata.non_billing_amount}}
                                    </td>
                                    <td data-th="Invoice Date">
                                        {{ldata.grand_total}}
                                    </td>
                                    <td data-th="Invoice Date">
                                        {{ldata.due_amount}}
                                    </td>
                                    <td data-th="Invoice Date">
                                        {{ldata.udate}}
                                    </td>
                                    <td data-th="Due Date">
                                        <router-link :to="'/editpurchase/'+ldata.id" class="btn btn-primary btn-icon-split">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-edit"></i>
                                            </span>
                                            <span class="text">Edit</span>
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
            user_token: localStorage.getItem("user_token"),
            user_token_name: localStorage.getItem("user_token_name"),

            page2: 1,
            totalCount: 0,
            newAry: [],
            perPage: 5,
            newAry:[],

            checks: JSON.parse(localStorage.getItem("checks")),
            role: localStorage.getItem("role"),
            
        };
    },
    mounted() {
        if(localStorage.getItem("user_token")=='' || !localStorage.getItem("user_token")>0){
            this.$router.push('/login')
        }

        if(this.role!='Admin'){
            if(this.checks.purchase_stock==0){
                this.$router.push('/login')
            }
        }

        this.getPurchaseList();
         
    },
    watch: {
        page2: function (vl) {
            this.changePage()
        },
    },
    methods: {
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
        getPurchaseList(){
            var ev=this;
            axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'getStockData', 
                    }
                }).then(function(response) {
                    var data=response.data;
                    if(data.status=='success'){
                       ev.listData=data.data;

                       ev.newAry=data.data;
                        ev.totalCount = data.count
                        ev.changePage()
                        
                        console.log(data)
                    }
                    
                })
        }
    },
};
</script>



