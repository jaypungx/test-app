<template id="main">
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <v-ons-toolbar>
        <v-ons-fab position="bottom right" :visible="fabVisible">
          <v-ons-icon icon="md-plus"></v-ons-icon>
        </v-ons-fab>
    </v-ons-toolbar>-->
    <v-ons-fab position="top right" :visible="fabVisible">
      <v-ons-icon icon="md-plus"></v-ons-icon>
    </v-ons-fab>

    <div class="center">
      <Overview />
    </div>
    <div class="center">
      <!-- <Input /> -->
    </div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import Overview from "./components/Overview.vue";
// import Input from "./components/Input.vue";

export default {
  name: "app",
  components: {
    // HelloWorld
    Overview
    // Input
  },
  data() {
    return {
      FabVisible: true
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
