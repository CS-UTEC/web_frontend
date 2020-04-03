import { Component, OnInit, DoCheck, ViewChild, ElementRef, AfterViewInit, NgModule, enableProdMode } from '@angular/core';
import * as _moment from 'moment';
import { AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import MarkerClusterer from "@google/markerclustererplus"
import { DataService } from 'src/app/shared/services/data.service';

import { single } from './data';

import { ScatterData, Service } from './map.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AnuncioComponent } from '../anuncio/anuncio.component';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionComponent } from '../seleccion/seleccion.component';
import { Data } from '@angular/router';
import { RangoFecha, Case } from 'src/app/shared/models';



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
  styleUrls: ['./map.component.css'],
  providers: [Service]
})
export class MapComponent {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  
  constructor(
    private dateAdapter: DateAdapter<any>,
    private title: Title,
    private dataService: DataService,
    private fb: FormBuilder,
    private service: Service,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
    ) { 
    this.title.setTitle("Dashboard");
    this.dateAdapter.setLocale('es');

    this.regiones = this.dataService.getRegion();
    this.provincia = this.dataService.getProvincia();
    this.distrito = this.dataService.getDistrito();
    
    this.dataSource = service.generateDataSource();

    this.dataService.getAllData(new RangoFecha (this.minDate, this.maxDate))
      .toPromise().then( res => {
        this.confirmados = res['confirmed'];
        this.recuperados = res['recovered'];
        this.neutral = res['neutral'];
        this.mapInitializer();
        }
      );
  }

  /* Variables */

  // Mapa

  regiones:any; 
  provincia:any;
  distrito: any;

  selectedRegion = '';
  selectedProvincia = '';
  selectedDistrito = '';

  provinciasFiltradas = [];
  distritosFiltrados = [];

  map: google.maps.Map;
  coordinates = new google.maps.LatLng(-9.1899672, -75.015152);
  

  confirmados: Case[];
  neutral: Case[];
  recuperados: Case[];

  markersNeutral: google.maps.Marker[];
  markersConfirmed: google.maps.Marker[];
  markersRecovered: google.maps.Marker[];

  clusterNeutral: MarkerClusterer;
  clusterConfirmed: MarkerClusterer;
  clusterRecovered: MarkerClusterer;

  showConfirmed = true;
  showNeutral = true;
  showRecovered = true;

  rangoFechas = ["Hoy", "Ayer", "Última semana", "Desde el primer caso", "Personalizado"];
  minDate = new Date("2020-03-06");
  maxDate = new Date();
  dateFilterType: string;

  filtroForm = this.fb.group({
    fechaInicio: [this.minDate, Validators.required],
    fechaFin: [new Date(), Validators.required],
  })

  isCustomDateFilter(): boolean{
    return this.dateFilterType === "Personalizado"? true : false;
  }
  /* Gráficos */
  
  single: any[];
  multi: any[];

  dataSource: ScatterData[];

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

  onSelect(event){
    console.log(event);
  }

  /*---------- */



//Funcion de inicializacion 

createMarkers(caso: Case[], color: string, iconPath: string): google.maps.Marker[] {
  return caso.map(function (dis){
    let pos = {"lat" : parseFloat(dis.latitud), "lng" : parseFloat(dis.longitud)};
      return new google.maps.Marker(
        {
          position: pos,
          title: dis.ubigeo,
          label:
            {
              color: color,
              text: String(dis.casos),
              fontSize: "10px"
            },
          visible: true,
          icon : 
            {
              url : iconPath,
              scaledSize: new google.maps.Size(50, 50),
              //size : new google.maps.Size (40,30)
            }
        }
      );
    }
  );
}
'/./../../../assets/marketsicons/m'

createCluster(map: google.maps.Map, markers: google.maps.Marker[], clusterIconPath: string): MarkerClusterer{
  return new MarkerClusterer ( map, markers,
    {
      //gridSize: 30,
      imagePath: clusterIconPath,
      averageCenter: true,
      ignoreHidden: true
      //minimumClusterSize: 1
    }
  );

}

  mapInitializer() {
    
    let mapOptions: google.maps.MapOptions = {
      center: this.coordinates,
      zoom: 6,
      mapTypeId: 'hybrid', //Opciones de visualización
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: true
    };

    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

    this.markersConfirmed = this.createMarkers(this.confirmados, 'white', '/./../../../assets/pins/pinred1.svg');
    this.markersNeutral = this.createMarkers(this.neutral, "black", '/./../../../assets/pins/pingray1.svg');
    this.markersRecovered = this.createMarkers(this.recuperados, 'black', '/./../../../assets/pins/pinblue1.svg');

    this.clusterConfirmed = this.createCluster(this.map,this.markersConfirmed, '/./../../../assets/marketsicons/m');
    this.clusterNeutral = this.createCluster(this.map, this.markersNeutral, '/./../../../assets/marketsicons/a');
    this.clusterRecovered = this.createCluster(this.map, this.markersRecovered, '/./../../../assets/marketsicons/m');

    let drawingManager = new google.maps.drawing.DrawingManager (
      {
        drawingControl: true,
        drawingControlOptions: 
          {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.RECTANGLE, google.maps.drawing.OverlayType.POLYGON, google.maps.drawing.OverlayType.CIRCLE ]
          }
      }
    );

    drawingManager.setMap(this.map);

    let arrayMarkers = [this.markersConfirmed, this.markersRecovered, this.markersNeutral];

