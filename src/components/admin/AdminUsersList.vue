<template>
    <v-card elevation="3" class="py-3 px-3">
      <v-text-field
          outlined
          append-icon="mdi-magnify"
          v-model="searchArg"
          label="Найти пользователя"
          single-line
          hide-details
          @click:append="search"
          class="mb-3"
      ></v-text-field>
      <v-simple-table fixed-header height="700px">
        <thead>
        <tr>
          <th>ID</th>
          <th>Имя пользователя</th>
          <th>Роли</th>
          <th>Дата регистрации</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td width="35%">
            <div class="my-1">
              <router-link :to="`/admin/users/${user.username}`" style="text-decoration: none; font-size: 12pt">
                {{ user.username }}
              </router-link>
            </div>
          </td>
          <td>
          <span v-for="role in user.roles" :key="role.id">
              <span v-if="role.name === 'ROLE_USER'" class="role_user mr-2">
                User
              </span>
              <span v-if="role.name === 'ROLE_ADMIN'" class="role_admin mr-2">
                Admin
              </span>
            </span>
          </td>
          <td>
            {{ user.createdDate }}
          </td>
        </tr>
        </tbody>
        <v-layout justify-end v-if="showBtnPagination">
          <v-btn text @click="loadMore">Еще</v-btn>
        </v-layout>
      </v-simple-table>
    </v-card>
</template>

<script>
import adminApi from "@/api/adminApi";

export default {
  name: "AdminUsersList",
  data() {
    return {
      users: Array,
      searchArg: '',
      page: 1,
      showBtnPagination: false
    }
  },
  async created() {
    try{
      const response = await adminApi.getUsers()
      this.users = response.data
      this.showBtnPagination = this.users.length === 15 ? true : false
    }catch (e) {
      console.log(e)
    }
  },
  methods: {
    async search() {
      this.page = 0
      this.users = await this.loadUsers()
      if(this.users.length === 15)
        this.showBtnPagination = true
      else
        this.showBtnPagination = false
    },

    async loadUsers(){
      try{
        const response = await adminApi.getUsers({username: this.searchArg, page: this.page})
        return response.data
      }catch (e) {
        console.log(e)
        await this.$router.push('/')
      }
    },

    async loadMore(){
      try{
        const addUsers = await this.loadUsers()
        this.users = this.users.concat(addUsers)
        this.page++
        if(addUsers.length === 15)
          this.showBtnPagination = true
        else
          this.showBtnPagination = false
      }catch (e) {
        await this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
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