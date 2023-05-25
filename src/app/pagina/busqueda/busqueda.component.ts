import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
selector: 'app-busqueda',
templateUrl: './busqueda.component.html',
styleUrls: ['./busqueda.component.css']
})

export class BusquedaComponent{

  textoBusqueda:string;

  productos:ProductoGetDTO[];
  filtro:ProductoGetDTO[];

  constructor(private route:ActivatedRoute, private productoServicio:ProductoService){
    this.textoBusqueda = "";
    this.productos = this.productoServicio.listar();
    this.filtro = [];
    this.route.params.subscribe(params => {
      this.textoBusqueda = params["texto"];
      this.filtro = this.productos.filter( p =>
      p.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()) );
      });
  }

}
