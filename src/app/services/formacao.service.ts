import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormacaoCadastro } from "../models/formacao-cadastro";
import { Observable } from "rxjs";
import { FormacaoEditar } from "./formacao-editar";
import { Formacao } from "../models/formacao";
import id from "@angular/common/locales/id";

@Injectable({
    providedIn: 'root'
})
export class FormacaoService {
 private urlAPI: string;
 constructor(private http: HttpClient){
    this.urlAPI = "http://localhost:8000/api/formacoes";
 }

 cadastrar(formacaoCadastro: FormacaoCadastro): Observable<Formacao>{
  return this.http.post<Formacao>(this.urlAPI, formacaoCadastro);
 }
 obterTodos(): Observable<Formacao[]>{
  return this.http.get<Formacao[]>(`${this.urlAPI}/${id}`);
 }
 obterPorId(id: number): Observable<Formacao>{
  return this.http.get<Formacao>(`${this.urlAPI}/${id}`);
}
apagar(id: number): Observable<any> {
  return this.http.delete<any>(`${this.urlAPI}/${id}`);
}
editar(id: number, formacaoEditar: FormacaoEditar): Observable<Formacao> {
  return this.http.put<Formacao>(`${this.urlAPI}/${id}`, formacaoEditar);
}
}


