<template>
    <div class="bg-gradient-primary-1">
        <div class="container">

            <!-- Outer Row -->
            <div class="row justify-content-center">
    
                <div class="col-xl-10 col-lg-12 col-md-9">
    
                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <!-- Nested Row within Card Body -->
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div class="col-lg-6">

                                    <div class="row top-btn-area">
                                        <div class="col-6">
                                            <button :class="checkLoginBtn=='Admin'?'btn top-btn top-active':'btn top-btn'" @click="checkLoginBtn='Admin'">Super Admin</button>
                                        </div>
                                        <div class="col-6">
                                            <button :class="checkLoginBtn=='SubAdmin'?'btn top-btn top-active':'btn top-btn'" @click="checkLoginBtn='SubAdmin'">Sub Admin</button>
                                        </div>
                                    </div>
                                    
                                    <div class="p-5" v-if="checkLoginBtn=='Admin'">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>

                                            <h3>Super Admin Login</h3>
                                        </div>
                                        <div class="user">
                                            <div class="form-group">
                                                <input type="text" class="form-control form-control-user"
                                                    id="exampleInputEmail" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." v-model="username" >
                                            </div>
                                            <div class="form-group">
                                                <input type="password" class="form-control form-control-user"
                                                    id="exampleInputPassword" placeholder="Password" v-model="password" >
                                            </div>
                                            
                                            <button @click="login" class="btn btn-primary btn-user btn-block">
                                                Login
                                            </button>
                                            
                                           
                                        </div>
                                        <hr>
                                        <!-- <div class="text-center">
                                            <a class="small" href="forgot-password.html">Forgot Password?</a>
                                        </div> -->
                                        
                                    </div>

                                    <div class="p-5 " v-if="checkLoginBtn=='SubAdmin'">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>

                                            <h3>Sub Admin Login</h3>
                                        </div>
                                        <div class="user">
                                            <div class="form-group">
                                                <input type="text" class="form-control form-control-user"
                                                    id="exampleInputEmail" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." v-model="susername" >
                                            </div>
                                            <div class="form-group">
                                                <input type="password" class="form-control form-control-user"
                                                    id="exampleInputPassword" placeholder="Password" v-model="spassword" >
                                            </div>
                                            
                                            <button @click="loginSubAdmin" class="btn btn-primary btn-user btn-block">
                                                Login Sub Admin
                                            </button>
                                            
                                           
                                        </div>
                                        <hr>
                                        <!-- <div class="text-center">
                                            <a class="small" href="forgot-password.html">Forgot Password?</a>
                                        </div> -->
                                        
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
    
                </div>
    
            </div>
    
        </div>
    </div>
</template>



<script>
import axios from "axios";
import $ from "jquery";


export default {
    components: {
        
    },
    
    data() {
        return {
            username:'',
            password:'',
            susername:'',
            spassword:'',
            checkLoginBtn:'Admin',
            user_token: localStorage.getItem("user_token"),
            user_token_name: localStorage.getItem("user_token_name"),
        };
    },
    mounted() {
        if(localStorage.getItem("user_token")=='' || !localStorage.getItem("user_token")>0){
            this.$router.push('/login')
        }
    },
    watch: {
        
    },
    methods: {
        login(){
            var ev=this;

            if(this.username=='' || this.username==null){
                this.$toasted.global.error({ message: 'please enter username', });
            }
            else if(this.password=='' || this.password==null){
                this.$toasted.global.error({ message: 'please enter password'})
            }
            else{

                axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'login',
                        username:this.username,
                        password:this.password
                        
                    }
                }).then(function(response) {
                    var data = response.data;
                    console.log(data)
                    if(data.status=='success'){
                        localStorage.setItem("user_token", data.session.uid);
                        localStorage.setItem("user_token_name", data.session.username);
                        ev.$toasted.global.success({ message: data.msg });
                        localStorage.setItem("role", 'Admin');
                        ev.$router.push('/');
                    }else{
                        ev.$toasted.global.error({ message: data.msg });
                    }
                })
            }    
        },
        loginSubAdmin(){
            let ev=this;
            if(this.susername=='' || this.susername==null){
                this.$toasted.global.error({ message: 'please enter username', });
            }
            else if(this.spassword=='' || this.spassword==null){
                this.$toasted.global.error({ message: 'please enter password'})
            }
            else{

                axios({
                    method: 'POST',
                    url: this.$root.URL_ROOT + 'inventory_api.php',
                    data: {
                        type: 'loginSubAdmin',
                        username:this.susername,
                        password:this.spassword
                        
                    }
                }).then(function(response) {
                    var data = response.data;
                    console.log(data)
                    if(data.status=='success'){
                        localStorage.setItem("user_token", data.session.uid);
                        localStorage.setItem("user_token_name", data.session.username);
                        ev.$toasted.global.success({ message: data.msg });
                        localStorage.setItem("role", data.checks.role_name);
                        localStorage.setItem("checks",JSON.stringify(data.checks))
                        ev.$router.push('/');
                    }else{
                        ev.$toasted.global.error({ message: data.msg });
                    }
                })
            }   
        }
    },
};
</script>



<style>
body{
    background-color: #4e73df;
    background-image: linear-gradient(180deg,#4e73df 10%,#224abe 100%);
    background-size: cover;
}
</style>