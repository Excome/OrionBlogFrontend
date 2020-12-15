<template>
  <v-card elevation="0">
        <v-tabs v-model="tabs" fixed-tabs>
          <v-tabs-slider></v-tabs-slider>
          <v-tab href="#mobile-tabs-5-1" class="primary--text">
            <v-icon left>mdi-account</v-icon>
            Аккаунт
          </v-tab>

          <v-tab href="#mobile-tabs-5-2" class="primary--text">
            <v-icon left>mdi-post</v-icon>
            Посты
          </v-tab>

          <template v-if="!privateProfile">
          <v-tab href="#mobile-tabs-5-3" class="primary--text">
            <v-icon left>mdi-post</v-icon>
            Подписчики
          </v-tab>

          <v-tab href="#mobile-tabs-5-4" class="primary--text">
            <v-icon left>mdi-post</v-icon>
            Подписки
          </v-tab>
          </template>
        </v-tabs>


    <v-tabs-items v-model="tabs">
      <v-tab-item :value="'mobile-tabs-5-1'">
        <v-row justify="center">
          <v-col cols="6">

              <user-profile :user="user" :private-profile="privateProfile"/>

          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item :value="'mobile-tabs-5-2'">
        <v-row justify="center">
          <v-col cols="6">

            <user-posts :user="user"/>

          </v-col>
        </v-row>
      </v-tab-item>

      <v-tab-item :value="'mobile-tabs-5-3'">
        <v-row justify="center">
          <v-col cols="3">

            <user-followers :user="user"/>

          </v-col>
        </v-row>
      </v-tab-item>

      <v-tab-item :value="'mobile-tabs-5-4'">
        <v-row justify="center">
          <v-col cols="3">

            <user-follows :user="user"/>

          </v-col>
        </v-row>
      </v-tab-item>

    </v-tabs-items>
  </v-card>
</template>

<script>
import UserProfile from "@/components/users/UserProfile.vue"
import UserPosts from "@/components/users/UserPosts.vue"
import UserFollowers from "@/components/users/UserFollowers.vue"
import UserFollows from '@/components/users/UserFollows.vue'
import usersApi from "@/api/usersApi"
export default {
  name: "User",

  components: {
    UserProfile,
    UserPosts,
    UserFollowers,
    UserFollows
  },

  data(){
    return{
      tabs: null,
      username: String,
      user: Object
    }
  },

  computed: {
    privateProfile(){
      if(this.user.privateStatus && this.username != this.$store.state.userProfile.username){
        return true
      }
      return false
    }
  },

  async created() {
    try {
      this.username = this.$route.params.username
      const response = await usersApi.getUser(this.username)
      this.user = response.data
    }catch (e) {
      console.error(e.data.message)
      this.$router.push('/')
    }

  }
}
</script>

<style scoped>

</style>