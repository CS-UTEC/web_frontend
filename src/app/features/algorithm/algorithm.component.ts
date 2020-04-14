import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlgorithmService } from './algorithm.service';

export class Person {
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw(x: number, y: number, z: number) {
    this.ctx.fillRect(z * x, z * y, z, z);
  }
}

@Component({
  selector: 'app-algorithm',
  templateUrl: './algorithm.component.html',
  styleUrls: ['./algorithm.component.css']
})
export class AlgorithmComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  
  private ctx: CanvasRenderingContext2D;

  constructor(private as: AlgorithmService) { }
  
  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  animate(){
    this.ctx.fillStyle = 'red';
    const square = new Person(this.ctx);
    square.draw(5, 5, 5);
  }

  check(){
    this.as.getData(10, 30)
    .subscribe(
      res => console.log(res)
    )
  }

}
