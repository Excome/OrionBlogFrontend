import Vue from 'vue'

import { serverUrl } from "@/api/resource"

const usersApi = Vue.resource(serverUrl + '/users{/username}', {})
const userPosts = Vue.resource(serverUrl + '/users{/username}/posts{?page}')
const userProfile = Vue.resource(serverUrl + '/auth/settings/profile')
const userPass = Vue.resource(serverUrl + '/auth/settings/security')
const users = Vue.resource(serverUrl + '/users', {})

export default {
    getUsers: params => users.get(params),
    getUser: username => usersApi.get({username: username}),
    getUserPosts: (username, page) => userPosts.get({username: username, page: page}),
    saveUserProfile: user => userProfile.update(user),
    saveUserPass: user => userPass.update(user)
}