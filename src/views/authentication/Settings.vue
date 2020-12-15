<template>
    <v-tabs centered>
      <v-tab>
        <v-icon left>mdi-account</v-icon>
        Профиль
      </v-tab>
      <v-tab><v-icon left>mdi-lock</v-icon>
        Безопасность
      </v-tab>

      <v-tab-item>
        <settings-profile :user="user"/>
      </v-tab-item>

      <v-tab-item>
        <settings-security :user="user"/>
      </v-tab-item>
    </v-tabs>
</template>

<script>
import SettingsProfile from '@/components/authentication/SettingsProfile.vue'
import SettingsSecurity from '@/components/authentication/SettingsSecurity.vue'
export default {
  name: "Settings",
  components: {
    SettingsProfile,
    SettingsSecurity
  },
  data(){
    return {
      user: this.$store.state.userProfile
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>