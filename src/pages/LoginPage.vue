<template>
  <div class="login-page">
    <q-card class="login-card">
      <q-card-section>
        <div class="row items-center">
          <img src="src/assets/logo.svg" alt="Logo" />
        </div>
        <q-input filled v-model="email" label="Email" class="login-input" />
        <q-input filled v-model="password" label="Senha" type="password" class="login-input" />
        <q-btn label="Login" color="primary" @click="login" class="login-button" />
      </q-card-section>
    </q-card>
    <q-card class="img-card">
      <q-img src="../assets/illustration.svg" style="width: 700px;" />
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { QCard, QCardSection, QInput, QBtn, QImg } from 'quasar';

export default defineComponent({
  name: 'LoginPage',
  components: { QCard, QCardSection, QInput, QBtn, QImg },
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
  height: 100vh;
}

.login-card {
  padding: 20px;
}

.img-card {
  width: 100%;
  background-color: rgba(241, 118, 139, 0.20);
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
