import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PolicialService } from '../../services/policial.service';

@Component({
  selector: 'app-cadastro-policial',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-policial.component.html',
  styleUrls: ['./cadastro-policial.component.css']
})
export class CadastroPolicialComponent {
  policialForm: FormGroup;
  mensagem: { tipo: 'sucesso' | 'erro', texto: string } | null = null;
  carregando = false;

  constructor(
    private fb: FormBuilder,
    private policialService: PolicialService,
    private router: Router
  ) {
    this.policialForm = this.fb.group({
      rg_civil: ['', Validators.required],
      rg_militar: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      data_nascimento: ['', Validators.required],
      matricula: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.policialForm.invalid) {
      this.policialForm.markAllAsTouched();
      return;
    }

    this.carregando = true;
    this.mensagem = null;

    this.policialService.cadastrarPolicial(this.policialForm.value).subscribe({
      next: () => {
        this.mensagem = { tipo: 'sucesso', texto: 'Policial cadastrado com sucesso! Redirecionando...' };
        this.carregando = false;
        setTimeout(() => this.router.navigate(['/policiais']), 2000);
      },
      error: (err) => {
        this.mensagem = { tipo: 'erro', texto: err.message };
        this.carregando = false;
      }
    });
  }


  get f() {
    return this.policialForm.controls;
  }
}