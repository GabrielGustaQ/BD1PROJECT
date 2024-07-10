<template>
  <q-page class="admin-page">
    <div class="header">
      <div class="title">Administradores</div>
      <q-btn label="Adicionar Usuário" color="primary" @click="showAddUserDialog = true" />
    </div>
    <q-input filled v-model="search" label="Pesquisar usuário" class="search-input" />
    <q-table :rows="filteredAdmins" :columns="columns" row-key="id" class="admin-table">
      <template v-slot:body-cell-actions="props">
        <q-td>
          <q-btn icon="delete" color="negative" @click="deleteUser(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="showAddUserDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Adicionar Novo Usuário</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newUser.email" label="Email" />
          <q-input v-model="newUser.password" label="Senha" type="password" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Adicionar" @click="addUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { QPage, QBtn, QInput, QTable, QTd, QDialog, QCard, QCardSection, QCardActions } from 'quasar';
import axios from 'axios';

interface Admin {
  id: number;
  email: string;
  password: string;
}

interface Column {
  name: string;
  label: string;
  field: string | ((row: Admin) => string);
  align: 'left' | 'right' | 'center';
  required?: boolean;
  sortable?: boolean;
  sort?: (a: Admin, b: Admin, rowA: Admin, rowB: Admin) => number;
  headerClasses?: string;
}

export default defineComponent({
  name: 'AdminPage',
  components: { QPage, QBtn, QInput, QTable, QTd, QDialog, QCard, QCardSection, QCardActions },
  setup() {
    const search = ref('');
    const admins = ref<Admin[]>([]);
    const showAddUserDialog = ref(false);
    const newUser = ref<Admin>({ id: 0, email: '', password: '' });

    const columns: Column[] = [
      { name: 'id', label: 'Id', align: 'left', field: 'id' },
      { name: 'email', label: 'Email', align: 'left', field: 'email' },
      { name: 'actions', label: 'Ações', align: 'center', field: '' },
    ];

    const filteredAdmins = computed(() => {
      if (!search.value) {
        return admins.value;
      }
      return admins.value.filter(admin =>
        admin.email.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:3000/usuarios');
        admins.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar administradores:', error);
      }
    };

    const addUser = async () => {
      try {
        const response = await axios.post('http://localhost:3000/usuarios', newUser.value);
        admins.value.push(response.data);
        showAddUserDialog.value = false;
        newUser.value = { id: 0, email: '', password: '' };
      } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
      }
    };

    const deleteUser = async (id: number) => {
      try {
        await axios.delete(`http://localhost:3000/usuarios/${id}`);
        admins.value = admins.value.filter(admin => admin.id !== id);
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    };

    onMounted(fetchAdmins);

    return { search, admins, columns, addUser, deleteUser, showAddUserDialog, newUser, filteredAdmins };
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

.q-btn {
  margin-right: 10px;
}
</style>
