import { Component, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatIconModule } from '@angular/material/icon'
import { FormsModule } from '@angular/forms'
import { MatTableModule } from '@angular/material/table'
import { MatAnchor } from "@angular/material/button";
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../cliente';
import { Cliente } from '../cadastro/cliente';
//import { ɵEmptyOutletComponent } from "@angular/router";
import {CommonModule} from '@angular/common'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatAnchor,
    MatButtonModule,
    //ɵEmptyOutletComponent, //verificar
    CommonModule
],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss',
})
export class Consulta {
  nomeBusca: string = ''
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ["id", "nome", "cpf", "dataNascimento", "email", "endereco", "acoes"]
  snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private service: ClienteService,
    private router: Router
  ){}

  ngOnInit(){

    this.listaClientes = this.service.pesquisarClientes('');
  }

  pesquisar(){
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca)
  }

  preparaEditar(id : string){
    this.router.navigate(['/cadastro'], { queryParams:{ "id": id } })
  }

  preparaDeletar(cliente  : Cliente){
    cliente.deletando = true;
  }

  deletar(cliente: Cliente){
    this.service.deletar(cliente);
    this.listaClientes = this.service.pesquisarClientes('');
    this.mostrarMensagem("Cliente deletado com sucesso!")

  }

  mostrarMensagem(mensagem: string){
    this.snack.open(mensagem, "Ok"), {
      duration: 2000
    }
  }

}
