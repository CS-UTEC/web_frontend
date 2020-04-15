import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlgorithmService } from './algorithm.service';
import { Chart } from 'chart.js';
import { element } from 'protractor';


export class Data{

  constructor(public x: number,public y:number, public name: string, public pb: number, public pg: number, public status: string){

  }
}
@Component({
  selector: 'app-algorithm',
  templateUrl: './algorithm.component.html',
  styleUrls: ['./algorithm.component.css']
})
export class AlgorithmComponent implements OnInit {
  //@ViewChild(DxChartComponent, { static: false }) component: DxChartComponent;
  constructor(private as: AlgorithmService) { }
  public chart: any = null;
  datasource = [];
  selected = [];
  s = 100;
  n = 10;

  clear(){
    this.datasource = [];
    this.selected = [];
    this.s = 0;
    this.n = 0;
  }

  ngOnInit(): void {
    
}


customizeTooltip(arg: any) {
  return {
      text: 'id: ' + arg.point._dataItem.data.name + '<br>' + 'pB: ' + Math.round((arg.point._dataItem.data.pb + Number.EPSILON) * 100) / 100 + '<br>pG: ' + Math.round((arg.point._dataItem.data.pg + Number.EPSILON) * 100) / 100  + '<br>' + 'status: ' +'<span style="color:blue;">'+ arg.point._dataItem.data.status +'</span>'
  };
}

  generateData(){
    console.log(this.n + ':' + this.s)
    this.as.getData(this.n, this.s).toPromise()
    .then(
      res => {
        res['users'].forEach(element => {
          let point = new Data(element.x, element.y, element.id, element.p_b, element.p_g, element.infected);
  
          //this.chart.data.datasets[0].data.push(point);
          this.datasource.push(point);
          //this.chart.update();
        });
      }
    )
  }

  generateBluetoothEvent(){
    this.as.getDataFromGPSEvents(this.s).toPromise()
    .then(
      res => {
        this.datasource = [];
        res['users'].forEach(element => {
          let point = new Data(element.x, element.y, element.id, element.p_b, element.p_g, element.infected);
          this.datasource.push(point)
        })
      }
    )
  }

  generateGPSEvent(){
    this.as.getDataFromBluetoothEvents(this.s).toPromise()
    .then(
      res => {
        this.datasource = [];
        res['users'].forEach(element => {
          let point = new Data(element.x, element.y, element.id, element.p_b, element.p_g, element.infected);
          this.datasource.push(point)
        })
      }
    )
  }
  legendClick(e: any){
    console.log(e);

  }

  pointClick(e: any) {
    let point = e.target;
    let id = point._dataItem.data.name
    if(point.isSelected()) {
      const index = this.selected.indexOf(id);
      if (index > -1) {
        this.selected.splice(index, 1);
      }
      point.clearSelection();
    } else { 
        point.select();
        this.selected.push(id)
    }
    console.log(this.selected)
}

  runAlgorithm(){
    this.as.runAlgorithm(this.selected).toPromise()
    .then(
      res => {
        res['users'].forEach(element => {
          console.log(element.p_b + ' : ' + element.p_g);
        });
        this.selected = [];
      }
    )
  }

}
