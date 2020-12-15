<template>
  <v-row justify="center">
    <v-col cols="6">
      <v-card elevation="3" class="mb-3">
        <v-card-title>Пользователь <span style="color: #fcba03" class="ml-2">{{ username }}</span></v-card-title>
      </v-card>

      <v-tabs centered>
        <v-tab>
          <v-icon left>mdi-account</v-icon>
          Профиль
        </v-tab>
        <v-tab><v-icon left>mdi-lock</v-icon>
          Безопасность
        </v-tab>

        <v-tab-item>
          <admin-user-profile :username="username"/>
        </v-tab-item>

        <v-tab-item>
          <admin-user-security :username="username"/>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
import AdminUserProfile from "@/components/admin/AdminUserProfile";
import AdminUserSecurity from "@/components/admin/AdminUserSecurity";
export default {
  name: "AdminUser",
  components: {
    AdminUserProfile,
    AdminUserSecurity
  },
  data() {
    return {
      username: String,

    }
  },
  created() {
    this.username = this.$route.params.username
  }
}
</script>

<style scoped>

</style>