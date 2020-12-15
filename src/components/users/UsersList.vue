<template>
  <v-simple-table>
    <thead>
    <tr>
      <td>Имя пользователя</td>
      <td>Дата регистрации</td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in users" :key="user.id">
      <td width="75%">
        <div class="my-1">
          <router-link :to="`/users/${user.username}`" style="text-decoration: none; font-size: 15pt">
            @{{ user.username }}
          </router-link>
        </div>
        <div class="my-1">
          <span v-for="role in user.roles" :key="role.id">
            <span v-if="role.name === 'ROLE_USER'" class="role_user mr-2">
              Пользователь
            </span>
            <span v-if="role.name === 'ROLE_ADMIN'" class="role_admin mr-2">
              Администратор
            </span>
          </span>
        </div>
      </td>
      <td>
        {{ user.createdDate }}
      </td>
    </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
export default {
  name: "UsersList",
  props: {
    users: Array
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