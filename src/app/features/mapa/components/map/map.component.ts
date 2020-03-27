import { Component, OnInit, DoCheck, ViewChild, ElementRef, AfterViewInit, NgModule } from '@angular/core';
import * as _moment from 'moment';
import { AbstractControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import * as data from './data.json';
import MarkerClusterer from "@google/markerclusterer";
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  //options (from template)
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Día';
  showYAxisLabel = true;
  yAxisLabel = 'Número de casos';
  colorScheme = {
    domain: ['#bf0909']
  };



  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  selectedRegion = '';
  selectedProvincia = '';
  selectedDistrito = '';

  regiones = [
    "Amazonas",
    "Ancash",
    "Apurimac",
    "Arequipa",
    "Ayacucho",
    "Cajamarca",
    "Callao",
    "Cusco",
    "Huancavelica",
    "Huanuco",
    "Ica",
    "Junin",
    "La Libertad",
    "Lambayeque",
    "Lima",
    "Loreto",
    "Madre De Dios",
    "Moquegua",
    "Pasco",
    "Piura",
    "Puno",
    "San Martin",
    "Tacna",
    "Tumbes",
    "Ucayali"
  ];

  Provincias = [];
  ProvinciasNombres = [];
  Distritos = [];
  DistritosNombres = [];


  dist = data.data;

  constructor(
    private dateAdapter: DateAdapter<any>,
    private titleService:Title) { 
    this.titleService.setTitle("Dashboard")
    this.dateAdapter.setLocale('es');
    Object.assign(this, {single})
  }

  //TEST
  onSelect(event){
    console.log(event);
  }




  map: google.maps.Map;
  lat = -9.1899672;
  lng = -75.015152;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 6,
  };

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
      this.mapOptions);
      var markers = this.dist.map (function (dis, i){
        let pos = {"lat" : parseFloat(dis.latitud), "lng" : parseFloat(dis.longitud)};
        return new google.maps.Marker ({
          position : pos,
        })
      });
      new MarkerClusterer (this.map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
     }
  

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.mapInitializer();
  }

  selectRegion () {
    if (this.selectedRegion)
    {
      this.Provincias = [];
      this.ProvinciasNombres = [];
      for (let d of this.dist){
        if (this.selectedRegion == d.departamento){
          this.Provincias.push (d);
          this.ProvinciasNombres.push (d.provincia);
        }
      }
      this.ProvinciasNombres = [...new Set(this.ProvinciasNombres)];
      if (this.Provincias.length){
        this.map.panTo ({"lat" : parseFloat(this.Provincias[0].latitud), "lng" : parseFloat(this.Provincias[0].longitud)});
        this.map.setZoom(10);
      }
    }
  }

  deselectRegion (){
    this.selectedRegion = "";
    this.ProvinciasNombres = [];
    this.Provincias = [];
    this.map.panTo (this.coordinates);
    this.map.setZoom(6);
  }

  selectProvincia () {
    if (this.selectedProvincia){
      this.Distritos = [];
      this.DistritosNombres = [];
      for (let p of this.Provincias){
        if (this.selectedProvincia == p.provincia){
          this.Distritos.push (p);
          this.DistritosNombres.push (p.distrito);
        }
      }
      this.DistritosNombres = [...new Set(this.DistritosNombres)];
      if (this.Distritos.length){
        this.map.panTo ({"lat" : parseFloat(this.Distritos[0].latitud), "lng" : parseFloat (this.Distritos[0].longitud)});
        this.map.setZoom (12);
      }
    }
  }

  deselectProvincia () {
    this.selectedProvincia = "";
    this.DistritosNombres = [];
    this.Distritos = [];
    this.map.panTo ({"lat" : parseFloat(this.Provincias[0].latitud), "lng" : parseFloat(this.Provincias[0].longitud)});
    this.map.setZoom (10);
  }

  selectDistrito () {
    if (this.selectedDistrito){
      for (let d of this.Distritos){
        if (this.selectedDistrito == d.distrito){
          this.map.panTo ({"lat" : parseFloat(d.latitud), "lng" : parseFloat (d.longitud)});
          this.map.setZoom (15);
          break;
        }
      }
    }
  }

  deselectDistrito () {
    this.selectedDistrito = "";
    this.map.panTo ({"lat" : parseFloat(this.Distritos[0].latitud), "lng" : parseFloat (this.Distritos[0].longitud)});
    this.map.setZoom (12);
  }


}

export class DateValidator {
  static dateVaidator(AC: AbstractControl) {
    if (AC && AC.value && !moment(AC.value, 'DD/MM/AAAA', true).isValid()) {
      return { 'dateVaidator': true };
    }
    return null;
  }
}