import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormacaoCadastrarComponent } from './formacao-cadastrar.component';

describe('FormacaoCadastrarComponent', () => {
  let component: FormacaoCadastrarComponent;
  let fixture: ComponentFixture<FormacaoCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormacaoCadastrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormacaoCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
