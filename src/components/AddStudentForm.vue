<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Add Student Form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            ref="fname"
            v-model="fname"
            :rules="[() => !!fname || 'This field is required']"
            :error-messages="errorMessages"
            label="First Name"
            placeholder=""
            required
          ></v-text-field>
          <v-text-field
            ref="lname"
            v-model="lname"
            :rules="[() => !!lname || 'This field is required']"
            :error-messages="errorMessages"
            label="Last Name"
            placeholder=""
            required
          ></v-text-field>
          <v-text-field
            ref="batch"
            v-model="batch"
            :rules="[() => !!batch || 'This field is required']"
            :error-messages="errorMessages"
            label="Batch"
            placeholder=""
            required
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text>Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip v-if="formHasErrors" left>
              <template v-slot:activator="{ on }">
                <v-btn icon class="my-0" @click="resetForm" v-on="on">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" text @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    errorMessages: "",
    fname: null,
    lname: null,
    batch: null,
    formHasErrors: false
  }),

  computed: {
    form() {
      return {
        fname: this.fname,
        lname: this.lname,
        batch: this.batch
      };
    }
  },

  watch: {
    name() {
      this.errorMessages = "";
    }
  },

  methods: {
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset();
      });
    },
    submit() {
      this.formHasErrors = false;

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true;

        this.$refs[f].validate(true);
      });
    }
  }
};
</script>
