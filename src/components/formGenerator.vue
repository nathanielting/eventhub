<template>
  <v-form>
    <div v-for="(field, index) in schema" :key="index">
    <v-row no-gutters>
      <v-col>
        <component
          :is="field.fieldType"
          v-model="localFormData[field.name]"
          :name="field.name"
          :label="field.label"
          :options="field.options"
          >
        </component>
      </v-col>
    </v-row>
    </div>
    <v-row no-gutters>
      <v-col>
        <v-btn @click="submitForm()">Submit</v-btn>
      </v-col>
      <!-- <v-spacer></v-spacer> -->
    </v-row>
  </v-form>
</template>


<script>
  import NumberInput from "./NumberInput";
  import SelectList from "./SelectList";
  import TextInput from "./TextInput";
  export default {
    name: "FormGenerator",
    components: { NumberInput, SelectList, TextInput },
    props: ["schema", "value"],
    methods: {
      // submitForm method connects to @submit attribute when creating form-generator
      submitForm() {
        this.$emit("submit", this.localFormData);
      }
    },
    computed: {
      localFormData: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      }
    }
  };
</script>

<style scoped>
.v-text-field{
  width: 300px;
}
</style>