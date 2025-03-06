import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito : Producto[] = [];
  agregarProducto(producto: Producto){
    this.carrito.push(producto);
  }

  obtenerProducto(): Producto[]{
    return this.carrito;
  }

  generarXML(): string {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<recibo>\n`;
    this.carrito.forEach((producto) => {
      xml += `<producto id="${producto.id}">\n
              <nombre>${producto.nombre}</nombre>\n
              <precio>${producto.precio}</precio>\n
              </producto>\n`;
    });
    xml += '</recibo>';
    const blob = new Blob([xml], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recibo.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return xml;
  }

  eliminarDelCarrito(item: any){
    this.carrito.splice(item,1)
  }

  
}