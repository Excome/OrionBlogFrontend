`<template>
  <v-app>
    <v-app-bar color="deep-purple" dark max-height="64px">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Project Blog</v-toolbar-title>
      <v-spacer/>
      <v-btn v-if="isAdmin" outlined to="/admin">
        Панель администратора
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">

          <template v-if="$store.state.userProfile.username != undefined">
            <v-list-item :to="`/users/${$store.state.userProfile.username}`">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $store.state.userProfile.username }}</v-list-item-title>
            </v-list-item>

            <v-list-item to="/posts/feed">
              <v-list-item-icon>
                <v-icon>mdi-post-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Лента</v-list-item-title>
            </v-list-item>
          </template>

          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item>

          <v-list-item to="/users">
            <v-list-item-icon>
              <v-icon>mdi-account-group-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Пользователи</v-list-item-title>
          </v-list-item>

          <template v-if="$store.state.userProfile.username === undefined">
            <v-list-item to="/login">
              <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Войти</v-list-item-title>
            </v-list-item>

            <v-list-item to="/registration">
              <v-list-item-icon>
                <v-icon>mdi-account-plus-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Зарегистрироваться</v-list-item-title>
            </v-list-item>
          </template>
          <template v-else>
            <v-list-item to="/posts/new">
              <v-list-item-icon>
                <v-icon>mdi-newspaper-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Написать пост</v-list-item-title>
            </v-list-item>

            <v-list-item to="/settings">
              <v-list-item-icon>
                <v-icon>mdi-account-settings</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Настройки</v-list-item-title>
            </v-list-item>

            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Выйти</v-list-item-title>
            </v-list-item>
          </template>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>

      <router-view/>

    </v-main>
  </v-app>
</template>

<script>
import authApi from "@/api/authApi"
import { mapMutations } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    drawer: false,
    group: null,
  }),
  computed: {
    isAdmin () {
      const userRoles = this.$store.state.userProfile.roles
      if(userRoles === undefined || userRoles === null){
        return false
      }
      for (let i = 0; i < userRoles.length; i++) {
        if (userRoles[i].name === 'ROLE_ADMIN') {
          return true
        }
      }
      return false
    }
  },

  methods: {
    ...mapMutations(['dropUserMutation', 'dropUserFollowsMutation']),

    logout(){
      authApi.logout()
      this.dropUserMutation()
      this.dropUserFollowsMutation()
      this.$router.push("/")
    },
  }
};
</script>
<style scoped>

</style>