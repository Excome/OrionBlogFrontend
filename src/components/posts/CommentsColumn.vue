<template>
  <v-card elevation="0">
    <v-card-title class="text-h6 font-weight-bold">Комментарии</v-card-title>
    <v-textarea
        v-model="commentText"
        append-icon="mdi-send"
        outlined
        name="input-7-4"
        :label="$store.state.userProfile.username != undefined ? 'Добавить комментарий' : 'Необходимо авторизоваться'"
        :disabled="$store.state.userProfile.username != undefined ? false : true"
        rows="3" row-height="12"
        no-resize
        @click:append="addComment"
    />
    <template v-for="comment in comments">
      <Comment :comment="comment" :delete-comment="deleteComment" :key="comment.id"/>
    </template>
    <v-layout justify-end v-if="showBtnPagination">
      <v-btn text @click="loadMoreComments">Еще</v-btn>
    </v-layout>
  </v-card>
</template>

<script>
import commentsApi from "@/api/commentsApi";
import Comment from "@/components/posts/Comment.vue"
export default {
  name: "CommentsColumn",

  components: {
    Comment
  },

  data(){
    return {
      postId: null,
      comments: [],
      commentText: "",
      page: 1,
      showBtnPagination: false
    }
  },

  async created() {
    this.postId = this.$route.params.postId
    const commentsResponse = await commentsApi.getComments(this.postId)
    this.comments = commentsResponse.data
    this.showBtnPagination = this.comments.length === 20 ? true : false
  },

  methods: {
    async addComment(){
      try {
        if (this.commentText != "") {
          let comment = {
            author: {username: this.$store.state.userProfile.username},
            text: this.commentText
          }
          const response = await commentsApi.addComment(this.postId, comment)
          const newComment = response.data
          this.comments.unshift(newComment)
          this.commentText = ""
        }
      } catch (e) {
        console.log(e.data)
      }
    },

    async deleteComment(comment){
      try {
        const postId = this.$route.params.postId
        await commentsApi.deleteComment(postId, comment.id)
        const index = this.comments.indexOf(comment)
        this.comments.splice(index, 1)
      }catch (e) {
        console.log(e)
      }
    },

    async loadMoreComments(){
      try {
        const response = await commentsApi.getComments(this.postId, this.page)
        const newComments = response.data
        this.comments = this.comments.concat(newComments)
        this.page++
        if (newComments.length === 20)
          this.showBtnPagination = true
        else
          this.showBtnPagination = false
      }catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>