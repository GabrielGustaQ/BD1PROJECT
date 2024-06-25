<template>
  <q-page padding>
    <!-- Botão para Adicionar Nova Promoção -->
    <q-btn color="primary" label="Adicionar Promoção" @click="mostrarDialogNovaPromocao = true" />

    <!-- Diálogo para Nova Promoção -->
    <q-dialog v-model="mostrarDialogNovaPromocao" persistent>
      <q-card>
        <q-card-section>
          <q-input v-model="novaPromocao.nome" label="Nome da Promoção" dense />
          <q-input v-model="novaPromocao.descricao" label="Descrição" dense />
          
          <!-- Dropdown para Selecionar Cliente -->
          <q-select
            v-model="novaPromocao.clienteId"
            :options="clientes.map(cliente => ({ label: cliente.nome, value: cliente.id }))"
            label="Cliente"
            dense
          />
        </q-card-section>
        
        <q-card-actions align="right">
          <q-btn label="Cancelar" color="secondary" @click="cancelarNovaPromocao" />
          <q-btn label="Adicionar" color="primary" @click="adicionarNovaPromocao" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Grid de Promoções -->
    <q-card flat bordered v-for="promocao in promocoes" :key="promocao.id" class="q-mb-md">
      <q-card-section>
        <q-item>
          <q-item-section>
            <q-item-label>{{ promocao.nome }}</q-item-label>
            <q-item-label caption>{{ promocao.descricao }}</q-item-label>
            <q-item-label caption>{{ getClienteNome(promocao.clienteId) }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn-group>
              <q-btn icon="done" @click="concluirPromocao(promocao.id)" />
              <q-btn icon="event" @click="remarcarPromocao(promocao.id)" />
              <q-btn icon="delete" @click="excluirPromocao(promocao.id)" />
            </q-btn-group>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { QBtn, QDialog, QCard, QCardSection, QCardActions, QInput, QSelect, QItem, QItemSection, QItemLabel, QBtnGroup } from 'quasar';

interface Cliente {
  id: number;
  nome: string;
}

interface Promocao {
  id: number;
  nome: string;
  descricao: string;
  clienteId: number;
}

export default defineComponent({
  name: 'PromocoesPage',
  components: {
    QBtn,
    QDialog,
    QCard,
    QCardSection,
    QCardActions,
    QInput,
    QSelect,
    QItem,
    QItemSection,
    QItemLabel,
    QBtnGroup,
  },
  setup() {
    const promocoes = ref<Promocao[]>([
      { id: 1, nome: 'Promoção A', descricao: 'Descrição da Promoção A', clienteId: 1 },
      { id: 2, nome: 'Promoção B', descricao: 'Descrição da Promoção B', clienteId: 2 },
      { id: 3, nome: 'Promoção C', descricao: 'Descrição da Promoção C', clienteId: 3 },
    ]);

    const clientes = ref<Cliente[]>([
      { id: 1, nome: 'Cliente A' },
      { id: 2, nome: 'Cliente B' },
      { id: 3, nome: 'Cliente C' },
    ]);

    const mostrarDialogNovaPromocao = ref(false);
    const novaPromocao = ref<Promocao>({ id: 0, nome: '', descricao: '', clienteId: 0 });

    const adicionarNovaPromocao = () => {
      if (novaPromocao.value.nome && novaPromocao.value.descricao && novaPromocao.value.clienteId !== 0) {
        promocoes.value.push({
          id: promocoes.value.length + 1,
          nome: novaPromocao.value.nome,
          descricao: novaPromocao.value.descricao,
          clienteId: novaPromocao.value.clienteId,
        });
        cancelarNovaPromocao();
      }
    };

    const cancelarNovaPromocao = () => {
      mostrarDialogNovaPromocao.value = false;
      novaPromocao.value = { id: 0, nome: '', descricao: '', clienteId: 0 };
    };

    const getClienteNome = (clienteId: number) => {
      const cliente = clientes.value.find(c => c.id === clienteId);
      return cliente ? cliente.nome : '';
    };

    const concluirPromocao = (promocaoId: number) => {
      const index = promocoes.value.findIndex(p => p.id === promocaoId);
      if (index !== -1) {
        // Simulação: Marcar promoção como concluída
        promocoes.value[index].nome += ' (Concluída)';
      }
    };

    const remarcarPromocao = (promocaoId: number) => {
      const index = promocoes.value.findIndex(p => p.id === promocaoId);
      if (index !== -1) {
        // Simulação: Remarcar promoção
        promocoes.value[index].nome += ' (Remarcada)';
      }
    };

    const excluirPromocao = (promocaoId: number) => {
      // Simulação: Excluir promoção
      promocoes.value = promocoes.value.filter(p => p.id !== promocaoId);
    };

    return {
      promocoes,
      clientes,
      mostrarDialogNovaPromocao,
      novaPromocao,
      adicionarNovaPromocao,
      cancelarNovaPromocao,
      getClienteNome,
      concluirPromocao,
      remarcarPromocao,
      excluirPromocao,
    };
  },
});
</script>

<style scoped>
.q-card {
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
