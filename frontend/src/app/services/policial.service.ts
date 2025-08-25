// services/policial.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importe HttpParams
import { Observable, catchError, throwError } from 'rxjs';
import { Policial } from '../models/policial.model';

@Injectable({
  providedIn: 'root'
})
export class PolicialService {
  private apiUrl = 'http://localhost:3000/policiais';

  constructor(private http: HttpClient) { }

  // --- MÉTODO ATUALIZADO ---
  // Agora aceita um cpf opcional
  listarPoliciais(cpf?: string): Observable<Policial[]> {
    let params = new HttpParams();
    if (cpf && cpf.trim() !== '') {
      params = params.append('cpf', cpf);
    }

    return this.http.get<Policial[]>(this.apiUrl, { params }).pipe(
      catchError(this.handleError)
    );
  }

  cadastrarPolicial(policial: Policial): Observable<Policial> {
    // ... método de cadastro continua igual
    return this.http.post<Policial>(this.apiUrl, policial).pipe(
        catchError(this.handleError)
    );
  }
  
  private handleError(error: any) {
    // ... método de erro continua igual
    console.error('Ocorreu um erro na API!', error);
    return throwError(() => new Error('Algo deu errado na comunicação com o servidor. Tente novamente mais tarde.'));
  }
}