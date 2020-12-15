import Vue from 'vue'

import { serverUrl } from "@/api/resource"

const followersApi = Vue.resource(serverUrl + '/users{/username}/subscription/followers{?page}')
const followsApi = Vue.resource(serverUrl + '/users{/username}/subscription/follow')
const followApi = Vue.resource(serverUrl + '/users{/username}/follow')

export default {
    getFollowers: (username, page) => followersApi.get({username: username, page: page}),
    getFollows: (username, page) => followsApi.get({username: username, page: page}),
    followUser: (username, sub) => followApi.save({username: username}, sub),
    unFollowUser: (username, sub) => followApi.remove({username: username}, sub)
}