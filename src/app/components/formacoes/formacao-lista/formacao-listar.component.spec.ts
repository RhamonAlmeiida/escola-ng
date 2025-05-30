import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormacaoListarComponent } from './formacao-listar.component';

describe('FormacaoListarComponent', () => {
  let component: FormacaoListarComponent;
  let fixture: ComponentFixture<FormacaoListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormacaoListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormacaoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
