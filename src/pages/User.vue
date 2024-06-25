<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <q-card-title>
          Novo cliente
          <q-btn
            class="q-ml-md"
            color="primary"
            icon="add"
            label="Adicionar"
            @click="adicionarCliente"
          />
        </q-card-title>
      </q-card-section>
    </q-card>

    <q-card class="q-mt-md">
      <q-card-section>
        <q-table
          :rows="clientes"
          row-key="id"
          class="shadow-0"
          flat
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
}

export default defineComponent({
  name: 'UserPage',

  data() {
    return {
      clientes: [
        { id: 1, nome: 'Cliente 1', telefone: '123456789', email: 'cliente1@example.com' },
        { id: 2, nome: 'Cliente 2', telefone: '987654321', email: 'cliente2@example.com' },
      ] as Cliente[],
      columns: [
        { name: 'nome', label: 'Nome', align: 'left', field: 'nome' },
        { name: 'telefone', label: 'Telefone', align: 'left', field: 'telefone' },
        { name: 'email', label: 'Email', align: 'left', field: 'email' },
      ],
    };
  },

  methods: {
    adicionarCliente() {
      // Implementar lógica para adicionar um novo cliente
      console.log('Adicionar novo cliente');
    },
  },
});
</script>

<style scoped>
/* Estilos opcionais podem ser adicionados aqui */
</style>
