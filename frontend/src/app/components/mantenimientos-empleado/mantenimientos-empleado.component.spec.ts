import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientosEmpleadoComponent } from './mantenimientos-empleado.component';

describe('MantenimientosEmpleadoComponent', () => {
  let component: MantenimientosEmpleadoComponent;
  let fixture: ComponentFixture<MantenimientosEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenimientosEmpleadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MantenimientosEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
