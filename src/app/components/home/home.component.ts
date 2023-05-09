import { Component, OnInit } from '@angular/core';
import smartData from '../../../assets/smart_similarity_score.json';
import formattedSmartData from '../../../assets/formatted_similarity_matrix_2020.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';

import { interpolateRgbBasis } from 'd3-interpolate';



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

interface Record {
  url: string;
  similarity_score: number;
}

interface DataItem {
  name: string | number | Date;
  value: string | number | Date;
  extra?: any;
  min?: number;
  max?: number;
  label?: string;
}

interface Series {
  name: string | number | Date;
  series: DataItem[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  heatMapForm: FormGroup = this.fb.group({
    min: [null, Validators.compose([Validators.required, Validators.min(1)])],
    max: [null, Validators.compose([Validators.required, Validators.min(1)])],
  });

  outOfBound: boolean;
  submitted: boolean;
  heatMapChartData: Series[] = [];

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
  xAxisLabelH: string = 'Policies';
  yAxisLabelH: string = 'Policies';

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
      headerName: 'S No.',
      field: 'reference',
    },
    {
      headerName: 'URL',
      field: 'url',
    },
  ];

  barChartData = [{
    x: smartData.map(d => d.url),
    y: smartData.map(d => d.similarity_score),
    type: 'bar'
  }];

  barChartLayout = {
    title: 'Bar Chart of Similarity Scores',
    xaxis: { title: 'URL' },
    yaxis: { title: 'Similarity Score' }
  };

  bubbleChartData = [{
    x: smartData.map(d => d.url),
    y: smartData.map(d => d.similarity_score),
    mode: 'markers',
    marker: {
      size: smartData.map(d => d.similarity_score * 100),
      sizemode: 'diameter'
    }
  }];

  bubbleChartLayout = {
    title: 'Bubble Chart of Similarity Scores',
    xaxis: { title: 'URL' },
    yaxis: { title: 'Similarity Score' }
  };

  constructor(private fb: FormBuilder) {
    this.heatMapForm.valueChanges.subscribe((x) => {
      this.outOfBound = true
        ? x.min &&
          x.max &&
          (x.min > x.max ||
            (x.max - x.min || x.min == x.m) > 30 ||
            x.min == x.max ||
            x.max > smartData.length ||
            x.min > smartData.length)
        : false;
    });
  }

  ngOnInit(): void {}

  prepareHeatMapData(minValue: number, maxValue: number): void {
    for (let i = minValue; i < maxValue + 1; i++) {
      let series: Series = {
        name: '',
        series: [],
      };
      series.name = Object.values(smartData)[i - 1].url;
      let data: DataItem[] = [];
      for (let j = minValue; j < maxValue + 1; j++) {
        let item: DataItem = {
          name: '',
          value: '',
        };
        item.name = Object.values(smartData)[j - 1].url;

        item.value =
          Object.values(formattedSmartData[i].series[j])[1] == null
            ? 0
            : (Object.values(formattedSmartData[i].series[j])[1] as number);
        data.push(item);
      }
      series.series = data;
      this.heatMapChartData.push(series);
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = smartData;
    const gridApi: GridApi = params.api;
    gridApi.sizeColumnsToFit();
  }

  onSubmit(params: any): void {
    this.heatMapChartData = [];
    this.submitted = true;
    this.prepareHeatMapData(params.value.min, params.value.max);
  }
}
