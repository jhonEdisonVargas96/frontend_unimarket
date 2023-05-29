import { Injectable } from '@angular/core';
import { ProductoGetDTO } from '../modelo/producto-get-dto';
import { ProductoDTO } from '../modelo/producto-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productos:ProductoGetDTO[];

  private prodURL = "https://unimarket-production-c2ed.up.railway.app/api/producto";

  constructor(private http: HttpClient){
  this.productos = [];

  this.productos.push(new ProductoGetDTO(1, "Televisor LG 4K", "Descripcion 1", 3500000, 2,
  ["https://picsum.photos/450/225", "https://picsum.photos/450/225"], ["TECNOLOGIA"]));

  this.productos.push(new ProductoGetDTO(2, "Tenis Nike", "Descripcion 2", 650000, 4,
  ["https://picsum.photos/450/225"], ["ROPA", "DEPORTE"]));
  //CREE OTROS PRODUCTOS (AL MENOS 6 MÁS)

  this.productos.push(new ProductoGetDTO(3, "Vehiculo spark GT", "Descripcion 3", 20000000, 1,
  ["https://picsum.photos/450/225", "https://picsum.photos/450/225"], ["VEHICULO"]));

  }

  public listar():ProductoGetDTO[]{
  return this.productos;
  }

  public crear(producto:ProductoDTO):Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.prodURL}/crearproducto`, producto);
  }

  public obtener(codigo:number): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.prodURL}/${codigo}`);
  }

  public actualizar(codigo:number, producto:ProductoDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.prodURL}/${codigo}`, producto);
  }

  public eliminar(codigo: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.prodURL}/${codigo}`);
  }

  public listarProductoUsuario(codigo:number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.prodURL}/${codigo}/listarproductousuario`);
  }

  public listarProducto(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.prodURL}/listarproductos`);
  }

}

