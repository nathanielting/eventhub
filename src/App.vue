<template>
  <v-app>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ modelTitle }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer:null
  }),

  props: ['title'],

  created() {
    console.log(this.title)
  },
  computed: {
    modelName() {
      if ('model' in this.$route.params){
        return this.$route.params.model
      }
      return null
    },
    modelTitle() {
      if ('model' in this.$route.params){
        return `${this.$route.params.model} Viewer`
      }
      return this.title
    }
  },

  methods: {
    capitalize(word){
        return word.charAt(0).toUpperCase()+word.slice(1)
    },
  }
};
</script>
