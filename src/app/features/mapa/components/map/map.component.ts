import { Component, OnInit, DoCheck, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as _moment from 'moment';
import { AbstractControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import * as data from './data.json';
import MarkerClusterer from "@google/markerclusterer"

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

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  selectedRegion = '';
  selectedProvincia = '';
  selectedDistrito = '';
  
  puntosRegiones = {
    "Lima" : {	"coor" : {"lat" : -12.0431805, "lng" : -77.0282364}},
    "Arequipa" : {	"coor" : {"lat" : -16.3988895, "lng" : -71.5350037}},
    "Callao" : {	"coor" : {"lat" : -12.0565901, "lng" : -77.1181412}},
    "Trujillo" : {	"coor" : {"lat" : -8.1159897, "lng" : -79.0299835}},
    "Chiclayo" : {	"coor" : {"lat" : -6.7713699, "lng" : -79.8408813}},
    "Iquitos" : {	"coor" : {"lat" : -3.74912, "lng" : -73.25383}},
    "Huancayo" : {	"coor" : {"lat" : -12.0651302, "lng" : -75.2048569}},
    "Piura" : {	"coor" : {"lat" : -5.19449, "lng" : -80.6328201}},
    "Chimbote" : {	"coor" : {"lat" : -9.0852804, "lng" : -78.578331}},
    "Cusco" : {	"coor" : {"lat" : -13.5226402, "lng" : -71.9673386}},
    "Pucallpa" : {	"coor" : {"lat" : -8.3791504, "lng" : -74.5538712}},
    "Tacna" : {	"coor" : {"lat" : -18.0146503, "lng" : -70.2536163}},
    "Santiago de Surco" : {	"coor" : {"lat" : -12.1358805, "lng" : -77.0074234}},
    "Ica" : {	"coor" : {"lat" : -14.06777, "lng" : -75.7286072}},
    "Juliaca" : {	"coor" : {"lat" : -15.5, "lng" : -70.1333313}},
    "Sullana" : {	"coor" : {"lat" : -4.9038901, "lng" : -80.6852798}},
    "Chincha Alta" : {	"coor" : {"lat" : -13.4098501, "lng" : -76.1323471}},
    "Huánuco" : {	"coor" : {"lat" : -9.9306202, "lng" : -76.2422333}},
    "Ayacucho" : {	"coor" : {"lat" : -13.1587801, "lng" : -74.2232132}},
    "Cajamarca" : {	"coor" : {"lat" : -7.1637802, "lng" : -78.500267}},
    "Puno" : {	"coor" : {"lat" : -15.8422003, "lng" : -70.0198975}}
  };

  departamentos = [
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


  dist = data.data;

  constructor(
    private dateAdapter: DateAdapter<any>,
    private titleService:Title) { 
    this.titleService.setTitle("Dashboard")
    this.dateAdapter.setLocale('es');
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
      });/*
      var marker;
      for (let punto of this.dist){
        let pos = {"lat" : parseFloat(punto.latitud), "lng" : parseFloat(punto.longitud)};
        marker = new google.maps.Marker ({
          position : pos,
          title : punto.distrito,
        });/*
        marker.addListener('click', function(position) {
          this.map.setZoom(8);
          this.map.setCenter(position);
        });
        marker.setMap (this.map);
        
      }*/
      new MarkerClusterer (this.map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
     }
  /*
    ngDoCheck(){
      if (this.selectedRegion.lng != 0)
      {
        this.map.panTo (this.selectedRegion);
          //this.map.setZoom (18);
      }
      console.log(this.selectedRegion.lng);
    }*/
  

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.mapInitializer();
  }

  zoomregion (event: Event){
    console.log("ZOOM");
    if (this.selectedRegion)
    {
      for (let d of this.dist){
        if (this.selectedRegion == d.departamento){
          console.log (d);
          this.map.panTo ({"lat" : parseFloat(d.latitud), "lng" : parseFloat(d.longitud)});
          this.map.setZoom(10);
          break;
        }
      }
      //this.map.panTo(this.selectedRegion);
      //this.map.panTo (this.selectedRegion);
      //this.map.setZoom (10);
    }
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