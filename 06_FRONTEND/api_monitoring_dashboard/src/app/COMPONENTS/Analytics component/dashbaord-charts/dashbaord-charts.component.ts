import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartDataService } from '../../../CORE/services/chartdata.service';
import Chart from 'chart.js/auto';
import { SharedDataService } from '../../../CORE/services/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashbaord-charts',
  templateUrl: './dashbaord-charts.component.html',
  styleUrl: './dashbaord-charts.component.css',
})
export class DashbaordChartsComponent implements OnDestroy, OnChanges {
  @Input() selectedApiId: string = '';
  currentTheme: string = '';

  tooltipText: string = '';
  informationText: string = '';
  isTooltipVisible: boolean = false;

  showTooltip(text: string): void {
    if (text === 'Request Count') {
      this.informationText =
        'This chart displays the number of requests made to the API.';
      this.isTooltipVisible = true;
    } else if (text === 'Response Time Performance') {
      this.informationText =
        'Monitoring response time is critical for assessing the performance of an API. The peak response time indicates the maximum time taken by the API to respond to a request, highlighting potential performance bottlenecks. On the other hand, the minimum response time reflects the fastest response time achieved by the API, offering insights into optimal performance levels.';
      this.isTooltipVisible = true;
    } else if (text === 'Average') {
      this.informationText =
        'Payload Size:\n' +
        '- Reflects the average amount of data transferred per API response.\n' +
        '- Impacts network bandwidth consumption and data transfer costs.\n' +
        '- Optimization targets include payload compression and efficient data formats.\n\n' +
        'Response Time:\n' +
        '- Represents the typical duration for API responses.\n' +
        '- Influenced by server processing, network latency, and payload size.\n' +
        '- Critical for ensuring acceptable user experience and system performance.';
      this.isTooltipVisible = true;
    } else if (text === 'p95 and p99 Response Time') {
      this.informationText =
        '*p95 Response Time: Represents the response time at the 95th percentile of all observed response times. It gives insight into the typical performance of the API, filtering out occasional spikes.*p99 Response Time: Indicates the response time at the 99th percentile, where only 1% of requests exceed. It helps identify and address performance issues affecting a small but significant portion of requests.';
      this.isTooltipVisible = true;
    }
  }

  hideTooltip(): void {
    this.isTooltipVisible = false;
  }

  responseTimeStatChart: any;
  radarChart: any;
  p95andp99Chart: any;

  reqCount!: number;
  chart: any;

  peakResponseTime!: number;
  minResponseTime!: number;

  averagePayloadSize!: number;
  averageResponseTime!: number;

  p95ResponseTime!: number;
  p99ResponseTime!: number;

  private subscription: Subscription;

