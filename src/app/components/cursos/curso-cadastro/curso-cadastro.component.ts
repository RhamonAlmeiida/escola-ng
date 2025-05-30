// Importa o decorador Component do Angular
import { Component } from '@angular/core';

// Importa o módulo de formulários para usar ngModel
import { FormsModule } from '@angular/forms';

// Importa o módulo do PrimeNG para campos de texto
import { InputTextModule } from 'primeng/inputtext';

// Importa a interface/modelo de dados do curso
import { CursoCadastro } from '../../../models/curso-cadastro';

// Importa o módulo de labels flutuantes (PrimeNG)
import { FloatLabelModule } from 'primeng/floatlabel';

// Importa o módulo de máscara de entrada de texto (PrimeNG)
import { InputMaskModule } from 'primeng/inputmask';

// Importa o módulo de botão do PrimeNG
import { ButtonModule } from 'primeng/button';

// Importa o módulo de notificações tipo toast (PrimeNG)
import { ToastModule } from 'primeng/toast';

// Importa o serviço de mensagens do PrimeNG para mostrar toasts
import { MessageService } from 'primeng/api';

// Importa o serviço que realiza operações relacionadas ao curso
import { CursoService } from '../../../services/curso.service';

// Importa o serviço de roteamento do Angular
import { Router } from '@angular/router';

// Declara o componente com suas configurações
@Component({
  selector: 'app-curso-cadastro', // Nome usado na tag HTML do componente
  imports: [
    FormsModule,           // Módulo necessário para usar [(ngModel)]
    InputTextModule,       // Módulo de input de texto do PrimeNG
    FloatLabelModule,      // Módulo para labels flutuantes
    InputMaskModule,       // Módulo para aplicar máscaras em inputs
    ButtonModule,          // Módulo de botões
    ToastModule,           // Módulo para exibir mensagens toast
  ],
  providers:[MessageService], // Torna o serviço de mensagem disponível no componente
  templateUrl: './curso-cadastro.component.html', // Caminho para o HTML do componente
  styleUrl: './curso-cadastro.component.css'      // Caminho para o CSS do componente
})
export class CursoCadastroComponent {
  // Define o objeto curso que será vinculado ao formulário
  curso: CursoCadastro;

  // Injeta as dependências no construtor
  constructor(
    private router: Router,               // Serviço de navegação entre rotas
    private cursoService: CursoService,   // Serviço que chama a API para cadastro
    private messageService: MessageService, // Serviço que mostra mensagens toast
  ){
    // Inicializa o objeto curso com uma nova instância do modelo
    this.curso = new CursoCadastro();
  }

  // Método chamado ao clicar no botão "Cadastrar"
  cadastrar(){
    // Chama o serviço para cadastrar o curso
    this.cursoService.cadastrar(this.curso).subscribe({
      // Se der certo, chama o método para mostrar a mensagem de sucesso
      next: aluno => this.apresentarMensagemCadastrado(),

      // Se der erro, imprime no console
      error: erro => console.log("Ocorreu um erro ao cadastrar o aluno: " + erro),
    })
  }

  // Mostra mensagem de sucesso e redireciona para a lista de cursos
  private apresentarMensagemCadastrado(){
    // Adiciona uma mensagem toast de sucesso
    this.messageService.add({ 
      severity: 'success', 
      summary: 'Sucesso', 
      detail: 'Curso cadastrado com sucesso' 
    });

    // Redireciona para a rota "/cursos"
    this.router.navigate(["/cursos"]);
  }
}
