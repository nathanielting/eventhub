<template>
  <v-container>
    <h3 class="mb-4">Create Registration</h3>
    <form-generator :schema="schema"
      v-model="genericObj"
      @submit="handleUpdateForm()">
    </form-generator>
  </v-container>
</template>

<script>
  import axios from "axios";
  import formGenerator from "./formGenerator";
  export default {
    components: { formGenerator },
    data() {
      return {
        genericObj: {},
        modelName: '',
        schema: {},
      }
    },
    created() {
      this.modelName = this.$route.params.model
      let modelURL = process.env.VUE_APP_SERVER_URL + `/model/${this.modelName}`;

      axios.get(modelURL).then((res) => {
        this.schema = res.data[0].model_schema;
      })
    },
    methods: {
      handleUpdateForm() {
        let apiURL = process.env.VUE_APP_SERVER_URL + `/${this.modelName}/create`;

        axios.post(apiURL, this.genericObj).then((res) => {
          console.log(res)
          this.$router.push({name: 'list', params: {model: this.$route.params.model}})
        }).catch(error => {
          console.log(error)
        });
      }
    }
  }
</script>