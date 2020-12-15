<template>
  <v-layout align-center justify-center row fill-height>
    <v-row>
      <v-col :cols="10"  md="4" offset="1" offset-md="4">
        <v-card shaped elevation="8" class="px-16 pt-8 pb-16">
          <v-card-title class="text-h4">Регистрация</v-card-title>
          <v-alert dense elevation="11" type="error" v-if="saveIsOk === false">
            Упс! {{ errorMessage }}
          </v-alert>
          <v-alert dense elevation="11" type="success" v-if="saveIsOk">
            Регистрация прошла успешно!
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
                v-model="email"
                :error-messages="emailErrors"
                label="Email"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
            ></v-text-field>

            <v-text-field
                v-model="password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="showPass ? 'text' : 'password'"
                name="password"
                label="Пароль"
                hint="Пароль больше 6 символов"
                value=""
                class="input-group--focused"
                @click:append="showPass = !showPass"
            ></v-text-field>

            <v-text-field
                v-model="passwordConfirm"
                :rules="[rules.required, rules.min, rules.passMatch]"
                :type="showPass ? 'text' : 'password'"
                name="passwordConfirm"
                label="Пароль еще раз"
                hint="Пароль больше 6 символов"
                value=""
                class="input-group--focused"
            ></v-text-field>

            <v-btn class="mr-4 mt-3" @click="register">Зарегистрироваться</v-btn>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import authApi from "@/api/authApi";

export default {
  name: "Registration",

  mixins: [validationMixin],
  validations: {
    username: { required, maxLength: maxLength(25) },
    email: { required, email },
  },

  computed: {
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.maxLength && errors.push('Имя пользователя не может быть более 25 символов')
      !this.$v.username.required && errors.push('Имя пользователя должно быть заполнено')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Email должен быть в формате example@email.com')
      !this.$v.email.required && errors.push('Email должен быть заполнен')
      return errors
    },
  },

  data(){
    return {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      showPass: false,
      saveIsOk: null,
      errorMessage: 'Что-то пошло не так!',
      rules: {
        required: value => !!value || 'Заполни поле пароля.',
        min: v => v.length >= 6 || 'Минимум 6 символов',
        passMatch: () => this.password === this.passwordConfirm || ('Введенные пароли не совпадают'),
      }
    }
  },
  methods: {
    async register () {
      try{
        const response = await authApi.register({username: this.username, email: this.email,
          password: this.password, passwordConfirm: this.passwordConfirm})
        if(response.ok) {
          this.saveIsOk = true
          await this.$router.push("/login")
        }
      }
      catch (e) {
        const body = e.body
        switch (body.subCode){
          case 1005: this.errorMessage = 'Email ' + this.email + ' уже занят!'; break
          case 1006: this.errorMessage = 'Имя пользователя ' + this.username + ' уже занято!'; break
          case 1007: this.errorMessage = 'Пароль и подтверждения пароля не совпдаают!'; break;
        }
        this.saveIsOk = false;
      }
    }
  }
}
</script>

<style scoped>

</style>