  constructor(
    private chartDataService: ChartDataService,
    private sharedDataService: SharedDataService
  ) {
    this.subscription = this.sharedDataService.getData().subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe to prevent memory leaks
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedApiId'] && !changes['selectedApiId'].firstChange) {
      const newApiId = changes['selectedApiId'].currentValue;
      this.fetchChartData(newApiId);
    }
  }

  fetchChartData(apiConfigId: string): void {
    this.chartDataService.fetchthReqCount(apiConfigId).subscribe(
      (data: number) => {
        this.reqCount = data;
        this.updatetCountChart();
      },
      (error) => {
        console.error('Error fetching payload size data:', error);
      }
    );

    this.chartDataService.fetchResponseTimeStat(apiConfigId).subscribe(
      (data) => {
        // Assign the response time statistics to component variables
        this.peakResponseTime = data.peakResponseTime;
        this.minResponseTime = data.minResponseTime;
        this.updateResponseTimeStatChart();
      },
      (error) => {
        console.error('Error fetching response time statistics:', error);
      }
    );

    this.chartDataService.fetchAverageStats(apiConfigId).subscribe(
      (data: any) => {
        this.averagePayloadSize = data.averagePayloadSize;
        this.averageResponseTime = data.averageResponseTime;

        // After fetching data, create or update radar chart
        if (this.radarChart) {
          this.updateRadarChart();
        } else {
          this.createRadarChart();
        }
      },
      (error) => {
        console.error('Error fetching average stats:', error);
        // Handle error if needed
      }
    );

    this.chartDataService.fetchP95AndP99ResponseTime(apiConfigId).subscribe(
      (data: any) => {
        this.p95ResponseTime = data.p95ResponseTime;
        this.p99ResponseTime = data.p99ResponseTime;
        console.log(this.p95ResponseTime, this.p99ResponseTime);

        // After fetching data, create or update radar chart
        if (this.p95andp99Chart) {
          this.updatep95andp99ChartChart();
        } else {
          this.createp95andp99ChartChart();
        }
      },
      (error) => {
        console.error('Error fetching average stats:', error);
        // Handle error if needed
      }
    );
  }

  CountcreateChart(reqCount: number): void {
    const canvas = document.getElementById(
      'cylinder-disc-stack-chart'
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Request Count'],
          datasets: [
            {
              label: 'Request Count',
              data: [reqCount],
              backgroundColor: 'rgba(164, 137, 90, 0.5)', // Cylinder disc color
              borderColor: 'rgba(164, 137, 90, 1)',
              borderWidth: 3,
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

  updatetCountChart(): void {
    if (this.chart) {
      this.chart.data.datasets[0].data = [this.reqCount];
      this.chart.update();
    } else {
      this.CountcreateChart(this.reqCount);
    }
  }

  createResponseTimeStatChart(): void {
    const responseChartCanvass = document.getElementById(
      'responseTimeStat-chart'
    ) as HTMLCanvasElement;
    if (responseChartCanvass) {
      this.responseTimeStatChart = new Chart(responseChartCanvass, {
        type: 'bar',
        data: {
          labels: ['Response Time stats'],
          datasets: [
            {
              label: 'Peak Response Time',
              data: [this.peakResponseTime],
              backgroundColor: 'rgba(239, 35, 60, 0.5)', // Cylinder disc color
              borderColor: 'rgba(239, 35, 60, 1)',
              borderWidth: 3,
            },
            {
              label: 'Min Response Time',
              data: [this.minResponseTime],
              backgroundColor: 'rgba(73, 165, 91, 0.5)', // Cylinder disc color
              borderColor: 'rgba(73, 165, 91, 1)',
              borderWidth: 3,
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
    }
  }

  updateResponseTimeStatChart(): void {
    if (this.responseTimeStatChart) {
      this.responseTimeStatChart.data.datasets[0].data = [
        this.peakResponseTime,
      ];
      this.responseTimeStatChart.data.datasets[1].data = [this.minResponseTime];
      this.responseTimeStatChart.update();
    } else {
      this.createResponseTimeStatChart();
    }
  }

  createRadarChart(): void {
    const radarChartCanvas = document.getElementById(
      'radar-chart'
    ) as HTMLCanvasElement;
    if (radarChartCanvas) {
      this.radarChart = new Chart(radarChartCanvas, {
        type: 'bar',
        data: {
          labels: ['Average Stats'],
          datasets: [
            {
              label: 'Average Payload Size',
              data: [this.averagePayloadSize],
              backgroundColor: 'rgba(119, 136, 153, 0.5)', // Cylinder disc color
              borderColor: 'rgba(119, 136, 153, 1)',
              borderWidth: 3,
            },
            {
              label: 'Average Response Time',
              data: [this.averageResponseTime],
              backgroundColor: 'rgba(77, 88, 98, 0.8)', // Cylinder disc color
              borderColor: 'rgba(77, 88, 98, 1)',
              borderWidth: 3,
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
    }
  }

  updateRadarChart(): void {
    if (this.radarChart) {
      this.radarChart.data.datasets[0].data = [
        this.averagePayloadSize,
        this.averageResponseTime,
      ];
      this.radarChart.update();
    }
  }

  createp95andp99ChartChart(): void {
    const pchart = document.getElementById('p-chart') as HTMLCanvasElement;
    if (pchart) {
      this.p95andp99Chart = new Chart(pchart, {
        type: 'bar',
        data: {
          labels: ['P-95', 'P-99'],
          datasets: [
            {
              label: 'p95 & p99 Response Time',
              data: [this.p95ResponseTime, this.p99ResponseTime],
              backgroundColor: 'rgba(47, 111, 94, 0.5)', // Background color of the radar area
              borderColor: 'rgba(47, 111, 94, 1)', // Border color of the radar area
              borderWidth: 3, // Border width of the radar area
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
    }
  }

  updatep95andp99ChartChart(): void {
    if (this.p95andp99Chart) {
      this.p95andp99Chart.data.datasets[0].data = [
        this.p95ResponseTime,
        this.p99ResponseTime,
      ];
      this.p95andp99Chart.update();
    }
  }
}
