import { Component, OnInit } from '@angular/core';
import smartData from '../../../assets/json/smart_websites_scores.json';
import popularData from '../../../assets/json/popular_websites_scores.json';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  barChartData: any[];
  barChartDataPopular: any[];
  barChartLayoutPopular = {
    title: 'Similarity Scores of two different versions of Some Popular Website\'s Privacy Policies',
    xaxis: {
      title: 'Websites',
      tickfont: { size: 0 }, 
      showticklabels: false 
    },
    yaxis: {
      title: 'Similarity Score',
      tickformat: '.2f', 
      range: [0, 1]
    },
    width: 800,
    height: 500,
  };

  barChartLayout = {
    title: 'Similarity Scores of two different versions of Smart Device Website\'s Privacy Policies',
    xaxis: {
      title: 'Websites',
      tickfont: { size: 0 }, 
      showticklabels: false 
    },
    yaxis: {
      title: 'Similarity Score',
      tickformat: '.2f', 
      range: [0, 1]
    },
    width: 800,
    height: 500,
  };

  treeMapData: any[];
  treeMapDataPopular: any[];

  treeMapLayout = {
    title: 'Treemap of Similarity Scores for Smart Device Websites',
    margin: { t: 40, l: 25, r: 25, b: 0 },
    width: 1000,
    height: 700
  };

  treeMapLayoutPopular = {
    title: 'Treemap of Similarity Scores for Popular Websites',
    margin: { t: 40, l: 25, r: 25, b: 0 },
    width: 1000,
    height: 700
  };

  constructor() {}

  ngOnInit(): void {
    const treeData = smartData.map((item) => ({
      url: item.url,
      score: item.similarity_score,
    }));
    treeData.sort((a, b) => b.score - a.score);
    this.treeMapData = [
      {
        type: 'treemap',
        labels: ['Websites', ...treeData.map(item => item.url)],
        parents: ['', ...treeData.map(_ => 'Websites')],
        values: [0, ...treeData.map(item => item.score)],
        textinfo: 'label+value',
        texttemplate: '%{label}<br>%{value}',
        textfont: {
          size: 18,
        },hovertemplate: '<b>%{label}</b><br>Similarity Score: %{value}<extra></extra>',
        marker: {
          colorscale: 'Viridis'
        }
      },
    ];

    const treeDataPopular = popularData.map((item) => ({
      url: item.url,
      score: item.similarity_score,
    }));
    treeDataPopular.sort((a, b) => b.score - a.score);
    this.treeMapDataPopular = [
      {
        type: 'treemap',
        labels: ['Websites', ...treeDataPopular.map(item => item.url)],
        parents: ['', ...treeDataPopular.map(_ => 'Websites')],
        values: [0, ...treeDataPopular.map(item => item.score)],
        textinfo: 'label+value',
        texttemplate: '%{label}<br>%{value}',
        textfont: {
          size: 18,
        },hovertemplate: '<b>%{label}</b><br>Similarity Score: %{value}<extra></extra>',
        marker: {
          colorscale: 'Viridis'
        }
      },
    ];


    const barData = smartData
    barData.sort((a, b) => b.similarity_score - a.similarity_score);
    this.barChartData = [{
      x: barData.map(d => d.url),
      y: barData.map(d => d.similarity_score),
      type: 'bar',
      marker: {
        color: barData.map(d => d.similarity_score),
        colorscale: 'Viridis',
        showscale: true
      }
    }];

    const popularBarData = popularData
    popularBarData.sort((a, b) => b.similarity_score - a.similarity_score)

    this.barChartDataPopular = [{
      x: popularBarData.map(d => d.url),
      y: popularBarData.map(d => d.similarity_score),
      type: 'bar',
      marker: {
        color: popularBarData.map(d => d.similarity_score),
        colorscale: 'Viridis',
        showscale: true
      }
    }];
  }
}
