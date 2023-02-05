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
                                   
                                    <!----client and product details section--->
                                    <div class="col-md-8">
                                        <div class="card">
                                            <div class="card-header">
                                                Client Information
                                            </div>
                                            <div class="card-body">
                                                <div class="row">

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Payment Type</label>
                                                            <select class="form-control" v-model="payment_type">
                                                                <option value="">Select Payment Type</option>
                                                                <option value="1">Full Payment</option>
                                                                <option value="2">Partially Payment</option>
                                                                <option value="3">Without Billing</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Client Name</label>
                                                            <!-- <input type="text" class="form-control" v-model="cid"/> -->
                                                            <select class="form-control" v-model="cid">
                                                                <option value="">Select Client</option>
                                                                <template v-for="cdata in clientList">
                                                                    <option :value="cdata.id">{{cdata.name}}</option>
                                                                </template>

                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6" >
                                                        <div class="form-group">
                                                            <label>Billing Address</label>
                                                            <textarea class="form-control" v-model="billing_address" placeholder="Billing Address" rows="4" ></textarea>
                                                         </div>   
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Delivery Address</label>
                                                            <textarea class="form-control" v-model="delivery_address" placeholder="Delivery Address" rows="4" ></textarea>
                                                         </div>   
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Billing Date</label>
                                                            <input class="form-control" v-model="billing_date" type="date" />
                                                         </div>   
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Invoice No.</label>
                                                            <input class="form-control" v-model="invoice_no" type="number" placeholder="Invoice No." />
                                                         </div>   
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="card mt-30">
                                            <div class="card-header">
                                                Product Details
                                            </div>
                                            <div class="card-body overflow-div product-details">
                                                <div class="row section-di" v-for="(input,k) in inputs" :key="k">
                                
                                                        <template >
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
                                    <!----payment right section--->
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
                                                
                                                <div class="form-group" v-if="payment_type==2">
                                                    <label>Billing Amount</label>
                                                    <input class="form-control" v-model="billing_amount" @keyup="changeGrandTotal()" type="number" placeholder="Billing Amount">
                                                </div>  

                                                <div class="form-group" v-if="payment_type==2">
                                                    <label>Non-Billing Amount</label>
                                                    <input class="form-control" v-model="non_billing_amount" disabled type="number" placeholder="Non-Billing Amount">
                                                </div>  

                                                <div class="form-group">
                                                    <label>Other Charges</label>
                                                    <select class="form-control" v-model="other_charge" >
                                                        <option value="">Select Other Chargers</option>
                                                        <option value="Transport">Transportation Charges</option>
                                                        <option value="Unloading">Unloading Charges</option>
                                                        <option value="Transportation & Unloading">Transportation & Unloading Charges</option>
                                                    </select>
                                                </div>  


                                                <div class="form-group"  v-if="other_charge!=''">
                                                    <label>Pay By</label>
                                                    <select class="form-control" v-model="pay_by" >
                                                        <option value="">Select Pay By</option>
                                                        <option value="client">Pay by Client</option>
                                                        <option value="ecogen">Pay by ECOGEN</option>
                                                    </select>
                                                </div>  

                                                <div class="form-group" v-if="other_charge!=''">
                                                    <label>Other Charges Amount</label>
                                                    <input class="form-control" v-model="other_charge_amount" @keyup="changeGrandTotal()" type="number" placeholder="Other Charges Amount">
                                                </div>  


                                                <div class="form-group">
                                                    <label>Round Off</label>
                                                    <select class="form-control" v-model="round_off" >
                                                        <option value="">Select Round Off</option>
                                                        <option value="1">Round Off Up</option>
                                                        <option value="2">Round Off Down/Discount </option>
                                                    </select>
                                                </div>  

                                                <div class="form-group" v-if="round_off!=''">
                                                    <label>Round Off Amount</label>
                                                    <input class="form-control" v-model="round_off_amount" @keyup="updateRoundOff" type="number" placeholder="Round Off Amount">
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

                                        <div class="card mt-30">
                                            <div class="card-header">
                                               
                                            </div>
                                            <div class="card-body">
                                                <div class="form-group">
                                                    <label>Remark</label>
                                                    <textarea v-model="remark" class="form-control" rows="4" placeholder="Enter Remark"></textarea>
                                                </div> 
                                                
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <!----Payemnet details----->
                                    <div class="col-md-8 mt-30">
                                        <div class="card">
                                            <div class="card-header">
                                                Payment Details
                                            </div>
                                            <div class="card-body">
                                                <div class="row">

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

                                                    

                                                    <div class="col-md-12">
                                                        <button class="btn btn-info" @click="saveSales()" >Update Payment History</button>
                                                    </div>
                                                
                                                </div>
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
import { parse } from "path";

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
                    quantity: "",
                    size:'',
                    thickness: "",
                    price:'',
                    total: "",
                }
            ],
            options:[],
            clientList:[],
            cid:'',
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
            non_billing_due_amount:0,
            grand_total:0,
            non_billing_amount:0,
            amount:0,
            paymentDate:'',
            invoice_no:'',
            payment_mode:'',
            remark:'',
            user_token: localStorage.getItem("user_token"),
            user_token_name: localStorage.getItem("user_token_name"),
            hideGST:true,
            sizeList:[],
            thicknessList:[],
            round_off:'',
            round_off_amount:0,
            pay_by:'',

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

        this.getProductList();
        this.getClientList();
        //this.getProductDetails();
       
    },
    watch: {
        billing_amount: function (vl) {
            this.chnageNonBilling();
        }, 
        total_amount: function (vl) {
            if(this.payment_type==2){
                this.chnageNonBilling();
            }
        },
        other_charge_amount: function (vl) {
            if(this.payment_type==1){
                if(vl>0){
                    this.grand_total=parseInt(this.total_amount)+parseInt(vl)
                }else{
                    this.grand_total=parseInt(this.total_amount)+0;
                }
               
            }else{
                if(vl>0){
                    this.grand_total=parseInt(this.billing_amount)+parseInt(vl);
                }else{
                    this.grand_total=parseInt(this.billing_amount)+0;
                }
            }
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
              this.changeTotalAmount()
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
            else if(this.billing_date==''|| this.billing_date==null){
                this.$toasted.global.error({message:'please select billing date'});
            }
            else if(this.payment_type==''|| this.payment_type==null){
                this.$toasted.global.error({message:'please select payment type'});
            }
            else if(this.billing_address==''|| this.billing_address==null){
                this.$toasted.global.error({message:'please select billing address'});
            }
            else if(this.delivery_address==''|| this.delivery_address==null){
                this.$toasted.global.error({message:'please select delivery address'});
            }
            else if(this.invoice_no==''|| this.invoice_no==null){
                this.$toasted.global.error({message:'please select invoice no.'});
            }
            else if(this.total_amount==''|| this.total_amount==null){
                this.$toasted.global.error({message:'please enter total amount'});
            }
            else if(this.paymentDate==''|| this.paymentDate==null){
                this.$toasted.global.error({message:'please select payment date'});
            }
            else if(this.amount==''|| this.amount==null){
                this.$toasted.global.error({message:'please enter amount'});
            }
            else if(this.payment_mode=='' || this.payment_mode==null){
                this.$toasted.global.error({message:'please selct payment mode'});
            }
            else{
                axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'saveSales', 
                        cid:this.cid,
                        billing_date:this.billing_date,
                        payment_type: this.payment_type,
                        billing_address:this.billing_address,
                        invoice_no: this.invoice_no,
                        delivery_address: this.delivery_address,
                        total_amount: this.total_amount,
                        billing_amount: this.billing_amount,
                        non_billing_amount: this.non_billing_amount,
                        paid_amount: this.paid_amount,
                        other_charge: this.other_charge,
                        other_charge_amount: this.other_charge_amount,
                        due_amount: this.due_amount,
                        non_billing_due_amount: this.non_billing_due_amount,
                        product_details: this.inputs,
                        grand_total:this.grand_total,
                        amount: this.amount,
                        payment_date: this.paymentDate,
                        payment_mode: this.payment_mode,
                        remark: this.remark,
                        round_off: this.round_off,
                        round_off_amount: this.round_off_amount,
                        pay_by: this.pay_by,
                        
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
            if(this.payment_type==1){
                ev.grand_total=parseInt(ev.total_amount)+parseInt(ev.other_charge_amount);
            }
            
        },
        changeGrandTotal(){
            if(this.pay_by=='client'){
                this.grand_total=parseInt(this.total_amount)+parseInt(this.other_charge_amount);
            }else{
                this.grand_total=parseInt(this.total_amount)
            }
            
        },
        changeDueAmount(){
            if(this.payment_mode==2){
                this.non_billing_due_amount=parseInt(this.grand_total)-parseInt(this.amount);
            }else{
                this.due_amount=parseInt(this.grand_total)-parseInt(this.amount);
            }
            
        },
        changePaidAmount(){
            this.paid_amount=this.amount;
        },
        updateRoundOff(){
            if(this.round_off_amount>0){
                if(this.round_off=='1'){
                    
                    if(this.pay_by=='client'){
                        this.grand_total=parseInt(this.total_amount)+parseInt(this.round_off_amount)+parseInt(this.other_charge_amount);
                    }
                    else{
                        this.grand_total=parseInt(this.total_amount)+parseInt(this.round_off_amount);
                    }
                    
                   
                }else if(this.round_off=='2'){
                    //console.log('minus',parseInt(this.total),parseInt(this.round_off_amount),parseInt(this.other_charge_amount))
                    if(this.pay_by=='client'){
                        this.grand_total=(parseInt(this.total_amount)+parseInt(this.other_charge_amount))-parseInt(this.round_off_amount);
                    }else{
                        his.grand_total=(parseInt(this.total_amount))-parseInt(this.round_off_amount);
                    }
                }
            }else{
                if(this.pay_by=='client'){
                    this.grand_total=parseInt(this.total_amount)+parseInt(this.other_charge_amount);
                }else{
                    this.grand_total=parseInt(this.total_amount);
                }
                
            }
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
        }
       
       

    },
};
</script>



