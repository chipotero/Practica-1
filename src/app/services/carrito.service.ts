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
    let total = 0;
    let iva = 0;
    let subtotal = 0;

    this.carrito.forEach((producto) => {
      subtotal += producto.precio;
    });
    iva = subtotal * 0.16;
    total = subtotal - iva;
    let cantidadPorProductos: { [id: string]: { producto: Producto, cantidad: number } } = {};

    this.carrito.forEach((producto) => {
        subtotal += producto.precio;
        if (cantidadPorProductos[producto.id]) {
            cantidadPorProductos[producto.id].cantidad++;
        } else {
            cantidadPorProductos[producto.id] = { producto: producto, cantidad: 1 };
        }
    });

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<recibo>\n`;
    xml += `<factura>\n
                <informacion>\n
                    <folio>123</folio>\n
                    <fecha>2025-02-20</fecha>\n
                    <cliente>\n
                        <nombre>Juan</nombre>\n
                        <email>juan@email.com</email>\n
                    </cliente>\n
                </informacion>\n
                <productos>\n`;
                  
                for (let key in cantidadPorProductos) {
                  let item = cantidadPorProductos[key];
                  xml += `<producto>\n
                              <id>${item.producto.id}</id>\n
                              <descripcion>${item.producto.nombre}</descripcion>\n
                              <cantidad>${item.cantidad}</cantidad>\n
                              <precioUnitario>${item.producto.precio}</precioUnitario>\n
                              <subtotal>${item.producto.precio * item.cantidad}</subtotal>\n
                          </producto>\n`;
              }
                  
              xml += `</productos>\n
              <totales>\n
                  <subtotal>${subtotal/2}</subtotal>\n
                  <impuestos>\n
                      <iva>${iva}</iva>\n
                  </impuestos>\n
                  <total>${total}</total>\n
              </totales>\n
          </factura>\n`;
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