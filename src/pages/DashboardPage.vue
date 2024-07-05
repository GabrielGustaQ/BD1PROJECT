<template>
  <q-page class="dashboard-page">
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
        <apexchart width="100%" type="bar" :options="chartOptions" :series="chartData" />
      </q-card-section>
      <q-card-section>
        <div class="chart-label">Total de clientes, funcionários e serviços cadastrados no sistema</div>
      </q-card-section>
    </q-card>
    <footer class="footer">
      Todos os direitos reservados © 2024
    </footer>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { QPage, QCard, QCardSection } from 'quasar';
import ApexCharts from 'vue3-apexcharts';

interface ChartOptions {
  chart: {
    type: string;
    height: number;
    toolbar: {
      show: boolean;
    };
  };
  plotOptions: {
    bar: {
      borderRadius: number;
      dataLabels: {
        position: string;
      };
    };
  };
  dataLabels: {
    enabled: boolean;
    formatter: (val: number) => string;
    offsetY: number;
    style: {
      fontSize: string;
      colors: string[];
    };
  };
  xaxis: {
    categories: string[];
    position: string;
    labels: {
      offsetY: number;
    };
    axisBorder: {
      show: boolean;
    };
    axisTicks: {
      show: boolean;
    };
    crosshairs: {
      fill: {
        type: string;
        gradient: {
          colorFrom: string;
          colorTo: string;
          stops: number[];
          opacityFrom: number;
          opacityTo: number;
        };
      };
    };
    tooltip: {
      enabled: boolean;
    };
  };
  yaxis: {
    axisBorder: {
      show: boolean;
    };
    axisTicks: {
      show: boolean;
    };
    labels: {
      show: boolean;
      formatter: (val: number) => string;
    };
  };
  title: {
    text: string;
    floating: boolean;
    offsetY: number;
    align: string;
    style: {
      color: string;
    };
  };
}

export default defineComponent({
  name: 'DashboardPage',
  components: { QPage, QCard, QCardSection, apexchart: ApexCharts },
  setup() {
    const chartOptions: ChartOptions = {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top',
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val.toString();
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758']
        }
      },
      xaxis: {
        categories: ['2020', '2021', '2022', '2023', '2024'],
        position: 'bottom',
        labels: {
          offsetY: 0,
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: number) {
            return val.toString();
          }
        }
      },
      title: {
        text: '',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444'
        }
      }
    };

    const chartData = [
      {
        name: 'Total',
        data: [10, 15, 20, 25, 30],
      },
    ];

    return { chartOptions, chartData };
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
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  background-color: #f50057;
  padding: 10px 20px;
  border-radius: 8px;
}

.dashboard-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.stat-card {
  width: 30%;
  text-align: center;
  background: linear-gradient(145deg, #f5f7fa, #e4e8ee);
  box-shadow: 5px 5px 15px #d1d9e6,
    -5px -5px 15px #ffffff;
  border-radius: 10px;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.stat-label {
  font-size: 1rem;
  color: #666;
}

.chart-card {
  width: 100%;
  text-align: center;
  background: linear-gradient(145deg, #f5f7fa, #e4e8ee);
  box-shadow: 5px 5px 15px #d1d9e6,
    -5px -5px 15px #ffffff;
  border-radius: 10px;
}

.chart-label {
  margin-top: 20px;
  font-size: 1rem;
  color: #666;
}

.footer {
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 0.9rem;
}
</style>
