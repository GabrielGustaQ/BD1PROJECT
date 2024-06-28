<template>
    <q-page class="login-page">
      <q-card class="login-card">
        <q-card-section>
          <q-img src="path/to/your/logo.png" class="login-logo" />
          <q-input filled v-model="email" label="Email" type="email" />
          <q-input filled v-model="password" label="Senha" type="password" />
          <q-btn label="Login" color="primary" @click="login" class="login-btn" />
        </q-card-section>
      </q-card>
      <q-img src="path/to/your/illustration.png" class="login-illustration" />
    </q-page>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { QPage, QCard, QCardSection, QInput, QBtn, QImg } from 'quasar';
  
  export default defineComponent({
    name: 'LoginPage',
    components: { QPage, QCard, QCardSection, QInput, QBtn, QImg },
    setup() {
      const email = ref('');
      const password = ref('');
  
      const login = () => {
        // Implementar lógica de login aqui
        console.log(`Email: ${email.value}, Senha: ${password.value}`);
      };
  
      return { email, password, login };
    },
  });
  </script>
  
  <style scoped>
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .login-card {
    max-width: 400px;
    width: 100%;
    margin-right: 50px;
  }
  .login-logo {
    width: 100px;
    margin-bottom: 20px;
  }
  .login-illustration {
    max-width: 600px;
  }
  .login-btn {
    width: 100%;
    margin-top: 20px;
  }
  </style>
  