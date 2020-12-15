<template>
  <v-card elevation="3" class="py-3 px-3">
    <v-text-field
        outlined
        append-icon="mdi-magnify"
        v-model="searchArg"
        label="Найти пост"
        single-line
        hide-details
        @click:append="search"
        class="mb-3"
    ></v-text-field>
    <v-simple-table fixed-header height="700px">
      <thead>
      <tr>
        <th>ID</th>
        <th>Тема</th>
        <th>Автор</th>
        <th>Дата создания</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="post in posts" :key="post.id">
        <td>{{ post.id }}</td>
        <td>
          <router-link :to="`/posts/${post.id}`" style="text-decoration: none">
            {{ post.topic }}
          </router-link>
        </td>
        <td>
          <router-link :to="`/users/${post.author.username}`" style="text-decoration: none; font-size: 12pt">
            {{ post.author.username }}
          </router-link>
        </td>
        <td>{{ post.createdDate }}</td>
      </tr>
      </tbody>
      <v-layout justify-end v-if="showBtnPagination">
        <v-btn text @click="loadMore">Еще</v-btn>
      </v-layout>
    </v-simple-table>
  </v-card>
</template>

<script>
import adminApi from "@/api/adminApi";
export default {
  name: "AdminPostsList",
  data() {
    return {
      posts: Array,
      searchArg: '',
      page: 1,
      showBtnPagination: false,
    }
  },
  async created() {
    try {
      const response = await adminApi.getPosts()
      this.posts = response.data
      this.showBtnPagination = this.posts.length === 15 ? true : false
    }catch (e) {
      console.log(e)
      await this.$router.push('/')
    }
  },

  methods: {
    async search() {
      try {
        let response
        if (this.searchArg === '') {
          response = await adminApi.getPosts()
        } else {
          response = await adminApi.getPosts({topic: this.searchArg})
        }
        this.posts = response.data
        this.page = 1
        this.showBtnPagination = this.posts.length === 15 ? true : false
      }catch (e) {
        console.log(e)
        await this.$router.push('/')
      }
    },
    async loadMore() {
      try{
        let response
        if (this.searchArg === '') {
          response = await adminApi.getPosts({page: this.page})
        } else {
          response = await adminApi.getPosts({topic: this.searchArg, page: this.page})
        }
        const addPosts = response.data
        this.page++
        this.posts = this.posts.concat(addPosts)
        this.showBtnPagination = addPosts === 15 ? true : false
      }catch (e) {
        await this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>

</style>