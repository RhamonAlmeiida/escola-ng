// Importa módulo comum necessário para templates e estruturas do Angular
import { CommonModule } from '@angular/common';

// Importa os decoradores Component e OnInit
import { Component, OnInit } from '@angular/core';

// Importa a tabela do PrimeNG
import { TableModule } from 'primeng/table';

// Importa o modelo (interface ou classe) de Curso
import { Curso } from '../../../models/curso';

// Importa o módulo de botões do PrimeNG
import { ButtonModule } from 'primeng/button';

// Importa o roteador para navegação de páginas
import { Router } from '@angular/router';

// Importa o módulo de mensagens toast do PrimeNG
import { ToastModule } from 'primeng/toast';

// Importa o módulo da caixa de diálogo de confirmação
import { ConfirmDialogModule } from 'primeng/confirmdialog';

// Importa os serviços do PrimeNG para confirmação e mensagens
import { ConfirmationService, MessageService } from 'primeng/api';

// Importa o serviço responsável por operações de curso
import { CursoService } from '../../../services/curso.service';

// Declaração do componente
@Component({
  selector: 'app-cursos-lista', // Nome do seletor usado no HTML
  imports: [
    TableModule,        // Tabela de listagem
    CommonModule,       // Estruturas básicas Angular (ngIf, ngFor, etc.)
    ButtonModule,       // Botões
    ToastModule,        // Mensagens toast
    ConfirmDialogModule // Caixa de confirmação
  ],
  templateUrl: './cursos-lista.component.html', // Caminho do HTML do componente
  styleUrl: './cursos-lista.component.css',     // Caminho do CSS
  providers: [MessageService, ConfirmationService] // Serviços injetáveis no componente
})
export class CursosListaComponent implements OnInit {
  cursos: Array<Curso>;           // Lista de cursos a serem exibidos
  carregandoCursos?: boolean;     // Indicador de carregamento (pode ser usado com spinner)

  // Injeta dependências no construtor
  constructor(
    private router: Router,                           // Serviço para navegar entre páginas
    private confirmationService: ConfirmationService, // Serviço para confirmação
    private messageService: MessageService,           // Serviço para exibir mensagens
    private cursoService: CursoService,               // Serviço com lógica de acesso à API
  ) {
    this.cursos = [] // Inicializa a lista de cursos como um array vazio
  }

  // Método do ciclo de vida que é chamado ao iniciar o componente
  ngOnInit(): void {
    this.carregarCursos(); // Carrega a lista de cursos ao iniciar
  }

  // Método que chama o serviço e busca todos os cursos
  private carregarCursos() {
    this.carregandoCursos = true; // Inicia o indicador de carregamento
    this.cursoService.obterTodos().subscribe({
      next: cursos => this.cursos = cursos, // Atribui os cursos retornados à variável
      error: erro => console.log("Ocorreu um erro ao carregar a lista de cursos:" + erro), // Exibe erro no console
      complete: () => this.carregandoCursos = false // Finaliza o carregamento
    });
  }

  // Navega para a tela de cadastro de novo curso
  redirecionarPaginaCadastro() {
    this.router.navigate(["/cursos/cadastro"]);
  }

  // Navega para a tela de edição, passando o ID do curso como parâmetro
  redirecionarEditar(idCurso: number) {
    this.router.navigate(["/cursos/editar/" + idCurso]);
  }

  // Exibe caixa de confirmação antes de apagar o curso
  confirmaParaApagar(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget, // Elemento que acionou a confirmação
      message: 'Deseja realmente apagar?', // Mensagem da confirmação
      header: 'CUIDADO',                   // Título da confirmação
      closable: true,                      // Permite fechar a caixa
      closeOnEscape: true,                 // Fecha com ESC
      icon: 'pi pi-exclamation-triangle', // Ícone de alerta

      // Propriedades do botão de cancelar
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },

      // Propriedades do botão de aceitar (apagar)
      acceptButtonProps: {
        label: 'Apagar',
      },

      // Ação realizada se o usuário aceitar apagar
      accept: () => this.apagar(id)
    });
  }

  // Chama o serviço para apagar o curso
  private apagar(id: number){
    this.cursoService.apagar(id).subscribe({
      next: () => this.apresentarMensagemApagado(), // Se apagar com sucesso, exibe mensagem
      error: erro => console.log(`Ocorreu um erro ao apagar o curso: ${erro}`), // Exibe erro no console
    })
  }

  // Mostra uma mensagem toast de sucesso e recarrega a lista
  private apresentarMensagemApagado(){
    this.messageService.add({
      severity: 'success',         // Tipo da mensagem
      summary: 'sucesso',          // Título
      detail: 'Curso removido com sucesso', // Texto da mensagem
    });
    this.carregarCursos(); // Recarrega a lista de cursos atualizada
  }
}
