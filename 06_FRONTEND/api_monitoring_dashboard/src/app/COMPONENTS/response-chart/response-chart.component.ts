import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartDataService } from '../../CORE/services/chartdata.service';

@Component({
  selector: 'app-response-chart',
  templateUrl: './response-chart.component.html',
  styleUrls: ['./response-chart.component.css'],
})
export class ResponseChartComponent implements OnChanges {
  @Input() selectedApiId: string = '';
  chartData: any[] = [];
  constructor(private chartDataService: ChartDataService) {}
  colorScheme = '#A10A28';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedApiId'] && !changes['selectedApiId'].firstChange) {
      const newApiId = changes['selectedApiId'].currentValue;
      this.fetchChartData(newApiId);
      console.log('Selected API ID:', newApiId);
    }
  }

  fetchChartData(apiConfigId: string): void {
    this.chartDataService.fetchChartData(apiConfigId).subscribe(
      (data: number[]) => {
        this.chartData = this.transformChartData(data);
        // Now chartData is ready to be used by ngx-charts
        console.log(data)
      },
      (error) => {
        console.error('Error fetching chart data:', error);
      }
    );
  }

  transformChartData(data: number[]): any[] {
    const chartData = [
      {
        name: 'API Response Time',
        series: data.map((value, index) => ({
          name: `Request ${index + 1}`,
          value,
        })),
      },
    ];
    return chartData;
  }
}
