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
  constructor(private as: AlgorithmService) { }
  
  datasource = [];
  selected = [];
  squareSize = 100;
  sample = 10;

  ngOnInit(): void {
  }


  customizeTooltip(arg: any) {
    return {
        text: 'id: ' + arg.point._dataItem.data.name + '<br>' + 'pB: ' 
        + Math.round((arg.point._dataItem.data.pb + Number.EPSILON) * 100) / 100 
        + '<br>pG: ' + Math.round((arg.point._dataItem.data.pg + Number.EPSILON) * 100) / 100  
        + '<br>' + 'status: ' +'<span style="color:blue;">'+ arg.point._dataItem.data.status +'</span>'
    };
  }

  generateData(){
    console.log(this.sample + ':' + this.squareSize)
    this.as.getData(this.sample, this.squareSize).toPromise()
    .then(
      res => {
        res['users'].forEach(element => {
          let point = new Data(element.x, element.y, element.id, element.p_b, element.p_g, element.infected);
          this.datasource.push(point);
        });
      }
    )
  }

  clear(){
    this.datasource = [];
    this.selected = [];
    this.squareSize = 0;
    this.sample = 0;
  }

  generateBluetoothEvent(){
    this.as.getDataFromGPSEvents(this.squareSize).toPromise()
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
    this.as.getDataFromBluetoothEvents(this.squareSize).toPromise()
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
