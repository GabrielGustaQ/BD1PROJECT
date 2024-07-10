<template>
  <q-page padding>
    <!-- Título para agendamentos pendentes -->
    <div class="agendamento-titulo">Agendados</div>
    <hr class="linha-separadora" />

    <!-- Lista de agendamentos pendentes -->
    <div class="agendamento-lista">
      <!-- Itera sobre a lista de agendamentos pendentes -->
      <q-card flat bordered v-for="agendamento in agendamentosPendentes" :key="agendamento.id" class="agendamento-card q-mb-md">
        <q-card-section>
          <div class="text-h6">{{ getClienteNome(agendamento.clienteId) }}</div>
          <div>{{ agendamento.data }} {{ agendamento.hora }}</div>
          <div v-if="agendamento.remarcado" class="remarcado-tag">Remarcado</div>
        </q-card-section>

        <q-card-actions>
          <!-- Botão para concluir agendamento -->
          <q-btn icon="done" @click="concluirAgendamento(agendamento)" />
          <!-- Botão para abrir diálogo de remarcação -->
          <q-btn icon="event" @click="abrirDialogRemarcar(agendamento)" />
          <!-- Botão para excluir agendamento -->
          <q-btn icon="delete" @click="excluirAgendamento(agendamento.id)" />
        </q-card-actions>
      </q-card>
    </div>

    <!-- Título para agendamentos concluídos -->
    <div class="agendamento-titulo">Concluídos</div>
    <hr class="linha-separadora" />

    <!-- Lista de agendamentos concluídos -->
    <div class="agendamento-lista">
      <!-- Itera sobre a lista de agendamentos concluídos -->
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

    <!-- Botão para abrir diálogo de novo agendamento -->
    <q-btn color="primary" label="Novo Agendamento" @click="mostrarDialogNovoAgendamento = true" />

    <!-- Diálogo para remarcação de agendamento -->
    <q-dialog v-model="mostrarDialogRemarcar" persistent>
      <q-card>
        <q-card-section>
          <!-- Seleção de nova data -->
          <q-date v-model="novaDataSelecionada" label="Nova Data" dense />
          <!-- Seleção de nova hora -->
          <q-time v-model="novaHoraSelecionada" label="Nova Hora" format="24hr" dense />
        </q-card-section>

        <q-card-actions align="right">
          <!-- Botão para cancelar remarcação -->
          <q-btn label="Cancelar" color="secondary" @click="cancelarRemarcacao" />
          <!-- Botão para confirmar remarcação -->
          <q-btn label="Remarcar" color="primary" @click="remarcarAgendamento" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Diálogo para novo agendamento -->
    <q-dialog v-model="mostrarDialogNovoAgendamento" persistent>
      <q-card>
        <q-card-section>
          <!-- Seleção de cliente -->
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
          <!-- Seleção de data -->
          <q-date v-model="dataSelecionada" label="Data" dense />
          <!-- Seleção de hora -->
          <q-time v-model="horaSelecionada" label="Hora" format="24hr" dense />
        </q-card-section>

        <q-card-actions align="right">
          <!-- Botão para cancelar novo agendamento -->
          <q-btn label="Cancelar" color="secondary" @click="cancelarNovoAgendamento" />
          <!-- Botão para confirmar novo agendamento -->
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

// Define interfaces para agendamento e cliente
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

    // Função para buscar agendamentos do servidor
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

    // Função para buscar clientes do servidor
    const fetchClientes = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/clientes`);
        clientes.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    // Chama as funções de busca ao montar o componente
    onMounted(() => {
      fetchAgendamentos();
      fetchClientes();
    });

    // Função para adicionar um novo agendamento
    const adicionarAgendamento = async () => {
      if (clienteSelecionado.value && dataSelecionada.value && horaSelecionada.value) {
        try {
          console.log(clienteSelecionado.value)
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

    // Função para cancelar o diálogo de novo agendamento
    const cancelarNovoAgendamento = () => {
      mostrarDialogNovoAgendamento.value = false;
      clienteSelecionado.value = null;
      dataSelecionada.value = null;
      horaSelecionada.value = null;
    };

    // Função para abrir o diálogo de remarcação de agendamento
    const abrirDialogRemarcar = (agendamento: Agendamento) => {
      agendamentoParaRemarcar = agendamento;
      novaDataSelecionada.value = agendamento.data;
      novaHoraSelecionada.value = agendamento.hora;
      mostrarDialogRemarcar.value = true;
    };

    // Função para cancelar a remarcação
    const cancelarRemarcacao = () => {
      mostrarDialogRemarcar.value = false;
      novaDataSelecionada.value = null;
      novaHoraSelecionada.value = null;
      agendamentoParaRemarcar = null;
    };

    // Função para remarcar um agendamento
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

    // Função para concluir um agendamento
    const concluirAgendamento = async (agendamento: Agendamento) => {
      try {
        await axios.put(`${apiBaseUrl}/agendamentos/${agendamento.id}`, {
          concluido: true,
        });
        agendamento.concluido = true;
        agendamentosPendentes.value = agendamentosPendentes.value.filter((a: Agendamento) => a.id !== agendamento.id);
        agendamentosConcluidos.value.push(agendamento);
      } catch (error) {
        console.error('Erro ao concluir agendamento:', error);
      }
    };

    // Função para excluir um agendamento
    const excluirAgendamento = async (agendamentoId: number) => {
      try {
        await axios.delete(`${apiBaseUrl}/agendamentos/${agendamentoId}`);
        agendamentos.value = agendamentos.value.filter((a: Agendamento) => a.id !== agendamentoId);
        agendamentosPendentes.value = agendamentosPendentes.value.filter((a: Agendamento) => a.id !== agendamentoId);
        agendamentosConcluidos.value = agendamentosConcluidos.value.filter((a: Agendamento) => a.id !== agendamentoId);
      } catch (error) {
        console.error('Erro ao excluir agendamento:', error);
      }
    };

    // Função para obter o nome do cliente pelo ID
    const getClienteNome = (clienteId: number) => {
      const cliente = clientes.value.find((c: Cliente) => c.id === clienteId);
      return cliente ? cliente.nome : 'Cliente desconhecido';
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
  font-size: 1.5em;
  margin-bottom: 0.5em;
}

.linha-separadora {
  margin-bottom: 1em;
}

.agendamento-card {
  padding: 1em;
}

.remarcado-tag {
  background-color: #ffeb3b;
  padding: 0.2em 0.5em;
  border-radius: 4px;
  color: #000;
}

.q-mb-md {
  margin-bottom: 1em;
}
</style>
