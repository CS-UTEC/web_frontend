import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  constructor() { }
  map: google.maps.Map;
  lat = -12.0402859
  lng = -77.093785;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
   }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.mapInitializer();
  }

  opciones: any[] = [
    {value: 'opcion-0', viewValue: 'Opción 1'},
    {value: 'opcion-1', viewValue: 'Opción 2'},
    {value: 'opcion-2', viewValue: 'Opción 3'},
  ];

}
