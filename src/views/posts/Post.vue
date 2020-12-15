<template>
  <v-container fluid>
    <v-row justify="center" v-if="post != null">
      <v-col cols="5">
        <v-card elevation="0">
          <v-card-title class="text-h4 font-weight-bold">{{ post.topic }}</v-card-title>
          <v-card-subtitle class="mt-2">
            Теги:
            <span v-for="(tag, index) in post.tags" :key="tag.id">
                {{ tag.name }}
                <template v-if="index != post.tags.length - 1">, </template>
              </span>
          </v-card-subtitle>
          <v-card-text v-html="post.text"/>
        </v-card>

        <CommentsColumn/>

      </v-col>
      <v-col cols="2">
        <v-card>
          <v-card-title>ИНФОРМАЦИЯ</v-card-title>
          <v-simple-table>
            <tbody>
            <tr>
              <td>Автор</td>
              <td><router-link :to="`/users/${post.author.username}`" class="text-decoration-none">
                {{ post.author.username }}</router-link>
              </td>
            </tr>
            <tr>
              <td>Создано</td>
              <td>{{ post.createdDate }}</td>
            </tr>
            <tr v-if="post.createdDate != post.lastUpdatedDate">
              <td>Изменено</td>
              <td>{{ post.lastUpdatedDate }}</td>
            </tr>
            </tbody>
          </v-simple-table>
        </v-card>
        <template v-if="$store.state.userProfile.username === post.author.username || $store.state.adminUser">
          <v-card align="center" class="mt-5">
            <v-btn text color="primary" :to="`/posts/${post.id}/edit`">ИЗМЕНИТЬ</v-btn>
            <v-btn text color="error"  @click.stop="deleteDialog = true">УДАЛИТЬ</v-btn>
          </v-card>
          <v-dialog v-model="deleteDialog" max-width="345">
            <v-card>
              <v-card-title class="headline">Вы действительно хотите удалить данный пост?</v-card-title>
              <v-card-text>Еще раз хорошенько подумайте, если вы нажмете на кнопку удалить, то данный пост невозможно будет восстановить!</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="deletePost">Удалить</v-btn>
                <v-btn color="green darken-1" text @click="deleteDialog = false">Отмена</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import postsApi from "@/api/postsApi";
import CommentsColumn from "@/components/posts/CommentsColumn.vue"
export default {
  name: "Post",

  components: {
    CommentsColumn
  },

  data(){
    return {
      postId: Number,
      post: null,
      deleteDialog: false
    }
  },

  async created() {
    this.postId = this.$route.params.postId
    const postResponse = await postsApi.getPost(this.postId)
    this.post = postResponse.data
  },

  methods: {
    async deletePost(){
      try{
        await postsApi.deletePost(this.postId)
        await this.$router.push("/")
      }catch (e) {
        console.log(e)
      }
    }
  }

}
</script>

<style scoped>

</style>