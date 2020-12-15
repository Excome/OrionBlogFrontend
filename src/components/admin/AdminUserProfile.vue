<template>
  <v-card class="px-5 py-5">
    <v-alert dense elevation="11" type="error" v-if="requestIsOk === false">
      Упс! {{ errorMessage }}
    </v-alert>
    <v-alert dense elevation="11" type="success" v-if="requestIsOk">
      Профиль пользователя успешно изменен!
    </v-alert>
    <v-form>
      <v-text-field
          v-model="user.email"
          outlined
          label="Email"
          type="email"
      ></v-text-field>
      <v-text-field
          v-model="user.username"
          outlined
          label="Имя пользователя"
      ></v-text-field>
      <v-text-field
          v-model="user.surname"
          outlined
          label="Фамилия"
      ></v-text-field>
      <v-text-field
          v-model="user.name"
          outlined
          label="Имя"
      ></v-text-field>
      <v-text-field
          v-model="user.birthday"
          outlined
          type="date"
          label="Дата рождения"
      ></v-text-field>
      <v-switch
          v-model="user.privateStatus"
          :label="user.privateStatus ? 'Приватный аккаунт' : 'Публичный аккаунт'"
      ></v-switch>
      <div class="mb-3">
        <h4>Роли пользователя:</h4>
        <v-checkbox
            v-model="roleUser"
            label="Пользователь"
            color="success"
            hide-details
        ></v-checkbox>
        <v-checkbox
            v-model="roleAdmin"
            label="Администратор"
            color="orange"
            hide-details
        ></v-checkbox>
      </div>
      <v-btn depressed color="primary" @click="saveUser">Сохранить</v-btn>
      <v-btn depressed color="error" class="float-right" @click.stop="deleteDialog = true">Удалить</v-btn>
    </v-form>
    <v-dialog v-model="deleteDialog" max-width="345">
      <v-card>
        <v-card-title class="headline">Вы действительно хотите удалить данного пользователя?</v-card-title>
        <v-card-text>
          Еще раз хорошенько подумайте, если вы нажмете на кнопку удалить,
          то данный пользователя и все что с ним связано(посты, комментарии, подписки) будет удалено!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="deleteUser">Удалить</v-btn>
          <v-btn color="green darken-1" text @click="deleteDialog = false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import adminApi from "@/api/adminApi";
export default {
  name: "AdminUserProfile",
  props: {
    username: String
  },
  data() {
    return {
      user: Object,
      roleAdmin: false,
      roleUser: false,
      deleteDialog: false,
      requestIsOk: null,
      errorMessage: 'Что-то пошло не так'
    }
  },
  async created() {
    try {
      const response = await adminApi.getUser(this.username)
      this.user = response.data
      this.user.roles.forEach(role => {
        if(role.name === 'ROLE_ADMIN')
          this.roleAdmin = true
        if(role.name === 'ROLE_USER')
          this.roleUser = true
      })
      console.log(this.user)
    }catch (e) {
      console.log(e)
      await this.$router.push("/admin")
    }
  },
  methods: {
    async saveUser() {
      try {
        let roles = []
        if (this.roleUser)
          roles.push({id: 1, name: 'ROLE_USER'})
        if (this.roleAdmin)
          roles.push({id: 2, name: 'ROLE_ADMIN'})
        this.user.roles = roles
        const response = await adminApi.editUserProfile(this.username, this.user)
        this.requestIsOk = response.ok
        this.user = response.data
      }catch (e) {
        switch(e.data.subCode){
          case 1005: this.errorMessage = 'Email ' + this.user.email + ' уже занят'; break
          case 1006: this.errorMessage = 'Имя пользователя ' + this.user.username + ' уже занято'; break
        }
        this.requestIsOk = false
      }
    },
    async deleteUser(){
      try{
        const response = await adminApi.deleteUser(this.username)
        if(response.ok){
          this.$router.push('/admin')
        }
      }catch (e) {
        this.errorMessage = 'Удалить пользователя не получилось!'
        this.requestIsOk = false
      }
    }
  }
}
</script>

<style scoped>

</style>