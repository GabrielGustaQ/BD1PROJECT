<template>
  <q-page class="login-page">
    <q-card class="login-card">
      <q-card-section>
        <div class="row items-center">
          <img src="src/assets/logo.png" alt="Logo" class="login-logo" />
          <div class="login-title">SGS</div>
        </div>
        <q-input filled v-model="email" label="Email" class="login-input" />
        <q-input filled v-model="password" label="Senha" type="password" class="login-input" />
        <q-btn label="Login" color="primary" @click="login" class="login-button" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { QPage, QCard, QCardSection, QInput, QBtn } from 'quasar';

export default defineComponent({
  name: 'LoginPage',
  components: { QPage, QCard, QCardSection, QInput, QBtn },
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const login = () => {
      // Lógica de autenticação
      if (email.value === 'admin@mail.com' && password.value === '123456') {
        router.push('/dashboard');
      } else {
        alert('Credenciais inválidas');
      }
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
  background: #f5f5f5;
}
.login-card {
  width: 400px;
  padding: 20px;
}
.login-logo {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}
.login-title {
  font-size: 1.5rem;
}
.login-input {
  margin-bottom: 20px;
}
.login-button {
  width: 100%;
}
</style>
