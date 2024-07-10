<template>
  <q-page class="admin-page">
    <div class="header">
      <div class="title">Clientes</div>
      <q-btn label="Adicionar Cliente" color="primary" @click="showAddClientDialog = true" />
    </div>
    <q-input filled v-model="search" label="Pesquisar cliente" class="search-input" />
    <q-table :rows="filteredClients" :columns="columns" row-key="id" class="client-table">
      <template v-slot:body-cell-actions="props">
        <q-td>
          <q-btn icon="edit" color="primary" @click="editClient(props.row)" />
          <q-btn icon="delete" color="negative" @click="deleteClient(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="showAddClientDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Adicionar Novo Cliente</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newClient.nome" label="Nome" />
          <q-input v-model="newClient.sobrenome" label="Sobrenome" />
          <q-input v-model="newClient.endereco" label="Endereço" />
          <q-input v-model="newClient.sexo" label="Sexo" />
          <q-input v-model="newClient.idade" label="Idade" type="number" />
          <q-input v-model="newClient.celular" label="Celular" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Adicionar" @click="addClient" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { QPage, QBtn, QInput, QTable, QTd, QDialog, QCard, QCardSection, QCardActions } from 'quasar';
import axios from 'axios';

interface Client {
  id: number;
  nome: string;
  sobrenome: string;
  endereco: string;
  sexo: string;
  idade: number;
  celular: string;
}

interface Column {
  name: string;
  label: string;
  field: string | ((row: Client) => string);
  align: 'left' | 'right' | 'center';
  required?: boolean;
  sortable?: boolean;
  sort?: (a: Client, b: Client, rowA: Client, rowB: Client) => number;
  headerClasses?: string;
}

export default defineComponent({
  name: 'AdminClientsPage',
  components: { QPage, QBtn, QInput, QTable, QTd, QDialog, QCard, QCardSection, QCardActions },
  setup() {
    const search = ref('');
    const clients = ref<Client[]>([]);
    const showAddClientDialog = ref(false);
    const newClient = ref<Client>({ id: 0, nome: '', sobrenome: '', endereco: '', sexo: '', idade: 0, celular: '' });

    const columns: Column[] = [
      { name: 'id', label: 'Id', align: 'left', field: 'id' },
      { name: 'nome', label: 'Nome', align: 'left', field: 'nome' },
      { name: 'sobrenome', label: 'Sobrenome', align: 'left', field: 'sobrenome' },
      { name: 'endereco', label: 'Endereço', align: 'left', field: 'endereco' },
      { name: 'sexo', label: 'Sexo', align: 'left', field: 'sexo' },
      { name: 'idade', label: 'Idade', align: 'left', field: 'idade' },
      { name: 'celular', label: 'Celular', align: 'left', field: 'celular' },
      { name: 'actions', label: 'Ações', align: 'center', field: '' },
    ];

    const filteredClients = computed(() => {
      if (!search.value) {
        return clients.value;
      }
      return clients.value.filter(client =>
        client.nome.toLowerCase().includes(search.value.toLowerCase()) ||
        client.sobrenome.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/clientes');
        clients.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    const addClient = async () => {
      try {
        const response = await axios.post('http://localhost:3000/clientes', newClient.value);
        clients.value.push(response.data);
        showAddClientDialog.value = false;
        newClient.value = { id: 0, nome: '', sobrenome: '', endereco: '', sexo: '', idade: 0, celular: '' };
      } catch (error) {
        console.error('Erro ao adicionar cliente:', error);
      }
    };

    const editClient = (client: Client) => {
      // Implementar edição se necessário
      console.log('Editar cliente:', client);
    };

    const deleteClient = async (id: number) => {
      try {
        await axios.delete(`http://localhost:3000/clientes/${id}`);
        clients.value = clients.value.filter(client => client.id !== id);
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
      }
    };

    onMounted(fetchClients);

    return { search, clients, columns, addClient, editClient, deleteClient, showAddClientDialog, newClient, filteredClients };
  },
});
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 1.5rem;
}

.search-input {
  margin-bottom: 20px;
}

.client-table {
  margin-top: 20px;
}

.q-btn {
  margin-right: 10px;
}
</style>
