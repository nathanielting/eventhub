<template>
  <v-container>
    <h3 class="mb-4">Edit Event</h3>
    <eventFormGenerator
      v-model="schema"
      @submit="handleUpdateForm()"
      >
      <template v-slot:submit>
        Update
      </template>
    </eventFormGenerator>
  </v-container>
</template>

<script>
  import axios from "axios";
  import eventFormGenerator from "./eventFormGenerator";

  export default {
  components: { eventFormGenerator },
    data() {
      return {
        schema: {
          name: '',
          collectionName: '',
          date: '',
          model_schema: [],
        },
      }
    },
    created() {
      this.modelName = this.$route.params.model
      let apiURL = process.env.VUE_APP_SERVER_URL + `/model/${this.modelName}`;
      this.$auth.getTokenSilently()
      .then( token => {
        axios.get(apiURL, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
          this.schema = res.data[0]
        }).catch(error => {
          console.log(error)
        });
      }).catch(error => {
        console.log(error)
      });
    },
    methods: {
      handleUpdateForm() {
        console.log(this.schema)
        let apiURL = process.env.VUE_APP_SERVER_URL + `/model/update/${this.schema._id}`;

        this.$auth.getTokenSilently()
        .then( token => {
          axios.post(apiURL, this.schema, {headers: {Authorization: `Bearer ${token}`}})
          .then((res) => {
            console.log(res)
            this.$router.push({name: 'events'})
          }).catch(error => {
            console.log(error)
          });
        }).catch(error => {
          console.log(error)
        });
      },
      deleteItem(index) {
        this.schema.model_schema.splice(index, 1);
      },
      addItem(index) {
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