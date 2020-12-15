import Vue from 'vue'

import { serverUrl } from "@/api/resource"

const users = Vue.resource(serverUrl + '/admin/users', {})
const user = Vue.resource(serverUrl + '/admin/users{/username}')
const userProfile = Vue.resource(serverUrl + '/admin/users{/username}/settings/profile')
const userSecurity = Vue.resource(serverUrl + '/admin/users{/username}/settings/security')
const posts = Vue.resource(serverUrl + '/admin/posts', {})

export default {
    getUsers: params => users.get(params),
    getUser: username => user.get({username: username}),
    getPosts: params => posts.get(params),
    editUserProfile: (username,user) => userProfile.update({username: username}, user),
    editUserSecurity: (username,user) => userSecurity.update({username: username}, user),
    deleteUser: (username) => user.remove({username: username}),
}
