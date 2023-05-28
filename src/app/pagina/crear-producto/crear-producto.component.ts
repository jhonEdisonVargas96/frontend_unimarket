import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { ProductoDTO } from 'src/app/modelo/producto-dto';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {

  producto: ProductoDTO;

  categorias: string[];

  archivos!: FileList;

  categoriasSeleccionadas: string[] = [];

  esEdicion: boolean = false;

  codigoProducto: number = 0;

  alerta!: Alerta;


  constructor(private route: ActivatedRoute, private productoService: ProductoService,
    private imagenService: ImagenService, private categoriaService: CategoriaService) {
    this.producto = new ProductoDTO();
    this.categorias = [];
    this.cargarCategorias();
    const objeto = this;
    this.route.params.subscribe(params => {

      this.codigoProducto = params["codigo"];
      if(this.codigoProducto!=null){
        this.productoService.obtener(this.codigoProducto).subscribe({
          next: data =>{
              this.producto = data.respuesta;
              this.esEdicion = true;
              console.log(this.producto.categoria)
          },
          error: error =>{
            objeto.alerta = new Alerta(error.error.respuesta, "danger");
          }
        });
      }

    });

  }

  private cargarCategorias() {
    this.categoriaService.listar().subscribe({
      next: data => {
        this.categorias = data.respuesta;
      },
      error: error => {
        console.log(error.error);
      }
    });
  }



  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
    }
  }

  elegirOpcion(event: any, cat: string) {
    if (event.target.checked) {
      // Si la casilla está marcada, agregar la categoría a la lista
      this.categoriasSeleccionadas.push(cat);
    } else {
      // Si la casilla está desmarcada, eliminar la categoría de la lista
      const index = this.categoriasSeleccionadas.indexOf(cat);
      if (index > -1) {
        this.categoriasSeleccionadas.splice(index, 1);
      }
    }
    console.log(this.categoriasSeleccionadas);
  }


  public crearProducto() {
    if (this.producto.imagen.length > 0) {
      
      this.productoService.crear(this.producto).subscribe({
        next: data => {
          this.producto = data.respuesta;
        },
        error: error => {
          console.log(error.error);
        }
      });
    } else {
      console.log('Debe seleccionar al menos una imagen y subirla');
    }
  }

  
  public subirImagenes() {
    if (this.archivos != null && this.archivos.length > 0) {
      const objeto = this.producto;
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: data => {
          objeto.imagen.push(data.respuesta.url);
        },
        error: error => {
          console.log(error.error);
        }
      });
    } else {
      console.log('Debe seleccionar al menos una imagen y subirla');
    }
  }



}
