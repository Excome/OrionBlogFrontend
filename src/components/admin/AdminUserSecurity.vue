<template>
  <v-card class="px-5 py-5">
    <v-alert dense elevation="11" type="error" v-if="settingsIsOk === false">
      Упс! {{ errorMessage }}
    </v-alert>
    <v-alert dense elevation="11" type="success" v-if="settingsIsOk">
      Профиль пользователя успешно изменен!
    </v-alert>
    <v-form>
      <v-text-field
          outlined
          v-model="password"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min, rules.passMatch]"
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
</template>

<script>
import adminApi from "@/api/adminApi";
export default {
  name: "AdminUserSecurity",
  props: {
    username: String
  },
  data() {
    return{
      password: "",
      passwordConfirm: "",
      settingsIsOk: null,
      showPass: false,
      errorMessage: 'Что-то пошло не так',
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
          username: this.username,
          password: this.password,
          passwordConfirm: this.passwordConfirm
        }
        const response = await adminApi.editUserSecurity(this.username, user)
        this.settingsIsOk = response.ok
      }catch (e) {
        switch(e.data.subCode){
          case 1007: this.errorMessage = 'Пароль и подтверждения пароля не совпадают!'; break
        }
        this.settingsIsOk = e.data.ok

      }
    }
  }
}
</script>

<style scoped>

</style>