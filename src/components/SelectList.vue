<template>
  <v-select
    :label="label"
    :multiple="multi"
    :name="name"
    v-model="modelValue"
    :items="options"
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
</template>

<script>
  export default {
    name: 'SelectList',
    props: ['multi', 'options', 'name', 'label', 'value'],
    computed: {
      modelValue: {
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