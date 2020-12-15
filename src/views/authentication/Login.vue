<template>
  <v-layout align-center justify-center row fill-height>
    <v-container>
      <v-row>
        <v-col :cols="10"  md="4" offset="1" offset-md="4">
          <v-card shaped elevation="8" class="px-16 pt-8 pb-16">
            <v-card-title class="text-h4">Вход</v-card-title>
            <v-alert dense elevation="11" type="error" v-if="authBody.auth === 'DENIED'">
              <strong>Имя пользователя</strong> или <strong>пароль</strong> не совпадают
            </v-alert>
            <v-alert dense elevation="11" type="success" v-if="authBody.auth === 'SUCCESS'">
              Вход в аккаунт успешно выполнен!
            </v-alert>
            <form>
              <v-text-field
                  v-model="username"
                  :error-messages="usernameErrors"
                  label="Имя пользователя"
                  required
                  @input="$v.username.$touch()"
                  @blur="$v.username.$touch()"
              ></v-text-field>

              <v-text-field
                  v-model="password"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="showPass ? 'text' : 'password'"
                  name="input-10-2"
                  label="Пароль"
                  hint="Пароль больше 6 символов"
                  value=""
                  class="input-group--focused"
                  @click:append="showPass = !showPass"
              ></v-text-field>

              <v-btn class="mr-4 mt-3" @click="login">Войти</v-btn>
            </form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import authApi from "@/api/authApi"
export default {
  name: 'Login',

  mixins: [validationMixin],
  validations: {
    username: { required, maxLength: maxLength(25) },
  },

  data () {
    return {
      authBody: {},
      username: '',
      showPass: false,
      password: '',
      rules: {
        required: value => !!value || 'Заполни поле пароля.',
        min: v => v.length >= 6 || 'Минимум 6 символов',
      }
    }
  },

  computed: {
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.maxLength && errors.push('Имя пользователя должно состоять не более чем из 25 символов.')
      !this.$v.username.required && errors.push('Имя пользователя должно быть заполнено.')
      return errors
    }
  },

  methods: {
    ...mapActions(['setUserAction', 'setUserFollowsAction']),

    async login(){
      try {
        const loginResponse = await authApi.login({username: this.username, password: this.password})
        this.authBody = loginResponse.data
        if (this.authBody.auth === 'SUCCESS') {
          await this.setUserAction(this.authBody.username)
          await this.$router.push('/')
          await this.setUserFollowsAction(this.authBody.username)
        }
      } catch (e) {
        this.authBody = e.data
      }
    },
  }
}


</script>

<style scoped>

</style>