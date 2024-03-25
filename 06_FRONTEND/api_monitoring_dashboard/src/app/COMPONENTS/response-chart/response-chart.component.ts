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
  chartData: any[] = [];
  chart: any;

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
        this.chartData = data;
        this.updateChart(); // Update the chart when new data is fetched
      },
      (error) => {
        console.error('Error fetching chart data:', error);
      }
    );
  }

  createChart(): void {
    const canvas = document.getElementById(
      'response-chart'
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.generateLabels(), // Generate labels if needed
          datasets: [
            {
              label: 'Response Time',
              data: this.chartData,
              borderColor: 'rgb(75, 192, 192)',
              fill: false,
            },
          ],
        },
        options: {
          // Add options as needed
        },
      });
    } else {
      console.error('Failed to get 2D rendering context for canvas element');
    }
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.data.datasets[0].data = this.chartData;
      this.chart.update();
    } else {
      this.createChart();
    }
  }

  generateLabels(): string[] {
    // Generate labels based on the length of chartData array
    return Array.from({ length: this.chartData.length }, (_, i) =>
      (i + 1).toString()
    );
  }
}
