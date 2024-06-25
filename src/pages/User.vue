<template>
  <q-page padding>
    <q-btn color="primary" label="Adicionar Cliente" @click="mostrarDialogNovoCliente = true" />
    
    <!-- Diálogo para Novo Cliente -->
    <q-dialog v-model="mostrarDialogNovoCliente" persistent>
      <q-card>
        <q-card-section>
          <q-input v-model="novoCliente.nome" label="Nome" dense />
          <q-input v-model="novoCliente.email" label="Email" dense />
          <q-input v-model="novoCliente.telefone" label="Telefone" dense />
        </q-card-section>
        
        <q-card-actions align="right">
          <q-btn label="Cancelar" color="secondary" @click="cancelarNovoCliente" />
          <q-btn label="Adicionar" color="primary" @click="adicionarNovoCliente" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    
    <!-- Tabela de Clientes -->
    <q-table
      :rows="clientes"
      
      row-key="id"
      class="shadow-0"
      flat
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { QBtn, QDialog, QCard, QCardSection, QCardActions, QInput, QTable } from 'quasar';

interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

export default defineComponent({
  name: 'UserPage',
  components: {
    QBtn,
    QDialog,
    QCard,
    QCardSection,
    QCardActions,
    QInput,
    QTable,
  },
  setup() {
    const clientes = ref<Cliente[]>([
      { id: 1, nome: 'Cliente A', email: 'clienteA@email.com', telefone: '(00) 0000-0000' },
      { id: 2, nome: 'Cliente B', email: 'clienteB@email.com', telefone: '(00) 0000-0000' },
      { id: 3, nome: 'Cliente C', email: 'clienteC@email.com', telefone: '(00) 0000-0000' },
    ]);

    const columns = [
      { name: 'nome', label: 'Nome', align: 'left', field: 'nome' },
      { name: 'email', label: 'Email', align: 'left', field: 'email' },
      { name: 'telefone', label: 'Telefone', align: 'left', field: 'telefone' },
    ];

    const mostrarDialogNovoCliente = ref(false);
    const novoCliente = ref<Cliente>({ id: 0, nome: '', email: '', telefone: '' });

    const adicionarNovoCliente = () => {
      if (novoCliente.value.nome && novoCliente.value.email && novoCliente.value.telefone) {
        clientes.value.push({
          id: clientes.value.length + 1,
          nome: novoCliente.value.nome,
          email: novoCliente.value.email,
          telefone: novoCliente.value.telefone,
        });
        cancelarNovoCliente();
      }
    };

    const cancelarNovoCliente = () => {
      mostrarDialogNovoCliente.value = false;
      novoCliente.value = { id: 0, nome: '', email: '', telefone: '' };
    };

    return {
      clientes,
      columns,
      mostrarDialogNovoCliente,
      novoCliente,
      adicionarNovoCliente,
      cancelarNovoCliente,
    };
  },
});
</script>

<style scoped>
</style>
