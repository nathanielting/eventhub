<template>
  <v-container>
    <h3 class="mb-4">Create Event</h3>
    <div class="d-flex align-content-start flex-wrap">
      <TextInput
        label="Name"
        v-model="schema.name"
        name="name"
        class="pa-2"
        >
      </TextInput>
      <TextInput
        label="Collection Name"
        v-model="schema.collectionName"
        name="collectionName"
        class="pa-2"
        >
      </TextInput>
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
    <ModelInput v-model="emptyInputModel"></ModelInput>
    <div>
      {{emptyInputModel}}
    </div>
    <div class="my-3">
    <v-btn @click="handleUpdateForm()">Submit</v-btn>
    </div>
  </v-container>
</template>

<script>
  import axios from "axios";
  import TextInput from "./TextInput";
  import ModelInput from "./ModelInput";

  export default {
  components: { TextInput, ModelInput},
    data() {
      return {
        schema: {
          name: '',
          collectionName: '',
          date: '',
          model_schema: [],
        },
        datemenu: false,
        emptyInputModel : {
          name:'',
          type:'',
          label:'',
          fieldType:'',
          options:[]
        },
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
      }
    }
  }
</script>