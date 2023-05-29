import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SesionDTO } from '../modelo/sesion-dto';
import { UsuarioDTO } from '../modelo/usuario-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "https://unimarket-production-c2ed.up.railway.app/api/auth";
  constructor(private http: HttpClient) { }

  public registrar(usuario:UsuarioDTO):Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.authURL}/crear_cliente`, usuario);
  }

  public login(sesion:SesionDTO):Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.authURL}/login`, sesion);
  }
}
