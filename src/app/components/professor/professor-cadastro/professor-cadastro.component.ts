// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { MessageService } from 'primeng/api';
// import { ButtonModule } from 'primeng/button';
// import { FloatLabelModule } from 'primeng/floatlabel';
// import { InputMaskModule } from 'primeng/inputmask';
// import { InputTextModule } from 'primeng/inputtext';
// import { ToastModule } from 'primeng/toast';
// import { ProfessorCadastro } from '../../../models/professor-cadastro';
// import { Route, Router } from '@angular/router';

// @Component({
//   selector: 'app-professor-cadastro',
//   imports: [
//     FormsModule,
//     InputTextModule,
//     FloatLabelModule,
//     InputMaskModule,
//     ButtonModule,
//     ToastModule,
//   ],
//   providers:[MessageService],
//   templateUrl: './professor-cadastro.component.html',
//   styleUrl: './professor-cadastro.component.css'
// })
// export class ProfessorCadastroComponent {
//   professor: ProfessorCadastro;

//   constructor(
//     private router: Router,
//     private professorService: ProfessorService,
//     private massageService: MessageService,

//   ){
//     this.professor = new ProfessorCadastro();
//   }

//   cadastrar(){
//     this.professorService.cadastrar(this.professor).subscribe({
//       next: professor => this.apresentarMensagemCadastrado(),
//       error: erro => console.log(" Ocorreu um erro ao cadastrar o professor" + erro),

//     })
//   }

//   private apresentarMensagemCadastrado(){
//     this.messageService.add({ 
//       severity: 'success', 
//       summary: 'Sucesso', 
//       detail: 'Professor cadastrado com sucesso' 
//     });

//     this.router.navigate([/professor])
//   }
// }
