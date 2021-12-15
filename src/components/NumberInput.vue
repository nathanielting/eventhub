<template>
  <v-text-field
    type="number"
    :label="label"
    :name="name"
    :placeholder="placeholder"
    v-model="modelValue"
    >
  </v-text-field>
</template>

<script>
  export default {
    name: 'NumberInput',
    props: ['placeholder', 'label', 'name', 'value'],
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