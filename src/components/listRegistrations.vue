<template>
  <v-container>
    <h3 class="text-center">{{capitalize(eventName)}}</h3>
    <v-data-table
      :headers="headers"
      :items="Documents"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
          small
          class="mr-2"
          icon
          :to="{name: 'edit', params: {model: modelName, id: item._id }}"
        >
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          small
          class="mr-2"
          icon
          @click.prevent="deleteDocument(item._id)"
          >
          <v-icon small> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  import axios from "axios";
  const utilModule = require('./util');

  export default {
    data() {
      return {
        Documents: [],
        modelName: '',
        headers:[],
        schema: [],
        eventName: ''
      }
    },
    created() {
      this.modelName = this.$route.params.model;
      let apiURL = process.env.VUE_APP_SERVER_URL + `/${this.modelName}`;
      let modelURL = process.env.VUE_APP_SERVER_URL + `/model/${this.modelName}`;

      axios.get(modelURL).then((res) => {
        this.eventName = res.data[0].name
        this.schema = res.data[0].model_schema;
        this.headers = utilModule.schemaHeaders(this.schema)
      }).catch(error => {
        console.log(error)
      });

      this.$auth.getTokenSilently()
      .then( token => {
        axios.get(apiURL, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
          this.Documents = res.data;
        }).catch(error => {
          console.log(error)
        });
      }).catch(error => {
        console.log(error)
      });
    },
    methods: {
      debugLog(message) {
        console.log(message)
      },
      capitalize(word){
        return word.charAt(0).toUpperCase()+word.slice(1)
      },
      deleteDocument(id){
        let apiURL = process.env.VUE_APP_SERVER_URL + `/${this.modelName}/delete/${id}`;
        let indexOfArrayItem = this.Documents.findIndex(i => i._id === id);

        if (window.confirm("Do you really want to delete?")) {
          this.$auth.getTokenSilently()
          .then( token => {
            axios.delete(apiURL, {headers: {Authorization: `Bearer ${token}`}})
            .then(() => {
              this.Documents.splice(indexOfArrayItem, 1);
            }).catch(error => {
              console.log(error)
            });
          }).catch(error => {
            console.log(error)
          });
        }
      }
    }
  }
</script>

<style>
  .btn-success {
    margin-right: 10px;
  }
</style>