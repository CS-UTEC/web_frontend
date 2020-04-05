import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaparutasComponent } from './maparutas.component';

describe('MaparutasComponent', () => {
  let component: MaparutasComponent;
  let fixture: ComponentFixture<MaparutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaparutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaparutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
