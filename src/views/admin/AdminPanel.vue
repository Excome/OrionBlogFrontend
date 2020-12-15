<template>
  <v-layout>
    <v-row justify="center">
      <v-col cols="4">
        <v-card elevation="3" class="mb-3">
          <v-card-title>Список пользователей</v-card-title>
        </v-card>

        <admin-users-list/>

      </v-col>
      <v-col cols="6">
        <v-card elevation="3" class="mb-3">
          <v-card-title>Список постов</v-card-title>
        </v-card>

        <admin-posts-list/>

      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import AdminUsersList from "@/components/admin/AdminUsersList"
import AdminPostsList from "@/components/admin/AdminPostsList"
export default {
  name: "AdminPanel",
  components: {
    AdminUsersList,
    AdminPostsList
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>