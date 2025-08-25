import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Policial } from '../models/policial.model';

@Injectable({
  providedIn: 'root'
})
export class PolicialService {
  // URL do seu backend. Ajuste se necessário.
  private apiUrl = 'http://localhost:3000/policiais';

  constructor(private http: HttpClient) { }

  // Método para buscar todos os policiais (GET)
  listarPoliciais(): Observable<Policial[]> {
    return this.http.get<Policial[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  cadastrarPolicial(policial: Policial): Observable<Policial> {
    return this.http.post<Policial>(this.apiUrl, policial).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Ocorreu um erro na API!', error);
    return throwError(() => new Error('Algo deu errado na comunicação com o servidor. Tente novamente mais tarde.'));
  }
}