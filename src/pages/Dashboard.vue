<template>
    <q-page class="dashboard-page">
      <div class="header">
        <div class="title">Sistema de Gerenciamento do Salão de Beleza</div>
        <q-btn icon="account_circle" label="Admin" flat />
      </div>
      <div class="dashboard-stats">
        <q-card class="stat-card">
          <q-card-section>
            <div class="stat-value">12</div>
            <div class="stat-label">Clientes cadastrados</div>
          </q-card-section>
        </q-card>
        <q-card class="stat-card">
          <q-card-section>
            <div class="stat-value">12</div>
            <div class="stat-label">Funcionários cadastrados</div>
          </q-card-section>
        </q-card>
        <q-card class="stat-card">
          <q-card-section>
            <div class="stat-value">12</div>
            <div class="stat-label">Serviços cadastrados</div>
          </q-card-section>
        </q-card>
      </div>
      <q-card class="chart-card">
        <q-card-section>
          <apexchart type="bar" :options="chartOptions" :series="chartSeries" />
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { QPage, QBtn, QCard, QCardSection } from 'quasar';
  import VueApexCharts from 'vue3-apexcharts';
  
  export default defineComponent({
    name: 'DashboardPage',
    components: { QPage, QBtn, QCard, QCardSection, apexchart: VueApexCharts },
    setup() {
      const chartOptions = {
        chart: {
          type: 'bar',
        },
        xaxis: {
          categories: ['2020', '2021', '2022', '2023', '2024'],
        },
      };
  
      const chartSeries = [
        {
          name: 'Clientes, Funcionários e Serviços',
          data: [10, 15, 20, 25, 30],
        },
      ];
  
      return { chartOptions, chartSeries };
    },
  });
  </script>
  
  <style scoped>
  .dashboard-page {
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
  .dashboard-stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .stat-card {
    width: 30%;
  }
  .stat-value {
    font-size: 2rem;
    font-weight: bold;
  }
  .stat-label {
    font-size: 1rem;
    color: #666;
  }
  .chart-card {
    width: 100%;
  }
  </style>
  