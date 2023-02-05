<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import axios from "axios";
require("./assets/vendor/fontawesome-free/css/all.min.css");
require("./assets/css/sb-admin-2.min.css");
require("./assets/css/style.css");

// require("./assets/css/3610ecb4adedc30e4584.css");
// require("./assets/css/0093d6031c497221edfe.css");
// require("./assets/css/13220f8e201d50f1c5da.css");

export default {
  data() {
    return {
      ip_address: JSON.parse(localStorage.getItem("ip_address")),
      ratings: 0,
    };
  },
  mounted() {
    this.goToTop();
    //  this.getConfig()
    this.myIpData();
    this.ip_address = JSON.parse(localStorage.getItem("ip_address"));
    this.uid = localStorage.getItem("user");
    this.setRatings();
  },
  methods: {
    update () {
      const param = {
        type: 'l_time'
      }
      axios({
        method: 'POST',
        url: this.$root.URL_ROOT + 'api.php',
        data: param
      }).then(function (response) {
        const data = response.data
       // console.log('status', data)
      })
    },
    setRatings() {
      var ev = this;
      axios
        .post(this.$root.URL_ROOT + "api.php?type=setRating")
        .then(function (response) {
          var data = response.data;
          // console.log(response)
          if (data.status == "success") {
            ev.ratings = data.data;
          }
        });
    },
    // async getConfig () {
    //   const response = await axios.get(this.$root.URL_ROOT + 'api.php?type=linksdetails')
    //   this.$store.commit('getConfig', response.data.data)
    // },
    goToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    myIpData() {
      var ip_address = JSON.parse(localStorage.getItem("ip_address"));

      if (ip_address == null) {
        var min = 100000;
        var max = 999999;
        var num = Math.floor(Math.random() * (max - min + 1)) + min;
        localStorage.setItem("ip_address", JSON.stringify(num));
      }
    },
  },
};
</script>

