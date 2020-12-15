`<template>
  <v-layout>
    <v-row justify="center">
      <v-col cols="6">
        <v-card elevation="3">
          <v-card-title>
            Учебный проект "Блог"
          </v-card-title>
          <v-card-text>
            <div>Стажер Java: Пешехонов Максим (maksim.peshekhonov@orioninc.com)</div>
            <div>Ментор: Газимзянов Максим</div>
          </v-card-text>
        </v-card>
        <v-card elevation="3" class="mt-3">
          <v-card-title>Backend</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-img max-height="300" max-width="300" src="../../public/img/spring_logo.png"/>
              </v-col>
              <v-col cols="8">
                <v-list disabled>
                  <v-subheader>ТЕХНОЛОГИИ</v-subheader>
                  <v-list-item-group>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-language-java</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Java 11</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-dots-horizontal-circle</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Spring Framework</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-dots-horizontal-circle</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Spring MVC</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-dots-horizontal-circle</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Spring Data</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-dots-horizontal-circle</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Spring Security</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>

</style>`