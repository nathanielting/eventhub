<template>
  <v-app>

    <v-navigation-drawer
      permanent
      app
      expand-on-hover
    >
        <v-list>
          <v-list-item link :to="{name:'events'}">
            <v-list-item-icon>
              <v-icon>mdi-calendar-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Events</v-list-item-title>
          </v-list-item>
          <v-list-item link :to="{name:'create_events'}" :disabled="inModel">
            <v-list-item-icon>
              <v-icon>mdi-calendar-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>New Event</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="route_event()" :disabled="!inModel">
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Edit Event</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="route_registrations()" :disabled="!inModel">
            <v-list-item-icon>
              <v-icon>mdi-file-document-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Registrations</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="route_create()" :disabled="!inModel">
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
      <v-app-bar-title> {{ modelTitle}} </v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon v-if="$auth.isAuthenticated" :to="{ name: 'profile' }">
          <v-icon>mdi-account</v-icon>
        </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
const utilModule = require('./components/util');

export default {
  name: 'App',

  data: () => ({
    drawer:null
  }),

  computed: {
    inModel() {
      return ('model' in this.$route.params);
    },
    modelName() {
      if ('model' in this.$route.params){
        return this.$route.params.model
      }
      return null
    },
    modelTitle() {
      if ('model' in this.$route.params){
        return `${utilModule.capitalize(this.$route.params.model)} Viewer`
      }
      return "Generic Model Viewer"
    }
  },

  methods: {
    route_event(){
      if (this.modelName)
      {
        this.$router.push({name: 'edit_event', params: {model: this.modelName}})
                    .catch((error)=>{
                      if (error.name !== 'NavigationDuplicated') {
                        throw error;
                      }
                    })
      }
    },
    route_registrations(){
      if (this.modelName)
      {
        this.$router.push({name: 'list', params: {model: this.modelName}})
                    .catch((error)=>{
                      if (error.name !== 'NavigationDuplicated') {
                        throw error;
                      }
                    })
      }
    },
    route_create(){
      if (this.modelName)
      {
        this.$router.push({name: 'create', params: {model: this.modelName}})
                    .catch((error)=>{
                      if (error.name !== 'NavigationDuplicated') {
                        throw error;
                      }
                    })
      }
    }
  }
};
</script>
