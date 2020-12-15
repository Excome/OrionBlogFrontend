<template>
  <v-row justify="center">
    <v-col class="col-sm-6">
      <v-card class="mx-5 my-5 px-5 py-5">
        <v-card-title>Настроки профиля</v-card-title>
        <v-alert dense elevation="11" type="error" v-if="settingsIsOk === false">
          Упс! Что-то пошло не так
        </v-alert>
        <v-alert dense elevation="11" type="success" v-if="settingsIsOk">
          Информация Вашего профиля успешно изменена!
        </v-alert>
        <v-form>
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
              :label="user.privateStatus ? 'Аккаунт скрыт от глаз других пользователей' : 'Аккаунт доступен всем пользователям для просмотра'"
          ></v-switch>
          <v-btn depressed color="primary" block @click="saveUser">Сохранить</v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import usersApi from "@/api/usersApi";
import { mapMutations } from 'vuex'
export default {
  name: "SettingsProfile",
  props: {
    user: Object
  },
  data(){
    return{
      settingsIsOk: null
    }
  },
  methods: {
    ...mapMutations(['setUserMutation']),
    async saveUser(){
      try {
        let profile ={
          username: this.user.username,
          surname: this.user.surname,
          name: this.user.name,
          privateStatus: this.user.privateStatus,
          birthday: this.user.birthday
        }
        const response = await usersApi.saveUserProfile(profile)
        const userProfile = response.data
        this.settingsIsOk = response.ok
        this.setUserMutation(userProfile)
      }catch (e) {
        this.settingsIsOk = e.ok
      }
    },
  }
}
</script>

<style scoped>

</style>