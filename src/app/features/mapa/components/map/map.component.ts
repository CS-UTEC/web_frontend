import { Component, OnInit, DoCheck, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as _moment from 'moment';
import { AbstractControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import * as data from './data.json';
import MarkerClusterer from "@google/markerclusterer"
import { Overlay } from '@angular/cdk/overlay';

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

  SelectedMarkers = [];
  

  dist = data.data;

  map: google.maps.Map;
  lat = -9.1899672;
  lng = -75.015152;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 6,
  };

  drawingManager = new google.maps.drawing.DrawingManager ({
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [google.maps.drawing.OverlayType.POLYGON, google.maps.drawing.OverlayType.RECTANGLE]
    }
  });

  constructor(
    private dateAdapter: DateAdapter<any>,
    private titleService:Title) { 
    this.titleService.setTitle("Dashboard")
    this.dateAdapter.setLocale('es');
  }

  figureComplete (figure, markers) {
    console.log ("Figura creada");
    var temp = []
    markers.forEach (function (mark){
      if (figure.getBounds ().contains (mark.getPosition ())){
        console.log (mark.getPosition().toJSON());
        temp.push (JSON.stringify(mark.getPosition().toJSON()));
      }
    })
    this.SelectedMarkers = temp;
    figure.setVisible (false);
  }

  mapInitializer() {

    this.map = new google.maps.Map(this.gmap.nativeElement, 
      this.mapOptions);

    var markers = this.dist.map (function (dis, i){
      let pos = {"lat" : parseFloat(dis.latitud), "lng" : parseFloat(dis.longitud)};
      return new google.maps.Marker ({
        position : pos,
        icon : {url : '/./../../../assets/pins/pingray1.svg',
        scaledSize: new google.maps.Size(50, 50) }
      })
    });

    new MarkerClusterer (this.map, markers,
      {imagePath: '/./../../../assets/marketsicons/a'});
    this.drawingManager.setMap(this.map);

    google.maps.event.addListener (this.drawingManager, 'rectanglecomplete', rectangle => this.figureComplete(rectangle,markers))

    google.maps.event.addListener (this.drawingManager, 'polygoncomplete', polygon => this.figureComplete (polygon, markers))

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