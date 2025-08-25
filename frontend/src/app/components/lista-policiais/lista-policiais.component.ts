import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicialService } from '../../services/policial.service';
import { Policial } from '../../models/policial.model';

@Component({
  selector: 'app-lista-policiais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-policiais.component.html',
  styleUrls: ['./lista-policiais.component.css']
})
export class ListaPoliciaisComponent implements OnInit {
  policiais: Policial[] = [];
  erro: string | null = null;

  constructor(private policialService: PolicialService) {}

  ngOnInit(): void {
    this.carregarPoliciais();
  }

  carregarPoliciais(): void {
    this.policialService.listarPoliciais().subscribe({
      next: (dados) => {
        this.policiais = dados;
      },
      error: (err) => {
        this.erro = err.message;
        console.error(err);
      }
    });
  }
}