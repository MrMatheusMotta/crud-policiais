// components/lista-policiais/lista-policiais.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicialService } from '../../services/policial.service';
import { Policial } from '../../models/policial.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-lista-policiais',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, // Importe para usar formulários reativos
    NgxMaskDirective     // Importe para usar a máscara de CPF
  ],
  templateUrl: './lista-policiais.component.html',
  styleUrls: ['./lista-policiais.component.css']
})
export class ListaPoliciaisComponent implements OnInit {
  policiais: Policial[] = [];
  erro: string | null = null;
  
  // Cria o formulário de busca
  buscaForm = new FormGroup({
    cpf: new FormControl('')
  });

  constructor(private policialService: PolicialService) {}

  ngOnInit(): void {
    // Carrega todos os policiais ao iniciar o componente
    this.carregarPoliciais();
  }

  // Método principal que carrega os policiais (com ou sem filtro)
  carregarPoliciais(cpf?: string): void {
    this.erro = null;
    this.policialService.listarPoliciais(cpf).subscribe({
      next: (dados) => {
        this.policiais = dados;
      },
      error: (err) => {
        this.erro = err.message;
        console.error(err);
      }
    });
  }

  // Método chamado quando o formulário é enviado
  buscarPoliciais(): void {
    const cpf = this.buscaForm.value.cpf ?? undefined;
    this.carregarPoliciais(cpf);
  }

  // Método chamado pelo botão "Limpar"
  limparBusca(): void {
    this.buscaForm.reset(); // Limpa o campo de input
    this.carregarPoliciais(); // Carrega a lista completa novamente
  }
}