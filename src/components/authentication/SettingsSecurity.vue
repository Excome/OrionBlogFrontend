<template>
  <v-row justify="center">
    <v-col class="col-sm-6">
      <v-card class="mx-5 my-5 px-5 py-5">
        <v-card-title>Настроки безопасности</v-card-title>
        <v-alert dense elevation="11" type="error" v-if="settingsIsOk === false">
          Упс! Что-то пошло не так
        </v-alert>
        <v-alert dense elevation="11" type="success" v-if="settingsIsOk">
          Информация Вашего профиля успешно изменена!
        </v-alert>
        <v-form>
          <v-text-field
              outlined
              v-model="password"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showPass ? 'text' : 'password'"
              name="password"
              label="Новый пароль"
              hint="Пароль больше 6 символов"
              value=""
              class="input-group--focused"
              @click:append="showPass = !showPass"
          ></v-text-field>

          <v-text-field
              outlined
              v-model="passwordConfirm"
              :rules="[rules.required, rules.min, rules.passMatch]"
              :type="showPass ? 'text' : 'password'"
              name="passwordConfirm"
              label="Новый пароль еще раз"
              hint="Пароль больше 6 символов"
              value=""
              class="input-group--focused"
          ></v-text-field>
          <v-btn depressed color="primary" block @click="savePass">Сохранить</v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import usersApi from "@/api/usersApi";

export default {
  name: "SettingsSecurity",
  props: {
    user: {}
  },
  data(){
    return{
      password: "",
      passwordConfirm: "",
      settingsIsOk: null,
      showPass: false,
      rules: {
        required: value => !!value || 'Заполни поле пароля.',
        min: v => v.length >= 6 || 'Минимум 6 символов',
        passMatch: () => this.password === this.passwordConfirm || ('Введенные пароли не совпадают'),
      }
    }
  },
  methods: {
    async savePass() {
      try {
        let user = {
          username: this.user.username,
          password: this.password,
          passwordConfirm: this.passwordConfirm
        }
        const response = await usersApi.saveUserPass(user)
        this.settingsIsOk = response.ok
      }catch (e) {
        this.settingsIsOk = e.ok
      }
    }
  }
}
</script>

<style scoped>

</style>