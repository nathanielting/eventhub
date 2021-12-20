<template>
  <v-container>
    <h3 class="text-center">Events</h3>
    <v-data-table
      :headers="headers"
      :items="Documents"
    >
      <template v-slot:item.name="{ item }">
        <v-chip
          :to="{name: 'list', params: {model: item.collectionName}}"
          outlined
        >
          {{item.name}}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          small
          class="mr-2"
          icon
          :to="{name: 'edit_event', params: {model: item.collectionName}}"
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

  export default {
    data() {
      return {
        Documents: [],
        headers: [
          {text: "Event Name", value: "name"},
          {text: "Collection Name", value: "collectionName"},
          {text: "Date", value: "date"},
          {text: 'Actions', value: 'actions', sortable: false }
        ]
      }
    },
    created() {
      let apiURL = process.env.VUE_APP_SERVER_URL + `/model`;
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
      deleteDocument(id){
        let apiURL = `http://localhost:4000/model/delete/${id}`;
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