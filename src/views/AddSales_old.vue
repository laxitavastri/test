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
                        <h1 class="h3 mb-0 text-gray-800">Add Sales</h1>                       
                    </div>

                    <hr class="sidebar-divider d-none d-md-block">

                    <div class="">
                        <div class="form-card card shadow mb-4">
                            <div class="card-body">
                                
                                <div class="card-header py-3">
                                    <h3 class="m-0 font-weight-bold text-primary">Sales Information</h3>
                                </div>
                                <div class="row pt-5 pb-5">
                                   

                                    <div class="col-md-8 r-br">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Payment Type</label>
                                                    <select class="form-control" v-model="payment_type">
                                                        <option value="">Select Payment Type</option>
                                                        <option value="1">Full Payment</option>
                                                        <option value="2">Partially Payment</option>
                                                        <option value="3">Without GST</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Client Name</label>
                                                    <select class="form-control" v-model="cid">
                                                        <option value="">Select Client</option>
                                                        <template v-for="cdata in clientList">
                                                            <option :key="cdata.id" :value="cdata.id">{{cdata.name}}</option>
                                                        </template>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Select Sales Date</label>
                                                    <input type="date" class="form-control" v-model="udate" />
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="form-group row" v-for="(input,k) in inputs" :key="k">
                                                    <div class="col-md-6">
                                                        <label>Select Product</label>
                                                    <model-select :options="options" v-model="input.pid" @input="changePrice(); checkStock(input.pid,k);" placeholder="Select Product"></model-select>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label>Enter Qunatity</label>
                                                        <input type="number" class="form-control" @keyup="changePrice()" placeholder="Enter quantity" v-model="input.qty" />
                                                    </div>
                                                
                                                   <div class="col-md-6">
                                                        <span>
                                                            <i class="fa fa-minus-circle" style="margin:10px 30px;font-size:22px" @click="removeF(k)" v-show="k || ( !k && inputs.length > 1)"></i>
                                                        
                                                            <i class="fa fa-plus-circle" style="margin:10px 30px;font-size:22px" @click="add(k)" v-show="k == inputs.length-1" ></i>
                                                        </span>
                                                   </div>
                                                   <div class="col-md-6">
                                                        <div :id="'stock-data-'+k" ></div>
                                                   </div>
                                                    
                                                </div>
                                            </div>

                                        </div>
                                        

                                    </div>
                                    <div class="col-md-4 ">
                                        <div class="card p-10">

                                           
                                        
                                            <div class="form-group">
                                                <label>Total Amount</label>
                                                <input type="number" disabled v-model="total_amount" class="form-control" placeholder="Enter Total Amount"/>
                                            </div>

                                            <div class="form-group">
                                                <label>Billing Amount</label>
                                                <input type="number" v-model="billing_amount" id="bill" class="form-control" @keyup="changeDueAmount" placeholder="Enter Billing Amount"/>
                                            </div>

                                            <div class="form-group" v-if="hideGST">
                                                <label>GST Amount</label>
                                                <input type="number" disabled v-model="gst_amount"  class="form-control"  placeholder="Enter GST Amount"/>
                                            </div>

                                            <div class="form-group">
                                                <label>Grand Total</label>
                                                <input type="number" disabled v-model="grand_total" class="form-control" placeholder="Enter Grand Total"/>
                                            </div>

                                            <div class="form-group">
                                                <label>Paid Amount</label>
                                                <input type="number" v-model="paid_amount" class="form-control" @keyup="changeDueAmount" placeholder="Enter Paid Amount"/>
                                            </div>

                                            <div class="form-group">
                                                <label>Due Amount</label>
                                                <input type="number" disabled v-model="due_amount" class="form-control" placeholder="Enter Due Amount"/>
                                            </div>

                                            <div class="col-md-12">
                                                <button type="submit" class="btn btn-info" @click="saveSales">Save</button>
                                            </div>

                                        </div>
                                        
                                        
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
import 'vue-search-select/dist/VueSearchSelect.css'
import { ModelSelect } from 'vue-search-select'

