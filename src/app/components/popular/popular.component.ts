import { Component, OnInit } from '@angular/core';
import popularData from '../../../assets/json/popular_websites_scores.json';
import formattedPopularData from '../../../assets/json/popular_formatted_similarity_matrix_2020.json';

import { Color, ScaleType } from '@swimlane/ngx-charts';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';

import { interpolateRgbBasis } from 'd3-interpolate';

import {
  DataItem,
  Series,
  HeatMapEntry,
  HeatMapPolicy,
} from '../matrix/matrix.component';

function generateColorScheme(steps: number): string[] {
  const interpolator = interpolateRgbBasis([
    '#FF0000', // Red for value 0
    '#FFFF00', // Yellow for value 0.25
    '#00FF00', // Green for value 0.5
    '#00FFFF', // Cyan for value 0.75
    '#0000FF', // Blue for value 1
  ]);

  const colors: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const rate = i / steps;
    colors.push(interpolator(rate));
  }

  return colors;
}

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
})
export class PopularComponent implements OnInit {
  showChart: boolean;
  hmData: HeatMapPolicy[] = [];
  hmDataDrop: HeatMapPolicy[] = [];

  selectedWebsites: HeatMapPolicy[] = [];
  chartHeatmapData: Series[] = [];

  // Dynamic heatmap
  view: [number, number] = [800, 500];
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  steps = 10;
  customColor: Color = {
    name: 'Custom',
    selectable: true,
    group: ScaleType.Linear,
    domain: generateColorScheme(this.steps),
  };
  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  xAxisLabelH: string = 'Websites';
  yAxisLabelH: string = 'Websites';

  rowData$!: any[];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
    suppressHorizontalScroll: true,
  };

  public columnDefs: ColDef[] = [
    {
      field: 'reference',
      headerName: 'S. No',
      width: 100,
    },
    {
      headerName: 'Website',
      field: 'url',
    },
  ];

  data: any[];

  layout = {
    xaxis: {
      title: 'Websites',
      showticklabels: false,
    },
    yaxis: {
      title: 'Websites',
      showticklabels: false,
    },
    width: 900,
    height: 600,
  };

  constructor() {
    this.hmData = formattedPopularData as HeatMapPolicy[];
    const yLabels = this.hmData.map((d) => d.name);
    const xLabels = this.hmData[0].series.map((d) => d.name);
    const zData = this.hmData.map((d) => d.series.map((d) => d.value));

    this.data = [
      {
        z: zData,
        x: xLabels,
        y: yLabels,
        type: 'heatmap',
        colorscale: 'Viridis',
      },
    ];
    this.hmDataDrop = this.hmData.sort((a, b) => a.name.localeCompare(b.name));
  }

  ngOnInit(): void {}

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = popularData
      .sort((a, b) => b.reference - a.reference)
      .reverse();
    const gridApi: GridApi = params.api;
    gridApi.sizeColumnsToFit();
  }

  onWebsiteChange(param: HeatMapPolicy[]): void {
    this.selectedWebsites = param;
    this.updateHeatmapData();
    this.showChart = this.selectedWebsites.length > 1;
  }

  updateHeatmapData() {
    this.chartHeatmapData = this.selectedWebsites.map((website) => {
      return {
        name: website.name,
        series: website.series.filter((seriesItem) =>
          this.selectedWebsites.some(
            (selectedWebsite) => selectedWebsite.name === seriesItem.name
          )
        ),
      };
    });
  }
}
