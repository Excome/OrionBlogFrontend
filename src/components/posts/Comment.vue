<template>
  <v-card class="mb-3">
    <v-card-title>
      {{ comment.author.username }}
      <v-spacer/>
      <v-menu left bottom v-if="comment.author.username === $store.state.userProfile.username || $store.state.adminUser">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="() => editForm = !editForm">
            <v-list-item-title>Изменить</v-list-item-title>
          </v-list-item>
          <v-list-item @click="deleteComment(comment)">
            <v-list-item-title>Удалить</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-card-subtitle v-if="comment.createdDate === comment.lastUpdatedDate">{{ comment.createdDate }}</v-card-subtitle>
    <v-card-subtitle v-else>{{ comment.lastUpdatedDate }} (изменён)</v-card-subtitle>
    <v-card-text v-if="!editForm">{{ comment.text }}</v-card-text>
    <template v-else>
      <v-textarea rows="2" row-height="10" no-resize v-model="newText"/>
      <div class="justify-end">
        <v-btn text @click="editComment">СОХРАНИТЬ</v-btn>
        <v-btn text @click="() => editForm = !editForm">ОТМЕНА</v-btn>
      </div>
    </template>
  </v-card>
</template>

<script>
import commentsApi from "@/api/commentsApi";
export default {
  name: "Comment",
  props: {
    comment: Object,
    deleteComment: Function
  },
  data() {
    return{
      editForm: false,
      newText: this.comment.text
    }
  },
  methods: {
    async editComment(){
      try {
        const postId = this.$route.params.postId
        this.comment.text = this.newText
        const response = await commentsApi.editComment(postId, this.comment)
        this.editForm = false
        console.log(response)
      }catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>