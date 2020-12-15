<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col class="col-sm-12, col-lg-6">
        <v-card elevation="0" outlined class="mb-6">
          <v-card-title>Добавление поста</v-card-title>
        </v-card>
        <v-card elevation="0">

          <v-form>
            <v-text-field v-model="post.topic" outlined label="Тема поста" required/>
            <ckeditor v-model="post.text" :editor="editor" :config="editorConfig"/>
            <v-text-field v-model="post.tags" outlined label="Тэги" hint="Теги должный быть написаны в формате: 'Тег1, Тег2, Тег3" class="mt-9"/>
            <v-btn block color="deep-purple" class="page_btn" @click="createPost">
              Создать пост
            </v-btn>
          </v-form>

        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import postsApi from "@/api/postsApi";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  name: "CreateComment",
  data(){
    return {
      editor: ClassicEditor,
      editorConfig: {},
      post: {
        topic: "",
        text: "",
        tags: "",
        author: {username: this.$store.state.userProfile.username}
      }
    }
  },

  methods: {
    async createPost(){
      try {
        this.post.tags = this.convertTags(this.post.tags)
        const response = await postsApi.addPost(this.post)
        const data = response.data
        console.log(data)
        await this.$router.push("/posts/" + data.id)
      }catch (e) {
        console.log(e)
      }
    },

    convertTags(tagsStr){
      let tags = tagsStr.split(", ")
      return tags
    }
  }
}
</script>

<style scoped>
.page_btn {
  color: white;
}
</style>