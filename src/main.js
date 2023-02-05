import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Toasted from 'vue-toasted'
import { store } from './store'
import cart from './mixins/cart'
// import Particles from "particles.vue";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Pagination from 'vue-pagination-2';
import ZoomOnHover from "vue-zoom-on-hover";
// import SimpleVueRegexDirective from 'simple-vue-regex-directive'
import { loadProgressBar } from 'axios-progress-bar'

import VueSocialauth from 'vue-social-auth'

import 'axios-progress-bar/dist/nprogress.css'
import { ValidationProvider, extend, validate } from 'vee-validate';
import { required, alpha, email, integer, between, regex, min, max, alpha_spaces, alpha_num } from 'vee-validate/dist/rules';
import CommentGrid from 'vue-comment-grid'
 
Vue.use(CommentGrid)
Vue.use(validate);
extend('required', required);
extend('email', email);
extend('alpha', alpha);
extend('alpha_spaces', alpha_spaces);
extend('integer', integer);
extend('between', between);
extend('regex', regex);
extend('min', min);
extend('max', max);
extend('alpha_num', alpha_num)
// Register it globally
// main.js or any entry file.
Vue.component('ValidationProvider', ValidationProvider);
import VueAxios from "vue-axios";
import axios from "axios";

import facebookLogin from 'facebook-login-vuejs';
 
Vue.component('my-component', {
    components: {
        facebookLogin
    }
});

Vue.use(VueAxios, axios);
Vue.use(VueSocialauth, {
    providers: {
      facebook: {
        clientId: "657951751965460",
        redirectUri:
          "https://janatavani.5ineprojects.com/myaccount",
      },
      google: {
        clientId:
          "991583348124-hgjbcaddj3fskmuq8cp8h06pi8rokk9m.apps.googleusercontent.com",
        redirectUri:
          "https://janatavani.5ineprojects.com/myaccount",
      },
    },
  });

extend('required', {
    ...required,
    message: 'This field is required'
});
loadProgressBar()







// Vue.use(require('v-validate'));
// // You can name it anything you like, will be usable with: v-regex with this val
// Vue.directive('regex', SimpleVueRegexDirective({
//   // Arbitrary key-value pairs for input's style. See "Locally" for the default.
//   color: 'red',
// //   'box-shadow': '0 0 5px 5px red inset'
// }))
Vue.use(ZoomOnHover);
Vue.component('pagination', Pagination);
Vue.use(VueSweetalert2)
// Vue.use(Particles);
Vue.mixin(cart)
Vue.use(Toasted)
const error_options = {
    type: 'error',
    position: 'bottom-center',
    singleton: true,
    theme: 'bubble',
    duration: 5000,
    onClick: (e, toastObject) => {
        toastObject.goAway(0)
    }
}
const success_options = {
    type: 'success',
    singleton: true,
    position: 'bottom-center',
    duration: 5000,
    onClick: (e, toastObject) => {
        toastObject.goAway(0)
    }
}
Vue.toasted.register('error',
    (payload) => {
        // if there is no message passed show default message
        if (!payload.message) {
            return 'Oops.. Something Went Wrong..'
        }
        // if there is a message show it with the message
        return payload.message
    },
    error_options
)
Vue.toasted.register('success',
    (payload) => {
        // if there is no message passed show default message
        if (!payload.message) {
            return 'Greate.. Proceed Successfully..'
        }
        // if there is a message show it with the message
        return payload.message
    },
    success_options
)


Vue.config.productionTip = false

new Vue({
    data: {
        URL_ROOT: 'https://calibreply.jurysoftprojects.com/backend/api/',
        // URL_ROOT: 'https://democalibreply.jurysoftprojects.com/backend/api/',
        SHIPPING_URL: 'https://api.ecomexpress.in/apiv2/',
        WEB_ROOT: 'https://calibreply.jurysoftprojects.com',
        URL_IMAGES: 'https://calibreply.jurysoftprojects.com/backend/api/uploads/',
        // URL_IMAGES: 'https://democalibreply.jurysoftprojects.com/backend/api/uploads/',
        Home_link: 'https://calibreply.jurysoftprojects.com',
        OC_API: '83e8e742fcec49fbbbcd7cfca4397a53',
        auth: { Authorization: localStorage.getItem('token') }
    },
    store,
    //stripe,
    router,
    render: h => h(App)
}).$mount('#app')