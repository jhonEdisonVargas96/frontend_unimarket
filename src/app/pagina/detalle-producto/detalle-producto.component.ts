import { Component } from '@angular/core';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent {

  codigoProducto:number=0;

  constructor( private carritoService:CarritoService){
  }

  public agregarCarrito(){
    this.carritoService.agregar(this.codigoProducto);
  }

}
