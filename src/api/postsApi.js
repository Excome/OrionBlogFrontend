import Vue from 'vue'

import { serverUrl } from "@/api/resource"

const postsApi = Vue.resource(serverUrl + '/posts{/postId}', {})
const postsFeed = Vue.resource(serverUrl + '/posts/feed', {})
const postsSearchTopic = Vue.resource(serverUrl + '/posts/search/topic', {})
const postsSearchAuthor = Vue.resource(serverUrl + '/posts/search/author', {})
const postsSearchTag = Vue.resource(serverUrl + '/posts/search/tag', {})

export default {
    getPosts: params => postsApi.get(params),
    getPost: postId => postsApi.get({postId: postId}),
    getPostsFeed: params => postsFeed.get(params),
    getPostsByTopic: params => postsSearchTopic.get(params),
    getPostsByAuthor: params => postsSearchAuthor.get(params),
    getPostsByTag: params => postsSearchTag.get(params),
    addPost: post => postsApi.save(post),
    updatePost: (postId, post) => postsApi.update({postId: postId}, post),
    deletePost: postId => postsApi.remove({postId: postId})
}