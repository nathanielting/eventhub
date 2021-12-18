<template>
  <v-form>
    <div class="d-flex align-content-start flex-wrap">
      <v-text-field
        label="Name"
        v-model="localSchema.name"
        name="name"
        class="pa-2"
        >
      </v-text-field>
      <v-text-field
        label="Collection Name"
        v-model="localSchema.collectionName"
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
            v-model="localSchema.date"
            label="Event Date"
            readonly
            v-bind="attrs"
            v-on="on"
            class="pa-2"
            >
          </v-text-field>
        </template>
        <v-date-picker
          v-model="localSchema.date"
          @input="datemenu = false"
          >
        </v-date-picker>
      </v-menu>
    </div>
    <h3 class="mb-4">Registration Questions</h3>
    <ModelInput
      v-for="(item, index) in localSchema.model_schema"
      :key="item.id"
      v-model="localSchema.model_schema[index]"
      @add="addItem(index)"
      @delete="deleteItem(index)"
      >
    </ModelInput>

    <v-row justify="center" v-if="!localSchema.model_schema.length">
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
      <v-btn @click="$emit('submit')">
        <slot name="submit">Submit</slot>
      </v-btn>
    </div>
  </v-form>
</template>

<script>
  import ModelInput from "./ModelInput";

  export default {
    name: 'eventFormGenerator',
    props: ['value'],
    components: { ModelInput},
    data() {
      return {
        datemenu: false,
      }
    },
    methods: {
      deleteItem(index) {
        this.localSchema.model_schema.splice(index, 1);
      },
      addItem(index) {
        let newQuestion = {
          name:'',
          type:'',
          label:'',
          fieldType:'',
          options:[]
        };
        this.localSchema.model_schema.splice(index+1, 0, newQuestion);
      }
    },
    computed: {
      localSchema: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      }
    }
  }
</script>