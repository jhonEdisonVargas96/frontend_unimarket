import { Component, OnInit } from '@angular/core';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent {

  seleccionados: ProductoGetDTO[];
  textoBtnEliminar: string;

  productos: ProductoGetDTO[];

  codigoUsuario: number = 0;
  seleccionado!: ProductoGetDTO;
  btnTexto: string = "";
  iconTexto: string = "";


  constructor(private productoServicio: ProductoService) {
    this.productos = [];
    this.seleccionados = [];
    this.textoBtnEliminar = "";
    //this.cargarProductos();
  }

  private cargarProductos() {
    this.productoServicio.listarProductoUsuario(this.codigoUsuario).subscribe({
      next: data => {
        this.productos = data.respuesta;
      },
      error: error => {
        console.log(error.error);
      }
    })
  }

  public seleccionar(producto: ProductoGetDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(producto);
    } else {
      this.seleccionados = this.seleccionados.filter(i => i != producto);
    }
    this.actualizarMensaje();
  }

  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam != 0) {
      if (tam == 1) {
        this.textoBtnEliminar = "1 elemento";
      } else {
        this.textoBtnEliminar = tam + " elementos";
      }
    } else {
      this.textoBtnEliminar = "";
    }
  }

  public borrarProductos() {
    this.seleccionados.forEach(e => {
      this.productos = this.productos.filter(i => i != e);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }

  public crear() {
    this.btnTexto = "Crear nuevo";
    this.iconTexto = "plus";
    this.seleccionado = new ProductoGetDTO(0, "", "", 0, 0, [], []);
  }

  public actualizar(item: ProductoGetDTO) {
    this.btnTexto = "Actualizar";
    this.iconTexto = "pencil";
    this.seleccionado = Object.create(item);
  }

  public enviarDatos() {
    if (this.btnTexto == "Actualizar") {
      const indice = this.productos.findIndex(e => this.seleccionado.codigo == e.codigo);
      this.productos[indice] = this.seleccionado;
    } else {
      this.productos.push(this.seleccionado);
    }
    document.getElementById("cerrar-m")?.click();
  }




}
