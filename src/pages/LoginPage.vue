<template>
  <div class="login-page">
    <q-card class="login-card">
      <q-card-section>
        <div class="row items-center">
          <q-img src="src/assets/logo.svg" alt="Logo" />
        </div>
        <q-input filled v-model="email" label="Email" class="login-input" />
        <q-input filled v-model="password" label="Senha" type="password" class="login-input" />
        <q-btn label="Login" color="pink-6" @click="login" class="login-button" />
      </q-card-section>
    </q-card>
    <q-card class="img-card">
      <img class="img" src="../assets/illustration.svg" />
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { QCard, QCardSection, QInput, QBtn } from 'quasar';
import { api } from 'src/boot/axios';

export default defineComponent({
  name: 'LoginPage',
  components: { QCard, QCardSection, QInput, QBtn },
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const login = async () => {
      // Lógica de autenticação
      const data = (await api.get('/usuario')).data;

      console.log(data[0])
      if (data[0].email === email.value && data[0].password === password.value) {
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
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.img-card {
  width: 100%;
  display: flex;
  justify-content: center;
  flex: 1;
  background-color: rgba(241, 118, 139, 0.20);
}

img {
  width: 70%;
}


.login-input {
  margin-top: 15px;
}

.login-button {
  width: 100%;
  margin-top: 10px;
}
</style>
