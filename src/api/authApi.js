import Vue from 'vue'

import { serverUrl } from "@/api/resource"

const authLogin = Vue.resource(serverUrl + '/login')
const authRegister = Vue.resource(serverUrl + '/registration')
const authLogout = Vue.resource(serverUrl + '/logout')

export default {
    login: user => authLogin.save(user),

    async register(user){
        return await authRegister.save(user)
    },

    logout: () => authLogout.get()

}