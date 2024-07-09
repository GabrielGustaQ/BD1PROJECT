<template>
  <q-page padding>
    <div class="agendamento-titulo">Agendados</div>
    <hr class="linha-separadora" />

    <div class="agendamento-lista">
      <q-card flat bordered v-for="agendamento in agendamentosPendentes" :key="agendamento.id" class="agendamento-card q-mb-md">
        <q-card-section>
          <div class="text-h6">{{ getClienteNome(agendamento.clienteId) }}</div>
          <div>{{ agendamento.data }} {{ agendamento.hora }}</div>
          <div v-if="agendamento.remarcado" class="remarcado-tag">Remarcado</div>
        </q-card-section>

        <q-card-actions>
          <q-btn icon="done" @click="concluirAgendamento(agendamento)" />
          <q-btn icon="event" @click="abrirDialogRemarcar(agendamento)" />
          <q-btn icon="delete" @click="excluirAgendamento(agendamento.id)" />
        </q-card-actions>
      </q-card>
    </div>

    <div class="agendamento-titulo">Concluídos</div>
    <hr class="linha-separadora" />

    <div class="agendamento-lista">
      <q-card flat bordered v-for="agendamento in agendamentosConcluidos" :key="agendamento.id" class="agendamento-card q-mb-md">
        <q-card-section>
          <div class="text-h6">{{ getClienteNome(agendamento.clienteId) }}</div>
          <div>{{ agendamento.data }} {{ agendamento.hora }}</div>
        </q-card-section>

        <q-card-actions>
          <!-- Adicionar botões específicos para agendamentos concluídos, se necessário -->
        </q-card-actions>
      </q-card>
    </div>

    <q-btn color="primary" label="Novo Agendamento" @click="mostrarDialogNovoAgendamento = true" />

    <!-- Diálogo para Remarcação de Agendamento -->
    <q-dialog v-model="mostrarDialogRemarcar" persistent>
      <q-card>
        <q-card-section>
          <q-date v-model="novaDataSelecionada" label="Nova Data" dense />
          <q-time v-model="novaHoraSelecionada" label="Nova Hora" format="24hr" dense />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" color="secondary" @click="cancelarRemarcacao" />
          <q-btn label="Remarcar" color="primary" @click="remarcarAgendamento" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Diálogo para Novo Agendamento -->
    <q-dialog v-model="mostrarDialogNovoAgendamento" persistent>
      <q-card>
        <q-card-section>
          <q-select
            v-model="clienteSelecionado"
            :options="clientes"
            option-label="nome"
            option-value="id"
            label="Cliente"
            dense
            emit-value
            map-options
          />
          <q-date v-model="dataSelecionada" label="Data" dense />
          <q-time v-model="horaSelecionada" label="Hora" format="24hr" dense />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" color="secondary" @click="cancelarNovoAgendamento" />
          <q-btn label="Adicionar" color="primary" @click="adicionarAgendamento" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import {
  QBtn,
  QDialog,
  QCard,
  QCardSection,
  QCardActions,
  QSelect,
  QDate,
  QTime,
} from 'quasar';

interface Agendamento {
  id: number;
  clienteId: number;
  data: string;
  hora: string;
  remarcado?: boolean;
  concluido?: boolean;
}

interface Cliente {
  id: number;
  nome: string;
  // adicione outros campos conforme necessário
}

