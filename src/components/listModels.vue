<template>
  <v-container>
    <h3 class="text-center">Events</h3>
    <v-simple-table>
      <thead>
        <tr>
          <!-- create list view with first three fields in schema -->
          <th>Event Name</th>
          <th>Collection Name</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="doc in Documents" :key="doc._id">
          <td >{{doc["name"]}}</td>
          <td >{{doc["collectionName"]}}</td>
          <td >{{doc["date"]}}</td>
          <td>
            <v-btn :to="{name: 'edit_event', params: {model: doc.name }}" class="btn-success">Edit</v-btn>
            <v-btn @click.prevent="deleteDocument(doc._id)" class="btn btn-danger">Delete</v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        Documents: [],
      }
    },
    created() {
      let apiURL = process.env.VUE_APP_SERVER_URL + `/model`;
      axios.get(apiURL).then(res => {
        this.Documents = res.data;
      }).catch(error => {
        console.log(error)
      });
    },
    methods: {
      deleteDocument(id){
        let apiURL = `http://localhost:4000/model/delete/${id}`;
        let indexOfArrayItem = this.Documents.findIndex(i => i._id === id);

        if (window.confirm("Do you really want to delete?")) {
          axios.delete(apiURL).then(() => {
            this.Documents.splice(indexOfArrayItem, 1);
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