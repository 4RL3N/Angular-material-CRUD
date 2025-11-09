import { Component, OnInit, inject } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card'
import {FormsModule} from "@angular/forms"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"
import {MatIconModule} from "@angular/material/icon"
import {MatButtonModule} from "@angular/material/button"
import {Cliente} from "./cliente"
import {ClienteService} from "../cliente"
import { Router, ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Brasilapi } from '../brasilapi';
import { Municipio, Estado } from '../brasilapi.models';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule, 
    MatCardModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,
    MatSelectModule,
    CommonModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro implements OnInit {

  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  snack: MatSnackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipios : Municipio[] = [];
  

  constructor(
    private brasilApiService : Brasilapi,
    private service: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  carregarUfS(){
    this.brasilApiService.listarUFs().subscribe({
      next: listaEstados => this.estados = listaEstados,
      error: erro => console.log("ocorreu um erro: ", erro)
    })
  }

  carregarMunicipios( event : MatSelectChange){
    const ufSelecionada = event.value;
    this.brasilApiService.listarMunicipios(ufSelecionada).subscribe({
      next: listaMunicipios => this.municipios = listaMunicipios,
      error: erro => console.log("ocorreu um erro: ", erro)
    })
    }

  salvar(){
    if (!this.atualizando){
      this.service.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.mostrarMensagem("Cliente salvo com sucesso!")
    } else{
      this.service.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      this.mostrarMensagem("Cliente atualizado com sucesso!")

    }
    
  }

  ngOnInit(){
    this.route.queryParamMap.subscribe( (query: any) =>  {
      const params = query['params']
      const id = params['id'];
      if (id){
        let clienteEncontrado = this.service.buscarClientePorId(id);
        if (clienteEncontrado){
          this.atualizando = true;
          this.cliente = clienteEncontrado;
          if (this.cliente.uf){
            const event = {value: this.cliente.uf} as MatSelectChange;
            this.carregarMunicipios (event);
          }

        }
      }
    })
    this.carregarUfS();
  }

  mostrarMensagem(mensagem: string){
    this.snack.open(mensagem, "Ok"), {
      duration: 2000
    }
  }
}
