<template>
  <v-card>
    <v-card-title>Подписчики</v-card-title>
    <v-simple-table>
      <tbody>
      <tr v-for="follower in followers" :key="follower.id">
        <td>
          <router-link :to="`/users/${follower.username}`" target="_blank" class="follower">{{ follower.username }}</router-link>
        </td>
        <template v-if="follower.username != $store.state.userProfile.username && $store.state.userProfile.username != undefined">
          <td align="right" v-if="isFollow(follower.username)">
            <v-btn color="error" @click="unFollow(follower.username)">Отписаться</v-btn>
          </td>
          <td align="right" v-else>
            <v-btn color="primary" @click="follow(follower.username)">Подписаться</v-btn>
          </td>
        </template>
      </tr>
      </tbody>
    </v-simple-table>
    <v-layout justify-end v-if="showBtnPagination">
      <v-btn text @click="loadMoreFollowers">Еще</v-btn>
    </v-layout>
  </v-card>
</template>

<script>
import subscriptionApi from "@/api/subscriptionApi"
import { mapGetters } from "vuex"
import { mapActions } from "vuex"
export default {
  name: "UserFollowers",
  props: {
    user: {}
  },
  data() {
    return {
      followers: [],
      page: 1,
      showBtnPagination: false
    }
  },
  computed: {
    ...mapGetters(['getUserFollows'])
  },
  async created() {
    try{
      const response = await subscriptionApi.getFollowers(this.user.username)
      this.followers = response.data
      this.showBtnPagination = this.followers.length === 100 ? true : false
    }catch (e) {
      console.log(e)
    }
  },
  methods: {
    ...mapActions(['followUserAction', 'unFollowUserAction']),
    async loadMoreFollowers(){
      try {
        const response = await subscriptionApi.getFollowers(this.user.username, this.page)
        const newFollowers = response.data
        if (newFollowers.length != 0) {
          this.followers = this.followers.concat(newFollowers)
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
.follower{
  font-size: 16pt;
  text-decoration: none;
}
</style>