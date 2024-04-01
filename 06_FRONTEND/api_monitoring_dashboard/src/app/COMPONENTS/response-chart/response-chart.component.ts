import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartDataService } from '../../CORE/services/chartdata.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-response-chart',
  templateUrl: './response-chart.component.html',
  styleUrls: ['./response-chart.component.css'],
})
export class ResponseChartComponent implements OnChanges {
  @Input() selectedApiId: string = '';

  responseTimeData: any[] = [];
  payloadSizeData: any[] = [];
  throughputData: any[] = [];

  responseChart: any;
  payloadChart: any;
  throughputChart: any;

  constructor(private chartDataService: ChartDataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedApiId'] && !changes['selectedApiId'].firstChange) {
      const newApiId = changes['selectedApiId'].currentValue;
      this.fetchChartData(newApiId);
    }
  }

  fetchChartData(apiConfigId: string): void {
    this.chartDataService.fetchChartData(apiConfigId).subscribe(
      (data: number[]) => {
        this.responseTimeData = data;
        this.updateResponseTimeChart();
      },
      (error) => {
        console.error('Error fetching response time data:', error);
      }
    );

    this.chartDataService.fetchpayload(apiConfigId).subscribe(
      (data: number[]) => {
        this.payloadSizeData = data;
        this.updatePayloadSizeChart();
      },
      (error) => {
        console.error('Error fetching payload size data:', error);
      }
    );

    this.chartDataService.fetchthroughput(apiConfigId).subscribe(
      (data: number[]) => {
        this.throughputData = data;
        this.updatethroughputChart();
      },
      (error) => {
        console.error('Error fetching payload size data:', error);
      }
    );
  }

  createResponseTimeChart(): void {
    const canvas = document.getElementById(
      'response-chart'
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      this.responseChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.generateLabels(this.responseTimeData.length),
          datasets: [
            {
              label: 'Response Time',
              data: this.responseTimeData,
              borderColor: 'rgb(255, 255, 255)',
              fill: true,
              hoverBackgroundColor: 'red',
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'rgb(255, 255, 255)', // Set desired color (RGB format)
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: 'white', // Change x-axis label color
              },
            },
            y: {
              ticks: {
                color: 'white', // Change y-axis label color
              },
            },
          },
        },
      });
    } else {
      console.error('Failed to get 2D rendering context for canvas element');
    }
  }

  updateResponseTimeChart(): void {
    if (this.responseChart) {
      this.responseChart.data.datasets[0].data = this.responseTimeData;
      this.responseChart.update();
    } else {
      this.createResponseTimeChart();
    }
  }

  createPayloadSizeChart(): void {
    const canvas = document.getElementById(
      'payload-chart'
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      this.payloadChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.generateLabels(this.payloadSizeData.length),
          datasets: [
            {
              label: 'Payload Size',
              data: this.payloadSizeData,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'rgb(255, 255, 255)', // Set desired color (RGB format)
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: 'white', // Change x-axis label color
              },
            },
            y: {
              ticks: {
                color: 'white', // Change y-axis label color
              },
            },
          },
        },
      });
    } else {
      console.error('Failed to get 2D rendering context for canvas element');
    }
  }

  updatePayloadSizeChart(): void {
    if (this.payloadChart) {
      this.payloadChart.data.datasets[0].data = this.payloadSizeData;
      this.payloadChart.update();
    } else {
      this.createPayloadSizeChart();
    }
  }

  createthroughputChart(): void {
    const canvas = document.getElementById(
      'throughput-chart'
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      this.throughputChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.generateLabels(this.throughputData.length),
          datasets: [
            {
              label: 'Throughput',
              data: this.throughputData,
              borderColor: 'rgb(255, 255, 255)',
              fill: true,
              hoverBackgroundColor: 'red',
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'rgb(255, 255, 255)', // Set desired color (RGB format)
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: 'white', // Change x-axis label color
              },
            },
            y: {
              ticks: {
                color: 'white', // Change y-axis label color
              },
            },
          },
        },
      });
    } else {
      console.error('Failed to get 2D rendering context for canvas element');
    }
  }

  updatethroughputChart(): void {
    if (this.throughputChart) {
      this.throughputChart.data.datasets[0].data = this.throughputData;
      this.throughputChart.update();
    } else {
      this.createthroughputChart();
    }
  }

  generateLabels(length: number): string[] {
    return Array.from({ length: length }, (_, i) => (i + 1).toString());
  }
}
