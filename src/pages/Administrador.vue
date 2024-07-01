<template>
  <q-page class="admin-page">
    <div class="header">
      <div class="title">Administradores</div>
      <q-btn label="Adicionar Usuário" color="primary" @click="addUser" />
    </div>
    <q-input filled v-model="search" label="Pesquisar usuário" class="search-input" />
    <q-table :rows="admins" :columns="columns" row-key="id" class="admin-table">
      <template v-slot:body-cell-actions="props">
        <q-td>
          <q-btn icon="edit" @click="editUser(props.row.id)" />
          <q-btn icon="delete" color="negative" @click="deleteUser(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { QPage, QBtn, QInput, QTable, QTd } from 'quasar';

interface Admin {
  id: number;
  name: string;
  email: string;
  status: string;
}

interface Column {
  name: string;
  label: string;
  field: string | ((row: Admin) => any);
  align: 'left' | 'right' | 'center';
  required?: boolean;
  sortable?: boolean;
  sort?: (a: Admin, b: Admin, rowA: Admin, rowB: Admin) => number;
  headerClasses?: string;
}

export default defineComponent({
  name: 'AdminPage',
  components: { QPage, QBtn, QInput, QTable, QTd },
  setup() {
    const search = ref('');
    const admins = ref<Admin[]>([
      { id: 1, name: 'Usuario Admin 1', email: 'admin1@mail.com', status: 'Ativo' },
      { id: 2, name: 'Usuario Admin 2', email: 'admin2@mail.com', status: 'Ativo' },
      { id: 3, name: 'Usuario Admin 3', email: 'admin3@mail.com', status: 'Inativo' },
      { id: 4, name: 'Usuario Admin 4', email: 'admin4@mail.com', status: 'Ativo' },
    ]);

    const columns: Column[] = [
      { name: 'id', label: 'Id', align: 'left', field: 'id' },
      { name: 'name', label: 'Nome Completo', align: 'left', field: 'name' },
      { name: 'email', label: 'Email', align: 'left', field: 'email' },
      { name: 'status', label: 'Situação', align: 'left', field: 'status' },
      { name: 'actions', label: 'Ações', align: 'center', field: (row: Admin) => row.id },
    ];

    const addUser = () => {
      // Implementar lógica para adicionar usuário
    };

    const editUser = (id: number) => {
      // Implementar lógica para editar usuário
    };

    const deleteUser = (id: number) => {
      // Implementar lógica para deletar usuário
      admins.value = admins.value.filter(admin => admin.id !== id);
    };

    return { search, admins, columns, addUser, editUser, deleteUser };
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
.admin-table {
  .q-btn {
    margin-right: 10px;
  }
}
</style>
