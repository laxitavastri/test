<template>
    <div id="page-top">
        <!-- Page Wrapper -->
        <div id="wrapper">
            <!-- Sidebar -->
               <Sidebar navStatus="dashboard" />
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

                         <!-- Page Heading  d-sm-flex-->
                    <div class=" align-items-center justify-content-between mb-4">
                        
                        
                        <div class="row">
                            <div class="col-12">
                                <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                            </div>
                            <div class="col-6">
                                <div class="row">
                                    <div class="col-4">
                                        <label>From Date</label>
                                        <input type="date" class="form-control" v-model="from_date" />
                                    </div>
                                    <div class="col-4">
                                        <label>To Date</label>
                                        <input type="date" class="form-control" v-model="to_date" />
                                    </div>
                                    <div class="col-6">
                                        <button class="btn btn-info w-50 mt-20" @click="getSearchSalesDetails">Search</button>
                                    </div>
                                </div>
                               
                            </div>
                            <div class="col-6">
                                <label>Sales Filter By </label>
                                <select class="form-control" v-model="filterValue">
                                    <option value="all">All Years</option>
                                    <option value="this_year">This Year</option>
                                    <option value="last_year">Last Year</option>
                                    <option value="last_month">Last Month</option>
                                    <option value="this_month">This Month</option>
                                  
                                </select>
                            </div>
                        </div>
                        
                    </div>

                    

                    <h3>Over Sales</h3>

                    <!-- Content Row -->
                    <div class="row">

                        <!-- Earnings (Monthly) Card Example -->
                        <div class="col-xl-4 col-md-6 mb-4">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total Sales</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">₹ {{allCount.totalSales}}</div>
                                        </div>
                                        <div class="col-auto hide">
                                            <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Earnings (Monthly) Card Example -->
                        <div class="col-xl-4 col-md-6 mb-4">
                            <div class="card border-left-success shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Received Payment </div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">₹ {{allCount.paidSales}}</div>
                                        </div>
                                        <div class="col-auto hide">
                                            <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                      
                        <!-- Pending Requests Card Example -->
                        <div class="col-xl-4 col-md-6 mb-4">
                            <div class="card border-left-warning shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Due Payment</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">₹ {{allCount.dueSales}}</div>
                                        </div>
                                        <div class="col-auto hide">
                                            <i class="fas fa-comments fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <h3>GST Sales</h3>

                    <!-- Content Row -->
                    <div class="row">

                        <!-- Earnings (Monthly) Card Example -->
                        <div class="col-xl-4 col-md-6 mb-4">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total GST</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">₹ {{allCount.totalGst}}</div>
                                        </div>
                                        <div class="col-auto hide">
                                            <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Earnings (Monthly) Card Example -->
                        <div class="col-xl-4 col-md-6 mb-4">
                            <div class="card border-left-success shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Received Payment </div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">₹ {{allCount.paidGst}}</div>
                                        </div>
                                        <div class="col-auto hide">
                                            <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                      
                        <!-- Pending Requests Card Example -->
                        <div class="col-xl-4 col-md-6 mb-4">
                            <div class="card border-left-warning shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Due Payment</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">₹ {{allCount.dueGst}}</div>
                                        </div>
                                        <div class="col-auto hide">
                                            <i class="fas fa-comments fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        



                    <h3>Cash Sales</h3>

                    <!-- Content Row -->
                    <div class="row">

                        <!-- Earnings (Monthly) Card Example -->
                        <div class="col-xl-4 col-md-6 mb-4">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total Cash</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">₹ {{allCount.totalNonGst}}</div>
                                        </div>
                                        <div class="col-auto hide">
                                            <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Earnings (Monthly) Card Example -->
                        <div class="col-xl-4 col-md-6 mb-4">
                            <div class="card border-left-success shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Received Payment </div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">₹ {{allCount.paidNonGst}}</div>
                                        </div>
                                        <div class="col-auto hide">
                                            <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                      
                        <!-- Pending Requests Card Example -->
                        <div class="col-xl-4 col-md-6 mb-4">
                            <div class="card border-left-warning shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Due Payment</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">₹ {{allCount.dueNonGst}}</div>
                                        </div>
                                        <div class="col-auto hide">
                                            <i class="fas fa-comments fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <h3>Delivery Payment (Client)</h3>

                    <!-- Content Row -->
                    <div class="row">

                        <!-- Earnings (Monthly) Card Example -->
                        <div class="col-xl-4 col-md-6 mb-4">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total Payment</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">₹ {{allCount.totalDeleveryClient}}</div>
                                        </div>
                                        <div class="col-auto hide">
                                            <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Earnings (Monthly) Card Example -->
                        <div class="col-xl-4 col-md-6 mb-4">
                            <div class="card border-left-success shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Received Payment </div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">₹ {{allCount.paidDeleveryClient}}</div>
                                        </div>
                                        <div class="col-auto hide">
                                            <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                      
                        <!-- Pending Requests Card Example -->
                        <div class="col-xl-4 col-md-6 mb-4">
                            <div class="card border-left-warning shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Due Payment</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">₹ {{allCount.dueDeleveryClient}}</div>
                                        </div>
                                        <div class="col-auto hide">
                                            <i class="fas fa-comments fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <h3>Delivery Payment (ECOGEN)</h3>

                    <!-- Content Row -->
                    <div class="row">

                        <!-- Earnings (Monthly) Card Example -->
                        <div class="col-xl-4 col-md-6 mb-4">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total Payment</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">₹ {{allCount.totalDeleverySelf}}</div>
                                        </div>
                                        <div class="col-auto hide">
                                            <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Earnings (Monthly) Card Example -->
                        <div class="col-xl-4 col-md-6 mb-4">
                            <div class="card border-left-success shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Received Payment </div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">₹ {{allCount.paidDeleverySelf}}</div>
                                        </div>
                                        <div class="col-auto hide">
                                            <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                      
                        <!-- Pending Requests Card Example -->
                        <div class="col-xl-4 col-md-6 mb-4">
                            <div class="card border-left-warning shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Due Payment</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">₹ {{allCount.dueDeleverySelf}}</div>
                                        </div>
                                        <div class="col-auto hide">
                                            <i class="fas fa-comments fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        

                    


                    <hr class="sidebar-divider d-none d-md-block">
                    <!-----Tabel-->

                       <h3>Sales Report</h3>
                        <table class="rwd-table shadow ">
                        <tbody>
                        <tr>
                           
                            <th>Client Name</th>
                            <th>Billing Address</th>
                            <!-- <th>Payment Type</th> -->

                            <th>Grand Total</th>
                            <th>Grand Paid Amount</th>
                            <th>Grand Due Amount</th>

                            <th>Billing Amount</th>
                            <th>Paid Billing Amount</th>
                            <th>Billing Due Amount</th>

                            <th>Non-Billing Amount</th>
                            <th>Paid Non-Billing Amount</th>
                            <th>Non-Billing Due Amount</th>

                            <th>Without GST Amount</th>
                            <th>Without GST Paid</th>
                            <th>Without GST Due</th>
                            
                            <th>Other Charges</th>

                            
                            
                        </tr>
                        <template v-for="ldata in listData">
                            <tr>
                            
                                <td data-th="Client Name">
                                    {{ldata.c_name}}
                                </td>

                                <td data-th="Client Name">
                                    {{ldata.billing_address}}
                                </td>


                                <td data-th="grand_total">
                                    {{ldata.grand_total}}
                                </td>

                                <td data-th="due-amount">
                                    {{ldata.paid_amount}}
                                </td>

                                <td data-th="due-amount">
                                    {{ldata.due_amount}}
                                </td>

                                <!-- <td data-th="payment type">
                                   <template v-if="ldata.payment_type==1">Full Payment</template>
                                   <template v-if="ldata.payment_type==2">Partially Payment</template>
                                   <template v-if="ldata.payment_type==3">Without GST Payment</template>
                                </td> -->

                                <td data-th="billing">
                                    {{ldata.billing_amount}}
                                </td>

                                <td data-th="billing">
                                    {{ldata.paid_billing_amount}}
                                </td>

                                <td data-th="due-amount">
                                    {{ldata.billing_due==''?0:ldata.billing_due}}
                                </td>


                                <td data-th="non-biiling">
                                    {{ldata.non_billing_amount}}
                                  </td>

                                <td data-th="billing">
                                    {{ldata.paid_non_billing_amount<0? 0 : ldata.paid_non_billing_amount}}
                                </td>

                                <td data-th="due-amount">
                                    {{ldata.non_billing_due}}
                                </td>


                                <td data-th="grand_total">
                                    {{ldata.without_gst}}
                                </td>

                                <td data-th="grand_total">
                                    {{ldata.without_gst_paid}}
                                </td>

                                <td data-th="grand_total">
                                    {{ldata.without_gst_due}}
                                </td>

                                

                              

                                

                                <td data-th="due-amount">
                                    {{ldata.other_charge_amount}}
                                </td>

                                

                               
                            </tr>
                        </template>
                        

                        
                       
                        </tbody>
                        </table>
                    <!---Tabel-->


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
            user_token: localStorage.getItem("user_token"),
            user_token_name: localStorage.getItem("user_token_name"),
            allCount:[],
            listData:[],
            filterValue:'all',
            from_date:'',
            to_date:'',
        };
    },
    mounted() {
        console.log(localStorage.getItem("user_token"))
        if(localStorage.getItem("user_token")=='' || !localStorage.getItem("user_token")>0){
            this.$router.push('/login')
        }
        this.getSalesDetails();
        this.getSalesList();
    },
    watch: {
        filterValue: function (vl){
            this.getSalesDetails();
        }
    },
    methods: {
        getSalesDetails(){

            let ev=this;
            axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'getAllCount', 
                        filterValue: this.filterValue,
                    }
                }).then(function(response) {
                    var data=response.data;
                    console.log(data)
                    ev.allCount=data;
                    if(data.msg!='' && data.msg!=null){
                        ev.$toasted.global.error({ message: data.msg})
                    }

                })

        },
        getSalesList(){
            var ev=this;
            axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'getSales', 
                        check: 1,
                    }
                }).then(function(response) {
                    var data=response.data;
                    if(data.status=='success'){
                       ev.listData=data.data;
                        console.log(data)
                    }
                    
                })
        },
        getSearchSalesDetails(){

            let ev=this;

            if(this.from_date==''){
                ev.$toasted.global.error({ message: 'please select date '})
            }else if(this.to_date==''){
                ev.$toasted.global.error({ message: 'please select date '})
            }else{

                axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'getSearchData', 
                        to_date: this.to_date,
                        from_date: this.from_date,
                    }
                }).then(function(response) {
                    var data=response.data;
                    console.log(data)
                    ev.allCount=data;
                    

                })

            }
            

            },
        
    },
};
</script>