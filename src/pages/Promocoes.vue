<template>
  <q-page padding>
    <div class="promocoes-container">
      <q-card v-for="promocao in promocoes" :key="promocao.id" class="promocao-card">
        <q-card-section>
          <div class="text-h6">{{ promocao.title }}</div>
          <q-input outlined v-model="promocao.searchTerm" placeholder="Buscar cliente..." class="q-mt-md" />
        </q-card-section>

        <q-card-actions>
          <q-btn color="primary" label="Adicionar" @click="adicionarCliente(promocao)" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Promocao {
  id: number;
  title: string;
  searchTerm: string;
}

export default defineComponent({
  name: 'PromocoesPage',
  setup() {
    const promocoes = ref<Promocao[]>([
      { id: 1, title: 'Promoção de Verão', searchTerm: '' },
      { id: 2, title: 'Black Friday', searchTerm: '' },
      { id: 3, title: 'Promoção de Inverno', searchTerm: '' },
    ]);

    const adicionarCliente = (promocao: Promocao) => {
      console.log(`Adicionar cliente à promoção: ${promocao.title}`);
      // Implemente a lógica para adicionar um cliente à promoção
    };

    return {
      promocoes,
      adicionarCliente,
    };
  },
});
</script>

<style scoped>
.promocoes-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.promocao-card {
  width: 300px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombra leve */
}

.q-input {
  width: 100%;
}
</style>
