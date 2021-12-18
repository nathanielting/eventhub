<template>
  <v-container>
    <h3 class="mb-4">New Event</h3>
    <eventFormGenerator
      v-model="schema"
      @submit="handleUpdateForm()"
      >
      <template v-slot:submit>
        Create
      </template>
    </eventFormGenerator>
  </v-container>
</template>

<script>
  // import axios from "axios";
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
    methods: {
      handleUpdateForm() {
        console.log(this.schema)
        // let apiURL = process.env.VUE_APP_SERVER_URL + `/model/create`;

        // axios.post(apiURL, this.schema).then((res) => {
        //   console.log(res)
        //   this.$router.push({name: 'events'})
        // }).catch(error => {
        //   console.log(error)
        // });
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