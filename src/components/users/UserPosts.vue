<template>
  <v-card elevation="3">
    <v-card-title>Посты пользователя {{ user.username }}</v-card-title>
    <v-simple-table>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.topic }}</td>
          <td>{{ post.createdDate }}</td>
          <td><v-btn :to="`/posts/${post.id}`">ЧИТАТЬ</v-btn></td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-layout justify-end v-if="showBtnPagination">
      <v-btn text @click="loadMorePosts">Еще</v-btn>
    </v-layout>
  </v-card>
</template>

<script>
import usersApi from "@/api/usersApi";
export default {
  name: "UserPosts",
  props: {
    user: {},
  },
  data(){
    return{
      posts: [],
      page: 1,
      showBtnPagination: false,
    }
  },
  async created() {
    try {
      const response = await usersApi.getUserPosts(this.user.username,)
      this.posts = response.data
      this.showBtnPagination = this.posts.length === 15 ? true : false
    }catch (e) {
      console.log(e.data.message)
      this.$router.push('/')
    }
  },

  methods: {
    async loadMorePosts(){
      try {
        const response = await usersApi.getUserPosts(this.user.username, this.page)
        const postsNew = response.data
        if (postsNew.length != 0) {
          this.posts = this.posts.concat(postsNew)
          this.page++
        }else {
          this.showBtnPagination = false
        }
      }catch (e) {
        console.log(e)
      }
    }
  }

}
</script>

<style scoped>

</style>