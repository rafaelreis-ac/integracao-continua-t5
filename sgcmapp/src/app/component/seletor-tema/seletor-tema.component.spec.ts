import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeletorTemaComponent } from './seletor-tema.component';

describe('SeletorTemaComponent', () => {
  let component: SeletorTemaComponent;
  let fixture: ComponentFixture<SeletorTemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeletorTemaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeletorTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
