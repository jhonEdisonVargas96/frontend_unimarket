import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {

  private catURL = "https://unimarket-production-c2ed.up.railway.app/api/categorias";

  constructor(private http: HttpClient) { }
  
  public listar(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.catURL}/listarcategorias`);
  }
}
