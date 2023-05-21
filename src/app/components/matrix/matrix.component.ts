import { Component, OnInit } from '@angular/core';
import smartData from '../../../assets/json/smart_websites_scores.json';
import formattedSmartData from '../../../assets/json/formatted_similarity_matrix_2020.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';

import { interpolateRgbBasis } from 'd3-interpolate';

export interface DataItem {
  name: string | number | Date;
  value: string | number | Date;
  extra?: any;
  min?: number;
  max?: number;
  label?: string;
}

export interface Series {
  name: string | number | Date;
  series: DataItem[];
}

export interface HeatMapEntry {
  name: string;
  value: number;
}

export interface HeatMapPolicy {
  name: string;
  series: HeatMapEntry[];
}

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
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss'],
})
export class MatrixComponent implements OnInit {
  showChart: boolean;
  hmData: HeatMapPolicy[] = [];


  selectedWebsites: HeatMapPolicy[] = [];
  chartHeatmapData: Series[] = [];

  // Dynamic heatmap
  view: [number, number] = [1000, 800];
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
    title: 'Similarity Matrix of all 45 websites',
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

  constructor(private fb: FormBuilder) {
    this.hmData = formattedSmartData as HeatMapPolicy[];

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
        marker: {
          colorscale: 'Viridis',
        },
      },
    ];
    
  }

  ngOnInit(): void {}

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

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = smartData
      .sort((a, b) => b.reference - a.reference)
      .reverse();
    const gridApi: GridApi = params.api;
    gridApi.sizeColumnsToFit();
  }
}
