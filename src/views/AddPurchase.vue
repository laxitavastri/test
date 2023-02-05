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
                        <h1 class="h3 mb-0 text-gray-800">Add Purchase (Stock In)</h1>                       
                    </div>

                    <hr class="sidebar-divider d-none d-md-block">

                    <div class="">
                        <div class="form-card card shadow mb-4">
                            <div class="card-body">
                               
                                <div class="row pt-5 pb-5">

                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label>Vendor Name</label>
                                            <input type="text" class="form-control" v-model="name" placeholder="Enter Vendor Name"/>
                                        </div>


                                        <div class="card mt-30">
                                            <div class="card-header">
                                                Product Details
                                            </div>
                                            <div class="card-body overflow-div product-details">
                                                <div class="row section-di" v-for="(input,k) in inputs" :key="k">
                                
                                                        <template>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label>Select Product</label>
                                                                    <model-select :options="options" v-model="input.pid" @input="getProductDetails(k)" placeholder="Select Product"></model-select>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label>Thickness</label>
                                                                    <!-- <input type="text" v-model="input.thickness" class="form-control" placeholder="Enter Thickness" /> -->
                                                                    <select :class="'form-control thickness-'+k" v-model="input.thickness" >
                                                                        <option value="">Thickness</option>
                                                                        <!-- <template v-for="tdata in thicknessList">
                                                                            <option :value="tdata.thickness">{{tdata.thickness}}</option>
                                                                        </template> -->
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label>Size </label>
                                                                    <!-- <input type="text" v-model="input.size" @keyup="changeTotalAmount(k)"  class="form-control" placeholder="Enter Size (Ex. 8X4)" /> -->
                                                                    <select  :class="'form-control size-'+k" v-model="input.size" @change="changeTotalAmount(k)" >
                                                                        <option value="">Size</option>
                                                                        <!-- <template v-for="tdata in sizeList">
                                                                            <option :value="tdata.size">{{tdata.size}}</option>
                                                                        </template> -->
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label>Per Sq ft Price</label>
                                                                    <input type="number" v-model="input.price" @keyup="changeTotalAmount(k)" class="form-control" placeholder="Enter Per Sq ft Price" />
                                                                </div>
                                                            </div>

                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label>Quantity</label>
                                                                    <input type="number" v-model="input.quantity" @keyup="changeTotalAmount(k)" class="form-control" placeholder="Enter Quantity" />
                                                                </div>
                                                            </div>

                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label>Total</label>
                                                                    <input type="number" v-model="input.total" disabled class="form-control"  />
                                                                </div>
                                                            </div>

                                                            <div class="col-md-6">
                                                                <span>
                                                                    <i class="fa fa-minus-circle" style="margin:10px 30px;font-size:22px" @click="removeF(k)" v-show="k || ( !k && inputs.length > 1)"></i>
                                                                
                                                                    <i class="fa fa-plus-circle" style="margin:10px 30px;font-size:22px" @click="add(k)" v-show="k == inputs.length-1" ></i>
                                                                </span>
                                                            </div>
        
                                                           
                                                        </template>
                                                    
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    
                                    <div class="col-md-4">

                                        <div class="card">
                                            <div class="card-header">
                                                Price Details
                                            </div>
                                            <div class="card-body">
                                                <div class="form-group">
                                                    <label>Total Amount</label>
                                                    <input class="form-control" v-model="total_amount" disabled type="number" placeholder="Total Amount">
                                                </div>   
                                                
                                                <div class="form-group">
                                                    <label>Billing Amount</label>
                                                    <input class="form-control" v-model="billing_amount" @keyup="changeGrandTotal()" type="number" placeholder="Billing Amount">
                                                </div>  

                                                <div class="form-group">
                                                    <label>Non-Billing Amount</label>
                                                    <input class="form-control" v-model="non_billing_amount" disabled type="number" placeholder="Non-Billing Amount">
                                                </div>  

                                                <div class="form-group">
                                                    <label>Other Charges</label>
                                                    <select class="form-control" v-model="other_charge" >
                                                        <option value="">Select Other Chargers</option>
                                                        <option value="Delivery">Delivery Charges</option>
                                                    </select>
                                                </div>  

                                                <div class="form-group">
                                                    <label>Other Charges Amount</label>
                                                    <input class="form-control" v-model="other_charge_amount" @keyup="changeGrandTotal()" type="number" placeholder="Other Charges Amount">
                                                </div>  

                                                <div class="form-group">
                                                    <label>Grand Total</label>
                                                    <input class="form-control" v-model="grand_total" disabled type="number" placeholder="Grand Total">
                                                </div>  

                                                <div class="form-group">
                                                    <label>Paid Amount</label>
                                                    <input class="form-control" v-model="paid_amount" disabled type="number" placeholder="Paid Amount">
                                                </div>
                                                
                                                <div class="form-group">
                                                    <label>Due Amount</label>
                                                    <input class="form-control" v-model="due_amount" disabled type="number" placeholder="Due Amount">
                                                </div>

                                            </div>
                                        </div>

                                        
                                        
                                    </div>

                                    <div class="col-md-8">
                                        <div class="card">
                                            <div class="card-header">
                                                Payment Details
                                            </div>
                                            <div class="card-body">
                                                <div class="row">
                                                    
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>Payment Date</label>
                                                            <input type="date" v-model="paymentDate" name="paymentDate" class="form-control" />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>Amount</label>
                                                            <input type="number" v-model="amount" @keyup="changeDueAmount(); changePaidAmount();" class="form-control" />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>Payment Mode</label>
                                                            <select class="form-control" v-model="payment_mode">
                                                                <option value="">Select </option>
                                                                <option value="cheque">Cheque</option>
                                                                <option value="cash">Cash</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                   
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12 mt-30">
                                        <button class="btn btn-info " @click="saveStock()" >Add Stock</button>
                                    </div>

                                  

                                    <!----Payemnet details----->
                                    
                                    
                                    

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
            name:'',
            pid:'',
            qty:'',
            amount:'',
            options: [],
            user_token: localStorage.getItem("user_token"),
            user_token_name: localStorage.getItem("user_token_name"),

            inputs: [
                {
                    pid: "",
                    quantity: "",
                    size:'',
                    thickness: "",
                    price:'',
                    total: "",
                }
            ],

            billing_date:'',
            billing_address:'',
            delivery_address:'',
            payment_type:'',
            total_amount:0,
            billing_amount:0,
            other_charge:'',
            other_charge_amount:0,
            paid_amount:0,
            due_amount:0,
            grand_total:0,
            non_billing_amount:0,
            amount:0,
            paymentDate:'',
            invoice_no:'',
            payment_mode:'',
            remark:'',
            sizeList:[],
            thicknessList:[],

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
        
        this.getProductList();
        //this.getProductDetails();
    },
    watch: {
        billing_amount: function (vl) {
            this.chnageNonBilling();
        }, 
        total_amount: function (vl) {
            this.chnageNonBilling();
        },
    },
    methods: {
        add(index) {
            this.inputs.push({ 
                    pid: "",
                    quantity: 0,
                    size:'',
                    thickness: "",
                    price: 0,
                    total: 0,
             });
            console.log($(".product-details").height())
            var d = $('.product-details');
            d.scrollTop(d.prop("scrollHeight"));
            
        },
        removeF(index) {
              this.inputs.splice(index, 1);
              //this.changeTotalAmount()
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
        getProductDetails(ids){
            let ev=this;
            //console.log(ids)

            axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'getProductSize', 
                        pid: this.inputs[ids].pid,
                    }
                }).then(function(response) {
                    let data=response.data;
                    console.log(data)
                    let thickness_data='<option value="">Thickness</option>';
                    let size_data='<option value="">Size</option>';
                    data.thickness.forEach((value,index)=>{
                        console.log(value)
                        //$(".thickness-"+ids).append("<option value="+value.thickness+">"+value.thickness+"</option>");
                        thickness_data+="<option value="+value.thickness+">"+value.thickness+"</option>";
                    })

                    $(".thickness-"+ids).html(thickness_data);

                    data.size.forEach((value,index)=>{
                        console.log(value)
                        //$(".thickness-"+ids).append("<option value="+value.thickness+">"+value.thickness+"</option>");
                        size_data+="<option value="+value.size+">"+value.size+"</option>";
                    })

                    $(".size-"+ids).html(size_data);

                    ev.sizeList=data.size;
                    ev.thicknessList=data.thickness;
                })
        },
        saveStock(){
            var ev=this;

            if(this.name=='' || this.name==null){
                this.$toasted.global.error({
                    message: 'Please enter vendor name'
                })
            }else if(this.billing_amount=='' || this.billing_amount==null ){
                this.$toasted.global.error({
                    message: 'Please enter billing amount'
                })
            }else if(this.paymentDate=='' || this.paymentDate==null ){
                this.$toasted.global.error({
                    message: 'Please select payment date'
                })
            }else if(this.amount=='' || this.amount==null){
                this.$toasted.global.error({
                    message: 'Please enter amount'
                })
            }else if(this.payment_mode=='' || this.payment_mode==null){
                this.$toasted.global.error({
                    message: 'Please select payment mode'
                })
            }
            else{
                axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'add_stock', 
                        name: this.name,
                        product_details: this.inputs,
                        total_amount: this.total_amount,
                        billing_amount: this.billing_amount,
                        non_billing_amount: this.non_billing_amount,
                        other_charge: this.other_charge,
                        other_charge_amount: this.other_charge_amount,
                        grand_total: this.grand_total,
                        paid_amount: this.paid_amount,
                        due_amount: this.due_amount,
                        payment_date: this.paymentDate,
                        amount: this.amount,
                        payment_mode: this.payment_mode
                    }
                }).then(function(response) {
                    var data=response.data;
                    console.log(data)
                    if(data.status=='success'){
                        ev.$toasted.global.success({
                            message: data.msg
                        })
                        ev.$router.push('/purchase');
                    }else{
                        ev.$toasted.global.error({
                            message: data.msg
                        })
                    }
                })

            }

            
        },
        getProductList_old(){
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
        chnageNonBilling(){
            this.non_billing_amount=this.total_amount-this.billing_amount;
        },
        changeTotalAmount(ids){
            let total=0;
            let ev=this;
            if(!(ids==undefined)){
                let splitData=this.inputs[ids].size.split('X');
                let area=splitData[0]*splitData[1];
                this.inputs[ids].total=(this.inputs[ids].price*area)*(this.inputs[ids].quantity);
            }
            
            this.inputs.forEach((value, index) => {
                total=total+value.total;
                //console.log(total)
                ev.total_amount=total;
            })
            
        },
        changeGrandTotal(){
            this.grand_total=parseInt(this.billing_amount)+parseInt(this.other_charge_amount);
            console.log()
        },
        changeDueAmount(){
            this.due_amount=parseInt(this.grand_total)-parseInt(this.amount);
        },
        changePaidAmount(){
            this.paid_amount=this.amount;
        },
    },
};
</script>