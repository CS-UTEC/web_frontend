import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  puntosRegiones = [
{"nombre" : "Lima",	"latitud" : -12.0431805, "longitud" : -77.0282364},
{"nombre" : "Arequipa",	"latitud" : -16.3988895, "longitud" : -71.5350037},
{"nombre" : "Callao",	"latitud" : -12.0565901, "longitud" : -77.1181412},
{"nombre" : "Trujillo",	"latitud" : -8.1159897, "longitud" : -79.0299835},
{"nombre" : "Chiclayo",	"latitud" : -6.7713699, "longitud" : -79.8408813},
{"nombre" : "Iquitos",	"latitud" : -3.74912, "longitud" : -73.25383},
{"nombre" : "Huancayo",	"latitud" : -12.0651302, "longitud" : -75.2048569},
{"nombre" : "Piura",	"latitud" : -5.19449, "longitud" : -80.6328201},
{"nombre" : "Chimbote",	"latitud" : -9.0852804, "longitud" : -78.578331},
{"nombre" : "Cusco",	"latitud" : -13.5226402, "longitud" : -71.9673386},
{"nombre" : "Pucallpa",	"latitud" : -8.3791504, "longitud" : -74.5538712},
{"nombre" : "Tacna",	"latitud" : -18.0146503, "longitud" : -70.2536163},
{"nombre" : "Santiago de Surco",	"latitud" : -12.1358805, "longitud" : -77.0074234},
{"nombre" : "Ica",	"latitud" : -14.06777, "longitud" : -75.7286072},
{"nombre" : "Juliaca",	"latitud" : -15.5, "longitud" : -70.1333313},
{"nombre" : "Sullana",	"latitud" : -4.9038901, "longitud" : -80.6852798},
{"nombre" : "Chincha Alta",	"latitud" : -13.4098501, "longitud" : -76.1323471},
{"nombre" : "Huánuco",	"latitud" : -9.9306202, "longitud" : -76.2422333},
{"nombre" : "Ayacucho",	"latitud" : -13.1587801, "longitud" : -74.2232132},
{"nombre" : "Cajamarca",	"latitud" : -7.1637802, "longitud" : -78.500267},
{"nombre" : "Puno",	"latitud" : -15.8422003, "longitud" : -70.0198975}
  ];

  constructor() { }
  map: google.maps.Map;
  lat = -9.1899672;
  lng = -75.015152;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 6,
    mapTypeId: 'terrain'
  };

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    var marker;
    for (let punto of this.puntosRegiones){
      marker = new google.maps.Marker ({
        position : {lat : punto.latitud, lng: punto.longitud},
        title : punto.nombre,
        /*icon : {url : 'https://www.pngrepo.com/download/118680/person-alone.png',
        scaledSize: new google.maps.Size(30, 32),}*/
      });
      marker.setMap (this.map);
    }
   }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.mapInitializer();
  }

  opciones: Food[] = [
    {value: 'opcion-0', viewValue: 'Opción 1'},
    {value: 'opcion-1', viewValue: 'Opción 2'},
    {value: 'opcion-2', viewValue: 'Opción 3'},
  ];

}
