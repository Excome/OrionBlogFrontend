import Vue from 'vue'
import Vuex from 'vuex'
import usersApi from "@/api/usersApi";
import subscriptionApi from "@/api/subscriptionApi";
import { isAdmin } from "@/utils/userUtils";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: {},
    userFollows: [],
    adminUser: false
  },
  getters: {
    getUserProfile: state => state.userProfile,
    getUserFollows: state => state.userFollows
  },
  mutations: {
    setUserMutation(state, userProfile){
      state.userProfile = userProfile
      state.adminUser = isAdmin(userProfile)
    },
    setUserFollowsMutation(state, userFollows){
      state.userFollows = userFollows
    },
    dropUserMutation(state){
      state.userProfile = {}
    },
    dropUserFollowsMutation(state){
      state.userFollows = []
    },
    followUserMutation(state, follow){
      state.userFollows.push(follow)
    },
    unFollowUserMutation(state, followUsername) {
      state.userFollows.forEach(function (value, index, array) {
        if(value.username === followUsername){
          array.splice(index, 1)
        }
      })
    }
  },
  actions: {
    async setUserAction({ commit }, username){
      const userResponse = await usersApi.getUser(username)
      const profile = userResponse.data
      commit('setUserMutation', profile)
    },
   async setUserFollowsAction({ commit }, username){
     let page = 0
     let follows = []
     while (page != -1){
       const followsResponse = await subscriptionApi.getFollows(username, page)
       if(followsResponse.data.length === 100) {
         follows = follows.concat(followsResponse.data)
         page++
       }else {
         follows = follows.concat(followsResponse.data)
         page = -1
       }
     }
     commit('setUserFollowsMutation', follows)
   },
    async followUserAction({ commit, state }, followUsername){
      try {
        let sub = {
          follower: {username: state.userProfile.username},
          follow: {username: followUsername}
        }
        const response = await subscriptionApi.followUser(followUsername, sub)
        const data = response.data
        commit('followUserMutation', data.follow)
        return true
      }catch (e) {
        console.log(e)
        return false
      }
    },
    async unFollowUserAction({ commit, state }, followUsername){
      try{
        let sub = {
          follower: {username: state.userProfile.username},
          follow: {username: followUsername}
        }
        await subscriptionApi.unFollowUser(followUsername, sub)
        commit('unFollowUserMutation', followUsername)
        return true
      }catch (e) {
        console.log(e)
        return false
      }
    }
  },
  modules: {
  },

  plugins: [createPersistedState({
    paths: ['userProfile', 'userFollows', 'adminUser']
  })]
})
