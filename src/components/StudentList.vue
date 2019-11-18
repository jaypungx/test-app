<template>
  <v-row justify="center">
    <v-data-table
      :headers="headers"
      :items="students"
      sort-by="id"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Student List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on"
                >Add Student</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <!-- <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.id"
                        label="ID"
                      ></v-text-field>
                    </v-col> -->
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.fname"
                        label="First Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.lname"
                        label="Last Name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.batch"
                        label="Batch"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.birthday"
                        label="Birthday (dd/MM/YYYY ex. 31/12/2012)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <!-- <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon> -->
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <template>
      <div class="text-center">
        <v-snackbar
          v-model="snackbar"
          :multi-line="multiLine"
          :timeout="snackbarTimeout"
          :color="snackbarColor"
        >
          {{ snackbarText }}
          <v-btn dark text @click="snackbar = false">
            Close
          </v-btn>
        </v-snackbar>
      </div>
    </template>
  </v-row>
</template>

<script>
const request = require("request");

export default {
  data: () => ({
    search: "",
    dialog: false,
    headers: [
      { text: "ID", aligh: "left", value: "id" },
      {
        text: "First Name",
        align: "left",
        value: "fname"
      },
      { text: "Last Name", value: "lname" },
      { text: "Batch", value: "batch" },
      { text: "Birthday", value: "birthday" },
      { text: "Actions", value: "action", sortable: false }
    ],
    students: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      fname: "",
      lname: "",
      batch: "",
      birthday: ""
    },
    defaultItem: {
      id: "",
      fname: "",
      lname: "",
      batch: "",
      birthday: ""
    },
    multiLine: true,
    snackbarTimeout: 2000,
    snackbarColor: "",
    snackbar: false,
    snackbarText: ""
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Student" : "Edit Student";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.students = this.getData();
    },

    // editItem(item) {
    //   this.editedIndex = this.students.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.dialog = true;
    // },

    deleteItem(item) {
      const index = this.students.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.deleteStudent(item.id) &&
        this.students.splice(index, 1);
    },

    snackbarOpen(txt, color) {
      this.snackbarText = txt;
      this.snackbarColor = color;
      this.snackbar = true;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.students[this.editedIndex], this.editedItem);
      } else {
        this.addStudent(
          this.editedItem.fname.toString(),
          this.editedItem.lname.toString(),
          this.editedItem.batch,
          this.editedItem.birthday.toString()
        ) &&
          this.students.push(this.editedItem) &&
          this.getData();
      }
      this.close();
    },

    getData() {
      request.get("http://134.209.96.147:8080/data", (err, res, body) => {
        return (this.students = JSON.parse(body).data);
      });
    },

    addStudent(fname, lname, batch, birthday) {
      return request.post(
        `http://134.209.96.147:8080/addStudent?fname=${fname}&lname=${lname}&batch=${batch}&birthday=${birthday}`,
        (err, res, body) => {
          if (err) this.snackbarOpen("Error when adding new student", "error");
          let result = JSON.parse(body);
          if (result.addStatus) {
            this.snackbarOpen("Student added", "success");
            return true;
          } else {
            this.snackbarOpen("Failed to add student", "error");
            return false;
          }
        }
      );
    },

    deleteStudent(id) {
      return request.delete(
        `http://134.209.96.147:8080/deleteStudent/${id}`,
        (err, res, body) => {
          if (err) this.snackbarOpen("Error when deleting student", "error");
          let result = JSON.parse(body);
          if (result.deleteStatus) {
            this.snackbarOpen("Student deleted", "success");
            return true;
          } else {
            this.snackbarOpen("Failed to delete student", "error");
          }
        }
      );
    }
  }
};
</script>
