<template>
  <v-app>

    <v-navigation-drawer
      permanent
      app
      expand-on-hover
    >
        <v-list>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Event Info</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-file-document-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Registrations</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>New Registration</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      dense
      color="white"
      elevate-on-scroll
    >
      <v-app-bar-title> {{ capitalize(modelTitle)}} </v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
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
      return "Generic Model Viewer"
    }
  },

  methods: {
    capitalize(word){
        return word.charAt(0).toUpperCase()+word.slice(1)
    },
  }
};
</script>
