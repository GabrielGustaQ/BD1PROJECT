<template>
    <q-page class="admin-page">
      <div class="header">
        <div class="title">Funcionários</div>
        <q-btn label="Adicionar Funcionário" color="primary" @click="showAddFuncionarioDialog = true" />
      </div>
      <q-input filled v-model="search" label="Pesquisar funcionário" class="search-input" />
      <q-table :rows="filteredFuncionarios" :columns="columns" row-key="id" class="funcionario-table">
        <template v-slot:body-cell-actions="props">
          <q-td>
            <q-btn icon="delete" color="negative" @click="deleteFuncionario(props.row.id)" />
          </q-td>
        </template>
      </q-table>
  
      <q-dialog v-model="showAddFuncionarioDialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">Adicionar Novo Funcionário</div>
          </q-card-section>
  
          <q-card-section>
            <q-input v-model="newFuncionario.nome" label="Nome" />
            <q-input v-model="newFuncionario.sobrenome" label="Sobrenome" />
            <q-input v-model="newFuncionario.endereco" label="Endereço" />
            <q-input v-model="newFuncionario.sexo" label="Sexo" />
            <q-input v-model="newFuncionario.idade" label="Idade" type="number" />
            <q-input v-model="newFuncionario.celular" label="Celular" />
            <q-input v-model="newFuncionario.dt_nasc" label="Data de Nascimento" type="date" />
            <q-input v-model="newFuncionario.funcao" label="Função" />
            <q-input v-model="newFuncionario.cpf" label="CPF" />
          </q-card-section>
  
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn flat label="Adicionar" @click="addFuncionario" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import axios from 'axios';
  import {
    QPage,
    QBtn,
    QInput,
    QTable,
    QTd,
    QDialog,
    QCard,
    QCardSection,
    QCardActions,
  } from 'quasar';
  
  interface Funcionario {
    id: number;
    nome: string;
    sobrenome: string;
    endereco: string;
    sexo: string;
    idade: number;
    celular: string;
    dt_nasc: string;
    funcao: string;
    cpf: string;
  }
  
  interface Column {
    name: string;
    label: string;
    field: string;
    align: 'left' | 'right' | 'center';
    sortable?: boolean;
  }
  
  export default defineComponent({
    name: 'FuncionarioPage',
    components: { QPage, QBtn, QInput, QTable, QTd, QDialog, QCard, QCardSection, QCardActions },
    setup() {
      const search = ref('');
      const funcionarios = ref<Funcionario[]>([]);
      const showAddFuncionarioDialog = ref(false);
      const newFuncionario = ref<Funcionario>({
        id: 0,
        nome: '',
        sobrenome: '',
        endereco: '',
        sexo: '',
        idade: 0,
        celular: '',
        dt_nasc: '',
        funcao: '',
        cpf: '',
      });
  
      const columns: Column[] = [
        { name: 'id', label: 'ID', field: 'id', align: 'left' },
        { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
        { name: 'sobrenome', label: 'Sobrenome', field: 'sobrenome', align: 'left' },
        { name: 'funcao', label: 'Função', field: 'funcao', align: 'left' },
        { name: 'actions', label: 'Ações', field: '', align: 'center' },
      ];
  
      const filteredFuncionarios = computed(() => {
        if (!search.value) {
          return funcionarios.value;
        }
        return funcionarios.value.filter(funcionario =>
          funcionario.nome.toLowerCase().includes(search.value.toLowerCase()) ||
          funcionario.sobrenome.toLowerCase().includes(search.value.toLowerCase())
        );
      });
  
      const fetchFuncionarios = async () => {
        try {
          const response = await axios.get<Funcionario[]>('http://localhost:3000/funcionarios');
          funcionarios.value = response.data;
        } catch (error) {
          console.error('Erro ao buscar funcionários:', error);
        }
      };
  
      const addFuncionario = async () => {
        try {
          const response = await axios.post<Funcionario>('http://localhost:3000/funcionarios', newFuncionario.value);
          funcionarios.value.push(response.data);
          showAddFuncionarioDialog.value = false;
          newFuncionario.value = {
            id: 0,
            nome: '',
            sobrenome: '',
            endereco: '',
            sexo: '',
            idade: 0,
            celular: '',
            dt_nasc: '',
            funcao: '',
            cpf: '',
          };
        } catch (error) {
          console.error('Erro ao adicionar funcionário:', error);
        }
      };
  
      const deleteFuncionario = async (id: number) => {
        try {
          await axios.delete(`http://localhost:3000/funcionarios/${id}`);
          funcionarios.value = funcionarios.value.filter(funcionario => funcionario.id !== id);
        } catch (error) {
          console.error('Erro ao excluir funcionário:', error);
        }
      };
  
      fetchFuncionarios();
  
      return {
        search,
        funcionarios,
        showAddFuncionarioDialog,
        newFuncionario,
        columns,
        filteredFuncionarios,
        addFuncionario,
        deleteFuncionario,
      };
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
  
  .funcionario-table {
    margin-top: 20px;
  }
  
  .q-btn {
    margin-right: 10px;
  }
  </style>
  