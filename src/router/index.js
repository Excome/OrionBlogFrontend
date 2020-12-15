import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import {isAdmin} from "@/utils/userUtils"

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/posts/Posts.vue')
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/posts/Posts.vue'),
  },
  {
    path: '/posts/feed',
    name: 'PostsFeed',
    component: () => import('../views/posts/PostsFeed.vue'),
    beforeEnter: (to, from, next) => {
      let user = store.state.userProfile
      if(user.username != undefined)
        next()
      else
        next({path: '/'})
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/authentication/Login.vue'),
    beforeEnter: (to, from, next) => {
      let user = store.state.userProfile
      if(user.username === undefined)
        next()
      else
        next({path: '/'})
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/users/Users.vue')
  },
  {
    path: '/users/:username',
    name: 'UserProfile',
    component: () => import('../views/users/User.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('../views/authentication/Registration.vue'),
    beforeEnter: (to, from, next) => {
      let user = store.state.userProfile
      if(user.username === undefined)
        next()
      else
        next({path: '/'})
    }
  },
  {
    path: '/posts/new',
    name: 'New Post',
    component: () => import('../views/posts/CreatePost.vue'),
    beforeEnter: (to, from, next) => {
      const user = store.state.userProfile
      if(user.username != undefined)
        next()
      else
        next({path: '/'})
    }
  },
  {
    path: '/posts/:postId',
    component: () => import('../views/posts/Post.vue')
  },
  {
    path: '/posts/:postId/edit',
    component: () => import('../views/posts/EditPost.vue'),
    beforeEnter: (to, from, next) => {
      const user = store.state.userProfile
      if(user.username != undefined)
        next()
      else
        next({path: '/'})
    }
  },
  {
    path: '/settings',
    component: () => import('../views/authentication/Settings.vue'),
    beforeEnter: (to, from, next) => {
      let user = store.state.userProfile
      if(user.username != undefined)
        next()
      else
        next({path: '/'})
    }
  },
  {
    path: '/admin',
    name: 'Admin Panel',
    component: () => import('../views/admin/AdminPanel.vue'),
    beforeEnter: (to, from, next) => {
      let user = store.state.userProfile
      if(isAdmin(user))
        next()
      else
        next({path: '/'})
    }
  },
  {
    path: '/admin/users/:username',
    name: 'AdminUserProfile',
    component: () => import('../views/admin/AdminUser.vue'),
    beforeEnter: (to, from, next) => {
      let user = store.state.userProfile
      if(isAdmin(user))
        next()
      else
        next({path: '/'})
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
