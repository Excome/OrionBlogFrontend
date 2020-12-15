<template>
  <v-card elevation="3">
    <v-card-title>
      <router-link :to="`/users/${user.username}`" class="profile_username">
        Пользователь <span style="color: #fcba03">{{ user.username }}</span>
      </router-link>
      <v-spacer/>
      <v-btn v-if="user.username === $store.state.userProfile.username" to="/settings">ИЗМЕНИТЬ</v-btn>
      <template v-else-if="$store.state.userProfile.username != undefined">
        <template v-if="isFollow">
          <v-btn color="error" @click="unFollow">ОТПИСАТЬСЯ</v-btn>
        </template>
        <template v-else>
          <v-btn color="primary" @click="follow">ПОДПИСАТЬСЯ</v-btn>
        </template>
      </template>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-img max-height="300" max-width="300" src="../../../public/img/dflt_user_img.jpg" :alt="user.username"/>
        </v-col>
        <v-col cols="8">
          <v-simple-table>
            <tbody>
            <template v-if="!privateProfile">
              <tr>
                <td>Фамилия</td>
                <td v-if="user.surname === ''">не указано</td>
                <td v-else>{{ user.surname }}</td>
              </tr>
              <tr>
                <td>Имя</td>
                <td v-if="user.name === ''">не указано</td>
                <td v-else>{{ user.name }}</td>
              </tr>
              <tr>
                <td>Дата рождения</td>
                <td v-if="user.birthday === null || user.birthday === ''">не указано</td>
                <td velse>{{ user.birthday }}</td>
              </tr>
              <tr>
                <td>Дата регистрации</td>
                <td v-if="user.createdDate === null || user.createdDate === ''">не указано</td>
                <td velse>{{ user.createdDate }}</td>
              </tr>
              <tr>
                <td>Роли</td>
                <td>
                <span v-for="role in user.roles" :key="role.id">
                  <span v-if="role.name === 'ROLE_USER'" class="role_user mr-1">
                    Пользователь
                  </span>
                  <span v-if="role.name === 'ROLE_ADMIN'" class="role_admin mr-1">
                    Администратор
                  </span>
                </span>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td>
                  Информация скрыта пользователем
                </td>
              </tr>
            </template>
            </tbody>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "vuex"
import { mapGetters } from "vuex"
export default {
  name: "UserProfile",
  props: {
    user: {},
    privateProfile: Boolean
  },
  computed: {
    ...mapGetters(['getUserFollows']),
    isFollow (){
      const follows = this.getUserFollows
      for(let i=0; i<follows.length; i++){
        if(follows[i].username === this.user.username){
          return true
        }
      }
      return false
    }
  },
  methods: {
    ...mapActions(['followUserAction', 'unFollowUserAction']),
    follow () {
      this.followUserAction(this.user.username)
    },
    unFollow () {
      this.unFollowUserAction(this.user.username)
    }
  }
}
</script>

<style scoped>
.profile_username{
  text-decoration: none;
  color: black;
}

.role_user{
  padding: 3px;
  background: #9bd1a0;
  color: white;
}

.role_admin{
  padding: 3px;
  background: #f2a468;
  color: white;
}
</style>