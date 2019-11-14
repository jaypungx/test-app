<template>
  <v-ons-page>
    <v-ons-list>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input placeholder="Input your name" float v-model="name"></v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="right">Hello {{ name || 'anonymous' }}!</div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
export default {
  name: "Input",
  data() {
    return {
      name: ""
    };
  }
};
</script>