import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasClienteComponent } from './areas-cliente.component';

describe('AreasClienteComponent', () => {
  let component: AreasClienteComponent;
  let fixture: ComponentFixture<AreasClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreasClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