    for(let markers of arrayMarkers){
      google.maps.event.addListener (drawingManager, 'rectanglecomplete', rectangle => this.figureComplete(rectangle, markers));
      google.maps.event.addListener (drawingManager, 'polygoncomplete', polygon => this.polygonComplete (polygon, markers));
      google.maps.event.addListener (drawingManager, 'circlecomplete', circle => this.figureComplete (circle, markers));  
    }  
    
  }
  
  showHideCluster(markers: google.maps.Marker[], cluster: MarkerClusterer, flag: boolean){
    for (let i in markers) {
      markers[i].setVisible(flag);
    }
    cluster.repaint();
  }

  onConfirmedToggle(enable: boolean){
    this.showHideCluster(this.markersConfirmed, this.clusterConfirmed, enable);
  }

  onRecoveredToggle(enable: boolean){
    this.showHideCluster(this.markersRecovered, this.clusterRecovered, enable);
  }

  onNeutralToggle(enable: boolean){
    this.showHideCluster(this.markersNeutral, this.clusterNeutral, enable);
  }





  /* Filtros */

  //Utilitarios

 check(){
   
 }

  getProvinciaFiltradaId(name: any, dataFiltrada: any[]): any{
    let p = dataFiltrada.find(x => x.provincia == name);
    return [p.id, p.idp];
  }

  selectRegion () {
    if (this.selectedRegion){
      this.provinciasFiltradas = [];
      let latLong: any;
      for (let prov of this.provincia){
        let idRegionSelected = this.dataService.getRegionId(this.selectedRegion);
        if (idRegionSelected == prov.id){
          latLong = this.dataService.getLatLongFirstDistrict("dep", idRegionSelected);
          prov['lat']=latLong[0];
          prov['lng']=latLong[1];
          this.provinciasFiltradas.push (prov);
        }
      }
      if (this.provinciasFiltradas.length){
        this.map.panTo ({"lat" : parseFloat(latLong[0]), "lng" : parseFloat(latLong[1])});
        this.map.setZoom(10);
      }
    }
  }

  deselectRegion (){
    this.selectedRegion = "";
    this.selectedProvincia = "";
    this.selectedDistrito = "";
    this.provinciasFiltradas = [];
    this.distritosFiltrados = [];
    this.map.panTo (this.coordinates);
    this.map.setZoom(6);
  }

  selectProvincia () {
    if (this.selectedProvincia){
      this.distritosFiltrados = [];
      let idProvSelected: any;
      let latLong: any;
      for (let dist of this.distrito){
        idProvSelected = this.getProvinciaFiltradaId(this.selectedProvincia,this.provinciasFiltradas);
        if (idProvSelected[0] == dist.id && idProvSelected[1] == dist.idp){
          latLong = this.dataService.getLatLongFirstDistrict("prov",idProvSelected[0], idProvSelected[1]);
          dist['lat'] = latLong[0];
          dist['lng'] = latLong[1];
          this.distritosFiltrados.push (dist);
        }
      }
      if (this.distritosFiltrados.length){
        this.map.panTo ({"lat" : parseFloat(latLong[0]), "lng" : parseFloat (latLong[1])});
        this.map.setZoom (12);
      }
    }
  }

  deselectProvincia () {
    this.selectedProvincia = "";
    this.selectedDistrito = "";
    this.distritosFiltrados = [];
    this.map.panTo ({"lat" : parseFloat(this.provinciasFiltradas[0].latitud), "lng" : parseFloat(this.provinciasFiltradas[0].longitud)});
    this.map.setZoom (10);
  }

  selectDistrito () {
    if (this.selectedDistrito){
      for (let d of this.distritosFiltrados){
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
    this.map.panTo ({"lat" : parseFloat(this.distritosFiltrados[0].latitud), "lng" : parseFloat (this.distritosFiltrados[0].longitud)});
    this.map.setZoom (12);
  }

  /*Draw selection */

  SelectedMarkers = [];

  figureComplete (figure, markers) {
    console.log ("Figura creada");
    let temp = []
    markers.forEach (function (mark){
      if (figure.getBounds ().contains (mark.getPosition ())){
        console.log(mark.getTitle());
        temp.push (JSON.stringify(mark.getTitle()));
        //temp.push (JSON.stringify(mark.getPosition().toJSON()));
      }
    })
    this.SelectedMarkers.push(temp);
    figure.setVisible (false);
  }

  polygonComplete (figure, markers) {
    console.log ("Polígono creada");
    var temp = []
    var paths = figure.getPaths();
    var bounds = new google.maps.LatLngBounds();
    paths.forEach(function(path) {
      var ar = path.getArray();
      for(var i = 0, l = ar.length;i < l; i++) {
        bounds.extend(ar[i]);
      }
    });
    markers.forEach (function (mark){
      if (bounds.contains (mark.getPosition ())){
        //console.log (mark.getPosition().toJSON());
        //temp.push (JSON.stringify(mark.getPosition().toJSON()));
        console.log(mark.getTitle());
        temp.push (JSON.stringify(mark.getTitle()));
      }
    })
    this.SelectedMarkers.push(temp);
    figure.setVisible (false);
  }



  /*Anuncio */
  openAnuncio(){
    this.dialog.open(
      AnuncioComponent,
      {
        width: '400px',
        data: { description: "Hola", title: 'Descripción de la imagen', placeholder: 'Editar descripción'}
      }
      );
  }


  /*Seleccionados */

  openSeleccionados(){
    this.bottomSheet.open(
      SeleccionComponent,
      {
        data: this.SelectedMarkers
      }
    )
  }

  

  /*Devxtreme */

  onPointClick(e) {
    e.target.select();
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

