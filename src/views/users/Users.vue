<template>
  <v-container fl>
    <v-row justify="center">
      <v-col cols="6">
        <v-card elevation="0" outlined class="mb-6">
          <v-card-title class="text-h4">
            <b>Список пользователей</b>
            <v-spacer></v-spacer>
            <v-card elevation="0" outlined class="px-3 py-3">
              <v-text-field
                  outlined
                  append-icon="mdi-magnify"
                  v-model="searchArg"
                  label="Найти пользователя"
                  single-line
                  hide-details
                  @click:append="search"
              ></v-text-field>
            </v-card>
          </v-card-title>
        </v-card>



        <users-list :users="users"/>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UsersList from "@/components/users/UsersList";
import usersApi from "@/api/usersApi";
export default {
  name: "Users",
  components: {
    UsersList
  },
  data() {
    return {
      users: Array,
      searchArg: '',
      showBtnPagination: false,
      page: 0
    }
  },
  async created() {
    try{
      const response = await usersApi.getUsers()
      this.users = response.data
      this.showBtnPagination = this.users.length === 30 ? true : false
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
        const response = await usersApi.getUsers({username: this.searchArg, page: this.page})
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
        console.log(e)
        await this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>

</style>