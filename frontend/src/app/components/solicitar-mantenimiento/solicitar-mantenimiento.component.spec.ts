import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarMantenimientoComponent } from './solicitar-mantenimiento.component';

describe('SolicitarMantenimientoComponent', () => {
  let component: SolicitarMantenimientoComponent;
  let fixture: ComponentFixture<SolicitarMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarMantenimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitarMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
