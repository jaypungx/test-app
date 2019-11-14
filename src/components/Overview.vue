<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center"></div>
    </v-ons-toolbar>
    <p>
      <v-ons-search-input placeholder="Search something" v-model="query"></v-ons-search-input>
    </p>
    <p>Query: {{ query }}</p>
  </v-ons-page>
</template>

<script>
export default {
  name: "Overview",
  data() {
    return {
      query: ""
    };
  }
};
</script>