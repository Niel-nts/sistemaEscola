import { Component } from '@angular/core';
import { Curso } from '../compartilhados/curso.model';
import { Cursos } from './cursos-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent {

  public cursos: Curso[] = Cursos
  public visibilidadePaginaPrincipal: Boolean = true
  public visibilidadeListaCompleta: Boolean = true
  public cursoPesquisa: String = ''
  public resultadoPesquisa: any = []

  public exibirPaginaPrincipal(): void {
    if(this.visibilidadePaginaPrincipal){
      this.visibilidadePaginaPrincipal = false      
    } else {
      this.visibilidadePaginaPrincipal = true
      this.visibilidadeListaCompleta = true
    }
  }
  
  
  public capturarCursoDigitado(cursoDigitado: Event): void {
    this.cursoPesquisa = (<HTMLInputElement>cursoDigitado.target).value
    if(this.cursoPesquisa == ''){
      this.visibilidadeListaCompleta = true
    }
  }
  

  public pesquisarCurso(): void {
    if(this.cursoPesquisa == ''){
      this.visibilidadeListaCompleta = true
      return 
    }
    this.resultadoPesquisa = []
    this.cursos.map((curso)=> {
      if(curso.nome.toUpperCase() == this.cursoPesquisa.toUpperCase()){
        this.resultadoPesquisa.push(curso)
      }
    })
    this.visibilidadeListaCompleta = false
  }

  
  public incluirCurso(
    curso: String, 
    instrutor: String,
    local: String,
    cargaHoraria: String,
    dataInicio: String
    ): void {
      if(curso == '' || 
      instrutor == '' || 
      local == '' ||
      cargaHoraria == '' ||
      dataInicio == ''){
        alert("Por favor preencha todos os campos!")
        return
      }
      let data = dataInicio.split("-")
      data.reverse()
      let dataFormatada = data.join('/')
      this.cursos.push({
        codigo: this.cursos.length + 1, 
        nome: curso,
        instrutor: instrutor,
        local: local,
        cargaHoraria: Number(cargaHoraria),
        dataInicio: dataFormatada
      })
      alert("Inclusão efetuada com sucesso!")
  }

}
