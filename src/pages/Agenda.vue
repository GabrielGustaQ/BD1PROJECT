<template>
  <q-page padding>
    <div class="agendamento-titulo">Agendados</div>
    <hr class="linha-separadora" />

    <div class="agendamento-lista">
      <q-card flat bordered v-for="agendamento in agendamentos" :key="agendamento.id" class="agendamento-card q-mb-md">
        <q-card-section>
          <div class="text-h6">{{ agendamento.cliente }}</div>
          <div>{{ agendamento.data }}</div>
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
          <div class="text-h6">{{ agendamento.cliente }}</div>
          <div>{{ agendamento.data }}</div>
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
            label="Cliente"
            dense
            emit-value
            map-options
          />
          <q-date v-model="dataSelecionada" label="Data" dense />
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
import { defineComponent, ref } from 'vue';
import { QBtn, QDialog, QCard, QCardSection, QCardActions, QSelect, QDate } from 'quasar';

interface Agendamento {
  id: number;
  cliente: string;
  data: string;
  remarcado?: boolean; // Propriedade para controlar se foi remarcado
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
  },
  setup() {
    const agendamentos = ref<Agendamento[]>([
      { id: 1, cliente: 'Cliente A', data: '2024-06-28', remarcado: false },
      { id: 2, cliente: 'Cliente B', data: '2024-06-29', remarcado: true },
      { id: 3, cliente: 'Cliente C', data: '2024-06-30', remarcado: false },
    ]);

    // Filtra agendamentos concluídos
    const agendamentosConcluidos = ref<Agendamento[]>([]);

    const clientes = ref<string[]>(['Cliente A', 'Cliente B', 'Cliente C']);

    const mostrarDialogNovoAgendamento = ref(false);
    const mostrarDialogRemarcar = ref(false);
    const clienteSelecionado = ref<string | null>(null);
    const dataSelecionada = ref<string | null>(null);
    const novaDataSelecionada = ref<string | null>(null);
    let agendamentoParaRemarcar: Agendamento | null = null;

    const adicionarAgendamento = () => {
      if (clienteSelecionado.value && dataSelecionada.value) {
        agendamentos.value.push({
          id: agendamentos.value.length + 1,
          cliente: clienteSelecionado.value,
          data: dataSelecionada.value,
          remarcado: false,
        });
        cancelarNovoAgendamento();
      }
    };

    const cancelarNovoAgendamento = () => {
      mostrarDialogNovoAgendamento.value = false;
      clienteSelecionado.value = null;
      dataSelecionada.value = null;
    };

    const abrirDialogRemarcar = (agendamento: Agendamento) => {
      agendamentoParaRemarcar = agendamento;
      novaDataSelecionada.value = agendamento.data;
      mostrarDialogRemarcar.value = true;
    };

    const cancelarRemarcacao = () => {
      mostrarDialogRemarcar.value = false;
      novaDataSelecionada.value = null;
      agendamentoParaRemarcar = null;
    };

    const remarcarAgendamento = () => {
      if (novaDataSelecionada.value && agendamentoParaRemarcar) {
        agendamentoParaRemarcar.data = novaDataSelecionada.value;
        agendamentoParaRemarcar.remarcado = true;
        cancelarRemarcacao();
      }
    };

    const concluirAgendamento = (agendamento: Agendamento) => {
      const index = agendamentos.value.findIndex(a => a.id === agendamento.id);
      if (index !== -1) {
        agendamentos.value.splice(index, 1); // Remove da lista de agendamentos
        agendamentosConcluidos.value.push(agendamento); // Adiciona aos concluídos
      }
    };

    const excluirAgendamento = (agendamentoId: number) => {
      agendamentos.value = agendamentos.value.filter(a => a.id !== agendamentoId);
    };

    return {
      agendamentos,
      agendamentosConcluidos,
      clientes,
      mostrarDialogNovoAgendamento,
      mostrarDialogRemarcar,
      clienteSelecionado,
      dataSelecionada,
      novaDataSelecionada,
      adicionarAgendamento,
      cancelarNovoAgendamento,
      abrirDialogRemarcar,
      cancelarRemarcacao,
      remarcarAgendamento,
      concluirAgendamento,
      excluirAgendamento,
    };
  },
});
</script>

<style scoped>
.agendamento-titulo {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.linha-separadora {
  border: none;
  border-top: 1px solid #ccc;
  margin-bottom: 20px;
}

.agendamento-lista {
  margin-bottom: 20px;
}

.agendamento-card {
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombra leve */
  position: relative; /* Para posicionamento relativo */
}


.remarcado-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: yellow;
  color: black;
  padding: 5px;
  border-radius: 3px;
}
</style>