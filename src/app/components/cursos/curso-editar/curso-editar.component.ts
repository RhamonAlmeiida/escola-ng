import { Component } from '@angular/core';
import { CursoEditar } from '../../../services/curso-editar';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Curso } from '../../../models/curso';
import { Matricula, MatriculaCadastrar } from '../../../models/matricula';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-curso-editar',
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    InputMaskModule,
    ButtonModule,
    ToastModule,
    TableModule
  ],
  providers:[MessageService],
  templateUrl: './curso-editar.component.html',
  styleUrl: './curso-editar.component.css'
})
export class CursoEditarComponent {
  curso: CursoEditar;
  idEditar: number;
  matriculaCadastrar: MatriculaCadastrar;
  modalCadastrarVisible: boolean;
  matriculas: Matricula[];

  constructor(
    private router: Router,
    private cursoService: CursoService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
  ){
    this.curso = new CursoEditar();
    this.idEditar = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!.toString());

    this.matriculaCadastrar = new MatriculaCadastrar();
    this.modalCadastrarVisible = false;
    this.matriculas = [];
  }

  ngOnInit(){
    this.cursoService.obterPorId(this.idEditar).subscribe({
      next: curso => this.preencherCamposParaEditar(curso),
      error: erro => console.log("Ocorreu ao carregar os dados do curso::" + erro),
    });
  }

  private preencherCamposParaEditar(curso: Curso){
    this.curso.nome = curso.nome;
    this.curso.sigla = curso.sigla;
  }
  editar(){
    this.cursoService.editar(this.idEditar, this.curso).subscribe({
      next: curso => this.apresentarMensagemEditado(),
      error: erro => console.log(" Ocorreu um erro ao editar o curso:" + erro),
    })
  }

  private apresentarMensagemEditado(){
    this.messageService.add({ severity: 'success', summary: ' Sucesso', detail: 'Curso alterado com sucesso'});
    this.router.navigate(["/cursos"]);
  }
  abrirModalRegistrarMatricula(){

  }
}


