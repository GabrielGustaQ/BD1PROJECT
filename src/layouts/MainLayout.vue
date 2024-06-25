<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        
        <q-toolbar-title @click="goToHome" style="cursor: pointer;">
          Corte Rápido 
          <span class="material-icons">
            content_cut
          </span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Menu Agendamentos
        </q-item-label>

        <q-item
          v-for="link in linksList"
          :key="link.title"
          clickable
          @click="goTo(link.link)"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Definir o nome do componente
defineOptions({
  name: 'MainLayout'
});

// Lista de links
interface EssentialLinkProps {
  title: string;
  icon: string;
  link: string;
  caption?: string;
}

const linksList: EssentialLinkProps[] = [
  {
    title: 'Clientes',
    icon: 'account_circle',
    link: '/UserPage'
  },
  {
    title: 'Agenda',
    icon: 'calendar_month',
    link: '/AgendaPage'
  },
  {
    title: 'Promoções',
    caption: 'chat.quasar.dev',
    icon: 'local_activity',
    link: '/PromocoesPage'
  }
];

// Estado do drawer
const leftDrawerOpen = ref(false);

// Obter a instância do roteador
const router = useRouter();

// Função de navegação
const goTo = (link: string) => {
  if (link) {
    router.push(link);
  }
};

// Função para navegar para a página inicial
const goToHome = () => {
  router.push('/');
};

// Função para alternar o drawer
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
