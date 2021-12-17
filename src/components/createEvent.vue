<template>
  <v-container>
    <h3 class="mb-4">New Event</h3>
    <div class="d-flex align-content-start flex-wrap">
      <v-text-field
        label="Name"
        v-model="schema.name"
        name="name"
        class="pa-2"
        >
      </v-text-field>
      <v-text-field
        label="Collection Name"
        v-model="schema.collectionName"
        name="collectionName"
        hint="No spaces"
        class="pa-2"
        >
      </v-text-field>
      <v-menu
        v-model="datemenu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
        >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="schema.date"
            label="Event Date"
            readonly
            v-bind="attrs"
            v-on="on"
            class="pa-2"
            >
          </v-text-field>
        </template>
        <v-date-picker
          v-model="schema.date"
          @input="datemenu = false"
          >
        </v-date-picker>
      </v-menu>
    </div>
    <h3 class="mb-4">Registration Questions</h3>
    <ModelInput
      v-for="(item, index) in schema.model_schema"
      :key="item.id"
      v-model="schema.model_schema[index]"
      @add="addItem(index)"
      @delete="deleteItem(index)"
      >
    </ModelInput>

    <v-row justify="center" v-if="!schema.model_schema.length">
      <v-btn
        elevation="4"
        fab
        dark
        color="light-green"
        bottom
        class="my-6"
        @click="addItem(0)"
        >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <div class="my-3">
    <v-btn @click="handleUpdateForm()">Create</v-btn>
    </div>
  <div>
    {{ schema }}
  </div>
  </v-container>
</template>

<script>
  import axios from "axios";
  import ModelInput from "./ModelInput";

  export default {
  components: { ModelInput},
    data() {
      return {
        schema: {
          name: '',
          collectionName: '',
          date: '',
          model_schema: [],
        },
        datemenu: false,
      }
    },
    methods: {
      handleUpdateForm() {
        let apiURL = process.env.VUE_APP_SERVER_URL + `/model/create`;

        axios.post(apiURL, this.schema).then((res) => {
          console.log(res)
          this.$router.push({name: 'events'})
        }).catch(error => {
          console.log(error)
        });
      },
      deleteItem(index) {
        console.log("delete " + index)
        this.schema.model_schema.splice(index, 1);
      },
      addItem(index) {
        console.log("add " + index)
        let newQuestion = {
          name:'',
          type:'',
          label:'',
          fieldType:'',
          options:[]
        };
        this.schema.model_schema.splice(index+1, 0, newQuestion);
      }
    }
  }
</script>