export default {
    components: {
        Header,
        Sidebar,
        Footer,
        ModelSelect,
    },
    // props: ["isHas"],
    data() {
        return {
            inputs: [
                {
                    pid: "",
                    qty: "",
                }
            ],
            options:[],
            clientList:[],
            cid:'',
            udate:'',
            payment_type:'',
            total_amount:0,
            billing_amount:0,
            gst_amount:0,
            paid_amount:0,
            due_amount:0,
            grand_total:0,
            extra_amount:0,
            user_token: localStorage.getItem("user_token"),
            user_token_name: localStorage.getItem("user_token_name"),
            hideGST:true,

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
        this.getProductList();
         this.getClientList();
    },
    watch: {
        inputs:function(vl){
            this.changePrice();
            console.log(vl)
           
        },
        payment_type: function(vl){
            this.changePrice();
            this.changeDueAmount();
            if(vl==3){
                this.hideGST=false;
            }else{
                this.hideGST=true;
            }

        },
        grand_total: function(vl){
            if(this.payment_type==3){
                this.extra_amount=this.gst_amount;
            }else{
                this.extra_amount=this.total_amount-vl;
            }
           
            // console.log(this.gst_amount);
            // console.log(this.extra_amount);
        }
    },
    methods: {
        add(index) {
            this.inputs.push({ pid: "", qty: "" });
        },
        removeF(index) {
              this.inputs.splice(index, 1);
        },
        getProductList(){
            var ev=this;
            axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'getProductListDropDown', 
                    }
                }).then(function(response) {
                    var data=response.data;
                    if(data.status=='success'){
                        ev.options=data.data;
                        //console.log(data)
                    }
                    
                })
        },
        getClientList(){
            var ev=this;
            axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'getClient', 
                    }
                }).then(function(response) {
                    var data=response.data;
                    console.log(data)
                    if(data.status=='success'){
                       ev.clientList=data.data
                        
                    }
                    
                })
        },
        saveSales(){
            let ev=this;

            if(this.cid=="" || this.cid==null){
                this.$toasted.global.error({message:'please select client'})
            }
            else if(this.udate==''|| this.udate==null){
                this.$toasted.global.error({message:'please select date'});
            }
            else if(this.payment_type==''|| this.payment_type==null){
                this.$toasted.global.error({message:'please select payment type'});
            }
            else if(this.total_amount==''|| this.total_amount==null){
                this.$toasted.global.error({message:'please enter total amount'});
            }
            else if(this.billing_amount==''|| this.billing_amount==null){
                this.$toasted.global.error({message:'please enter billing amount'});
            }
            else if(this.paid_amount==''|| this.paid_amount==null){
                this.$toasted.global.error({message:'please enter paid amount'});
            }
            else{
                axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'saveSales', 
                        cid:this.cid,
                        udate:this.udate,
                        payment_type: this.payment_type,
                        total_amount: this.total_amount,
                        billing_amount: this.billing_amount,
                        paid_amount: this.paid_amount,
                        due_amount: this.due_amount,
                        product_details: this.inputs,
                        gst_amount:this.gst_amount,
                        grand_total:this.grand_total,
                        extra_amount: this.extra_amount,
                        
                    }
                }).then(function(response) {
                    var data=response.data;
                    console.log(data)
                    if(data.status=='success'){
                        ev.$toasted.global.success({message:data.msg});
                        ev.$router.push('/sales');
                    }else{
                        ev.$toasted.global.error({message:data.msg});
                    }
                    
                    
                })
            }           
            
        },
        changePrice(){
            let ev=this;
            axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'getProductPrice',
                        pdata:this.inputs,
                    }
                }).then(function(response) {
                    //console.log(response.data)
                    let data=response.data;
                   
                      if(ev.payment_type==1 || ev.payment_type==3){
                        let gst=data-((data*100)/(100+18));
                        ev.total_amount=data-parseInt(gst.toFixed(0));
                      }
                      else{
                        ev.total_amount=parseInt(data);
                      }
                      
                      ev.changeDueAmount();
                   
                })

        },
        changeDueAmount(){
            //let final=((411*(18/100))/100)*100;
            let gst=((this.billing_amount*(18/100))/100)*100;
            if(this.payment_type==3){
                this.grand_total=parseInt(this.billing_amount);

            }else{
               
                this.grand_total=parseInt(gst.toFixed(0))+parseInt(this.billing_amount);
            }
           
            this.gst_amount=gst.toFixed(0);
           
            if(this.grand_total>0){
                this.due_amount = this.grand_total-this.paid_amount;
            }else{
                this.due_amount = 0;
            }
            
        },
        checkStock(ids,ind){
            let ev=this;
           
            axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'checkStock',
                        pid: ids
                    }
                }).then(function(response) {
                    console.log(response.data)
                    let data=response.data;
                    //document.getElementById('stock-data-'+ind).innerHTML='Available Stock: '+data.stock;
                    $("#stock-data-"+ind).html('Available Stock: '+data.stock);
                    if(data.status=='error'){
                        ev.$toasted.global.error({message:'Stock not available'})
                    }
                    
                })

        }

    },
};
</script>