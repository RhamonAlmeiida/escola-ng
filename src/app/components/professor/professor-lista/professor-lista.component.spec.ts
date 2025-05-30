import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorListaComponent } from './professor-lista.component';

describe('ProfessorListaComponent', () => {
  let component: ProfessorListaComponent;
  let fixture: ComponentFixture<ProfessorListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
