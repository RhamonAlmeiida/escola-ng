import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormacaoService } from '../../../services/formacao.service';

@Component({
  selector: 'app-formacao-listar',
  imports: [
    TableModule,        
    CommonModule,     
    ButtonModule,      
    ToastModule,       
    ConfirmDialogModule 
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './formacao-listar.component.html',
  styleUrl: './formacao-listar.component.css'
})
export class FormacaoListarComponent implements OnInit {
  formacoes: Array<Formacao>;
  carregandoFormacoes?: boolean;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formacaoService: FormacaoService,
  ){
    this.formacoes = []
  }

  ngOnInit(): void {
    this.carregarFormacoes();
  }

  private carregarFormacoes(){
    this.carregandoFormacoes = true;
    this.formacaoService.obterTodos().subscribe({
      next: formacoes => this.formacoes = formacoes,
      error: erro => console.log("Ocorreu um erro ao carregar lista de Formações" + erro),
      complete: () => this.carregandoFormacoes = false
    });
  }

  redirecionarPaginaCadastro(){
    this.router.navigate(["formacao/cadastro"]);
  }

  redirecionarEditar(idFormacao: number)  {
    this.router.navigate(["/formacoes/editar/" + idFormacao]);
  }

  confirmaParaApagar(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget, 
      message: 'Deseja realmente apagar?', 
      header: 'CUIDADO',                   
      closable: true,                      
      closeOnEscape: true,                 
      icon: 'pi pi-exclamation-triangle', 
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Apagar',
      },

      accept: () => this.apagar(id)
    });
  } 

  private apagar(id: number){
    this.formacaoService.apagar(id).subscribe({
      next: () => this.apresentarMensagemApagado(),
      error: erro => console.log(` Ocorreu um erro ao apagar a Formção: ${erro}`),
    })
  }

  private apresentarMensagemApagado(){
    this.messageService.add({
      severity: 'success',        
      summary: 'sucesso',          
      detail: 'Formação removido com sucesso', 
    });
    this.carregarFormacoes(); 
  }
}
