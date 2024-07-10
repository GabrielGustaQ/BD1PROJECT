<template>
  <q-page class="servicos-page">
    <div class="header">
      <div class="title">Serviços</div>
      <q-btn label="Adicionar Serviço" color="primary" @click="showAddServicoDialog = true" />
    </div>
    <q-input filled v-model="search" label="Pesquisar serviço" class="search-input" />
    <q-table :rows="filteredServicos" :columns="columns" row-key="id" class="servico-table">
      <template v-slot:body-cell-acoes="props">
        <q-td>
          <q-btn icon="delete" color="negative" @click="deleteServico(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="showAddServicoDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Adicionar Novo Serviço</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newServico.tipo" label="Tipo de Serviço" />
          <q-input v-model="newServico.valor_servico" label="Valor do Serviço" type="number" />
          <q-input v-model="newServico.quantidade" label="Quantidade" type="number" />
          <q-input v-model="newServico.duracao" label="Duração" />
          <q-input v-model="newServico.funcionario_id" label="ID do Funcionário" type="number" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Adicionar" @click="addServico" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import axios from 'axios';
import { QPage, QBtn, QInput, QTable, QTd, QDialog, QCard, QCardSection, QCardActions } from 'quasar';

interface Servico {
  id: number;
  tipo: string;
  valor_servico: number;
  quantidade: number;
  duracao: string;
  funcionario_id: number;
}

interface Column {
  name: string;
  label: string;
  field: string | ((row: Servico) => string);
  align: 'left' | 'right' | 'center';
}

export default defineComponent({
  name: 'ServicosPage',
  components: { QPage, QBtn, QInput, QTable, QTd, QDialog, QCard, QCardSection, QCardActions },
  setup() {
    const search = ref('');
    const showAddServicoDialog = ref(false);
    const newServico = ref<Servico>({
      id: 0,
      tipo: '',
      valor_servico: 0,
      quantidade: 0,
      duracao: '',
      funcionario_id: 0,
    });

    const columns: Column[] = [
      { name: 'id', label: 'ID', field: 'id', align: 'left' },
      { name: 'tipo', label: 'Tipo de Serviço', field: 'tipo', align: 'left' },
      { name: 'valor_servico', label: 'Valor do Serviço', field: 'valor_servico', align: 'left' },
      { name: 'quantidade', label: 'Quantidade', field: 'quantidade', align: 'left' },
      { name: 'duracao', label: 'Duração', field: 'duracao', align: 'left' },
      { name: 'funcionario_id', label: 'ID do Funcionário', field: 'funcionario_id', align: 'left' },
      { name: 'acoes', label: 'Ações', align: 'center', field: '' },
    ];

    const servicos = ref<Servico[]>([]);

    const fetchServicos = async () => {
      try {
        const response = await axios.get<Servico[]>('http://localhost:3000/servicos');
        servicos.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar serviços:', error);
      }
    };

    const addServico = async () => {
      try {
        const response = await axios.post<Servico>('http://localhost:3000/servicos', newServico.value);
        servicos.value.push(response.data);
        showAddServicoDialog.value = false;
        resetNewServico();
      } catch (error) {
        console.error('Erro ao adicionar serviço:', error);
      }
    };

    const deleteServico = async (id: number) => {
      try {
        await axios.delete(`http://localhost:3000/servicos/${id}`);
        servicos.value = servicos.value.filter(servico => servico.id !== id);
      } catch (error) {
        console.error('Erro ao excluir serviço:', error);
      }
    };

    const filteredServicos = computed(() => {
      if (!search.value) {
        return servicos.value;
      }
      const lowerCaseSearch = search.value.toLowerCase();
      return servicos.value.filter(servico =>
        servico.tipo.toLowerCase().includes(lowerCaseSearch) ||
        servico.duracao.toLowerCase().includes(lowerCaseSearch)
      );
    });

    const resetNewServico = () => {
      newServico.value = {
        id: 0,
        tipo: '',
        valor_servico: 0,
        quantidade: 0,
        duracao: '',
        funcionario_id: 0,
      };
    };

    fetchServicos();

    return {
      search,
      showAddServicoDialog,
      newServico,
      columns,
      filteredServicos,
      addServico,
      deleteServico,
    };
  },
});
</script>

<style scoped>
.servicos-page {
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
