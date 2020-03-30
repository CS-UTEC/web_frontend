import { Component, OnInit, DoCheck, ViewChild, ElementRef, AfterViewInit, NgModule } from '@angular/core';
import * as _moment from 'moment';
import { AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import * as data from './data.json';
import MarkerClusterer from "@google/markerclusterer"
import { Overlay } from '@angular/cdk/overlay';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DataService } from 'src/app/shared/services/data.service';
import { MapUser } from 'src/app/shared/models/mapUser.model';
import { Person } from 'src/app/shared/models/person.model';
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

  SelectedMarkers = [];



  notificationForm = this.fb.group({
    message: [null, Validators.required]
  })

  
  

  dist = data.data;

  map: google.maps.Map;
  lat = -9.1899672;
  lng = -75.015152;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 6,
    mapTypeId: 'hybrid',
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: true,
    fullscreenControl: true
  };

  drawingManager = new google.maps.drawing.DrawingManager ({
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [google.maps.drawing.OverlayType.RECTANGLE] //google.maps.drawing.OverlayType.POLYGON
    }
  });


  onSelect(event){
    console.log(event);
  }

  constructor(
    private dateAdapter: DateAdapter<any>,
    private title: Title,
    private notificationService: NotificationService,
    private dataService: DataService,
    private fb: FormBuilder
    ) { 
    this.title.setTitle("Dashboard")
    this.dateAdapter.setLocale('es');
    Object.assign(this, {single})
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
        scaledSize: new google.maps.Size(0, 0) }
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

  minDate = new Date("2020-03-06");
  maxDate = new Date();

  filtroForm = this.fb.group({
    fechaInicio: [this.minDate, Validators.required],
    fechaFin: [new Date(), Validators.required],
    estado: ['confirmed']
  })

  getData(){

    let req = new MapUser();
    req.from = Number (new Date(this.filtroForm.value.fechaInicio));
    req.to = Number (new Date(this.filtroForm.value.fechaFin));
    req.state = this.filtroForm.value.estado;
    
    console.log(req);
    this.dataService.getData(req)
    .subscribe(puntos => console.log(puntos))
  }

  onNotify(){
    console.log(this.SelectedMarkers)
  }


  reportCaseForm = this.fb.group({
    document: [null, Validators.required],
    type: [null, Validators.required],
    report: [null, Validators.required]
  })

  docTypes: string[] = ['DNI', 'Pasaporte', 'Carnet de Extranjería'];
  reportType: string[] = ['Caso confirmado', 'Caso recuperado'];

  onReportCase () {
    let person = this.reportCaseForm.value;
    let req = new Person();
    req.document = person.document;
    req.type = person.type;
    if (person.report === "Caso confirmado"){
      this.notificationService.notifyConfirmedCase(req)
      .subscribe(res=> {this.resetReportCaseForm()})
    }else if(person.report === "Caso recuperado"){
      this.notificationService.notifyRecoverCase(req)
      .subscribe(res=> {this.resetReportCaseForm()})
    }

  }

  resetReportCaseForm () {
    this.reportCaseForm.reset();
  }

  /*Devxtreme */

  onPointClick(e) {
    e.target.select();
}



  customizePoint = (arg: any) => {
      var color, hoverStyle;
      switch (arg.data.type) {
          case "Star":
              color = "red";
              hoverStyle = { border: { color: "red" } };
              break;
          case "Satellite":
              color = "gray";
              hoverStyle = { border: { color: "gray" } };
      }
      return { color, hoverStyle };
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

