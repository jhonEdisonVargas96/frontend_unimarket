import { ProductoDTO } from "./producto-dto";
import { ProductoGetDTO } from "./producto-get-dto";

export class DetalleCompraDTO {

    producto: ProductoGetDTO;
    unidades: number;

    constructor(producto: ProductoGetDTO, unidades: number) {
        this.producto = producto;
        this.unidades = unidades;
      }

}
