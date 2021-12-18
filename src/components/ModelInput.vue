<template>
  <v-container>
  <v-card elevation="2" class="pa-4">
    <v-card-title>
      <v-text-field
        label="Question"
        v-model="localInputModel.label"
        class="pa-2"
        >
      </v-text-field>
    </v-card-title>
    <v-card-text class="d-flex align-content-start flex-wrap">
    <v-text-field
      label="Column Header"
      v-model="localInputModel.name"
      hint="No spaces"
      class="pa-2"
      >
    </v-text-field>

    <v-select
      label="Question Type"
      v-model="localInputModel.fieldType"
      :items="typeOptions"
      class="pa-2"
      @input="updateVarType()"
      >
      <template v-slot:prepend-item>
        <v-list-item disabled>
          <v-list-item-content>
            <v-list-item-title>
              Please select one
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mt-2"></v-divider>
      </template>
    </v-select>

    <v-combobox
      clearable
      multiple
      small-chips
      v-model="localInputModel.options"
      label="List Options"
      v-show="localInputModel.fieldType==='SelectList'"
      class="pa-2"
      persistent-hint
      hint="Enter text then hit [Tab] or [Enter]"
      >
    </v-combobox>
    <v-btn
      elevation="4"
      fab
      dark
      color="red"
      absolute
      bottom right
      @click="$emit('delete')"
      >
      <v-icon dark>mdi-minus</v-icon>
    </v-btn>
  </v-card-text>
  </v-card>
  <v-row justify="center">
    <v-btn
      elevation="4"
      fab
      dark
      color="light-green"
      bottom
      class="mt-6"
      @click="$emit('add')"
      >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-row>
  </v-container>
</template>
<script>

  export default {
    name: 'ModelInput',
    props: ['value'],
    data() {
      return {
        typeOptions: [
          { text: "Text", value: "TextInput"},
          { text: "Number", value: "NumberInput"},
          { text: "List", value: "SelectList"}
        ],
        varTypes: ["String", "Number", "String"]
      };
    },
    methods: {
      updateVarType() {
        if (this.value.fieldType==="NumberInput")
        {
          this.value.type="Number";
        }
        else
        {
          this.value.type="String";
        }
      },
    },
    computed: {
      localInputModel: {
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