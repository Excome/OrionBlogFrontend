`<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="6">
        <v-card elevation="0" outlined class="mb-6">
          <v-card-title class="text-h4">
            <b>Последние посты</b>
            <v-spacer></v-spacer>
          </v-card-title>
        </v-card>

        <v-card elevation="0" outlined class="px-3 py-3">
          <v-text-field
              outlined
              append-icon="mdi-magnify"
              v-model="searchArg"
              label="Поиск..."
              single-line
              hide-details
              @click:append="search"
          ></v-text-field>
          <v-tabs>
            <v-tab @click="searchType=1">Тема</v-tab>
            <v-tab @click="searchType=2">Автор</v-tab>
            <v-tab @click="searchType=3">Тэг</v-tab>
          </v-tabs>
        </v-card>

        <template v-for="post in posts">
          <v-card elevation="4" outlined class="mb-3" :key="post.id">
            <v-card-title class="mt-0 text-h5 font-weight-bold">
              <router-link :to="`/posts/${post.id}`" post-id="post.id" class="text-decoration-none card-tittle" >{{ post.topic }}</router-link>
            </v-card-title>
            <v-card-subtitle class="mt-0">
              <router-link :to="`/users/${post.author.username}`" class="text-decoration-none">
                Автор: {{ post.author.username }}
              </router-link>
              {{ post.createdDate }}
            </v-card-subtitle>
            <v-card-text v-html="post.textPreview"/>
            <v-card-subtitle>
              Теги:
              <span v-for="(tag, index) in post.tags" :key="tag.id">
                {{ tag.name }}
                <template v-if="index != post.tags.length - 1">, </template>
              </span>
            </v-card-subtitle>
          </v-card>
        </template>

        <v-btn v-if="showBtnPagination === true" block color="deep-purple" class="page_btn" @click="loadMore">
          Загрузить еще...
        </v-btn>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import postsApi from "@/api/postsApi";
export default {
  name: 'Posts',

  data(){
    return {
      searchType: 1,
      searchArg: '',
      page: 0,
      posts: [],
      showBtnPagination: false,
    }
  },

  async created() {
    const response = await postsApi.getPosts()
    this.posts = response.data
    this.showBtnPagination = this.posts.length === 15 ? true : false
  },

  methods: {
    async search() {
      this.page = 0
      if(this.searchArg === '') {
        this.posts = await this.getPosts()
      }
      else {
        if(this.searchType === 1) {
          this.posts = await this.getPostsByTopic()
        }
        if(this.searchType === 2) {
          this.posts = await this.getPostsByAuthor()
        }
        if(this.searchType === 3) {
          this.posts = await this.getPostsByTag()
        }
      }
      this.page++
      if(this.posts.length === 15)
        this.showBtnPagination = true
      else
        this.showBtnPagination = false
    },

    async loadMore () {
      let morePosts
      if(this.searchArg === '') {
        morePosts = await this.getPosts()
      }else {
        if(this.searchType === 1) {
          morePosts = await this.getPostsByTopic()
        }
        if(this.searchType === 2) {
          morePosts = await this.getPostsByAuthor()
        }
        if(this.searchType === 3) {
          morePosts = await this.getPostsByTag()
        }
      }

      this.posts = this.posts.concat(morePosts)
      this.page++
      if(morePosts.length === 15)
        this.showBtnPagination = true
      else
        this.showBtnPagination = false
    },

    async getPosts() {
      try{
        const response = await postsApi.getPosts({page: this.page})
        const posts = response.data
        return posts
      }catch (e) {
        console.log(e)
      }
    },

    async getPostsByTopic() {
      try{
        const response = await postsApi.getPostsByTopic({topic: this.searchArg, page: this.page})
        const posts = response.data
        return posts
      }catch (e) {
        console.log(e)
      }
    },

    async getPostsByAuthor() {
      try{
        const response = await postsApi.getPostsByAuthor({username: this.searchArg, page: this.page})
        const posts = response.data
        return posts
      }catch (e) {
        console.log(e)
      }
    },

    async getPostsByTag() {
      try{
        const response = await postsApi.getPostsByTag({tag: this.searchArg, page: this.page})
        const posts = response.data
        return posts
      }catch (e) {
        console.log(e)
      }
    }
  },
}
</script>

<style scoped>
.card-tittle {
  color: black;
}

.card-tittle:hover{
  color: #1976d2;
}

.page_btn {
  color: white;
}
</style>
