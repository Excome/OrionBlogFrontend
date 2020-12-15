<template>
  <v-card>
    <v-card-title>Подписки</v-card-title>
    <v-simple-table>
      <tbody>
      <tr v-for="followUser in follows" :key="followUser.id">
        <td>
          <router-link :to="`/users/${followUser.username}`" target="_blank" class="follow">{{ followUser.username }}</router-link>
        </td>
        <template v-if="followUser.username != $store.state.userProfile.username && $store.state.userProfile.username != undefined">
          <td align="right" v-if="isFollow(followUser.username)">
            <v-btn color="error" @click="unFollow(followUser.username)">Отписаться</v-btn>
          </td>
          <td align="right" v-else>
            <v-btn color="primary" @click="follow(followUser.username)">Подписаться</v-btn>
          </td>
        </template>
      </tr>
      </tbody>
    </v-simple-table>
    <v-layout justify-end v-if="showBtnPagination">
      <v-btn text @click="loadMoreFollows">Еще</v-btn>
    </v-layout>
  </v-card>
</template>

<script>
import subscriptionApi from "@/api/subscriptionApi"
import { mapGetters } from "vuex"
import { mapActions } from "vuex"
export default {
  name: "UserFollows",
  props: {
    user: {}
  },
  data() {
    return {
      follows: [],
      page: 1,
      showBtnPagination: false
    }
  },
  computed: {
    ...mapGetters(['getUserFollows'])
  },
  async created() {
    try{
      const response = await subscriptionApi.getFollows(this.user.username)
      this.follows = response.data
      this.showBtnPagination = this.follows.length === 100 ? true : false
    }catch (e) {
      console.log(e)
    }
  },
  methods: {
    ...mapActions(['followUserAction', 'unFollowUserAction']),
    async loadMoreFollows(){
      try {
        const response = await subscriptionApi.getFollows(this.user.username, this.page)
        const newFollows = response.data
        if (newFollows.length != 0) {
          this.follows = this.follows.concat(newFollows)
          this.page++
        }else {
          this.showBtnPagination = false
        }
      }catch (e) {
        console.log(e)
      }
    },
    isFollow(username){
      const follows = this.getUserFollows
      for(let i=0; i< follows.length; i++){
        if(follows[i].username === username)
          return true
      }
      return false
    },
    follow(username){
      this.followUserAction(username)
    },
    unFollow(username){
      this.unFollowUserAction(username)
    }
  }
}
</script>

<style scoped>
.follow{
  font-size: 16pt;
  text-decoration: none;
}
</style>