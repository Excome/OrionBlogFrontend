<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="6">
        <v-card elevation="0" outlined class="mb-6">
          <v-card-title class="text-h4">
            <b>Лента подписок</b>
            <v-spacer></v-spacer>
          </v-card-title>
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

        <v-btn v-if="showBtnPagination === true" block color="deep-purple" class="page_btn" @click="loadMorePosts">
          Загрузить еще...
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import postsApi from "@/api/postsApi";
export default {
  name: "PostsFeed",
  data() {
    return {
      posts: [],
      page: 1,
      showBtnPagination: false
    }
  },
  async created() {
    try{
      const response = await postsApi.getPostsFeed()
      this.posts = response.data
      this.showBtnPagination = this.posts.length === 15 ? true : false
    }catch (e) {
      console.log(e)
    }
  },
  methods: {
    async loadMorePosts(){
      try {
        const response = await postsApi.getPostsFeed({page: this.page})
        const addPosts = response.data
        if (addPosts.length != 0) {
          this.posts = this.posts.concat(addPosts)
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