export default defineComponent({
  name: 'AgendaPage',
  components: {
    QBtn,
    QDialog,
    QCard,
    QCardSection,
    QCardActions,
    QSelect,
    QDate,
    QTime,
  },
  setup() {
    const agendamentos = ref<Agendamento[]>([]);
    const agendamentosPendentes = ref<Agendamento[]>([]);
    const agendamentosConcluidos = ref<Agendamento[]>([]);
    const clientes = ref<Cliente[]>([]);
    const mostrarDialogNovoAgendamento = ref(false);
    const mostrarDialogRemarcar = ref(false);
    const clienteSelecionado = ref<number | null>(null);
    const dataSelecionada = ref<string | null>(null);
    const horaSelecionada = ref<string | null>(null);
    const novaDataSelecionada = ref<string | null>(null);
    const novaHoraSelecionada = ref<string | null>(null);
    let agendamentoParaRemarcar: Agendamento | null = null;

    const apiBaseUrl = 'http://localhost:3000';

    const fetchAgendamentos = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/agendamentos`);
        agendamentos.value = response.data;
        agendamentosPendentes.value = agendamentos.value.filter((agendamento: Agendamento) => !agendamento.concluido);
        agendamentosConcluidos.value = agendamentos.value.filter((agendamento: Agendamento) => agendamento.concluido);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };

    const fetchClientes = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/clientes`);
        clientes.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    onMounted(() => {
      fetchAgendamentos();
      fetchClientes();
    });

    const adicionarAgendamento = async () => {
      if (clienteSelecionado.value && dataSelecionada.value && horaSelecionada.value) {
        try {
          const response = await axios.post(`${apiBaseUrl}/agendamentos`, {
            clienteId: clienteSelecionado.value,
            data: dataSelecionada.value,
            hora: horaSelecionada.value,
          });
          agendamentos.value.push(response.data);
          agendamentosPendentes.value.push(response.data);
          cancelarNovoAgendamento();
        } catch (error) {
          console.error('Erro ao adicionar agendamento:', error);
        }
      }
    };

    const cancelarNovoAgendamento = () => {
      mostrarDialogNovoAgendamento.value = false;
      clienteSelecionado.value = null;
      dataSelecionada.value = null;
      horaSelecionada.value = null;
    };

    const abrirDialogRemarcar = (agendamento: Agendamento) => {
      agendamentoParaRemarcar = agendamento;
      novaDataSelecionada.value = agendamento.data;
      novaHoraSelecionada.value = agendamento.hora;
      mostrarDialogRemarcar.value = true;
    };

    const cancelarRemarcacao = () => {
      mostrarDialogRemarcar.value = false;
      novaDataSelecionada.value = null;
      novaHoraSelecionada.value = null;
      agendamentoParaRemarcar = null;
    };

    const remarcarAgendamento = async () => {
      if (novaDataSelecionada.value && novaHoraSelecionada.value && agendamentoParaRemarcar) {
        try {
          await axios.put(`${apiBaseUrl}/agendamentos/${agendamentoParaRemarcar.id}`, {
            data: novaDataSelecionada.value,
            hora: novaHoraSelecionada.value,
            remarcado: true,
          });
          agendamentoParaRemarcar.data = novaDataSelecionada.value;
          agendamentoParaRemarcar.hora = novaHoraSelecionada.value;
          agendamentoParaRemarcar.remarcado = true;
          cancelarRemarcacao();
        } catch (error) {
          console.error('Erro ao remarcar agendamento:', error);
        }
      }
    };

    const concluirAgendamento = async (agendamento: Agendamento) => {
      try {
        await axios.put(`${apiBaseUrl}/agendamentos/${agendamento.id}`, { concluido: true });
        agendamento.concluido = true;
        agendamentosPendentes.value = agendamentosPendentes.value.filter(a => a.id !== agendamento.id);
        agendamentosConcluidos.value.push(agendamento);
      } catch (error) {
        console.error('Erro ao concluir agendamento:', error);
      }
    };

    const excluirAgendamento = async (agendamentoId: number) => {
      try {
        await axios.delete(`${apiBaseUrl}/agendamentos/${agendamentoId}`);
        agendamentosPendentes.value = agendamentosPendentes.value.filter(a => a.id !== agendamentoId);
        agendamentosConcluidos.value = agendamentosConcluidos.value.filter(a => a.id !== agendamentoId);
      } catch (error) {
        console.error('Erro ao excluir agendamento:', error);
      }
    };

    const getClienteNome = (clienteId: number) => {
      const cliente = clientes.value.find(c => c.id === clienteId);
      return cliente ? cliente.nome : 'Desconhecido';
    };

    return {
      agendamentos,
      agendamentosPendentes,
      agendamentosConcluidos,
      clientes,
      mostrarDialogNovoAgendamento,
      mostrarDialogRemarcar,
      clienteSelecionado,
      dataSelecionada,
      horaSelecionada,
      novaDataSelecionada,
      novaHoraSelecionada,
      adicionarAgendamento,
      cancelarNovoAgendamento,
      abrirDialogRemarcar,
      cancelarRemarcacao,
      remarcarAgendamento,
      concluirAgendamento,
      excluirAgendamento,
      getClienteNome,
    };
  },
});
</script>

<style scoped>
.agendamento-titulo {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.linha-separadora {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.agendamento-lista {
  margin-bottom: 1rem;
}

.agendamento-card {
  width: 100%;
}

.remarcado-tag {
  background-color: #ffcc80;
  color: #333;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
}
</style>
