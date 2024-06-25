<template>
  <q-page padding>
    <q-card v-for="item in agenda" :key="item.id" class="shadow-2">
      <q-card-section>
        <div class="text-h6">{{ item.title }}</div>
        <div class="text-caption">{{ item.date }}</div>
      </q-card-section>

      <q-card-actions>
        <q-btn color="primary" label="Concluído" @click="concluirItem(item)" />
        <q-btn color="warning" label="Remarcar" @click="remarcarItem(item)" />
        <q-btn color="negative" label="Excluir" @click="excluirItem(item)" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface AgendaItem {
  id: number;
  title: string;
  date: string; // Ou outro formato de data que você estiver usando
}

export default defineComponent({
  name: 'AgendaPage',
  setup() {
    const agenda = ref<AgendaItem[]>([
      { id: 1, title: 'Reunião de Projeto', date: '2024-07-01' },
      { id: 2, title: 'Visita ao Cliente', date: '2024-07-03' },
      { id: 3, title: 'Apresentação de Proposta', date: '2024-07-05' },
    ]);

    const concluirItem = (item: AgendaItem) => {
      console.log(`Item concluído: ${item.title}`);
      // Implemente a lógica para marcar o item como concluído
    };

    const remarcarItem = (item: AgendaItem) => {
      console.log(`Item remarcado: ${item.title}`);
      // Implemente a lógica para remarcar o item
    };

    const excluirItem = (item: AgendaItem) => {
      console.log(`Item excluído: ${item.title}`);
      // Implemente a lógica para excluir o item da agenda
    };

    return {
      agenda,
      concluirItem,
      remarcarItem,
      excluirItem,
    };
  },
});
</script>
