import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisMantenimientosComponent } from './mis-mantenimientos.component';

describe('MisMantenimientosComponent', () => {
  let component: MisMantenimientosComponent;
  let fixture: ComponentFixture<MisMantenimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisMantenimientosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisMantenimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
