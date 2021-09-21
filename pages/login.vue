<template>
  <v-row justify="center" align="center">
    <v-col cols="6">
      <v-card>
        <v-card-title class="d-flex justify-center align-center">
          Авторизация
        </v-card-title>
        <v-card-text>
          <v-form ref="authForm">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="login"
                  label="Логин"
                  outlined
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="password"
                  label="Пароль"
                  outlined
                  type="password"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn @click="trylogin">
                  Войти
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    async trylogin () {
      const formData = {
        login: this.login,
        password: this.password
      }

      const data = await this.$axios.$post('/api/login', formData)
      this.$store.dispatch('setAuth', data)

      if (this.$store.state.isAdmin) {
        this.$router.push('/admin')
      }

      if (this.$store.state.worker) {
        this.$router.push('/home')
      }
    }
  }
}
</script>
