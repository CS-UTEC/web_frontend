import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as _moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AbstractControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

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

  region = '';
  provincia = '';
  distrito = '';

  constructor(
    private dateAdapter: DateAdapter<any>) { 
    this.dateAdapter.setLocale('es');
  }
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

  opciones: Food[] = [
    {value: 'opcion-0', viewValue: 'Opción 1'},
    {value: 'opcion-1', viewValue: 'Opción 2'},
    {value: 'opcion-2', viewValue: 'Opción 3'},
  ];

}

export class DateValidator {
  static dateVaidator(AC: AbstractControl) {
    if (AC && AC.value && !moment(AC.value, 'DD/MM/AAAA', true).isValid()) {
      return { 'dateVaidator': true };
    }
    return null;
  }
}