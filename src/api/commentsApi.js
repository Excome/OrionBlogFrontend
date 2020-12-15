import Vue from 'vue'
import { serverUrl } from "@/api/resource"

const commentsApi = Vue.resource(serverUrl + '/posts{/postId}/comments{/commentId}{?page}', {})

export default {
    getComments: (postId, page) => commentsApi.get({postId: postId, page: page}),
    addComment: (postId, comment) => commentsApi.save({postId: postId}, comment),
    editComment: (postId, comment) => commentsApi.update({postId: postId, commentId: comment.id}, comment),
    deleteComment: (postId, commentId) => commentsApi.remove({postId: postId, commentId: commentId})
}