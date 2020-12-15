<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col class="col-sm-12, col-lg-6">
        <v-card elevation="0" outlined class="mb-6">
          <v-card-title>Редактирование поста</v-card-title>
        </v-card>
        <v-card elevation="0">

          <v-form>
            <v-text-field v-model="post.topic" outlined label="Тема поста" required/>
            <ckeditor v-model="post.text" :editor="editor" :config="editorConfig"/>
            <v-text-field v-model="tags" outlined label="Тэги" hint="Теги должный быть написаны в формате: 'Тег1, Тег2, Тег3" class="mt-9"/>
            <v-btn block color="deep-purple" class="page_btn" @click="updatePost">
              Изменить пост
            </v-btn>
          </v-form>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import postsApi from "@/api/postsApi";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  name: "EditPost",

  data(){
    return {
      editor: ClassicEditor,
      editorConfig: {},
      post: Object,
      tags: String
    }
  },

  computed: {
    oldtags(){
      let tags = ''
      for(let i = 0; i<this.post.tags.length; i++){
        tags += this.post.tags[i].name
        if(i != this.post.tags.length -1)
          tags += ', '
      }
      return tags
    }
  },

  async created() {
    try {
      let postId = this.$route.params.postId
      const response = await postsApi.getPost(postId)
      let post = response.data
      this.post = post
      this.tags = this.oldtags
    }catch (e) {
      this.post = null
    }
  },

  methods: {
    async updatePost(){
      try {
        this.post.tags = this.convertTags(this.tags)
        let postId = this.$route.params.postId
        const response = await postsApi.updatePost(postId, this.post)
        const data = response.data
        console.log(data)
        await this.$router.push("/posts/" + data.id)
      }catch (e) {
        console.log(e)
      }
    },

    convertTags(tagsStr){
      let tags = tagsStr.split(/[\s, ]+/)
      return tags
    }
  }
}
</script>

<style scoped>

</style>