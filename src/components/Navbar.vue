<template>
  <nav>
    <v-app-bar app color="secondary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <router-link :to="{name: 'Home'}">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <v-btn @click="cerrarSesion">
        <span class="mr-2">Cerrar Sesión</span>
        <v-icon>fas fa-user</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer color="indigo" v-model="drawer" app>

        <v-container>
            <v-col align="center" class="mt-5">
                <v-avatar>
                     <img :src="usuario.foto" alt="John" />
                </v-avatar>
                <h1 class="mt-3 white--text">{{usuario.nombre}}</h1>
            </v-col>
        </v-container>

        <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" link :to="item.to">
                <v-list-item-action>
                    <v-icon class="white--text">{{item.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title class="white--text mt-3">
                        {{item.title}}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            
        </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>

import { mapActions, mapState } from "vuex"

export default {
    name: 'Navbar',
    data() {
        return {
            drawer: false,
            items: [
                { title: 'Dashboard', icon: 'fas fa-address-card', to: {name: 'Home'}},
                // { title: 'Account', icon: 'fas fa-address-card', to: {name: 'Home'}},
                { title: 'Admin', icon: 'fas fa-image', to: {name: 'Admin'}},
                { title: 'Chat', icon: 'fas fa-comments', to: {name: 'Chat'}},
            ]

        }
    },
    methods: {
    ...mapActions(['cerrarSesion'])
    },
    computed : {
        ...mapState(['usuario'])
    }
}

</script>