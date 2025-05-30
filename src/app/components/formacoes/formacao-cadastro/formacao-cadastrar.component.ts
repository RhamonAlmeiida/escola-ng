import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Button, ButtonClasses, ButtonModule } from 'primeng/button';
import { ButtonGroupClasses } from 'primeng/buttongroup';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FormacaoCadastro } from '../../../models/formacao-cadastro';
import { Router } from '@angular/router';
import { FormacaoService } from '../../../services/formacao.service';



@Component({
  selector: 'app-formacao-cadastrar',
  imports: [FloatLabel,ButtonModule, FormsModule, InputTextModule,FloatLabelModule,InputMaskModule,ToastModule],
  providers: [MessageService],
  templateUrl: './formacao-cadastrar.component.html',
  styleUrl: './formacao-cadastrar.component.css'
})
export class FormacaoCadastrarComponent {
formacao: FormacaoCadastro;

constructor(
  private router: Router,
  private formacaoService: FormacaoService,
  private messageService: MessageService,
){

  this.formacao = new FormacaoCadastro(new Date());
}

cadastrar(){

  this.formacaoService.cadastrar(this.formacao).subscribe({
    next: formacao => this.apresentarMensagemCadastrado(),
    error: erro => console.log("Ocorreu um erro ao cadastrar Formação: " + erro),
  })
}
private apresentarMensagemCadastrado(){
  this.messageService.add({ 
    severity: 'success', 
    summary: 'Sucesso', 
    detail: 'Formação cadastrada com sucesso' 
  });

  this.router.navigate(["/formacoes"]);
}
}
